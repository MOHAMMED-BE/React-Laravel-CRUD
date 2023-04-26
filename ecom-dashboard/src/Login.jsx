import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { Link } from 'react-router-dom';
import * as yup from "yup";
import { useFormik } from "formik";

const Login = (props) => {
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, [navigate]);


  const validationSchema = yup.object({
    email: yup.string().email('Invalid email').required('Please enter an email'),
    password: yup.string().min(3, 'Must be at least 3 characters').max(20, 'Must be at most 20 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const email = values.email;
      const password = values.password;
      const item = { email, password };
      try {
        const response = await axios.post(`${props.baseUrl}/api/login`, item);

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
    },
  });

  const {
    touched,
    errors,
    values,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  // const axiosLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(`${props.baseUrl}/api/login`, item);

  //     if (response.status === 200) {
  //       const data = response.data;
  //       localStorage.setItem('user-info', JSON.stringify(data));
  //       navigate('/');
  //       addToast('Login Successfully', { appearance: 'success' });
  //     } else {
  //       addToast('Email or password is incorrect', { appearance: 'warning' });
  //     }
  //   } catch (error) {
  //     addToast('An error occurred while logging in. Please try again later.', { appearance: 'error' });
  //   }
  // };


  return (
    <>
      <div className="container d-flex justify-content-center pt-5">
        <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Login</h5>
            <form onSubmit={handleSubmit} method="POST">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  className={
                    touched.email && errors.email
                      ? "form-control is-invalid"
                      : "form-control mb-2"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                {touched.email && errors.email ? (
                  <div className="invalid-feedback">{errors.email}</div>
                ) : null}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  className={
                    touched.password && errors.password
                      ? "form-control is-invalid"
                      : "form-control mb-2"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {touched.password && errors.password ? (
                  <div className="invalid-feedback">{errors.password}</div>
                ) : null}
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
