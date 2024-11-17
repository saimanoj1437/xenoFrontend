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

     http://localhost:3000/
};

export default SignUP;
