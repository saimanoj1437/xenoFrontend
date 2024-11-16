// src/components/Auth.js or src/pages/Auth.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // Import for routing
import SignUP from './SignUP';  // SignUp Form
import LoginForm from './LoginForm'; // Login Form

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);  // Toggle between login/signup

    return (
        <div>
            <h1>Authentication</h1>

            <Routes>
                <Route
                    path="/"
                    element={
                        <div>
                            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
                            {isLogin ? <LoginForm /> : <SignUP />}
                            <button onClick={() => setIsLogin(!isLogin)}>
                                {isLogin ? 'Go to Sign Up' : 'Go to Login'}
                            </button>
                        </div>
                    }
                />
                <Route path="/signup" element={<SignUP />} />
            </Routes>
        </div>
    );
};

export default Auth;
