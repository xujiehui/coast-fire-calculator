import React from 'react'
import { X, Target, Calculator, TrendingUp, Clock, DollarSign } from 'lucide-react'

interface HelpModalProps {
  isOpen: boolean
  onClose: () => void
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Coast FIRE 计算器使用指南</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Coast FIRE 概念解释 */}
          <section>
            <div className="flex items-center mb-4">
              <Target className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">什么是 Coast FIRE？</h3>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-gray-700 leading-relaxed">
                Coast FIRE（Coast Financial Independence Retire Early）是一种财务独立策略。
                当您达到某个储蓄金额后，即使不再继续储蓄，仅依靠投资复利增长也能在退休时达到财务独立。
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">优势</h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 减轻储蓄压力</li>
                  <li>• 提供心理安全感</li>
                  <li>• 灵活的职业选择</li>
                  <li>• 复利效应最大化</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">注意事项</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• 投资回报存在不确定性</li>
                  <li>• 通胀影响购买力</li>
                  <li>• 需要长期投资纪律</li>
                  <li>• 建议定期重新评估</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 使用步骤 */}
          <section>
            <div className="flex items-center mb-4">
              <Calculator className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">如何使用计算器</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-800">输入个人信息</h4>
                  <p className="text-gray-600 text-sm">设置当前年龄和计划退休年龄</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-800">填写财务信息</h4>
                  <p className="text-gray-600 text-sm">输入当前储蓄、年收入和年支出</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-800">调整投资参数</h4>
                  <p className="text-gray-600 text-sm">设置预期年化收益率和退休提取率</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-primary-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-800">查看结果</h4>
                  <p className="text-gray-600 text-sm">分析Coast FIRE目标和储蓄计划</p>
                </div>
              </div>
            </div>
          </section>

          {/* 参数说明 */}
          <section>
            <div className="flex items-center mb-4">
              <DollarSign className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">参数说明</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800 mb-1">预期年化收益率</h4>
                  <p className="text-sm text-gray-600">
                    建议范围3%-15%。股票型基金通常7%-10%，债券型基金3%-6%。
                    保守投资者可选择较低收益率。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800 mb-1">退休提取率</h4>
                  <p className="text-sm text-gray-600">
                    经典的4%规则：每年提取投资组合的4%作为生活费。
                    保守者可选择3%-3.5%。
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800 mb-1">年收入/支出</h4>
                  <p className="text-sm text-gray-600">
                    包括所有收入来源和必要支出。年储蓄能力 = 年收入 - 年支出。
                  </p>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <h4 className="font-semibold text-gray-800 mb-1">当前储蓄</h4>
                  <p className="text-sm text-gray-600">
                    包括银行存款、投资账户、退休金等可用于投资的资金总额。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 计算公式 */}
          <section>
            <div className="flex items-center mb-4">
              <TrendingUp className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">计算原理</h3>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">1. 退休所需总金额</h4>
                  <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                    退休金额 = 年支出 ÷ 提取率
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">2. Coast FIRE 目标金额</h4>
                  <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                    Coast金额 = 退休金额 ÷ (1 + 收益率)^剩余年数
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">3. 复利增长公式</h4>
                  <p className="text-sm text-gray-600 font-mono bg-white p-2 rounded">
                    未来价值 = 现值 × (1 + 收益率)^年数
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 实用建议 */}
          <section>
            <div className="flex items-center mb-4">
              <Clock className="w-6 h-6 mr-3 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">实用建议</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">投资策略</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 分散投资降低风险</li>
                  <li>• 定期定额投资</li>
                  <li>• 长期持有避免频繁交易</li>
                  <li>• 根据年龄调整资产配置</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800">规划建议</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 每年重新评估计划</li>
                  <li>• 考虑通胀影响</li>
                  <li>• 建立应急基金</li>
                  <li>• 咨询专业财务顾问</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 免责声明 */}
          <section className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-800 mb-2">⚠️ 重要提醒</h4>
            <p className="text-sm text-red-700">
              此计算器仅供参考，不构成投资建议。实际投资回报可能因市场波动而有所不同。
              投资有风险，请根据个人情况谨慎决策，建议咨询专业财务顾问制定个人投资策略。
            </p>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            开始使用计算器
          </button>
        </div>
      </div>
    </div>
  )
}

export default HelpModal