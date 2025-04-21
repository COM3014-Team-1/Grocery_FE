import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserStore } from '../store/useUserStore';
import CartDrawer from './CartDrawer';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleUserIconClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: 'success.main', color: 'black' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                <MenuItem
                  onClick={() => {
                    logout();
                    handleUserMenuClose();
                  }}
                >
                  Logout
                </MenuItem>
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
      
      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </AppBar>
  );
};

export default Header;
