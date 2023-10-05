import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes.js';
// import App from './components/App/App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter />
    {/* <App /> */}
  </React.StrictMode>
);