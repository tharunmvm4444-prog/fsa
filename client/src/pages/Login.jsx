import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);
        if (!error) navigate('/');
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <h2 className="text-3xl font-bold text-center mb-8">Welcome Back</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:outline-none transition-colors"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:outline-none transition-colors"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3 text-lg mt-2 disabled:opacity-50"
                    >
                        {isLoading ? 'Logging in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-8 text-sm font-medium">
                    New to WeaveConnect? <Link to="/signup" className="text-primary hover:underline">Create an account</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
