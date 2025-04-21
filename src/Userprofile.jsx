import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Container,
  Grid,
} from '@mui/material';

const UserProfile = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
  });




  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id  = localStorage.getItem("user_id");
        console.error("user_id",user_id);
        const response = await fetch(`http://127.0.0.1:5001/user/user/${user_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching the user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            { 'User Details'}
          </Typography>
        </Box>

        <Grid container spacing={5}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={user.username}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              value={user.email}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              value={user.phone}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={user.address}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              value={user.city}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State"
              value={user.state}
              InputProps={{ readOnly: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="ZIP Code"
              value={user.zipcode}
              InputProps={{ readOnly: true }}
            />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UserProfile;
