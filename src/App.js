import * as React from "react";
import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/product/ProductDetail";
import CategoryPage from "./pages/Category/CategoryPage";
import Home from "./pages/Home/Home";
import useCategoryStore from "./store/useCategoryStore";
import OrderHistoryPage from "./pages/Order/OrderHistoryPage";
import OrderDetailPage from "./pages/Order/OrderDetailPage";
import LoginPage from "./pages/Login/AuthForm";
import SignupPage from "./pages/Signup/SignupForm";
import Header from "./components/Header";
import { CircularProgress, Container } from "@mui/material";
import CheckoutPage from "./pages/Checkout/CheckoutPage";
import AlertNotification from "./components/Alert";
import ProfilePage from "./pages/UserProfile/Userprofile";

function App() {
  const { categories, fetchCategories, isLoading } = useCategoryStore();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
    <AlertNotification setSnackbarOpen={setSnackbarOpen} snackbarOpen={snackbarOpen} snackbarMessage={snackbarMessage} />

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header categories={categories} />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={isLoading ? (<Container><CircularProgress color="success" /></Container>) : (<Home categories={categories}/>)} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/cart" element={<CheckoutPage triggerSnackbar={(msg) => {
              setSnackbarMessage(msg);
              setSnackbarOpen(true);
            }}/>} />
            <Route path="/orders" element={<OrderHistoryPage />} />
          <Route path="/order/:orderId" element={<OrderDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
