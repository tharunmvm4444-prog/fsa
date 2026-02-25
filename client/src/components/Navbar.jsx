import React from 'react';
import { Link } from 'react-router-dom';
import { Search, User, Menu, Moon, Sun } from 'lucide-react';
import useAuthStore from '../store/authStore';

const Navbar = () => {
    const { user, logout } = useAuthStore();
    const [isDark, setIsDark] = React.useState(false);

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.documentElement.classList.toggle('dark');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 dark:bg-surface-dark/80 dark:border-slate-800">
            <div className="container mx-auto px-4 h-18 flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">W</div>
                    <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">WeaveConnect</span>
                </Link>

                <div className="flex items-center gap-4">
                    <button onClick={toggleTheme} className="p-2 hover:bg-slate-50 rounded-full transition-colors dark:hover:bg-slate-800">
                        {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>

                    {user ? (
                        <div className="flex items-center gap-4">
                            <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                                    {user.name[0]}
                                </div>
                                <span className="text-sm font-medium hidden md:block">{user.name}</span>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Login</Link>
                            <Link to="/signup" className="btn-primary py-2 px-5 text-sm">Join</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
