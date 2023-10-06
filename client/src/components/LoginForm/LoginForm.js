// import React, { Component } from 'react';
// import './LoginForm.css';

// class LoginForm extends Component {
  
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();

//     const { username, password } = this.state;

//     // You can add your login logic here, like sending a request to a server.

//     console.log('Submitted:', { username, password });
//   };

//   render() {
//     return (
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               className="login-input"
//               name="username"
//               value={this.state.username}
//               onChange={this.handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               className="login-input"
//               name="password"
//               value={this.state.password}
//               onChange={this.handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <button id="loginSubmitButton" type="submit">Login</button>
//           </div>
//         </form>
//       </div>
//     );
//   };
// };

// export default LoginForm;

/////////

// import React, { Component } from 'react';
// import LoginFormButton from './LoginFormButton/LoginFormButton.js';
// import './LoginForm.css';

// class LoginForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password: '',
//     };
//   };

//   handleInputChange = (event) => {
//     const { name, value } = event.target;
//     this.setState({ [name]: value });
//   };

//   render() {
//     const { username, password } = this.state;

//     return (
//       <div className="login-container">
//         <h2>Login</h2>
//         <form onSubmit={this.handleSubmit}>
//           <div className="form-group">
//             <label htmlFor="username">Username:</label>
//             <input
//               type="text"
//               id="username"
//               className="login-input"
//               name="username"
//               value={username}
//               onChange={this.handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="password">Password:</label>
//             <input
//               type="password"
//               id="password"
//               className="login-input"
//               name="password"
//               value={password}
//               onChange={this.handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             {/* Render the LoginFormButton component */}
//             <LoginFormButton username={username} password={password} />
//           </div>
//         </form>
//       </div>
//     );
//   };
// };

// export default LoginForm;

import React, { Component } from 'react';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthProvider'; // Import the useAuth hook

function LoginFormButton({ username, password }) {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleClick = () => {
    // Check if both username and password are filled before navigating
    if (username && password) {
      login(); // Call the login function to set isLoggedIn to true
      navigate('/play');
      console.log('Submitted:', { username, password });
    } 
  };

  return (
    <button id="loginSubmitButton" type="submit" onClick={handleClick}>
      Login
    </button>
  );
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

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
            {/* Render the LoginFormButton component */}
            <LoginFormButton username={username} password={password} />
          </div>
        </form>
      </div>
    );
  }
}

export default LoginForm;