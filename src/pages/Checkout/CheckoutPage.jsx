import React, { useEffect, useState } from "react";
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid2,
  Typography,
  Container,
  Card,
} from "@mui/material";
import CartItem from "../../components/CartItem";
import { useCartStore } from "../../store/useCartStore";
import { useNavigate } from "react-router-dom";
import UserDetailsPage from "./UserDetailsPage";
import { getTotalPrice } from "../../utils/currencyUtil";
import PaymentPage from "./PaymentPage";

const steps = ["Cart", "Details", "Payment"];

const CheckoutPage = ({triggerSnackbar }) => {
  const navigate = useNavigate();
  const { cart, fetchCart, placeOrder } = useCartStore();
  const [shippingAddress, setShippingAddress] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4, }}>
        <Box display="flex" justifyContent="center" mb={4} width="100%">
            <Stepper activeStep={activeStep} alternativeLabel sx={{
                width: "100%",
                "& .MuiStepIcon-root.Mui-completed": {
                color: "success.main", // completed step
                },
                "& .MuiStepIcon-root.Mui-active": {
                color: "success.main", // active step
                },
            }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel sx={{ }}>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
        </Box>

        <Box sx={{ 
            display: "flex", 
            flexDirection: "column", 
            height: "72vh"
        }}>
            <Box sx={{ 
                flexGrow: 1, 
                overflowY: "auto", 
                pr: 2 
            }}>
                {activeStep === 0 && (
                    cart && cart.length > 0 ? (
                        cart.map((item) => (
                            <Card sx={{ mb: 2 }} key={item.id}>
                                <CartItem item={item} />
                            </Card>
                        ))
                    ) : (
                        <Typography variant="body1" textAlign="center">
                            Your cart is empty.
                        </Typography>
                    )
                )}
                {activeStep === 1 && <UserDetailsPage subtotal={getTotalPrice(cart)} setShippingAddress={setShippingAddress} />}
                {activeStep === 2 && <PaymentPage subtotal={getTotalPrice(cart)} />}
            </Box>

            <Box sx={{ borderTop: "1px solid #ccc", pt: 2 }}>
                <Grid2 container justifyContent="end" spacing={2}>
                    {activeStep === 0 ? (
                    <Button 
                        variant="outlined" 
                        color="success" 
                        size="large" 
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </Button>) : (
                    <Button 
                        variant="outlined" 
                        color="success" 
                        size="large" 
                        onClick={() => setActiveStep((prev) => prev - 1)}
                    >
                        Back
                    </Button>)
                        }
                    {
                        activeStep !== 2 ? <Button
                        variant="contained"
                        color="success"
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        size="large"
                    >
                        Proceed
                    </Button> : (
                        <Button
                            variant="contained"
                            color="success"
                            onClick={async () => {    
                                try {
                                    placeOrder(shippingAddress)
                                    triggerSnackbar("Your order has been placed successfully!"); 
                                    navigate("/");
                                }
                                catch (error) {
                                    console.error("Error placing order:", error);
                                    triggerSnackbar("Failed to place order. Please try again.");
                                    return;
                                }
                            }}
                            size="large"
                        >
                            Confirm Order
                        </Button>
                    )
                    }
                </Grid2>
            </Box>
        </Box>
    </Container>
  );
};

export default CheckoutPage;
