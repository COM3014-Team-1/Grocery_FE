import React, {useState } from 'react';
import { Box, Typography, Card, Divider, CardActionArea, CardMedia, CardContent, Container } from '@mui/material';
import CategoryPage from '../Category/CategoryPage';


const Home = ({ categories }) => {

  // if(categories.length > 0) {
    const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].category_id);
  

  return (
    <Box>
      {/* Top Banner Image */}
      <Box sx={{backgroundColor: '#084a1f'}}>
        <img
          src="/Home_Page.png"
          alt="Banner"
          style={{ width: '40%', maxHeight: '500px', objectFit: 'fill', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}  
        />
      </Box>
      <Box>
        <img
          src="/Home_Page_2.png"
          alt="Banner"
          style={{ width: '70%', maxHeight: '500px', objectFit: 'fill', marginLeft: 'auto', marginRight: 'auto', display: 'block' }}
        />
      </Box>

      {/* Shop By Category Heading */}
      <Container sx={{ my: 4}}>
      <Box display="flex" alignItems="center" mb={3}>
        <Divider sx={{ flexGrow: 1 }} />
        <Typography variant="h5" fontWeight="bold" sx={{ mx: 2, whiteSpace: 'nowrap' }}>
          Shop By Category
        </Typography>
        <Divider sx={{ flexGrow: 1 }} />
      </Box>

        {/* Scrollable Category Row */}
        <Box
          display="flex"
          overflow="auto"
          gap={2}
          pb={2}
        >
          {categories.map((category) => (
            <Card
              key={category.category_id}
              sx={{
                minWidth: 120,
                minHeight: 120,
                borderRadius: 2,
                border: selectedCategoryId === category.category_id ? '2px solid green' : '1px solid #ccc',
                flexShrink: 0,
              }}
            >
              <CardActionArea onClick={() => setSelectedCategoryId(category.category_id)}>
                <CardMedia
                  component="img"
                  height="80"
                  image='/broccoli_opt.jpg'
                  alt={category.name}
                  sx={{ objectFit: 'contain', borderRadius: 1, backgroundColor: '#f5f5f5', }}
                />
                <CardContent sx={{ textAlign: 'center', p: 1 }}>
                  <Typography variant="subtitle2">{category.name}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Category Page */}
        <CategoryPage id={selectedCategoryId} />
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
// }
};

// Simple Footer Component
const Footer = () => (
  <Box
    mt={4}
    p={2}
    bgcolor="success.main"
    color="white"
    textAlign="center"
  >
    <Typography variant="body2">© {new Date().getFullYear()} Grocify. All rights reserved.</Typography>
  </Box>
);

export default Home;
