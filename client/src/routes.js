import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './auth/ProtectedRoute'; // Correct the import path

import Game from './components/Game/Game';
import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AccountPage />} /> {/* Use * to match all subroutes */}
        <Route path="/play" element={<ProtectedRoute element={<Game />} />} /> {/* Use ProtectedRoute */}
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;