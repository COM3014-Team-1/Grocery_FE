import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Menu, MenuItem, IconButton, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useUserStore } from '../store/useUserStore';

const Header = ({ categories }) => {
  const navigate = useNavigate();
  const { user, logout } = useUserStore();
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

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

  return (
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
    </AppBar>
  );
};

export default Header;
