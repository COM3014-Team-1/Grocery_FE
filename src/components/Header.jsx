import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserStore } from '../store/useUserStore';
import CartDrawer from './CartDrawer';
import { useCartStore } from '../store/useCartStore';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { cart, fetchCart } = useCartStore()
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCategoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCategorySelect = (id) => {
    navigate(`/category/${id}`);
    setAnchorEl(null);
  };

  const handleUserIconClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    logout();                    // Clear user session
    handleUserMenuClose();       // Close the user menu
    setSnackbarOpen(true);       // Open snackbar
    navigate('/');               // Redirect to homepage
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: 'success.main', color: 'black' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Side: Logo + Home + Categories */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{ height: 70, cursor: 'pointer', mr: 2 }}
              onClick={() => navigate('/')}
            />
          </Box>

          {/* Right Side: Cart + User/Login/Signup */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              {categories.map((cat) => (
                <MenuItem key={cat.category_id} onClick={() => handleCategorySelect(cat.category_id)}>
                  {cat.name}
                </MenuItem>
              ))}
            </Menu>
            <IconButton onClick={() => navigate('/cart')}>
              <ShoppingCartIcon sx={{ color: 'white' }} />
            </IconButton>

            {user ? (
              <>
                <IconButton onClick={handleUserIconClick}>
                  <AccountCircleIcon sx={{ color: 'white' }} />
                </IconButton>
                <Menu anchorEl={userMenuAnchorEl} open={Boolean(userMenuAnchorEl)} onClose={handleUserMenuClose}>
                  <MenuItem onClick={() => navigate('/profile')}>My Profile</MenuItem>
                  <MenuItem onClick={() => navigate('/orders')}>Order History</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                <Button onClick={() => navigate('/login')} sx={{ color: 'white' }}>
                  Login
                </Button>
                <Button onClick={() => navigate('/signup')} sx={{ color: 'white' }}>
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Snackbar for Logout Confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
          You have been logged out!
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
