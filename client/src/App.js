import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Landing from './components/layouts/Landing';
import Auth from './components/views/Auth';
import AuthContextProvider from './contexts/AuthContext';
import Dashboard from './components/views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './components/views/About';
import PostContextProvider from './contexts/PostContext';

function App() {
    return (
        <AuthContextProvider>
            <PostContextProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/login" element={<Auth authRoute="login" />} />
                        <Route path="/register" element={<Auth authRoute="register" />} />
                        <Route path="/dashboard" element={<ProtectedRoute component={<Dashboard />} />} />
                        <Route path="/about" element={<ProtectedRoute component={<About />} />} />
                    </Routes>
                </Router>
            </PostContextProvider>
        </AuthContextProvider>
    );
}

export default App;
