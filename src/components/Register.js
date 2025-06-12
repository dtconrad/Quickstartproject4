import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, password });
      navigate('/'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="register-container">
      <h1>SEC Football Forum - Register</h1>
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
        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </div>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Register;