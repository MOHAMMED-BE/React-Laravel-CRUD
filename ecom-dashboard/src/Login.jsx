import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const item = { email, password };

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, [navigate]);

  const axiosLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://crud-reactlaravel.herokuapp.com/api/login', item);

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem('user-info', JSON.stringify(data));
        navigate('/');
        addToast('Login Successfully', { appearance: 'success' });
      } else {
        addToast('Email or password is incorrect', { appearance: 'warning' });
      }
    } catch (error) {
      addToast('An error occurred while logging in. Please try again later.', { appearance: 'error' });
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes('@')) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 1) {
      setPasswordError('Password must be at least 6 characters long');
    } else {
      setPasswordError('');
    }
  };

  return (
    <>
      <div className="container d-flex justify-content-center pt-5">
        <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Login</h5>
            <form onSubmit={axiosLogin} method="POST">
              <div className="form-group">
                <input
                  className={`form-control mb-2 ${emailError ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={handleEmailChange}
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
              </div>
              <div className="form-group">
                <input
                  className={`form-control mb-2 ${passwordError ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={handlePasswordChange}
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                {passwordError && <div className="invalid-feedback">{passwordError}</div>}
              </div>
              <p>
                Don't have an account?{' '}
                <Link to="/register" className="nav-link d-inline text-primary">
                  Register Now
                </Link>
              </p>
              <button className="btn btn-dark py-2 px-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
