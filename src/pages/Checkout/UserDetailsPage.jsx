import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Skeleton
} from "@mui/material";
import { useUserStore } from "../../store/useUserStore"; 
import { getAuthToken } from "../../utils/auth";

const UserDetailsPage = ({ subtotal, setShippingAddress }) => {
  const userId = useUserStore.getState().user.userId;
  const [user, setUser] = useState(null);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = getAuthToken();
        const res = await fetch(`http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/user/user/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        setShippingAddress(data.address);
        setUser(data);
      } catch (err) {
        console.error("Failed to load user details:", err);
      }
    };

    if (userId) fetchUserDetails();
  }, [userId]);

  const deliveryFee = 3;
  const total = subtotal + deliveryFee;

    if (!user) {
        return (
          <Box mt={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Skeleton variant="text" height={40} width="30%" />
                    <Grid container spacing={2} mt={2}>
                      {[...Array(6)].map((_, idx) => (
                        <Grid item xs={12} sm={6} key={idx}>
                          <Skeleton variant="rectangular" height={56} />
                        </Grid>
                      ))}
                    </Grid>
                    <Box mt={3}>
                      <Skeleton variant="text" width="40%" />
                      <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
                      <Skeleton variant="rectangular" height={36} width="40%" sx={{ mt: 1 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
      
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    {[...Array(4)].map((_, idx) => (
                      <Skeleton key={idx} variant="text" height={30} sx={{ mb: 1 }} />
                    ))}
                    <Divider sx={{ my: 2 }} />
                    <Skeleton variant="text" height={30} />
                    <Skeleton variant="text" height={30} />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        );
      }
      

  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        {/* Address Card (70%) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Address
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={user.username}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={user.phone}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    value={user.email}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    value={user.city}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="ZIP Code"
                    value={user.zipcode}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="State"
                    value={user.state}
                    InputProps={{ readOnly: true }}
                    disabled
                  />
                </Grid>
              </Grid>

              <Box mt={3}>
                <Typography variant="subtitle1">
                    Delivery Address:
                </Typography>
                {!showAddressInput ? (
                    <Box mt={1}>
                    <Typography>{user.address}</Typography>
                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setShowAddressInput(true)}
                        color="success"
                        sx={{ mt: 1 }}
                    >
                        Change delivery address
                    </Button>
                    </Box>
                ) : (
                    <Box mt={2}>
                    <Box display="flex" alignItems="center" gap={1}>
                        <TextField
                        fullWidth
                        label="New Delivery Address"
                        value={newAddress}
                        onChange={(e) => {
                            setNewAddress(e.target.value); 
                            setShippingAddress(e.target.value);}}
                        />
                        <Button
                        onClick={() => {
                            setNewAddress("");
                            setShowAddressInput(false);
                        }}
                        variant="text"
                        color="error"
                        sx={{ minWidth: "fit-content" }}
                        >
                        ✕
                        </Button>
                    </Box>
                    <Box>
                    <Typography variant="caption" color="text.secondary" mt={1} display="block">
                        This address will be used only for this delivery. To update your address
                        permanently, please go to your profile page.
                    </Typography>
                    </Box>
                    </Box>
                )}
                </Box>

            </CardContent>
          </Card>
        </Grid>

        {/* Summary Card (30%) */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid container>
                <Grid item xs={6}>
                  <Typography>Subtotal</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography align="right">${subtotal.toFixed(2)}</Typography>
                </Grid>

                <Grid item xs={6} mt={2}>
                  <Typography>Delivery Fee</Typography>
                </Grid>
                <Grid item xs={6} mt={2}>
                  <Typography align="right">${deliveryFee.toFixed(2)}</Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Grid container>
                <Grid item xs={6}>
                  <Typography fontWeight="bold">Total Amount</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography fontWeight="bold" align="right">
                    ${total.toFixed(2)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetailsPage;
