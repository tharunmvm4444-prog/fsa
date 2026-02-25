import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null,

    signup: async (userData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('http://localhost:5001/api/auth/signup', userData);
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            set({ user, token, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.error || 'Signup failed', isLoading: false });
        }
    },

    login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post('http://localhost:5001/api/auth/login', credentials);
            const { user, token } = response.data;
            localStorage.setItem('token', token);
            set({ user, token, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.error || 'Login failed', isLoading: false });
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    fetchMe: async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        set({ isLoading: true });
        try {
            const response = await axios.get('http://localhost:5001/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            set({ user: response.data, isLoading: false });
        } catch (error) {
            localStorage.removeItem('token');
            set({ user: null, token: null, isLoading: false });
        }
    }
}));

export default useAuthStore;
