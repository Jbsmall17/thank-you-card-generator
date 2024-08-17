import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MycontextProvider } from './contextApi.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MycontextProvider>
      <App />
    </MycontextProvider>
  </StrictMode>,
)
