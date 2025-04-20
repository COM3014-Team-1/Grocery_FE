import React, { useState } from "react";
import "./LoginForm.css";


const SignupForm =  () => {
  const [isSignUp, setIsSignUp] = useState(true);
  
    const init_form_data = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    };
  
    const [formData, setFormData] = useState(init_form_data);
  
    const toggleAuthMode = () => {
      setIsSignUp((prev) => !prev);
      setFormData(init_form_data);
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (isSignUp) {
        try {
          if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match.");
            return;
          }
          const response = await fetch("http://127.0.0.1:5001/user/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              password: formData.password,
              phone: formData.phone,
              address: formData.address,
              city: formData.city,
              state: formData.state,
              zipcode: formData.zipcode,
            }),
          });
  
          const data = await response.json();
  
          if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            alert("Signup successful!");
            window.location.href = "/dashboard"; // Redirect after signup
          } else {
            alert(data.message || "Signup failed");
          }
        } catch (err) {
          console.error("Signup error:", err);
          alert("Error during signup. Check console for details.");
        }
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
          alert("Error during login. Check console for details.");
        }
      }
    };
  
    return (
      <div className={`container ${isSignUp ? "sign-up" : "sign-in"}`} id="authContainer">
        <div className="row">
          {/* Left Side */}
          <div className="col align-items-center flex-col text-container">
            <div className={`text ${isSignUp ? "sign-up active" : "sign-in active"}`}>
              <h2>{isSignUp ? "Join us here" : "Welcome!"}</h2>
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
                      name="name"
                      placeholder="Username"
                      value={formData.name}
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
                {isSignUp && (
                  <div className="input-group">
                    <i className="bx bxs-phone"></i>
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {isSignUp && (
                  <div className="input-group">
                    <i className="bx bxs-home"></i>
                    <input
                      type="text"
                      name="address"
                      placeholder="Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {isSignUp && (
                  <div className="input-group">
                    <i className="bx bxs-city"></i>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {isSignUp && (
                  <div className="input-group">
                    <i className="bx bxs-map"></i>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                )}
                {isSignUp && (
                  <div className="input-group">
                    <i className="bx bxs-map-pin"></i>
                    <input
                      type="text"
                      name="zipcode"
                      placeholder="Zipcode"
                      value={formData.zipcode}
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

export default SignupForm;
