import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Skeleton, Stepper, Step, StepLabel,
  Grid, Divider, Paper, Container
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useParams } from 'react-router-dom';
import { getAuthToken } from "../../utils/auth";

const steps = ['Dispatched', 'Out For Delivery', 'Delivered'];

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = getAuthToken();

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await fetch(`http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/order/${orderId}`, {
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setOrder(data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch order detail", err);
      }
    };

    fetchOrderDetail();
  }, [orderId]);

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Shipped': return 1;
      default: return 2;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
      {/* Page Title */}
      <Box display="flex" alignItems="center" mb={3}>
        <ShoppingBagIcon color="success" sx={{ mr: 1 }} />
        <Typography variant="h5" fontWeight="bold">Order Detail</Typography>
      </Box>

      {/* Stepper */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        {loading ? (
          <Skeleton variant="rectangular" height={80} />
        ) : (
          <Stepper activeStep={getStepIndex(order.order_status)} sx={{ px: 1 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        )}
      </Paper>

      {/* Product Rows */}
      <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 3 }}>
        {loading ? (
          [1, 2].map((_, idx) => (
            <Box key={idx} display="flex" alignItems="center" mb={2}>
              <Skeleton variant="rectangular" width={80} height={80} sx={{ mr: 2 }} />
              <Box flex={1}>
                <Skeleton width="50%" />
                <Skeleton width="30%" />
              </Box>
              <Skeleton width={60} />
            </Box>
          ))
        ) : (
          order.order_items.map((item) => (
            <Box key={item.product_id} display="flex" alignItems="center" mb={2}>
              <img src={item.image_url} alt={item.name} width={80} height={80} style={{ objectFit: 'cover', marginRight: 16 }} />
              <Box flex={1}>
                <Typography variant="subtitle1">{item.name}</Typography>
                <Typography variant="body2">Qty: {item.quantity}</Typography>
              </Box>
              <Typography variant="body1" fontWeight="bold">
                £{(item.unit_price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))
        )}
      </Paper>

      {/* Shipping Address and Summary */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            {loading ? (
              <>
                <Skeleton width="40%" />
                <Skeleton height={80} />
              </>
            ) : (
              <>
                <Typography variant="h6" fontWeight="bold">Shipping Address</Typography>
                <Typography variant="body1">
                  {order.shipping_address}
                </Typography>
              </>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: { xs: 2, sm: 3 } }}>
            {loading ? (
              <>
                <Skeleton width="60%" />
                <Skeleton width="40%" />
                <Skeleton width="50%" />
                <Divider sx={{ my: 1 }} />
                <Skeleton width="30%" />
              </>
            ) : (
              <>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Subtotal</Typography>
                  <Typography>£{order.total_amount.toFixed(2)}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Shipping Fee</Typography>
                  <Typography>£3.00</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Discount</Typography>
                  <Typography>--</Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="h6" fontWeight="bold">Total</Typography>
                  <Typography variant="h6" fontWeight="bold">
                    £{(order.total_amount + 3).toFixed(2)}
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailPage;
