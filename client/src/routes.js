import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import AccountPage from './pages/AccountPage/AccountPage.js';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/auth" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;