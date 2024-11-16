// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <GoogleOAuthProvider clientId="512414783784-34hoe7s2p0nnt3p9kkpcls7iqjrc534v.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);


