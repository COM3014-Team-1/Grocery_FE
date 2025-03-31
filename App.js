import React, { useState } from "react";
import "./LoginForm.css"; // Assuming your CSS is correct

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);  // Fix state variable name
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  // Toggle between Sign Up and Sign In
  const switchAuthMode = () => {
    setIsSignUp(!isSignUp); // Fix state toggle
  };

  // Handle input field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isSignUp ? "Signing Up" : "Signing In", formData);
  };

  // Check password strength (for example)
  const checkPasswordStrength = (password) => {
    if (password.length > 8 && /\d/.test(password)) return "Strong";
    return "Weak";
  };

  return (
    <div className={`container ${isSignUp ? "sign-up" : "sign-in"}`}>
      <div className="row">
        {/* Sign Up Form */}
        {isSignUp && (
          <div className="col align-items-center flex-col sign-up">
            <div className="form-wrapper">
              <form className="form sign-up" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Sign Up</button>
                <p>
                  Already have an account?{" "}
                  <span onClick={switchAuthMode}>Sign in here</span>
                </p>
              </form>
            </div>
          </div>
        )}

        {/* Sign In Form */}
        {!isSignUp && (
          <div className="col align-items-center flex-col sign-in">
            <div className="form-wrapper">
              <form className="form sign-in" onSubmit={handleSubmit}>
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit">Sign In</button>
                <p>
                  Don't have an account?{" "}
                  <span onClick={switchAuthMode}>Sign up here</span>
                </p>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
