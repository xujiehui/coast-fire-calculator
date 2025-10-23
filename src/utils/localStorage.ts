import { FormData } from '../App'

const STORAGE_KEY = 'coast-fire-calculator-data'

// 默认数据
const DEFAULT_FORM_DATA: FormData = {
  currentAge: 30,
  retirementAge: 65,
  currentSavings: 100000,
  annualIncome: 500000,
  annualExpenses: 300000,
  investmentReturn: 7,
  withdrawalRate: 4
}

// 保存数据到本地存储
export function saveFormData(data: FormData): void {
  try {
    const dataToSave = {
      ...data,
      lastUpdated: new Date().toISOString()
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    console.log('数据已保存到本地存储')
  } catch (error) {
    console.error('保存数据到本地存储失败:', error)
  }
}

// 从本地存储加载数据
export function loadFormData(): FormData {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      // 验证数据完整性
      const validatedData = validateFormData(parsedData)
      console.log('从本地存储加载数据成功')
      return validatedData
    }
  } catch (error) {
    console.error('从本地存储加载数据失败:', error)
  }
  
  console.log('使用默认数据')
  return DEFAULT_FORM_DATA
}

// 验证表单数据的完整性
function validateFormData(data: any): FormData {
  const validatedData: FormData = {
    currentAge: isValidNumber(data.currentAge, 18, 80) ? data.currentAge : DEFAULT_FORM_DATA.currentAge,
    retirementAge: isValidNumber(data.retirementAge, 50, 80) ? data.retirementAge : DEFAULT_FORM_DATA.retirementAge,
    currentSavings: isValidNumber(data.currentSavings, 0, Infinity) ? data.currentSavings : DEFAULT_FORM_DATA.currentSavings,
    annualIncome: isValidNumber(data.annualIncome, 0, Infinity) ? data.annualIncome : DEFAULT_FORM_DATA.annualIncome,
    annualExpenses: isValidNumber(data.annualExpenses, 0, Infinity) ? data.annualExpenses : DEFAULT_FORM_DATA.annualExpenses,
    investmentReturn: isValidNumber(data.investmentReturn, 1, 20) ? data.investmentReturn : DEFAULT_FORM_DATA.investmentReturn,
    withdrawalRate: isValidNumber(data.withdrawalRate, 2, 8) ? data.withdrawalRate : DEFAULT_FORM_DATA.withdrawalRate
  }
  
  // 确保退休年龄大于当前年龄
  if (validatedData.retirementAge <= validatedData.currentAge) {
    validatedData.retirementAge = validatedData.currentAge + 10
  }
  
  return validatedData
}

// 验证数字是否在有效范围内
function isValidNumber(value: any, min: number, max: number): boolean {
  return typeof value === 'number' && 
         !isNaN(value) && 
         value >= min && 
         value <= max
}

// 清除本地存储数据
export function clearFormData(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
    console.log('本地存储数据已清除')
  } catch (error) {
    console.error('清除本地存储数据失败:', error)
  }
}

// 检查是否有保存的数据
export function hasSavedData(): boolean {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    return savedData !== null
  } catch (error) {
    return false
  }
}

// 获取数据保存时间
export function getLastUpdatedTime(): string | null {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      return parsedData.lastUpdated || null
    }
  } catch (error) {
    console.error('获取保存时间失败:', error)
  }
  return null
}

// 导出数据为JSON
export function exportFormData(): string {
  const currentData = loadFormData()
  return JSON.stringify(currentData, null, 2)
}

// 从JSON导入数据
export function importFormData(jsonString: string): FormData | null {
  try {
    const importedData = JSON.parse(jsonString)
    const validatedData = validateFormData(importedData)
    saveFormData(validatedData)
    return validatedData
  } catch (error) {
    console.error('导入数据失败:', error)
    return null
  }
}