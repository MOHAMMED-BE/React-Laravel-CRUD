import React from 'react'
import './assets/css/style.css'

const NewLogin = () => {
  return (
    <div className="container__contact-page">
      <div className="contact-form__container">
        <div className="contact-form--box">
          <div className="contact-form__login login active">
            <h2 className="heading-2 mb-md">Welcome Back</h2>
            <form action="#" className="form mt-sm">
              <label htmlFor="login-email">
                <input
                  type="email"
                  id="login-email"
                  className="form__email"
                  placeholder="Enter your email address"
                  required
                /></label>
              <label htmlFor="login-password">
                <input
                  type="password"
                  id="login-password"
                  className="form__password"
                  placeholder="Enter your Password"
                  required
                />
              </label>
              <a href="#0" className="form__link">Forgot your Password?</a>
              <button className="btn form__btn">Log in</button>
            </form>
          </div>
          <div className="contact-form__signup signup signup-before">
            <h2 className="heading-2 mb-md">Join us</h2>
            <form action="#" className="form mt-sm">
              <label htmlFor="name">
                <input
                  type="text"
                  id="name"
                  className="form__name"
                  placeholder="Enter your name"
                  required
                /></label>
              <label htmlFor="signup-email">
                <input
                  type="email"
                  id="signup-email"
                  className="form__email"
                  placeholder="Enter your email"
                  required
                />
              </label>
              <label htmlFor="signup-password">
                <input
                  type="password"
                  id="signup-password"
                  className="form__password"
                  placeholder="Choose your Password"
                  required
                />
              </label>
            </form>
          </div>
          <div className="overlay">
            <div className="overlay__container">
              <div className="overlay__left left-panel">
                <h2 className="heading-2 mb-sm white-text">Welcome Back</h2>
                <p className="paragraph mb-md white-text">
                  To keep connected with us please login with your personal info
                </p>
                <button className="btn overlay__btn login-toggler">log in</button>
              </div>
              <div className="overlay__right active right-panel">
                <h2 className="heading-2 mb-sm">
                  <span className="heading-2--main">Hello,</span>
                  <span className="heading-2--sub">Developers!</span>
                </h2>
                <p className="paragraph mb-md white-text">
                  Join millions of people sharing their experience
                </p>
                <button className="btn overlay__btn signup-toggler">sign up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewLogin
