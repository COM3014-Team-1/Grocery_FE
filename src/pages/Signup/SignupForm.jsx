import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Snackbar,
  Alert,
  Link,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import LoginIcon from '@mui/icons-material/Login';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { Grid } from '@mui/material';

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: ''
  });

  const [error, setError] = useState('');
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch('http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessOpen(true);
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setError(data.message || 'Signup failed');
        setErrorOpen(true);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setErrorOpen(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box display="flex" flexDirection="column" gap={3} mt={6}>
        <Box textAlign="center">
          <Typography variant="h4" color="success.main" fontWeight={700}>
            Join Us Today! 🎉
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1}>
            Be part of our Grocify family and enjoy exclusive member benefits.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Box display="flex" alignItems="center" gap={1}>
              <LocalMallIcon color="primary" />
              <Typography variant="body2">Track Your Orders</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1}>
              <LoyaltyIcon color="secondary" />
              <Typography variant="body2">Member-Only Discounts</Typography>
            </Box>
          </Stack>
        </Box>

        <Box component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
            <TextField name="name" label="Full Name" required fullWidth onChange={handleChange} />
            <TextField name="email" label="Email" type="email" required fullWidth onChange={handleChange} />
            <TextField name="password" label="Password" type="password" required fullWidth onChange={handleChange} />
            <TextField name="phone" label="Phone Number" required fullWidth onChange={handleChange} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField name="address" label="Street Address" required fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="city" label="City" required fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="state" label="State" required fullWidth onChange={handleChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="zipcode" label="Zip Code" required fullWidth onChange={handleChange} />
                </Grid>
            </Grid>
        </Box>

        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleSignup}
          startIcon={<CelebrationIcon />}
          disabled={!form.name || !form.email || !form.password || !form.phone || !form.address || !form.city || !form.state || !form.zipcode}
        >
          Join Now
        </Button>

        <Typography variant="body2" textAlign="center" display="flex" alignItems="center" justifyContent="center" gap={1}>
          <LoginIcon fontSize="small" />
          Already a member?{" "}
          <Link href="/login" color="primary" sx={{ ml: 0.5 }}>
            Log in here
          </Link>
        </Typography>
      </Box>

      <Snackbar open={successOpen} autoHideDuration={3000} onClose={() => setSuccessOpen(false)}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Signup successful! Redirecting to login...
        </Alert>
      </Snackbar>

      <Snackbar open={errorOpen} autoHideDuration={4000} onClose={() => setErrorOpen(false)}>
        <Alert severity="error" onClose={() => setErrorOpen(false)} sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignupPage;
