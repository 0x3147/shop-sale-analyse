import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 渲染主应用
createRoot(document.getElementById('root')!).render(<App />)

// 只在开发模式下初始化 stagewise 工具栏
if (process.env.NODE_ENV === 'development') {
  import('@stagewise/toolbar-react')
    .then(({ StagewiseToolbar }) => {
      // 创建工具栏配置
      const stagewiseConfig = {
        plugins: []
      }

      // 创建工具栏容器元素
      const toolbarContainer = document.createElement('div')
      toolbarContainer.id = 'stagewise-toolbar'
      document.body.appendChild(toolbarContainer)

      // 为工具栏创建单独的 React root
      const toolbarRoot = createRoot(toolbarContainer)
      toolbarRoot.render(<StagewiseToolbar config={stagewiseConfig} />)
    })
    .catch((error) => {
      console.warn('Failed to load stagewise toolbar:', error)
    })
}
