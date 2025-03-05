import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { animateTitle } from './titleAnimation';
import { Analytics } from "@vercel/analytics/react"

// Start the title animation
animateTitle();

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <App />
    <Analytics/>
  </StrictMode>,
)
