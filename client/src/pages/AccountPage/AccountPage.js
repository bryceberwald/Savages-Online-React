import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import './AccountPage.css';

function AccountPage() {
  const [showRegistrationForm, setShowRegistrationForm] = useState(false); // Start with Login form displayed

  const toggleForm = () => {
    setShowRegistrationForm(!showRegistrationForm);
  };

  return (
    <div className="AccountPageContainer">
      <div className="FormContainer">
        {showRegistrationForm ? <RegistrationForm /> : <LoginForm />}
      </div>
      <button className="ToggleFormButton" onClick={toggleForm}>
        {showRegistrationForm ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
};

export default AccountPage;