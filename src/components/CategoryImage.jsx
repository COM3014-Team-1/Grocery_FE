// React component for displaying a category image
import React from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';


const CategoryImage = ({ category, onClick, selectedCategoryId }) => {
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
        <CardActionArea onClick={onClick} sx={{alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100%'}}>
            <CardMedia
            component="img"
            height="80"
            image={category.category_imageurl}
            alt={category.name}
            sx={{ objectFit: 'contain', borderRadius: 1, backgroundColor: '#f5f5f5', }}
            />
            <CardContent>
            <Typography variant="subtitle1" noWrap title={category.name}>
                {category.name}
            </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    );
    }

export default CategoryImage;