import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute';

import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AccountPage />} />
        <Route path="/play" element={<ProtectedRoute />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;