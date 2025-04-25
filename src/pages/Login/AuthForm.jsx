import React, { useState } from "react";
import { Box, TextField, Button, Typography, Container, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { useUserStore } from '../../store/useUserStore';

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
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

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success or error

  const navigate = useNavigate(); // useNavigate hook for programmatic navigation
  const { user, setUser } = useUserStore();

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
        setSnackbarMessage("Passwords do not match.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:5001/user/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok && data.token) {
          localStorage.setItem("token", data.token);
          setSnackbarMessage("Signup successful!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          navigate("/dashboard"); // Use navigate for programmatic navigation
        } else {
          setSnackbarMessage(data.message || "Signup failed.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.error("Signup error:", err);
        setSnackbarMessage("Error during signup. Check console for details.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
          localStorage.setItem("user_id", data.user.id);
          setUser(data.user);
          setSnackbarMessage("Login successful!");
          setSnackbarSeverity("success");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/"); // Use navigate for programmatic navigation
          }, 2000);
        } else {
          setSnackbarMessage(data.message || "Login failed.");
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
        }
      } catch (err) {
        console.error("Login error:", err);
        setSnackbarMessage("Error during login. Check console for details.");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
        <Typography variant="h4">{isSignUp ? "Join us here" : "Welcome!"}</Typography>
        <Typography variant="body1">
          {isSignUp ? "Create an account to get started!" : "Sign in to continue."}
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

      {/* Snackbar/Toast Notification */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // automatically close after 3 seconds
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarOpen(false)} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AuthForm;
