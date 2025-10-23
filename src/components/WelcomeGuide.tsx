import React, { useState, useEffect } from 'react'
import { X, ArrowRight, Target, Calculator, TrendingUp } from 'lucide-react'

interface WelcomeGuideProps {
  onClose: () => void
}

const WelcomeGuide: React.FC<WelcomeGuideProps> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      icon: <Target className="w-12 h-12 text-primary-600" />,
      title: "欢迎使用 Coast FIRE 计算器",
      description: "这是一个专业的财务独立规划工具，帮助您计算达到Coast FIRE所需的储蓄金额和时间。",
      highlight: "让复利为您工作，实现财务自由！"
    },
    {
      icon: <Calculator className="w-12 h-12 text-accent-600" />,
      title: "简单三步开始规划",
      description: "只需输入您的基本信息、财务状况和投资预期，即可获得个性化的储蓄计划。",
      highlight: "专业算法，精准计算"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-warning-600" />,
      title: "可视化追踪进度",
      description: "通过直观的图表和进度指标，实时了解您的财务独立进程。",
      highlight: "让目标清晰可见"
    }
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const skipGuide = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={skipGuide}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              {steps[currentStep].icon}
            </div>
            
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {steps[currentStep].title}
            </h2>
            
            <p className="text-gray-600 mb-4 leading-relaxed">
              {steps[currentStep].description}
            </p>
            
            <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-lg p-3 mb-6">
              <p className="text-sm font-medium text-primary-700">
                {steps[currentStep].highlight}
              </p>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={skipGuide}
              className="flex-1 btn-secondary text-sm"
            >
              跳过引导
            </button>
            <button
              onClick={nextStep}
              className="flex-1 btn-primary text-sm flex items-center justify-center"
            >
              {currentStep === steps.length - 1 ? '开始使用' : '下一步'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WelcomeGuide