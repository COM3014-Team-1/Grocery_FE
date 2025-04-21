import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Box,
} from '@mui/material';

const OrderHistory = () => {
  const orders = [
    {
      order_item_id: 1,
      order_id: 101,
      user_id: 123,
      product_id: 5001,
      quantity: 2,
      unit_price: 19.99,
      subtotal: 39.98,
      created_at: "2025-04-10T14:30:00Z",
      status: "Delivered",
    },
    {
      order_item_id: 2,
      order_id: 102,
      user_id: 123,
      product_id: 5002,
      quantity: 1,
      unit_price: 49.99,
      subtotal: 49.99,
      created_at: "2025-04-15T10:15:00Z",
      status: "Pending",
    },
    {
      order_item_id: 3,
      order_id: 103,
      user_id: 123,
      product_id: 5003,
      quantity: 3,
      unit_price: 15.0,
      subtotal: 45.0,
      created_at: "2025-04-16T09:00:00Z",
      status: "Shipped",
    },
    {
      order_item_id: 4,
      order_id: 104,
      user_id: 123,
      product_id: 5003,
      quantity: 3,
      unit_price: 15.0,
      subtotal: 45.0,
      created_at: "2025-04-16T09:00:00Z",
      status: "Cancelled",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'success';
      case 'pending':
        return 'warning';
      case 'shipped':
        return 'info';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Order History
        </Typography>

        {orders.length === 0 ? (
          <Typography variant="body1">No orders found.</Typography>
        ) : (
          <Box sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell>Product ID</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Subtotal</TableCell>
                  <TableCell>Ordered At</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.order_item_id}>
                    <TableCell>{order.order_id}</TableCell>
                    <TableCell>{order.product_id}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>${order.unit_price.toFixed(2)}</TableCell>
                    <TableCell>${order.subtotal.toFixed(2)}</TableCell>
                    <TableCell>{new Date(order.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      <Chip
                        label={order.status}
                        color={getStatusColor(order.status)}
                        variant="outlined"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default OrderHistory;
