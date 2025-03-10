import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { BookProvider } from './context/BookContext';

/*
-Routing som dirigerar till alla undersidor.
-ProtectedRoute används för att kontrollera användare och bara släppa in inloggade användare på sidan.
*/
const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <BookProvider><HomePage /></BookProvider>
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage />
            },
            {
                path: "/about",
                element: <AboutPage />
            }
        ]
    }
])

export default router;