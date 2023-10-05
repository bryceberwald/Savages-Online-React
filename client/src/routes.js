import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.js';
import GamePage from './pages/GamePage/GamePage.js'

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/auth" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;