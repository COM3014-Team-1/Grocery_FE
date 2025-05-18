import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch("http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/user/login", {
        method: "POST",
        credentials: "include", // important: get token in cookie
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.user) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        } else {
          console.error("Token not received in response.");
        }
        setUser({
          name: data.user.name,
          userId: data.user.id,
        });
        navigate("/");
      } else {
        setError(data.message || "Invalid login credentials.");
        setOpen(true);
      }
      
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
        <Typography variant="h4" mb={2} color="success.main" fontWeight={600}>
          Welcome 👋
        </Typography>

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          margin="normal"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="success"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography variant="body2" mt={2}>
          Don’t have an account?{" "}
          <Link href="/signup" color="primary">
            Sign up here
          </Link>
        </Typography>
      </Box>

      {/* Snackbar for errors */}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error" onClose={() => setOpen(false)} sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
