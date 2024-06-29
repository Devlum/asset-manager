import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ThemeConfig } from './config/theme.config'
import CombinedProvider from './context/CombinedProvider.context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeConfig>
        <CombinedProvider>
          <App/>
        </CombinedProvider>
    </ThemeConfig>
  </React.StrictMode>,
)
