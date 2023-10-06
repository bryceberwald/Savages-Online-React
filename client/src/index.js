import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes.js';
import { AuthProvider } from './auth/AuthProvider.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);