import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Snackbar, Alert } from "@mui/material";
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

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // 'error' or 'success'

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to toggle between SignUp and SignIn
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

  const validatePassword = (password) => {
    // Regex to validate password (min 8 characters, at least one uppercase, one lowercase, one digit, and one special character)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    for (let key in formData) {
      if (formData[key] === "") {
        setSnackbarMessage("Please fill all fields.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
    }

    // Passwords should match
    if (formData.password !== formData.confirmPassword) {
      setSnackbarMessage("Passwords do not match.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Validate password complexity
    if (!validatePassword(formData.password)) {
      setSnackbarMessage("Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Destructure to exclude confirmPassword
    const { name, email, password, phone, address, city, state, zipcode } = formData;

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
        setSnackbarMessage("Signup successful! Please login now.");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/login"); // redirect to login page after signup
        }, 2000);
      } else {
        setSnackbarMessage(data.message || "Signup failed.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      }
    } catch (err) {
      console.error("Signup error:", err);
      setSnackbarMessage("Error during signup. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
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
        <Typography variant="h4">{isSignUp ? "Join us here" : "Welcome!"}</Typography>
        <Typography variant="body1">{isSignUp ? "Create an account to get started!" : "Sign in to continue."}</Typography>
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

      {/* Snackbar/Toast Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupForm;
