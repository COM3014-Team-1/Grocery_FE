import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Skeleton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../utils/currencyUtil';
import Rating from '@mui/material/Rating';

const ProductCard = ({ product }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    useNavigate(`/product/${product.product_id}`);
  };

  return (
    <Card
      sx={{
        width: 260,
        height: 330,
        m: 1,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
        )}
        <Box
          component="img"
          src={product.image_url}
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          sx={{
            display: imageLoaded ? 'block' : 'none',
            width: '100%',
            height: '100%',
            objectFit: 'contain', // ensures full image is visible
            borderRadius: '4px',
            backgroundColor: '#f5f5f5', // optional: adds background behind transparent areas
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          noWrap
          title={product.name}
          sx={{ fontWeight: 'bold' }}
        >
          {product.name}
        </Typography>
        <Rating value={product.rating} readOnly size="small" />
        <Typography variant="body2" sx={{ mt: 1 }}>
          {formatCurrency(product.price)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
