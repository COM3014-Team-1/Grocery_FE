import React, { useState } from "react";
import "./LoginForm.css";

const SignupForm = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/user/signup", {
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

      if (response.ok) {
        alert("Signup successful! Please login now.");
        window.location.href = "/login"; // redirect to login page after signup
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Error during signup. Check console for details.");
    }
  };

  return (
    <div className="container sign-up" id="authContainer">
      <div className="row">
        {/* Left Side */}
        <div className="col align-items-center flex-col text-container">
          <div className="text sign-up active">
            <h2>Join us here</h2>
            <p>Create an account to get started!</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="col align-items-center flex-col form-container">
          <div className="form-wrapper align-items-center">
            <form className="form sign-up" onSubmit={handleSubmit}>
              {/* All your input fields */}
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

              <button type="submit">Sign Up</button>

              <p>
                Already have an account?
                <b
                  className="pointer"
                  onClick={() => (window.location.href = "/login")}
                >
                  {" "}
                  Sign in here
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
