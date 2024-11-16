import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard'); // Redirect if already logged in
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://xenobackend-production.up.railway.app/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-800 flex items-center justify-center">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        Login
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <span
                        className="text-indigo-600 font-medium hover:underline cursor-pointer"
                        onClick={() => navigate('/signup')}
                    >
                        Sign up
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
