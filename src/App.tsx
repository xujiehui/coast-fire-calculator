import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Target, Clock } from 'lucide-react'
import InputForm from './components/InputForm'
import ResultDisplay from './components/ResultDisplay'
import ChartDisplay from './components/ChartDisplay'
import Header from './components/Header'
import WelcomeGuide from './components/WelcomeGuide'
import { calculateCoastFIRE, type CalculationResult } from './utils/calculations'
import { saveFormData, loadFormData, hasSavedData } from './utils/localStorage'

export interface FormData {
  currentAge: number
  retirementAge: number
  currentSavings: number
  annualIncome: number
  annualExpenses: number
  investmentReturn: number
  withdrawalRate: number
}

function App() {
  // 从本地存储加载初始数据
  const [formData, setFormData] = useState<FormData>(() => loadFormData())
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showWelcome, setShowWelcome] = useState(() => !hasSavedData())

  // 计算结果
  useEffect(() => {
    const calculationResult = calculateCoastFIRE(formData)
    setResult(calculationResult)
  }, [formData])

  // 保存数据到本地存储
  useEffect(() => {
    saveFormData(formData)
  }, [formData])

  const handleFormChange = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const handleDataImport = (importedData: FormData) => {
    setFormData(importedData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header 
        formData={formData}
        onDataImport={handleDataImport}
      />
      
      {showWelcome && (
        <WelcomeGuide onClose={() => setShowWelcome(false)} />
      )}
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 左侧输入区域 */}
          <div className="space-y-6">
            <InputForm 
              formData={formData} 
              onChange={handleFormChange} 
            />
          </div>

          {/* 右侧结果区域 */}
          <div className="space-y-6">
            {result && (
              <>
                <ResultDisplay result={result} />
                <ChartDisplay 
                  formData={formData} 
                  result={result} 
                />
              </>
            )}
          </div>
        </div>

        {/* 底部说明 */}
        <div className="mt-12 card p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary-600" />
            什么是 Coast FIRE？
          </h3>
          <div className="text-gray-600 space-y-3">
            <p>
              Coast FIRE（Coast Financial Independence Retire Early）是一种财务独立策略，
              指达到某个储蓄金额后，即使不再继续储蓄，仅依靠投资复利增长也能在退休时达到财务独立。
            </p>
            <p>
              这个计算器帮助您确定需要储蓄多少资金才能"滑行"到退休，让复利为您工作。
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-yellow-800">
                <strong>免责声明：</strong>
                此计算器仅供参考，实际投资回报可能因市场波动而有所不同。
                请咨询专业财务顾问制定个人投资策略。
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App