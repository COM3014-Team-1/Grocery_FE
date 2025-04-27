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
  Skeleton,
  Radio,
  FormControl,
    FormControlLabel,
    RadioGroup,
    FormLabel,

} from "@mui/material";
import { useUserStore } from "../../store/useUserStore"; 
import { getAuthToken } from "../../utils/auth";

const PaymentPage = ({ subtotal }) => {
//   const userId = useUserStore.getState().user.userId;
//   const [user, setUser] = useState(null);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const token = getAuthToken();
//         const res = await fetch(`http://localhost:5001/user/user/${userId}`, {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await res.json();
//         setUser(data);
//       } catch (err) {
//         console.error("Failed to load user details:", err);
//       }
//     };

//     if (userId) fetchUserDetails();
//   }, [userId]);

  const deliveryFee = 3;
  const total = subtotal + deliveryFee;

    // if (!user) {
    //     return (
    //       <Box mt={4}>
    //         <Grid container spacing={3}>
    //           <Grid item xs={12} md={8}>
    //             <Card>
    //               <CardContent>
    //                 <Skeleton variant="text" height={40} width="30%" />
    //                 <Grid container spacing={2} mt={2}>
    //                   {[...Array(6)].map((_, idx) => (
    //                     <Grid item xs={12} sm={6} key={idx}>
    //                       <Skeleton variant="rectangular" height={56} />
    //                     </Grid>
    //                   ))}
    //                 </Grid>
    //                 <Box mt={3}>
    //                   <Skeleton variant="text" width="40%" />
    //                   <Skeleton variant="text" width="80%" height={30} sx={{ mt: 1 }} />
    //                   <Skeleton variant="rectangular" height={36} width="40%" sx={{ mt: 1 }} />
    //                 </Box>
    //               </CardContent>
    //             </Card>
    //           </Grid>
      
    //           <Grid item xs={12} md={4}>
    //             <Card>
    //               <CardContent>
    //                 {[...Array(4)].map((_, idx) => (
    //                   <Skeleton key={idx} variant="text" height={30} sx={{ mb: 1 }} />
    //                 ))}
    //                 <Divider sx={{ my: 2 }} />
    //                 <Skeleton variant="text" height={30} />
    //                 <Skeleton variant="text" height={30} />
    //               </CardContent>
    //             </Card>
    //           </Grid>
    //         </Grid>
    //       </Box>
    //     );
    //   }
      

  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        {/* Address Card (70%) */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
                <FormControl component="fieldset" fullWidth>
                    <RadioGroup value={selectedOption} onChange={handleChange}>
                        <Box>
                        <FormControlLabel value="option1" control={<Radio />} label="Cash On Delivery" />
                        <Divider sx={{ my: 1 }} />
                        </Box>
                        <Box>
                        <FormControlLabel value="option2" control={<Radio />} label="Pay With Card" disabled/>
                        <Divider sx={{ my: 1 }} />
                        </Box>
                        <Box>
                        <FormControlLabel value="option3" control={<Radio />} label="Bank Transfer" disabled />
                        </Box>
                    </RadioGroup>
                </FormControl>
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

export default PaymentPage;
