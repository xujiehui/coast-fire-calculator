import React, { useState } from 'react'
import { Download, Upload, Trash2, Save, Clock } from 'lucide-react'
import { 
  saveFormData, 
  loadFormData, 
  clearFormData, 
  hasSavedData, 
  getLastUpdatedTime,
  exportFormData,
  importFormData
} from '../utils/localStorage'
import { FormData } from '../App'

interface DataManagerProps {
  formData: FormData
  onDataImport: (data: FormData) => void
  isOpen: boolean
  onClose: () => void
}

const DataManager: React.FC<DataManagerProps> = ({ 
  formData, 
  onDataImport, 
  isOpen, 
  onClose 
}) => {
  const [importText, setImportText] = useState('')
  const [showImportArea, setShowImportArea] = useState(false)

  if (!isOpen) return null

  const lastUpdated = getLastUpdatedTime()
  const hasData = hasSavedData()

  const handleExport = () => {
    const dataString = exportFormData()
    const blob = new Blob([dataString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `coast-fire-data-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    if (!importText.trim()) {
      alert('请输入要导入的数据')
      return
    }

    const importedData = importFormData(importText)
    if (importedData) {
      onDataImport(importedData)
      setImportText('')
      setShowImportArea(false)
      alert('数据导入成功！')
    } else {
      alert('数据格式错误，导入失败')
    }
  }

  const handleClearData = () => {
    if (confirm('确定要清除所有保存的数据吗？此操作不可撤销。')) {
      clearFormData()
      alert('数据已清除')
      onClose()
    }
  }

  const handleSaveNow = () => {
    saveFormData(formData)
    alert('数据已保存到本地')
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '未知'
    try {
      return new Date(dateString).toLocaleString('zh-CN')
    } catch {
      return '未知'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">数据管理</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            ×
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* 数据状态 */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              数据状态
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>本地存储状态: {hasData ? '✅ 有数据' : '❌ 无数据'}</p>
              {lastUpdated && (
                <p>最后更新: {formatDate(lastUpdated)}</p>
              )}
              <p className="text-xs text-gray-500 mt-2">
                数据会在您修改参数时自动保存到浏览器本地存储
              </p>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="space-y-3">
            <button
              onClick={handleSaveNow}
              className="w-full flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>立即保存当前数据</span>
            </button>

            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center space-x-2 bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>导出数据文件</span>
            </button>

            <button
              onClick={() => setShowImportArea(!showImportArea)}
              className="w-full flex items-center justify-center space-x-2 bg-warning-600 hover:bg-warning-700 text-white py-3 px-4 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span>导入数据</span>
            </button>

            {hasData && (
              <button
                onClick={handleClearData}
                className="w-full flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>清除所有数据</span>
              </button>
            )}
          </div>

          {/* 导入区域 */}
          {showImportArea && (
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-800 mb-2">导入数据</h4>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="请粘贴导出的JSON数据..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg text-sm font-mono resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="flex space-x-2 mt-3">
                <button
                  onClick={handleImport}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  确认导入
                </button>
                <button
                  onClick={() => {
                    setShowImportArea(false)
                    setImportText('')
                  }}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg text-sm transition-colors"
                >
                  取消
                </button>
              </div>
            </div>
          )}

          {/* 说明信息 */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 使用说明</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 数据会自动保存到浏览器本地存储</li>
              <li>• 导出的文件可以备份或分享给他人</li>
              <li>• 清除浏览器数据会丢失保存的信息</li>
              <li>• 建议定期导出数据进行备份</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataManager