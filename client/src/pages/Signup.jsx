import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const { signup, error, isLoading } = useAuthStore();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(formData);
        if (!error) navigate('/');
    };

    return (
        <div className="max-w-md mx-auto py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card"
            >
                <h2 className="text-3xl font-bold text-center mb-8">Join the Community</h2>

                {error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-medium border border-red-100 italic">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Full Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:border-primary focus:outline-none transition-colors"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

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

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Join As</label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'user' })}
                                className={`py-3 rounded-2xl border font-medium transition-all ${formData.role === 'user' ? 'bg-primary/10 border-primary text-primary' : 'border-slate-200 text-slate-500'
                                    }`}
                            >
                                Customer
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'business_owner' })}
                                className={`py-3 rounded-2xl border font-medium transition-all ${formData.role === 'business_owner' ? 'bg-primary/10 border-primary text-primary' : 'border-slate-200 text-slate-500'
                                    }`}
                            >
                                Business Owner
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="btn-primary w-full py-3 text-lg mt-4 disabled:opacity-50"
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <p className="text-center text-slate-500 mt-8 text-sm font-medium">
                    Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Signup;
