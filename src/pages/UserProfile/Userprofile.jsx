import React, { useEffect, useState } from 'react';
import {
  Container, Box, TextField, Button, Typography,
  Snackbar, Alert, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import { useUserStore } from '../../store/useUserStore';
import { getAuthToken } from '../../utils/auth';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const ProfilePage = () => {
  const { setUser } = useUserStore();
  const { user } = useUserStore();                 // { name, userId }
  const [form, setForm] = useState(null);          // editable copy
  const [orig, setOrig] = useState(null);          // original copy
  const [editMode, setEditMode] = useState(false);
  const [snack, setSnack] = useState({ open:false, msg:'', sev:'success' });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.userId) return;
      const res = await fetch(`http://localhost:5001/user/user/${user.userId}`, {
        headers:{ Authorization:`Bearer ${getAuthToken()}` },
        credentials:'include'
      });
      const data = await res.json();
      setForm(data);
      setOrig(data);     // keep pristine copy
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
        const { created_at,user_id, ...payload } = form;   // created_at

        const res = await fetch(
            `http://localhost:5001/user/user/${user.userId}/edit`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getAuthToken()}`,
              },
              credentials: 'include',
              body: JSON.stringify(payload),   // now has no created_at or email
            }
          );
          if (res.ok) {
            // 1. update local pristine copy
            setOrig(form);
            setEditMode(false);
          
            // 2. update global user (header will refresh)
            setUser({
              ...user,
              name: payload.username,   // new name
            });
          
            setSnack({ open: true, msg: 'Profile updated!', sev: 'success' });
          } else {
        const { message } = await res.json();
        throw new Error(message || 'Update failed');
      }
    } catch (err) {
      setSnack({ open:true, msg:err.message, sev:'error' });
    }
  };


  const handleDiscard = () => {
    setForm(orig);
    setEditMode(false);
  };

  if (!form) return null; // or a loader

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Title bar (icon + text) */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <AccountCircleIcon color="success" />
        <Typography variant="h5" fontWeight={600}>My Profile</Typography>
      </Box>

      <Stack spacing={2}>
        {/* Basic fields */}
        <TextField name="username" label="Name" value={form.username || ''} onChange={handleChange} disabled={!editMode}/>
        <TextField name="email" label="Email" value={form.email || ''} onChange={handleChange} disabled/>
        <TextField name="phone" label="Phone" value={form.phone || ''} onChange={handleChange} disabled={!editMode}/>
        <TextField name="address" label="Address" value={form.address || ''} onChange={handleChange} disabled={!editMode}/>
        <TextField name="city" label="City" value={form.city || ''} onChange={handleChange} disabled={!editMode}/>
        <TextField name="state" label="State" value={form.state || ''} onChange={handleChange} disabled={!editMode}/>
        <TextField name="zipcode" label="Zip Code" value={form.zipcode || ''} onChange={handleChange} disabled={!editMode}/>
      </Stack>

      {/* Action buttons */}
      <Box mt={4} display="flex" gap={2}>
        {!editMode ? (
          <Button
            variant="contained"
            color="success"
            startIcon={<EditIcon />}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </Button>
        ) : (
          <>
            <Button
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<CloseIcon />}
              onClick={handleDiscard}
            >
              Discard
            </Button>
          </>
        )}
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open:false })}
        anchorOrigin={{ vertical:'top', horizontal:'center' }}
      >
        <Alert
          severity={snack.sev}
          sx={{ width:'100%' }}
          onClose={() => setSnack({ ...snack, open:false })}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ProfilePage;
