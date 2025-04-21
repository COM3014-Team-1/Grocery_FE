import React, { useState, useEffect } from 'react';
import { Drawer, Box, IconButton, CircularProgress, Typography, List, ListItem, Divider, Button } from '@mui/material';
import { Close as CloseIcon, ShoppingBagOutlined } from '@mui/icons-material';
import { useCartStore } from '../store/useCartStore';
import CartItem from './CartItem';
import { formatCurrency, getTotalPrice } from '../utils/currencyUtil';

const CartDrawer = ({ open, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { fetchCart, cart, removeProductFromCart, updateQuantity } = useCartStore();
  
  useEffect(() => {
    if (open) {
      setLoading(true);
      fetchCart().finally(() => setLoading(false)); // Fetch cart when drawer opens
    }
  }, [open, fetchCart]);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        width: 400,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 400,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex'}}>
            <ShoppingBagOutlined fontSize='large'/>
            <Typography variant="h6" sx={{ textAlign: 'left', marginBottom: 2 }}>
              {cart.length > 0 ? `${cart.length} items` : 'Cart is Empty'}
            </Typography>
          </Box>

          <IconButton onClick={() => {onClose()}} sx={{ paddingRight: '24px' }}>
            <CloseIcon onClick={onClose}/>
          </IconButton>
        </Box>
        <Divider />

        {/* Loading Spinner */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 10 }}>
            <CircularProgress color='success'/>
          </Box>
        ) : cart.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', marginTop: 10 }}>
            Your cart is empty
          </Typography>
        ) : (
          <List>
            {cart.map((item) => (
              <>
              <ListItem key={item.product_id} sx={{ padding: 0 }}>
                <CartItem
                  item={item}
                  onRemoveItem={removeProductFromCart}
                  onUpdateQuantity={updateQuantity}
                />
              </ListItem>
              <Divider sx={{ width: '100%' }}/>
              </>
            ))}
          </List>
        )}
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ mb: 1 }}
        >
          {`Checkout now (${formatCurrency(getTotalPrice(cart))})`}
        </Button>
        <Button
          variant="outlined"
          fullWidth
          onClick={onClose}
          color='success'
        >
          Cancel
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
