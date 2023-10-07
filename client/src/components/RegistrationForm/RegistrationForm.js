import React, { Component } from 'react';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();

  //   const { username, email, password, confirmPassword } = this.state;

  //   // You can add your registration logic here, like sending a request to a server.

  //   console.log('Submitted:', { username, email, password, confirmPassword });
  // };
  handleSubmit = async (event) => {
    event.preventDefault();
  
    const { username, email, password, confirmPassword } = this.state;
  
    // Check if passwords match (add more validation as needed)
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
  
    // Create a user object to send to the server
    const user = { username, email, password };
  
    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
  
      if (response.status === 201) {
        console.log('User registered successfully');
        // Optionally, you can redirect to a login page or perform other actions here
      } else if (response.status === 400) {
        // Registration failed due to duplicate user
        const responseData = await response.json();
        console.log(responseData.message); // Display the error message to the user
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  

  render() {
    return (
      <div className="registration-container">
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="register-input"
              name="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="register-input"
              name="email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="register-input"
              name="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              className="register-input"
              name="confirmPassword"
              value={this.state.confirmPassword}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button id="registerSubmitButton" type="submit">Register</button>
          </div>
        </form>
      </div>
    );
  };
};

export default RegistrationForm;