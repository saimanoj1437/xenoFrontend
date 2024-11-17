import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; 
import SignUP from './SignUP';  
import LoginForm from './LoginForm'; 

const Auth = () => {
    const [isLogin, setIsLogin] = useState(false);  

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
