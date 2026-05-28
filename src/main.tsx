import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// 渲染主应用
createRoot(document.getElementById('root')!).render(<App />)
