import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUP = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    const handleGoogleSuccess = (response) => {
        console.log('Google Sign-Up Success:', response);
        navigate('/dashboard');
    };

    const handleGoogleFailure = (error) => {
        console.error('Google Sign-Up Failed:', error);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const respnse = await axios.post('https://xenobackend-production.up.railway.app/api/auth/signup', { email, password });
            setMessage('Signup successful!');
            navigate('/login');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Signup failed');
        }
    };

     return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-r from-teal-400 to-blue-500">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
                <div className="mb-6">
                    <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleFailure}
                        className="w-full block rounded-lg overflow-hidden border border-gray-300 bg-white shadow-md hover:shadow-lg transition-all"
                    />
                </div>
                <div className="text-center text-gray-500 mb-6">or sign up with email</div>
                <form onSubmit={handleFormSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                    >
                        Sign Up
                    </button>
                </form>
                {message && <p className="mt-4 text-center text-sm text-red-500">{message}</p>}
                <p className="mt-4 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <span
                        className="text-blue-500 font-medium hover:underline cursor-pointer"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default SignUP;
