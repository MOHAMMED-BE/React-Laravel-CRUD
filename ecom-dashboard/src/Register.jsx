import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import * as yup from "yup";
import { useFormik } from "formik";

const Register = (props) => {

  const navigate = useNavigate();
  const { addToast } = useToasts();

  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      navigate('/');
    }
  }, [navigate]);


  const validationSchema = yup.object({
    name: yup.string().required("Please enter your Full Name"),
    email: yup.string().email('Invalid email').required('Please enter an email'),
    password: yup.string().min(3, 'Must be at least 3 characters').max(20, 'Must be at most 20 characters').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const name = values.name;
      const email = values.email;
      const password = values.password;
      const item = { name, email, password };
      try {
        // const item = { name, email, password }
        const response = await axios.post(`${props.baseUrl}/api/register`, item);

        const data = response.data;
        localStorage.setItem('user-info', JSON.stringify(data));
        navigate("/");
        addToast('Account Created Successfully', { appearance: 'success' });

      } catch (error) {
        addToast('An error occurred while Register. Please try again later.', { appearance: 'error' });

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



  // const signUp = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const item = { name, email, password }
  //     const response = await axios.post(`${props.baseUrl}/api/register`, item);

  //     const data = response.data;
  //     localStorage.setItem('user-info', JSON.stringify(data));
  //     navigate("/");
  //     addToast('Account Created Successfully', { appearance: 'success' });

  //   } catch (error) {
  //     addToast('An error occurred while Register. Please try again later.', { appearance: 'error' });

  //   }
  // }

  return (
    <>
      <div className='container d-flex justify-content-center pt-5'>
        <div className="card" style={{ width: '25rem' }}>
          <div className="card-body">
            <h5 className="card-title text-center">Create Account</h5>
            <form onSubmit={handleSubmit} method="post">
              <input
                type="text"
                id="name"
                required
                name="name"
                placeholder="Full Name"
                className={
                  touched.name && errors.name
                    ? "form-control is-invalid"
                    : "form-control mb-2"
                }
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {touched.name && errors.name ? (
                <div className="invalid-feedback">{errors.name}</div>
              ) : null}


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

              <p>Already have an account? <Link to='/login' className='nav-link d-inline text-primary'>Sign In</Link></p>

              <button className="btn btn-dark py-2 px-4">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>

  )
}

export default Register
