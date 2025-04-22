import React, { useEffect } from 'react';
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Chip, Container
} from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useOrderStore } from '../../store/useOrderStore';
import { useNavigate } from 'react-router-dom';

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { orders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders(); // Fetch user's orders from API
  }, []);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'default';
      case 'completed': return 'success';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Title */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <ShoppingBagOutlinedIcon color="success" />
        <Typography variant="h5" fontWeight={600}>My Orders</Typography>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} elevation={2}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order #</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.order_id}>
                <TableCell>{order.order_id.slice(0, 8)}</TableCell>
                <TableCell>
                  <Chip label={order.order_status} color={getStatusColor(order.order_status)} size="small" />
                </TableCell>
                <TableCell>{order.total_quantity}</TableCell>
                <TableCell>{new Date(order.created_at).toLocaleDateString()}</TableCell>
                <TableCell>£{order.total_amount.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => navigate(`/order/${order.order_id}`)}>
                    <ArrowRightAltIcon color="action" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {orders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default OrderHistoryPage;
