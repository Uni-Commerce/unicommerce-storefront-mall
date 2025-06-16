import { createRoot } from 'react-dom/client'
import './globals.css'

import App from './App'

const renderApp = () => {
  const rootElement: HTMLElement = document.getElementById('root') as HTMLElement
  if (rootElement) createRoot(rootElement).render(<App />)
}

renderApp()
