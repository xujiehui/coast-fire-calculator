import React, { useState } from 'react'
import { Calculator, HelpCircle, Database } from 'lucide-react'
import HelpModal from './HelpModal'
import DataManager from './DataManager'
import { FormData } from '../App'

interface HeaderProps {
  formData: FormData
  onDataImport: (data: FormData) => void
}

const Header: React.FC<HeaderProps> = ({ formData, onDataImport }) => {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const [isDataManagerOpen, setIsDataManagerOpen] = useState(false)

  return (
    <>
      <header className="bg-gradient-to-r from-primary-800 to-primary-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white/10 p-2 rounded-lg">
                <Calculator className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Coast FIRE 计算器</h1>
                <p className="text-primary-100 text-sm">财务独立退休规划工具</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsDataManagerOpen(true)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Database className="w-5 h-5" />
                <span className="hidden sm:inline">数据</span>
              </button>
              
              <button 
                onClick={() => setIsHelpOpen(true)}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <HelpCircle className="w-5 h-5" />
                <span className="hidden sm:inline">帮助</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <HelpModal 
        isOpen={isHelpOpen} 
        onClose={() => setIsHelpOpen(false)} 
      />
      
      <DataManager
        formData={formData}
        onDataImport={onDataImport}
        isOpen={isDataManagerOpen}
        onClose={() => setIsDataManagerOpen(false)}
      />
    </>
  )
}

export default Header
