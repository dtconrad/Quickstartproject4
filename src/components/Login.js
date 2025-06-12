import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Log the request payload for debugging
      console.log('Sending login request:', { username, password });

      const response = await axios.post('http://localhost:5000/api/auth/login', { username, password });

      // Log the response from the server for debugging
      console.log('Login response:', response.data);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Save the JWT token
        navigate('/dashboard'); // Redirect to the dashboard
      }
    } catch (err) {
      console.error('Error during login:', err.response ? err.response.data : err.message);
      setError('Invalid username or password');
    }
  };

  const handleRedirectToRegister = () => {
    navigate('/register'); // Redirect to the registration page
  };

  return (
    <div className="login-container">
      <h1>SEC Football Forum - Login</h1>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleLogin} className="login-button">
          Log In
        </button>
      </div>
      <div>
        <button onClick={handleRedirectToRegister} className="register-button">
          Register
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;