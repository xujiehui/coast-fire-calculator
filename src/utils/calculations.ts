import { FormData } from '../App'

export interface CalculationResult {
  coastFIREAmount: number
  currentProgress: number
  yearsToCoastFIRE: number
  monthlyContributionNeeded: number
  retirementAmount: number
  isAlreadyCoastFIRE: boolean
  projectedSavings: Array<{
    age: number
    amount: number
    year: number
  }>
}

export function calculateCoastFIRE(data: FormData): CalculationResult {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    annualIncome,
    annualExpenses,
    investmentReturn,
    withdrawalRate
  } = data

  // 计算退休所需总金额（基于4%提取率）
  const annualRetirementNeeds = annualExpenses
  const retirementAmount = annualRetirementNeeds / (withdrawalRate / 100)

  // 计算到退休的年数
  const yearsToRetirement = retirementAge - currentAge

  // 计算Coast FIRE所需金额
  // 使用复利公式：FV = PV * (1 + r)^n
  // 这里我们需要找到PV，使得FV = retirementAmount
  const annualReturn = investmentReturn / 100
  const coastFIREAmount = retirementAmount / Math.pow(1 + annualReturn, yearsToRetirement)

  // 计算当前进度
  const currentProgress = Math.min((currentSavings / coastFIREAmount) * 100, 100)

  // 检查是否已经达到Coast FIRE
  const isAlreadyCoastFIRE = currentSavings >= coastFIREAmount

  // 计算达到Coast FIRE所需年数和月度储蓄
  let yearsToCoastFIRE = 0
  let monthlyContributionNeeded = 0

  if (!isAlreadyCoastFIRE) {
    const remainingAmount = coastFIREAmount - currentSavings
    const annualSavings = annualIncome - annualExpenses

    if (annualSavings > 0) {
      // 使用年金现值公式计算所需时间
      // FV = PMT * [((1 + r)^n - 1) / r] + PV * (1 + r)^n
      // 这里需要数值方法求解n
      yearsToCoastFIRE = calculateYearsToTarget(
        currentSavings,
        coastFIREAmount,
        annualSavings,
        annualReturn
      )
      monthlyContributionNeeded = annualSavings / 12
    } else {
      // 如果没有储蓄能力，计算需要的月度储蓄
      monthlyContributionNeeded = calculateRequiredMonthlySavings(
        currentSavings,
        coastFIREAmount,
        10, // 假设10年内达到目标
        annualReturn
      )
      yearsToCoastFIRE = 10
    }
  }

  // 生成储蓄投影数据
  const projectedSavings = generateProjectionData(
    currentAge,
    retirementAge,
    currentSavings,
    isAlreadyCoastFIRE ? 0 : monthlyContributionNeeded * 12,
    annualReturn
  )

  return {
    coastFIREAmount,
    currentProgress,
    yearsToCoastFIRE: Math.max(0, yearsToCoastFIRE),
    monthlyContributionNeeded: Math.max(0, monthlyContributionNeeded),
    retirementAmount,
    isAlreadyCoastFIRE,
    projectedSavings
  }
}

function calculateYearsToTarget(
  currentAmount: number,
  targetAmount: number,
  annualContribution: number,
  annualReturn: number
): number {
  if (annualContribution <= 0) return Infinity

  // 使用二分法求解
  let low = 0
  let high = 50 // 最多50年
  let epsilon = 0.01

  while (high - low > epsilon) {
    const mid = (low + high) / 2
    const futureValue = currentAmount * Math.pow(1 + annualReturn, mid) +
      annualContribution * ((Math.pow(1 + annualReturn, mid) - 1) / annualReturn)

    if (futureValue < targetAmount) {
      low = mid
    } else {
      high = mid
    }
  }

  return (low + high) / 2
}

function calculateRequiredMonthlySavings(
  currentAmount: number,
  targetAmount: number,
  years: number,
  annualReturn: number
): number {
  const monthlyReturn = annualReturn / 12
  const months = years * 12
  
  const futureValueOfCurrent = currentAmount * Math.pow(1 + monthlyReturn, months)
  const remainingAmount = targetAmount - futureValueOfCurrent
  
  if (remainingAmount <= 0) return 0
  
  // 年金公式求月度储蓄
  const monthlyPayment = remainingAmount / 
    ((Math.pow(1 + monthlyReturn, months) - 1) / monthlyReturn)
  
  return monthlyPayment
}

function generateProjectionData(
  startAge: number,
  endAge: number,
  initialAmount: number,
  annualContribution: number,
  annualReturn: number
): Array<{ age: number; amount: number; year: number }> {
  const data = []
  let currentAmount = initialAmount
  
  for (let age = startAge; age <= endAge; age++) {
    data.push({
      age,
      amount: Math.round(currentAmount),
      year: new Date().getFullYear() + (age - startAge)
    })
    
    // 计算下一年的金额
    currentAmount = currentAmount * (1 + annualReturn) + annualContribution
  }
  
  return data
}

// 格式化货币显示
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// 格式化百分比
export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`
}

// 格式化年数
export function formatYears(years: number): string {
  if (years === Infinity || years > 100) {
    return '无法达到'
  }
  
  const wholeYears = Math.floor(years)
  const months = Math.round((years - wholeYears) * 12)
  
  if (wholeYears === 0) {
    return `${months}个月`
  } else if (months === 0) {
    return `${wholeYears}年`
  } else {
    return `${wholeYears}年${months}个月`
  }
}