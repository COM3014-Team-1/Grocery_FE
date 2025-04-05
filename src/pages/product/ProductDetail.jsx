import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { Link } from "react-router-dom";
import {Card} from "@mui/material";
import {CardContent} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Divider} from "@mui/material";
import {Box} from "@mui/material";
import {Rating} from "@mui/material";
import {Grid2} from "@mui/material";
import { useParams } from "react-router-dom";
import { useCartStore } from "../../store/useCartStore";

export default function ProductDetail() {
  const { id } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);
  const [data, setData] = useState({
    product_id: 1,
    name: "Broccoli",
    price: 5.0,
    description: "Broccoli is a nutrient-rich green vegetable belonging to the cruciferous family, known for its tree-like florets and firm stalk. It has a slightly bitter yet earthy taste and a crisp texture that softens when cooked. Packed with vitamins C, K, and A, as well as fiber and antioxidants, broccoli is a powerhouse of nutrition that supports immune health, digestion, and overall well-being. It can be enjoyed raw, steamed, roasted, or stir-fried, making it a versatile ingredient in a variety of dishes, from salads and soups to pasta and casseroles.",
    category: "Category 1",
    image_url: "https://ff8f0e5535f1a1c469eb29fb1a87cf079dfd66e26fdacc168f25888-apidata.googleusercontent.com/download/storage/v1/b/grocery-images-uos/o/broccoli.jpg?jk=AbSFce4u6wli-kZph1kh-sWvdiRaP8uCKIUNj3HqddAiyebhDFxRmGE4hB1Q_KCrxqtjxIR48-3d31lFOecsevH7HnkVqErRoQiV1Lk-VRRWHKC9_lT-RYMbJ5Qqv0QaX6vK21PNS8sFaqeiFvcmtaOV-yN6eacMXke9fMWJoMMxGKFULT3KYdM6GSLKrr4-_dOpsJysjrG4YIFYmmogvrS-w3BzWYOqO7VQuUYvB_nVhXMOLRMvoF67SmGdXJ_-6UKxYTJnNZJBS78-g-Cg-XXc4yfZzqviQD2E82VoE-mwEPyY8FSJ4cDC2cPwWWnTN-MFIn7K3f1LF-wOLszRBjfx9xICMH9ZGpwqHV7bcU09Xm557wKNMwjkz5s2KyBIr1EOk_vGqdH80PimyjlZ1cl9G_dN0F1VxgeXHsrhC6gKyGPmzBzR1WCXsMfgT8gqrE0C_Bx9MxAP8Ym6BvY_RFRrqzEyI5hcV7qwCZdliVNrIN-d1eJCaZgi3DkQ1EEyK9kxgxzsMEIAUu44tbC_ac4k3fhdOOLmCPA_i52eoyvV-D4ewZHVhRlcNanDk37tdinMpaIREq8lEzfy_5j6hqR3wqLRcNoC0H-WFti0PlkDMXKSoxNdQVWSwTqeq11bcOl1-dYAVzHXTjKbXXzH3HftEbfzoOawlYKEOV1bt9TP8_QHyoPPZYNkeTcCH_bDxglSorc-4JkDDhvGRkJ7MxcYIExZ5lFgBpWMbmi8FOxE2BNoCq0aOzT3jHn0gFYKB8fgHMH7dshIZw1da3uYLQ7QhhPc0V78ascrPAHq0COkNfe6EuXifFQYa22e0b91S08RNGDm8Pj943yLRqnkASV8ZTYktnc2IAAuQ0pIAiFFw5Pr0DUY_wNVb-m9dyMNcCL0aQ_uXRQuyC8Um1FplRHpVaZCKoqcEDIH0PBeBfonXNwyOaaOf6-lxi4FHX3RsGAc21i3Snss9mbx9fj5mBDXxzxcXyZAd6XMXJfhfNwMdYkiyB8n3pY0dqfpnNs7UvSpoKzzvFgg6WBWMtfe2Q7ywLdOLojwQOftApmxlLFDfUtV2_LdaN0aNuTxdn8nvIRk6kEL0W3_gng1hIyGsq4rvXUnM0CYD4JUWUsGV99Tu3ugr6Il6Dw&isca=1",
    quantity: 10,
    rating: 4.5,
    is_halal: true,
    is_vegan: false,
  });

  const myRef = React.createRef();

//   useEffect(() => {
//     const url = `https://dummyjson.com/products/${id}`;
//     async function fetchData() {
//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setData(data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetchData();
//   }, [id]);

  return (
    <Container sx={{ py: 4 }} maxWidth="lg">
    <Card sx={{ display: "flex", width: "100%", padding: 2, alignItems: "stretch" }}>
      {/* Product Image */}
      <Box
        component="img"
        src="/broccoli_opt.jpg"
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
        {/* Product Name */}
        <Typography variant="h5" gutterBottom>
          {data.name}
        </Typography>
        
        {/* Rating */}
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="body1">{data.rating.toFixed(1)}</Typography>
          <Rating value={data.rating} precision={0.1} readOnly />
        </Box>

        {/* Price */}
        <Typography variant="h6" color="primary" sx={{ marginY: 1 }}>
          ${data.price.toFixed(2)}
        </Typography>

        {/* Add to Cart Button */}
        <Box>
            <Button
                variant="contained"
                color="success"
                startIcon={<AddShoppingCartIcon />}
                onClick={() => addToCart(data)}
            >
                Add to Cart
            </Button>
        </Box>
        {/* <Button variant="contained" color="success" startIcon={<AddShoppingCartIcon />}>
          Add to Cart
        </Button> */}

        {/* Divider */}
        <Divider sx={{ marginY: 2 }} />

        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Description
        </Typography>

        {/* Product Description */}
        <Typography variant="body2" color="text.secondary">
          {data.description}
        </Typography>
      </CardContent>
    </Card>
    <RelatedProducts relatedProducts={["Product 1", "Product 2", "Product 3"]} />
    </Container>
  );
}

const RelatedProducts = ({ relatedProducts }) => {
    return (
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          Related Products
        </Typography>
        <Grid2 container spacing={3}>
            {relatedProducts.map((prod, index) => (
                <Grid2 item xs={12} sm={6} md={4} key={index}>
                    <Card key={index} sx={{ display: "flex", marginBottom: 2, flexDirection: "column", height: "100%" }}>
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
                    </Card>
                </Grid2>
            //   <ProductCard key={index} product={prod} />
            ))}
        </Grid2>
      </Box>
    );
};