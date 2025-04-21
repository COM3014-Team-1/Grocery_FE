import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SignupForm = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  const toggleAuthMode = () => {
    setIsSignUp((prev) => !prev);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      // Destructure to exclude confirmPassword
    const {
      name,
      email,
      password,
      phone,
      address,
      city,
      state,
      zipcode,
    } = formData;
      try {
        const response = await fetch("http://127.0.0.1:5001/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            phone,
            address,
            city,
            state,
            zipcode,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          alert("Signup successful! Please login now.");
          window.location.href = "/login"; // redirect to login page after signup
        } else {
          console.error("Signup error:", data);
          alert(data.message || "Signup failed123");
        }
  
      } catch (err) {
        console.error("Signup error:", err);
        alert("Error during signup. Check console for details.");
      }
    } else {
      // Handle login logic
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
          navigate("/"); // Use navigate for programmatic navigation
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
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 2,
        minHeight: "100vh", // Ensures the container is at least 100% of viewport height
        overflow: "auto", // Ensures scrolling when content overflows
      }}
    >
      {/* Text Section */}
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h4">
          {isSignUp ? "Join us here" : "Welcome!"}
        </Typography>
        <Typography variant="body1">
          {isSignUp
            ? "Create an account to get started!"
            : "Sign in to continue."}
        </Typography>
      </Box>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {isSignUp && (
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        {isSignUp && (
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        )}

        {isSignUp && (
          <>
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleChange}
            />
          </>
        )}

        <Button
          fullWidth
          variant="contained"
          sx={{
            marginTop: 2,
            backgroundColor: "#128934",
            color: "white",
            fontSize: "1.1rem",
            padding: "0.6rem 0",
          }}
          type="submit"
        >
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Box sx={{ textAlign: "center", marginTop: 2 }}>
          <Typography variant="body2">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <b
              onClick={toggleAuthMode}
              style={{
                cursor: "pointer",
                color: "#128934",
                fontWeight: "bold",
              }}
            >
              {isSignUp ? " Sign in here" : " Sign up here"}
            </b>
          </Typography>
        </Box>
      </form>
    </Container>
  );
};

export default SignupForm;
