import React from "react";
import { Box, Typography, Card, CardContent, Button, Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
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
                    {/* <Card key={index} sx={{ display: "flex", marginBottom: 2, flexDirection: "column", height: "100%" }}>
                        <Box
                            component="img"
                            src="/broccoli_opt.jpg"
                            alt={prod}
                            sx={{
                                width: 200,
                                objectFit: "cover",
                                height: "100%",
                                borderRadius: 4,
                            }}
                            />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6">{prod}</Typography>
                            <Button variant="contained" color="primary">
                            View Details
                            </Button>
                        </CardContent>
                    </Card> */}
                </Grid2>
            //   <ProductCard key={index} product={prod} />
            ))}
        </Grid2>
      </Box>
    );
};

export default RelatedProducts;