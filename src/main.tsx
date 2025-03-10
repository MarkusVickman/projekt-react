import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Routing.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

//AuthProvider ger tillgång till Authtentiserings contexten
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider><RouterProvider router={router} /></AuthProvider>
  </StrictMode>,
)
