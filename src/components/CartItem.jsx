import React from 'react';
import { Box, IconButton, Typography, Grid2 } from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';
import { formatCurrency } from '../utils/currencyUtil';

const CartItem = ({ item, onRemoveItem, onUpdateQuantity }) => {
  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: 2, width: '100%' }}>
        {/* Left: Item Image */}
        <Box
          sx={{
            width: 100,
            height: 80,
            mr: 2,
            backgroundColor: 'grey.300',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <img
            src={item.image_url}
            alt={item.product_name}
            style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#f5f5f5' }}
          />
        </Box>

        {/* Right: Item Info */}
        <Grid2
          container
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left Side: Stacked Name, Price, and Quantity Controls */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">{item.product_name}</Typography>

            <Typography variant="body2" color="textSecondary">
              {formatCurrency(parseFloat(item.unit_price).toFixed(2))} x {item.quantity} = {formatCurrency(parseFloat(item.unit_price * item.quantity).toFixed(2))}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                sx={{
                  border: '1px solid #ccc',
                  padding: '4px',
                  borderRadius: 1,
                  marginRight: 1,
                }}
                onClick={() => onUpdateQuantity(item.product_id, item.quantity - 1)}
                disabled={item.quantity === 1}
              >
                <Remove fontSize="small" />
              </IconButton>

              <Typography variant="body2">{item.quantity}</Typography>

              <IconButton
                sx={{
                  border: '1px solid #ccc',
                  padding: '4px',
                  borderRadius: 1,
                  marginLeft: 1,
                }}
                onClick={() => onUpdateQuantity(item.product_id, item.quantity + 1)}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Right Side: Close Button */}
          <IconButton onClick={() => onRemoveItem(item.product_id)}>
            <Close />
          </IconButton>
        </Grid2>

      </Box>
    </>
  );
};

export default CartItem;
