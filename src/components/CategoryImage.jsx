import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography, Skeleton } from '@mui/material';

const CategoryImage = ({ category, onClick, selectedCategoryId }) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  return (
    <Card
      sx={{
        width: 180,
        height: 140,
        borderRadius: 2,
        border: selectedCategoryId === category.category_id ? '2px solid green' : '1px solid #ccc',
        flexShrink: 0,
      }}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {!imageLoaded && (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="80px"
            animation="wave"
            sx={{ borderRadius: 1, backgroundColor: '#f5f5f5' }}
          />
        )}
        <CardMedia
          component="img"
          height="100"
          image={category.category_imageurl}
          alt={category.name}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} 
          sx={{
            objectFit: 'contain',
            borderRadius: 1,
            backgroundColor: '#f5f5f5',
            // display: imageLoaded ? 'block' : 'none',
          }}
        />
        <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 1}}>
          <Typography variant="subtitle1" noWrap title={category.name}>
            {category.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CategoryImage;
