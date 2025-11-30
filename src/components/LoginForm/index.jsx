import React, { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import "./index.css";

class LoginForm extends Component {
  state = {
    username: "",
    password: "",
    showSubmitError: false,
    errorMsg: "",
    isSubmitting: false,
  };

  onChangeUsername = (event) => {
    this.setState({ username: event.target.value });
  };

  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;

    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
      path: "/",
    });

    this.setState({ isSubmitting: false, showSubmitError: false, errorMsg: "" });
    history.replace("/");
  };

  onSubmitFailure = (errorMsg) => {
    this.setState({
      showSubmitError: true,
      errorMsg,
      isSubmitting: false,
    });
  };

  submitForm = async (event) => {
    event.preventDefault();

    this.setState({ isSubmitting: true, showSubmitError: false, errorMsg: "" });

    const { username, password } = this.state;
    const userDetails = { username, password };

    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok === true) {
        this.onSubmitSuccess(data.jwt_token);
      } else {
        this.onSubmitFailure(data.error_msg);
      }
    } catch (e) {
      this.onSubmitFailure("Something went wrong. Please try again.");
    }
  };

  renderPasswordField = () => {
    const { password } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
          autoComplete="current-password"
        />
      </>
    );
  };

  renderUsernameField = () => {
    const { username } = this.state;

    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
          autoComplete="username"
          autoFocus
        />
      </>
    );
  };

  render() {
    const { showSubmitError, errorMsg, isSubmitting } = this.state;

    const jwtToken = Cookies.get("jwt_token");
    if (jwtToken !== undefined) {
      return <Redirect to="/" />;
    }

    const formClasses = `form-container ${
      showSubmitError ? "form-shake" : ""
    }`;

    return (
      <div className="login-form-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-mobile-image"
          alt="website logo"
        />

        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          className="login-image"
          alt="website login"
        />

        <form className={formClasses} onSubmit={this.submitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            className="login-website-logo-desktop-image"
            alt="website logo"
          />

          <div className="input-container">{this.renderUsernameField()}</div>
          <div className="input-container">{this.renderPasswordField()}</div>

          <button
            type="submit"
            className="login-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {showSubmitError && (
            <p className="error-message">*{errorMsg}</p>
          )}
        </form>
      </div>
    );
  }
}

export default LoginForm;
