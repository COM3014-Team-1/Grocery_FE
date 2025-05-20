import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import ProductCard from "../../components/ProductCard";

const RelatedProducts = ({ relatedProducts }) => {
    return (
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>
        <Grid2 container spacing={3}>
            {relatedProducts.map((prod, index) => (
                <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <ProductCard product={prod} />
                </Grid2>
            ))}
        </Grid2>
      </Box>
    );
};

export default RelatedProducts;