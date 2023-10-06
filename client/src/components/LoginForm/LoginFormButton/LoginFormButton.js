import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../auth/AuthProvider.js'; // Import the useAuth hook

function LoginFormButton({ username, password }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = (e) => {
    e.preventDefault()
    // Check if both username and password are filled before navigating
    if (username && password) {
      login(); // Call the login function to set isLoggedIn to true
      navigate('/play');
      console.log('Submitted:', { username, password });
    } else {
      alert('Please fill in both fields before proceeding.');
    }
  };

  return (
    <button id="loginSubmitButton" type="submit" onClick={handleClick}>
      Login
    </button>
  );
}

export default LoginFormButton;