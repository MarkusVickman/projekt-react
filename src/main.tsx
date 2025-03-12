import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import router from './Routing.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { BookProvider } from './context/BookContext.tsx';
import { ReviewProvider } from './context/ReviewContext.tsx';

//AuthProvider ger tillgång till Authtentiserings contexten
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider><BookProvider><ReviewProvider><RouterProvider router={router} /></ReviewProvider></BookProvider></AuthProvider>
  </StrictMode>,
)
