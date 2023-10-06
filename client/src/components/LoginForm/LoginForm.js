import React, { Component } from 'react';
import './LoginForm.css';

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

  handleSubmit = (event) => {
    event.preventDefault();

    const { username, password } = this.state;

    // You can add your login logic here, like sending a request to a server.

    console.log('Submitted:', { username, password });
  };

  render() {
    return (
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="login-input"
              name="username"
              value={this.state.username}
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
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <button id="loginSubmitButton" type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  };
};

export default LoginForm;