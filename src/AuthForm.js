import React, { useState } from "react";
import "./LoginForm.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Basic client-side validation
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

      console.log("Sign Up data:", formData);
      alert("Sign-up functionality not implemented yet.");
    } else {
      try {
        const response = await fetch("http://127.0.0.1:5001/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          window.location.href = "/dashboard"; // Redirect after login
        } else {
          alert(data.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Error logging in. Check console for details.");
      }
    }
  };

  return (
    <div className={`container ${isSignUp ? "sign-up" : "sign-in"}`} id="authContainer">
      <div className="row">
        {/* Left Side: Welcome / Join Us */}
        <div className="col align-items-center flex-col text-container">
          <div className={`text ${isSignUp ? "sign-up active" : "sign-in active"}`}>
            <h2>{isSignUp ? "Join us here" : "Welcome back!"}</h2>
            <p>{isSignUp ? "Create an account to get started!" : "Sign in to continue."}</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col align-items-center flex-col form-container">
          <div className="form-wrapper align-items-center">
            <form className={`form ${isSignUp ? "sign-up" : "sign-in"}`} onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="input-group">
                  <i className="bx bxs-user"></i>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              )}
              <div className="input-group">
                <i className="bx bx-mail-send"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="input-group">
                <i className="bx bxs-lock-alt"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              {isSignUp && (
                <div className="input-group">
                  <i className="bx bxs-lock-alt"></i>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              )}
              <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
              <p>
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
                <b className="pointer" onClick={toggleAuthMode}>
                  {isSignUp ? " Sign in here" : " Sign up here"}
                </b>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;