import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider.js';
import Game from '../components/Game/Game.js';

function ProtectedRoute(){
  const { isLoggedIn } = useAuth();
    return(
      <div>
      {!isLoggedIn ? (<Navigate to="/auth" /> ) : (
        <>
           <Game></Game>
        </>
      )}
    </div>
    );
};

export default ProtectedRoute;