import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Box,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useCartStore } from "../../store/useCartStore";
import RelatedProducts from "./RelatedProducts";
import { formatCurrency } from "../../utils/currencyUtil";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const url = `http://127.0.0.1:5001/products/${id}`;
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();
        const transformed = {
          product_id: result.produc_id,
          name: result.name,
          price: result.price,
          description: result.description,
          category: result.category_name,
          image_url: result.image_url,
          quantity: result.quantity,
          rating: result.rating,
          is_halal: result.is_halal,
          is_vegan: result.is_vegan,
          category_id: result.category_id,
        };
  
        setData(transformed);
  
        const resp = await fetch(`http://127.0.0.1:5001/products/by-category/${transformed.category_id}`);
        const allProducts = await resp.json();
  
        const filtered = allProducts
          .filter(
            (p) =>
              p.product_id !== transformed.product_id
          )
  
        setRelated(filtered);
  
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  
    fetchData();
  }, [id]);
  

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress color="success" />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
      <Card sx={{ display: "flex", width: "100%", padding: 2, alignItems: "stretch" }}>
        {/* Product Image */}
        <Box
          component="img"
          src={data.image_url}
          alt={data.name}
          sx={{
            width: 300,
            objectFit: "cover",
            height: "100%",
            borderRadius: 4,
          }}
        />

        {/* Product Info */}
        <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" gutterBottom>
            {data.name}
          </Typography>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1">{data.rating ? Number(data.rating).toFixed(1) : "N/A"}</Typography>
            <Rating value={data.rating} precision={0.1} readOnly />
          </Box>

          <Typography variant="h6" color="success.main" sx={{ marginY: 1 }}>
            {formatCurrency(data.price)}
          </Typography>

          <Button
            variant="contained"
            color="success"
            startIcon={<AddShoppingCartIcon />}
            onClick={() => addToCart(data)}
            sx={{
              width: "20%",
            }}
          >
            Add to Cart
          </Button>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Description
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {data.description}
          </Typography>
        </CardContent>
      </Card>

      <RelatedProducts relatedProducts={related} />
    </Container>
  );
}
