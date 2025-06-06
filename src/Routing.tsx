import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import YourReviewPage from './pages/YourReviewPage';
import { ReviewProvider } from './context/ReviewContext';
import SingleBookPage from './pages/SingleBookPage';

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
                element: <HomePage />
            },
            {
                path: "/YourReviewPage/:bookId",
                element: (<ProtectedRoute> <ReviewProvider><YourReviewPage /></ReviewProvider> </ProtectedRoute>)
            },
            {
                path: "/YourReviewPage/",
                element: (<ProtectedRoute> <ReviewProvider><YourReviewPage /></ReviewProvider> </ProtectedRoute>)
            },
            {
                path: "/SingleBookPage/:bookId",
                element: (<SingleBookPage />)
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