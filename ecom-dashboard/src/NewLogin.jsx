import React, { useRef } from 'react';
import './assets/css/style.css';

const NewLogin = () => {
  const signUpBtn = useRef(null);
  const logInBtn = useRef(null);
  const leftPanel = useRef(null);
  const rightPanel = useRef(null);
  const loginPanel = useRef(null);
  const signupPanel = useRef(null);

  const signUpActive = function () {
    rightPanel.current.classList.remove("active");
    leftPanel.current.classList.add("active");
    loginPanel.current.classList.add("login-before");
    loginPanel.current.classList.remove("login-after", "active");
    signupPanel.current.classList.add("signup-after", "active");
    signupPanel.current.classList.remove("signup-before");
  };

  const logInActive = function () {
    rightPanel.current.classList.add("active");
    leftPanel.current.classList.remove("active");
    loginPanel.current.classList.add("login-after", "active");
    loginPanel.current.classList.remove("login-before");
    signupPanel.current.classList.add("signup-before");
    signupPanel.current.classList.remove("signup-after", "active");
  };

  return (
    <div className="container-contact-page">
      <div className="contact-form-container">
        <div className="contact-form-box">
          <div className="contact-form-login login active" ref={loginPanel}>
            <form action="#" className="form mt-sm">
              <input
                type="email"
                id="login-email"
                className="form-email"
                placeholder="Enter your email address"
                />
              <input
                type="password"
                id="login-password"
                className="form-password"
                placeholder="Enter your Password"
                />
              <button className="btn form-btn">Log in</button>
            </form>
          </div>
          <div className="contact-form-signup signup signup-before" ref={signupPanel}>
            <h2 className="heading-2 mb-md">Join us</h2>
            <form action="#" className="form mt-sm">
              <input
                type="text"
                id="name"
                className="form-name"
                placeholder="Enter your name"
                />
              <input
                type="email"
                id="signup-email"
                className="form-email"
                placeholder="Enter your email"
                />
              <input
                type="password"
                id="signup-password"
                className="form-password"
                placeholder="Choose your Password"
              />
            </form>
          </div>
          <div className="overlay">
            <div className="overlay-container">
              <div className="overlay-left left-panel" ref={leftPanel}>
                <button className="btn overlay-btn login-toggler btn-outline-dark" onClick={logInActive} ref={logInBtn}>log in</button>
              </div>
              <div className="overlay-right active right-panel" ref={rightPanel}>
                <h2 className="heading-2 mb-sm">
                  <span className="heading-2-sub">Developers!</span>
                </h2>
                <button className="btn overlay-btn signup-toggler btn-outline-dark" onClick={signUpActive} ref={signUpBtn}>signup</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewLogin
