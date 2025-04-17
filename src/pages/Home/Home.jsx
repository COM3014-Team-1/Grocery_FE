import React, { useEffect } from 'react';
import { Box, Typography, CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCategoryStore from '../../store/useCategoryStore';

const Home = () => {

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Home Page
      </Typography>
    </Box>
  );
};

export default Home;
