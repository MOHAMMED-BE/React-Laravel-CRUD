import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

const Register = () => {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, [navigate]);

  const nameValidate = (e) => {
    setName(e.target.value);
    let isValid = true;
    if (name.trim() === '') {
      setNameError('Please enter your name');
      isValid = false;
    } else {
      setNameError('');
    }
    return isValid;
  };

  const emailValidate = (e) => {
    setEmail(e.target.value);
    let isValid = true;
    if (email.trim() === '') {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;

  };

  const passwordValidate = (e) => {
    setPassword(e.target.value);
    let isValid = true;
    if (password.trim() === '' || password.length < 3) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }
    return isValid;
  };

  const signUp = async (e) => {
    e.preventDefault();

    try {
      const item = { name, email, password }
      const response = await axios.post("https://crud-reactlaravel.herokuapp.com/api/register", item);

      const data = response.data;
      localStorage.setItem('user-info', JSON.stringify(data));
      navigate("/");
      addToast('Account Created Successfully', { appearance: 'success' });

    } catch (error) {
      addToast('An error occurred while Register. Please try again later.', { appearance: 'error' });

    }
  }

  return (
    <>
      <div className='container d-flex justify-content-center pt-5'>
        <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Create Account</h5>
            <form onSubmit={signUp} method="post">
              {/* <form onSubmit={signUp} method="post" className='needs-validation was-validated'> */}
              <input
                className={`form-control mb-2 ${name ? nameError ? 'is-invalid' : 'is-valid' : ''}`}
                value={name}
                onChange={nameValidate}
                type='text'
                name='name'
                placeholder='Name'
                required
              />
              {
                name
                  ?
                  nameError
                    ?
                    <div className="invalid-feedback">{nameError}</div>
                    :
                    <div className="valid-feedback">Good!</div>
                  :
                  ''
              }

              <input
                className={`form-control mb-2 ${email ? emailError ? 'is-invalid' : 'is-valid' : ''}`}
                value={email}
                onChange={emailValidate}
                type='email'
                name='email'
                placeholder='Email'
                required
              />
              {
                email
                  ?
                  emailError
                    ?
                    <div className="invalid-feedback">{emailError}</div>
                    :
                    <div className="valid-feedback">Good!</div>
                  :
                  ''
              }
              <input
                className={`form-control mb-2 ${password ? passwordError ? 'is-invalid' : 'is-valid' : ''}`}
                value={password}
                onChange={passwordValidate}
                type='password'
                name='password'
                placeholder='Password'
                required
              />
              {
                password
                  ?
                  passwordError
                    ?
                    <div className="invalid-feedback">{passwordError}</div>
                    :
                    <div className="valid-feedback">Good!</div>
                  :
                  ''
              }
              <p>Already have an account? <Link to='/login' className='nav-link d-inline text-primary'>Sign In</Link></p>

              <button onClick={passwordValidate} className="btn btn-dark py-2 px-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register
