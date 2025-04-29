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
  Alert,
  Badge
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
  const { cart } = useCartStore();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      <AppBar position="sticky" sx={{ backgroundColor: 'success.main', color: 'black' }} data-testid="header">
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
            <IconButton onClick={() => setDrawerOpen(true)}>
              <Badge badgeContent={cart.length > 0 ? cart.length : 0} color="error">
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
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

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;
