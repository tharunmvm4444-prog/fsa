import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Navbar from './components/Navbar';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import BusinessChannel from './pages/BusinessChannel';

function App() {
    const { fetchMe, token } = useAuthStore();

    useEffect(() => {
        if (token) fetchMe();
    }, [token, fetchMe]);

    return (
        <Router>
            <div className="min-h-screen transition-colors duration-300">
                <Navbar />
                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Explore />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/business/:id" element={<BusinessChannel />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;
