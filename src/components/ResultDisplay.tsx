import React from 'react'
import { Target, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { CalculationResult, formatCurrency, formatPercentage, formatYears } from '../utils/calculations'

interface ResultDisplayProps {
  result: CalculationResult
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result }) => {
  const {
    coastFIREAmount,
    currentProgress,
    yearsToCoastFIRE,
    monthlyContributionNeeded,
    retirementAmount,
    isAlreadyCoastFIRE
  } = result

  return (
    <div className="space-y-6">
      {/* 主要结果卡片 */}
      <div className="card p-6 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center">
            <Target className="w-5 h-5 mr-2 text-primary-600" />
            Coast FIRE 目标
          </h2>
          {isAlreadyCoastFIRE && (
            <div className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">已达成</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {formatCurrency(coastFIREAmount)}
            </div>
            <div className="text-sm text-gray-600">Coast FIRE 所需金额</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-accent-600 mb-2">
              {formatCurrency(retirementAmount)}
            </div>
            <div className="text-sm text-gray-600">退休所需总金额</div>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">当前进度</span>
            <span className="text-sm font-semibold text-primary-600">
              {formatPercentage(currentProgress)}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(currentProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* 时间和储蓄需求 */}
      {!isAlreadyCoastFIRE && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card p-4">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 mr-2 text-warning-500" />
              <h3 className="font-semibold text-gray-800">达成时间</h3>
            </div>
            <div className="text-2xl font-bold text-warning-600">
              {formatYears(yearsToCoastFIRE)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              按当前储蓄速度
            </div>
          </div>

          <div className="card p-4">
            <div className="flex items-center mb-3">
              <TrendingUp className="w-5 h-5 mr-2 text-accent-500" />
              <h3 className="font-semibold text-gray-800">月度储蓄</h3>
            </div>
            <div className="text-2xl font-bold text-accent-600">
              {formatCurrency(monthlyContributionNeeded)}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              建议月度投入
            </div>
          </div>
        </div>
      )}

      {/* 状态提示 */}
      <div className={`card p-4 ${isAlreadyCoastFIRE ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
        <div className="flex items-start space-x-3">
          {isAlreadyCoastFIRE ? (
            <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
          ) : (
            <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
          )}
          <div>
            <h4 className={`font-semibold ${isAlreadyCoastFIRE ? 'text-green-800' : 'text-blue-800'}`}>
              {isAlreadyCoastFIRE ? '恭喜！您已达到 Coast FIRE' : '继续努力，距离目标不远了'}
            </h4>
            <p className={`text-sm mt-1 ${isAlreadyCoastFIRE ? 'text-green-700' : 'text-blue-700'}`}>
              {isAlreadyCoastFIRE
                ? '您现在可以停止储蓄，让复利为您工作直到退休。当然，继续储蓄可以让退休生活更加富裕。'
                : `您需要再储蓄 ${formatCurrency(coastFIREAmount - (result.projectedSavings[0]?.amount || 0))} 才能达到 Coast FIRE 目标。`
              }
            </p>
          </div>
        </div>
      </div>

      {/* 关键指标总览 */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">关键指标</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {result.projectedSavings.length - 1}年
            </div>
            <div className="text-xs text-gray-600">距离退休</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {formatPercentage(currentProgress)}
            </div>
            <div className="text-xs text-gray-600">完成进度</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {Math.round(coastFIREAmount / 10000)}万
            </div>
            <div className="text-xs text-gray-600">Coast目标</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-gray-800">
              {Math.round(retirementAmount / 10000)}万
            </div>
            <div className="text-xs text-gray-600">退休目标</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultDisplay