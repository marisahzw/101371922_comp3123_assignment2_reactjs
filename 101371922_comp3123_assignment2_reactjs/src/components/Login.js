import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('user', JSON.stringify(userData));
        setIsLoggedIn(true);
        navigate('/employees'); 
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <div>
        <label htmlFor="username" style={styles.label}>Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <label htmlFor="password" style={styles.label}>Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button style={styles.button} onClick={handleLogin}>Login</button>
      {error && <p style={styles.error}>{error}</p>}
      <p>
        Don't have an account?{' '}
        <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    width: '50%',
    margin: 'auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#f8f8f8',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '4px',
    fontSize: '16px',
  },
  button: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: '#e74c3c',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default Login;
