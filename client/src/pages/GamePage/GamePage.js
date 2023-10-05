import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './GamePage.css';

function GamePage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false); // Start with Login form displayed

  const toggleForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  return (
    <div className="GamePageContainer">
      <div className="FormContainer">
        {showRegistrationForm ? <RegistrationForm /> : <LoginForm />}
      </div>
      <button className="ToggleFormButton" onClick={toggleForm}>
        {showRegistrationForm ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
}

export default GamePage;