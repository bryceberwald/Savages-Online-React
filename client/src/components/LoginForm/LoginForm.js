import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider';
import './LoginForm.css';

function LoginFormButton({ username, password }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = async (event) => {
    event.preventDefault();
  
    // Check if both username and password are filled before navigating
    if (username && password) {
      try {
        const response = await fetch('http://localhost:3001/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.status === 200) {
          const data = await response.json();
          const user = data.user;
          
          //console.log('Login successful:', user);
          
          login();
          
          // Save user information to localStorage when the user logs in
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('startGame', true);

          navigate('/play');
        } else {
          const data = await response.json();
          console.error('Login failed:', data.message);
        };
      } catch (error) {
        console.error('Error:', error);
      };
    };
  };
  return (
    <button id="loginSubmitButton" type="submit" onClick={handleClick}>
      Login
    </button>
  );
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-container">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="login-input"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="login-input"
              name="password"
              value={password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <LoginFormButton username={username} password={password} />
          </div>
        </form>
      </div>
    );
  };
};

export default LoginForm;