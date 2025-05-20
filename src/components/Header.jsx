import React, { useState, useEffect } from 'react';
import {
  AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box, Badge
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserStore } from '../store/useUserStore';
import CartDrawer from './CartDrawer';
import { useCartStore } from '../store/useCartStore';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import PersonIcon from '@mui/icons-material/Person';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const { cart, fetchCart } = useCartStore();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutSnackbarOpen, setLogoutSnackbarOpen] = useState(false);

  const handleUserIconClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  useEffect(() => {
    if (user?.userId) {
      fetchCart();
    }
  }, [user]);

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

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user?.userId && (
            <IconButton onClick={() => setDrawerOpen(true)}>
              <Badge badgeContent={cart.length || 0} color="error">
                <ShoppingCartIcon sx={{ color: 'white' }} />
              </Badge>
            </IconButton>
          )}

          {user?.userId ? (
            <>
              <IconButton onClick={handleUserIconClick}>
                <AccountCircleIcon sx={{ color: 'white', mr: 1 }} />
                <Box
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 2,
                    fontSize: 14,
                    transition: '0.2s',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.3)',
                    },
                  }}
                >
                  {user.name}
                </Box>
              </IconButton>
              <Menu
                anchorEl={userMenuAnchorEl}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuClose}
              >
                <MenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>
                  <PersonIcon sx={{ mr: 1, color: 'success.main' }} />
                  My Profile
                </MenuItem>
                <MenuItem onClick={() => { navigate('/orders'); handleUserMenuClose(); }}>
                  <ListAltIcon sx={{ mr: 1, color: 'success.main' }} />
                  Order History
                </MenuItem>
                <Divider />
                <MenuItem
                  onClick={async () => {
                    await logout();
                    handleUserMenuClose();
                    setLogoutSnackbarOpen(true);
                    navigate("/");
                  }}
                >
                  <LogoutIcon sx={{ mr: 1, color: 'success.main' }} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button onClick={() => navigate('/login')} sx={{ color: 'white' }} startIcon={<LoginIcon />}>
                Login
              </Button>
              <Button onClick={() => navigate('/signup')} sx={{ color: 'white' }} startIcon={<PersonAddAltIcon />}>
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>

      {/* Only render cart drawer if logged in */}
      {user?.userId && <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />}
    </AppBar>
  );
};

export default Header;
