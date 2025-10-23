import React from 'react'
import { User, DollarSign, TrendingUp, Percent } from 'lucide-react'
import { FormData } from '../App'

interface InputFormProps {
  formData: FormData
  onChange: (data: Partial<FormData>) => void
}

const InputForm: React.FC<InputFormProps> = ({ formData, onChange }) => {
  const handleInputChange = (field: keyof FormData, value: number) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      {/* 个人信息卡片 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <User className="w-5 h-5 mr-2 text-primary-600" />
          个人信息
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前年龄
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="18"
                max="80"
                value={formData.currentAge}
                onChange={(e) => handleInputChange('currentAge', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-primary-600 min-w-[60px]">
                {formData.currentAge}岁
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              退休年龄
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="50"
                max="80"
                value={formData.retirementAge}
                onChange={(e) => handleInputChange('retirementAge', parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-primary-600 min-w-[60px]">
                {formData.retirementAge}岁
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 财务信息卡片 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <DollarSign className="w-5 h-5 mr-2 text-primary-600" />
          财务信息
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              当前储蓄 (元)
            </label>
            <input
              type="number"
              value={formData.currentSavings}
              onChange={(e) => handleInputChange('currentSavings', parseFloat(e.target.value) || 0)}
              className="input-field"
              placeholder="请输入当前储蓄金额"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              年收入 (元)
            </label>
            <input
              type="number"
              value={formData.annualIncome}
              onChange={(e) => handleInputChange('annualIncome', parseFloat(e.target.value) || 0)}
              className="input-field"
              placeholder="请输入年收入"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              年支出 (元)
            </label>
            <input
              type="number"
              value={formData.annualExpenses}
              onChange={(e) => handleInputChange('annualExpenses', parseFloat(e.target.value) || 0)}
              className="input-field"
              placeholder="请输入年支出"
            />
          </div>
        </div>
      </div>

      {/* 投资参数卡片 */}
      <div className="card p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary-600" />
          投资参数
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              预期年化收益率
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="3"
                max="15"
                step="0.5"
                value={formData.investmentReturn}
                onChange={(e) => handleInputChange('investmentReturn', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-primary-600 min-w-[60px]">
                {formData.investmentReturn}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              建议范围：3%-15%，股票型基金通常为7%-10%
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              退休提取率
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="3"
                max="6"
                step="0.5"
                value={formData.withdrawalRate}
                onChange={(e) => handleInputChange('withdrawalRate', parseFloat(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold text-primary-600 min-w-[60px]">
                {formData.withdrawalRate}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              4%规则：每年提取投资组合的4%作为生活费
            </p>
          </div>
        </div>
      </div>

      {/* 储蓄能力显示 */}
      <div className="card p-4 bg-gradient-to-r from-accent-50 to-primary-50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">年储蓄能力</span>
          <span className="text-lg font-semibold text-primary-600">
            ¥{(formData.annualIncome - formData.annualExpenses).toLocaleString()}
          </span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-medium text-gray-700">月储蓄能力</span>
          <span className="text-lg font-semibold text-primary-600">
            ¥{Math.round((formData.annualIncome - formData.annualExpenses) / 12).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default InputForm