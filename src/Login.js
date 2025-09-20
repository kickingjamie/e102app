import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import PasswordInput from './PasswordInput'

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Store JWT token
        localStorage.setItem('token', data.token);

        // Navigate to protected splash page
        navigate('/splash');
      } else {
        setError(data.error || 'Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Server error');
    }
  };

  const handleRegisterClick = async (e) => {
    e.preventDefault();
    navigate('/RegisterUser');
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-white rounded shadow p-4 d-flex flex-column align-items-center text-center">
        <h2 className="mb-3">Login</h2>
        <form onSubmit={handleLogin}>
          <input className="mb-3 rounded form-control form-control-lg"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <PasswordInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary m-1" type="submit">Log In</button>
            <button className="btn btn-secondary m-1" type="button" onClick={handleRegisterClick}>Register</button>
          </div>
          <ErrorMessage message={error} />
        </form>
      </div>
    </div>
  );
}

export default Login;
