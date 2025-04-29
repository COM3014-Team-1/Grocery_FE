import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Radio,
  FormControl,
    FormControlLabel,
    RadioGroup,

} from "@mui/material";

const PaymentPage = ({ subtotal }) => {
  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const deliveryFee = 3;
  const total = subtotal + deliveryFee;
      
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
