import { calculateCoastFIRE, formatCurrency, formatYears } from './calculations'

// 测试用例
const testCases = [
  {
    name: "标准案例 - 30岁开始",
    data: {
      currentAge: 30,
      retirementAge: 65,
      currentSavings: 100000,
      annualIncome: 500000,
      annualExpenses: 300000,
      investmentReturn: 7,
      withdrawalRate: 4
    }
  },
  {
    name: "高收入案例 - 25岁开始",
    data: {
      currentAge: 25,
      retirementAge: 60,
      currentSavings: 50000,
      annualIncome: 800000,
      annualExpenses: 400000,
      investmentReturn: 8,
      withdrawalRate: 4
    }
  },
  {
    name: "保守投资案例 - 35岁开始",
    data: {
      currentAge: 35,
      retirementAge: 65,
      currentSavings: 200000,
      annualIncome: 400000,
      annualExpenses: 250000,
      investmentReturn: 5,
      withdrawalRate: 3.5
    }
  },
  {
    name: "已达成Coast FIRE案例",
    data: {
      currentAge: 40,
      retirementAge: 65,
      currentSavings: 2000000,
      annualIncome: 600000,
      annualExpenses: 300000,
      investmentReturn: 7,
      withdrawalRate: 4
    }
  }
]

// 运行测试
export function runCalculationTests() {
  console.log('🧮 Coast FIRE 计算器测试开始...\n')
  
  testCases.forEach((testCase, index) => {
    console.log(`📊 测试案例 ${index + 1}: ${testCase.name}`)
    console.log('输入参数:', testCase.data)
    
    const result = calculateCoastFIRE(testCase.data)
    
    console.log('计算结果:')
    console.log(`  - Coast FIRE 目标: ${formatCurrency(result.coastFIREAmount)}`)
    console.log(`  - 退休所需总额: ${formatCurrency(result.retirementAmount)}`)
    console.log(`  - 当前进度: ${result.currentProgress.toFixed(1)}%`)
    console.log(`  - 是否已达成: ${result.isAlreadyCoastFIRE ? '✅ 是' : '❌ 否'}`)
    
    if (!result.isAlreadyCoastFIRE) {
      console.log(`  - 达成时间: ${formatYears(result.yearsToCoastFIRE)}`)
      console.log(`  - 月度储蓄: ${formatCurrency(result.monthlyContributionNeeded)}`)
    }
    
    // 验证计算逻辑
    const expectedRetirementAmount = testCase.data.annualExpenses / (testCase.data.withdrawalRate / 100)
    const yearsToRetirement = testCase.data.retirementAge - testCase.data.currentAge
    const expectedCoastAmount = expectedRetirementAmount / Math.pow(1 + testCase.data.investmentReturn / 100, yearsToRetirement)
    
    console.log('验证结果:')
    console.log(`  - 退休金额计算: ${Math.abs(result.retirementAmount - expectedRetirementAmount) < 1 ? '✅ 正确' : '❌ 错误'}`)
    console.log(`  - Coast金额计算: ${Math.abs(result.coastFIREAmount - expectedCoastAmount) < 1 ? '✅ 正确' : '❌ 错误'}`)
    
    console.log('---\n')
  })
  
  console.log('🎉 测试完成！')
}

// 性能测试
export function runPerformanceTest() {
  console.log('⚡ 性能测试开始...')
  
  const testData = testCases[0].data
  const iterations = 1000
  
  const startTime = performance.now()
  
  for (let i = 0; i < iterations; i++) {
    calculateCoastFIRE(testData)
  }
  
  const endTime = performance.now()
  const avgTime = (endTime - startTime) / iterations
  
  console.log(`执行 ${iterations} 次计算`)
  console.log(`总耗时: ${(endTime - startTime).toFixed(2)}ms`)
  console.log(`平均耗时: ${avgTime.toFixed(4)}ms`)
  console.log(`每秒可执行: ${Math.round(1000 / avgTime)} 次`)
  
  console.log('✅ 性能测试完成！')
}

// 边界值测试
export function runBoundaryTests() {
  console.log('🔍 边界值测试开始...')
  
  const boundaryTests = [
    {
      name: "极低收益率",
      data: { ...testCases[0].data, investmentReturn: 1 }
    },
    {
      name: "极高收益率", 
      data: { ...testCases[0].data, investmentReturn: 20 }
    },
    {
      name: "零储蓄",
      data: { ...testCases[0].data, currentSavings: 0 }
    },
    {
      name: "收支平衡",
      data: { ...testCases[0].data, annualIncome: 300000, annualExpenses: 300000 }
    },
    {
      name: "支出大于收入",
      data: { ...testCases[0].data, annualIncome: 200000, annualExpenses: 300000 }
    }
  ]
  
  boundaryTests.forEach(test => {
    console.log(`测试: ${test.name}`)
    try {
      const result = calculateCoastFIRE(test.data)
      console.log(`  - 结果: ${result.isAlreadyCoastFIRE ? '已达成' : `需${formatYears(result.yearsToCoastFIRE)}`}`)
      console.log(`  - 状态: ✅ 正常`)
    } catch (error) {
      console.log(`  - 状态: ❌ 错误 - ${error}`)
    }
  })
  
  console.log('✅ 边界值测试完成！')
}