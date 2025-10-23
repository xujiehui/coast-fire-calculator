import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts'
import { BarChart3 } from 'lucide-react'
import { FormData } from '../App'
import { CalculationResult, formatCurrency } from '../utils/calculations'

interface ChartDisplayProps {
  formData: FormData
  result: CalculationResult
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ formData, result }) => {
  // 准备图表数据
  const chartData = result.projectedSavings.map((item, index) => ({
    age: item.age,
    year: item.year,
    amount: item.amount,
    coastFIRELine: result.coastFIREAmount,
    retirementLine: result.retirementAmount,
    isCoastFIRE: item.amount >= result.coastFIREAmount
  }))

  // 自定义Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length > 0) {
      const savingsData = payload.find((p: any) => p.dataKey === 'amount')
      const coastData = payload.find((p: any) => p.dataKey === 'coastFIRELine')
      const retirementData = payload.find((p: any) => p.dataKey === 'retirementLine')
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`年龄: ${label}岁`}</p>
          {savingsData && (
            <p className="text-primary-600">
              {`储蓄金额: ${formatCurrency(savingsData.value)}`}
            </p>
          )}
          {coastData && (
            <p className="text-accent-600">
              {`Coast FIRE: ${formatCurrency(coastData.value)}`}
            </p>
          )}
          {retirementData && (
            <p className="text-warning-600">
              {`退休目标: ${formatCurrency(retirementData.value)}`}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      {/* 储蓄增长图表 */}
      <div className="card p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
          <h3 className="text-lg font-semibold text-gray-800">储蓄增长预测</h3>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="age" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${value}岁`}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `${Math.round(value / 10000)}万`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              
              {/* 储蓄金额区域图 */}
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={3}
                fill="url(#savingsGradient)"
                name="储蓄金额"
              />
              
              {/* Coast FIRE 目标线 */}
              <Line
                type="monotone"
                dataKey="coastFIRELine"
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Coast FIRE 目标"
              />
              
              {/* 退休目标线 */}
              <Line
                type="monotone"
                dataKey="retirementLine"
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="10 5"
                dot={false}
                name="退休目标"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          <p>• 蓝色区域：预计储蓄增长轨迹</p>
          <p>• 青色虚线：Coast FIRE 目标金额</p>
          <p>• 橙色虚线：退休所需总金额</p>
        </div>
      </div>

      {/* 里程碑时间线 */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">重要里程碑</h3>
        
        <div className="space-y-4">
          {/* 当前状态 */}
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-primary-600 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">当前状态</div>
              <div className="text-sm text-gray-600">
                {formData.currentAge}岁，已储蓄 {formatCurrency(formData.currentSavings)}
              </div>
            </div>
            <div className="text-sm text-gray-500">现在</div>
          </div>

          {/* Coast FIRE 达成 */}
          {!result.isAlreadyCoastFIRE && (
            <div className="flex items-center space-x-4">
              <div className="w-4 h-4 bg-accent-600 rounded-full"></div>
              <div className="flex-1">
                <div className="font-medium text-gray-800">达成 Coast FIRE</div>
                <div className="text-sm text-gray-600">
                  储蓄达到 {formatCurrency(result.coastFIREAmount)}，可以"滑行"到退休
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {Math.round(formData.currentAge + result.yearsToCoastFIRE)}岁
              </div>
            </div>
          )}

          {/* 退休时间 */}
          <div className="flex items-center space-x-4">
            <div className="w-4 h-4 bg-warning-600 rounded-full"></div>
            <div className="flex-1">
              <div className="font-medium text-gray-800">退休时间</div>
              <div className="text-sm text-gray-600">
                预计拥有 {formatCurrency(result.retirementAmount)}，可安心退休
              </div>
            </div>
            <div className="text-sm text-gray-500">{formData.retirementAge}岁</div>
          </div>
        </div>
      </div>

      {/* 数据摘要 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary-600">
            {Math.round((result.coastFIREAmount - formData.currentSavings) / 10000)}万
          </div>
          <div className="text-sm text-gray-600 mt-1">还需储蓄</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-accent-600">
            {Math.round(result.yearsToCoastFIRE * 10) / 10}年
          </div>
          <div className="text-sm text-gray-600 mt-1">达成时间</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-warning-600">
            {Math.round(result.monthlyContributionNeeded / 1000)}k
          </div>
          <div className="text-sm text-gray-600 mt-1">月度储蓄</div>
        </div>
        
        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {formData.investmentReturn}%
          </div>
          <div className="text-sm text-gray-600 mt-1">预期收益</div>
        </div>
      </div>
    </div>
  )
}

export default ChartDisplay