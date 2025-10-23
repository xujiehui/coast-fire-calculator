# Coast FIRE 退休储蓄计算器

一个专业的财务独立规划工具，帮助您计算达到Coast FIRE所需的储蓄金额和时间。

## 功能特性

- 🎯 **Coast FIRE 计算**：精确计算达到财务独立所需的储蓄金额
- 📊 **可视化图表**：直观展示储蓄增长轨迹和财务目标
- 📱 **响应式设计**：完美适配桌面端和移动端
- 🧮 **实时计算**：参数调整时实时更新计算结果
- 📈 **进度追踪**：清晰显示当前进度和达成时间
- 💡 **专业指导**：内置帮助说明和使用指南

## 什么是 Coast FIRE？

Coast FIRE（Coast Financial Independence Retire Early）是一种财务独立策略。当您达到某个储蓄金额后，即使不再继续储蓄，仅依靠投资复利增长也能在退休时达到财务独立。

## 技术栈

- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite 5
- **样式框架**：Tailwind CSS
- **图表库**：Recharts
- **图标库**：Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

## 使用指南

### 1. 输入个人信息
- 设置当前年龄和计划退休年龄

### 2. 填写财务信息
- 输入当前储蓄金额
- 填写年收入和年支出

### 3. 调整投资参数
- 设置预期年化收益率（建议3%-15%）
- 调整退休提取率（经典4%规则）

### 4. 查看结果
- 分析Coast FIRE目标金额
- 查看储蓄进度和达成时间
- 通过图表了解储蓄增长轨迹

## 计算原理

### 退休所需总金额
```
退休金额 = 年支出 ÷ 提取率
```

### Coast FIRE 目标金额
```
Coast金额 = 退休金额 ÷ (1 + 收益率)^剩余年数
```

### 复利增长公式
```
未来价值 = 现值 × (1 + 收益率)^年数
```

## 重要提醒

⚠️ **免责声明**：此计算器仅供参考，不构成投资建议。实际投资回报可能因市场波动而有所不同。投资有风险，请根据个人情况谨慎决策，建议咨询专业财务顾问制定个人投资策略。

## 项目结构

```
coast-fire-calculator/
├── src/
│   ├── components/          # React组件
│   │   ├── Header.tsx      # 头部导航
│   │   ├── InputForm.tsx   # 输入表单
│   │   ├── ResultDisplay.tsx # 结果展示
│   │   ├── ChartDisplay.tsx  # 图表展示
│   │   ├── HelpModal.tsx     # 帮助模态框
│   │   └── WelcomeGuide.tsx  # 欢迎引导
│   ├── utils/
│   │   └── calculations.ts  # 计算逻辑
│   ├── App.tsx             # 主应用组件
│   ├── main.tsx           # 应用入口
│   └── index.css          # 全局样式
├── public/                # 静态资源
├── package.json          # 项目配置
└── README.md            # 项目说明
```

## 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

## 许可证

MIT License