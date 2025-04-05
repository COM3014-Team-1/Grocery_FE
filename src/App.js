import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/product/ProductDetail";
import { useProductsStore } from "./store/useProductStore";

function App() {
  const { products, isLoading, error, fetchData } = useProductsStore();

  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      {/* <Header> add header component here */}
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      {/* <Header /> */}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
