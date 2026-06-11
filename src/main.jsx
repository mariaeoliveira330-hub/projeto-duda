import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from './Context/AuthProvider'
import { AppRoutes } from './routes/AppRoutes.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>
)