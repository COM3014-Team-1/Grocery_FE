import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Container,
  Grid,
  Button,
  Stack
} from '@mui/material';
import { getAuthToken } from '../../utils/auth'; 

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

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user_id = localStorage.getItem("user_id");
        const token = getAuthToken();

        if (!user_id || !token) {
          console.warn("Missing user ID or token");
          return;
        }

        const response = await fetch(`http://127.0.0.1:5001/user/user/${user_id}`, {
          method: 'GET',
          headers: {
            Authorization: `${token}`, //  
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Error fetching user: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
        setEditedUser(data); //  keep edited data in sync
      } catch (error) {
        console.error('Error fetching the user data:', error);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (field, value) => {
    setEditedUser(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const user_id = localStorage.getItem("user_id");
      const token = getAuthToken();
      console.warn(JSON.stringify(editedUser));
      // Destructure to exclude confirmPassword
    const {
      username,
      email,
      phone,
      address,
      city,
      state,
      zipcode,
    } = editedUser;
      const response = await fetch(`http://127.0.0.1:5001/user/user/${user_id}/edit`, {
        method: 'PUT',
        headers: {
          Authorization: `${token}`,
          'Content-Type': 'application/json', // 
        },
        body: JSON.stringify({username,
          email,
          phone,
          address,
          city,
          state,
          zipcode}),
      });

      if (response.ok) {
        setUser(editedUser);
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={4} sx={{ p: 4, mt: 6, borderRadius: 3 }}>
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            User Details
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            { label: "Name", key: "username" },
            { label: "Email", key: "email" },
            { label: "Phone", key: "phone" },
            { label: "Address", key: "address" },
            { label: "City", key: "city" },
            { label: "State", key: "state" },
            { label: "ZIP Code", key: "zipcode" },
          ].map(({ label, key }) => (
            <Grid item xs={key === "city" || key === "state" ? 6 : 12} key={key}>
              <TextField
                fullWidth
                label={label}
                value={editedUser[key] || ''}
                onChange={(e) => handleChange(key, e.target.value)}
                InputProps={{ readOnly: !isEditing }}
              />
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" spacing={2} mt={4} justifyContent="center">
          {!isEditing ? (
            <Button variant="contained" onClick={() => setIsEditing(true)}>
              Edit
            </Button>
          ) : (
            <>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outlined" onClick={handleCancel}>
                Cancel
              </Button>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default UserProfile;
