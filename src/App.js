import * as React from "react";
import { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./pages/product/ProductDetail";
import CategoryPage from "./pages/Category/Category";
import Home from "./pages/Home/Home";
import useCategoryStore from "./store/useCategoryStore";
import Header from "./components/Header";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
      <Header categories={categories} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/category/:id" element={<CategoryPage/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
