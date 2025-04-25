import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/product/ProductDetail";
import CategoryPage from "./pages/Category/CategoryPage";
import Home from "./pages/Home/Home";
import useCategoryStore from "./store/useCategoryStore";
import LoginPage from "./pages/Login/AuthForm";
import SignupPage from "./pages/Signup/SignupForm";
import Header from "./components/Header";
import { Box, CircularProgress, Container } from "@mui/material";
import ProfilePage from "./pages/UserProfile/Userprofile";

function App() {
  const { categories, fetchCategories, isLoading } = useCategoryStore();

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });


  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header categories={categories} />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={isLoading ? (<Container><CircularProgress color="success" /></Container>) : (<Home categories={categories}/>)} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
