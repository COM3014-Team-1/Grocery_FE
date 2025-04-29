import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box, Typography, Card, Divider, Slider, Checkbox, FormControlLabel, FormGroup, FormLabel, Select, MenuItem, Button, Rating, Grid2, CircularProgress } from '@mui/material';
import ProductCard from '../../components/ProductCard';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAuthToken } from '../../utils/auth';

const FilterPanel = ({ filters, setFilters, clearFilters }) => {
  const handlePriceChange = (event, newValue) => {
      setFilters(prev => ({ ...prev, priceRange: newValue }));
  };
  
  const handleRatingChange = (ratingValue) => {
      setFilters((prev) => {
        const isSelected = prev.rating.includes(ratingValue);
        return {
          ...prev,
          rating: isSelected
            ? prev.rating.filter(r => r !== ratingValue) // deselect
            : [...prev.rating, ratingValue], // select
        };
      });
  };
  
  return <Card sx={{ width: 260, p: 2, position: 'sticky', top: 0, height: '95vh', overflowY: 'auto', bgcolor: '#fff' }}>
  <Box mb={3}>
      <FormLabel>Sort</FormLabel>
      <Select fullWidth size="small" value={filters.sort} onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}>
      <MenuItem value="az">Alphabetically, A-Z</MenuItem>
      <MenuItem value="za">Alphabetically, Z-A</MenuItem>
      <MenuItem value="low-high">Price, Low to High</MenuItem>
      <MenuItem value="high-low">Price, High to Low</MenuItem>
      </Select>
  </Box>

  <Divider sx={{ mb: 2 }} />

  <Box mb={3}>
      <FormLabel>Price Range</FormLabel>
      <Slider
        value={filters.priceRange}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        min={0}
        max={12}
      />
    </Box>

  <Divider sx={{ mb: 2 }} />

  <Box mb={3}>
      <FormLabel>Ratings</FormLabel>
      <Box mt={1}>
        {[5, 4, 3, 2, 1].map((val) => (
          <FormControlLabel
            key={val}
            control={<Checkbox checked={filters.rating.includes(val)} onChange={() => handleRatingChange(val)} />}
            label={<Rating value={val} readOnly size="small" />}
          />
        ))}
      </Box>
    </Box>
    

  <Divider sx={{ mb: 2 }} />

  <Box mb={3}>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Is Halal" />
        <FormControlLabel control={<Checkbox />} label="Is Vegan" />
      </FormGroup>
  </Box>

  <Divider sx={{ mb: 2 }} />

  <Button fullWidth color="error" variant="contained" onClick={clearFilters}>CLEAR ALL FILTERS</Button>    
  </Card>
};

const CategoryHeadingCard = ({ category_name, searchQuery, setSearchQuery }) => (
  <Card sx={{ mb: 3, p: 2, backgroundColor: 'white' }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
      <Typography variant="h4" color="success.main">{category_name}</Typography>
      <TextField
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        sx={{
          minWidth: 250,
          '& .MuiOutlinedInput-root': {
            color: 'success.main',
            '& fieldset': { borderColor: 'success.main' },
            '&:hover fieldset': { borderColor: 'success.main' },
            '&.Mui-focused fieldset': { borderColor: 'success.main' },
          },
          '& .MuiInputLabel-root': { color: 'success.main' },
          '& .MuiInputBase-input::placeholder': { color: 'success.main', opacity: 1 },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'success.main' }} />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  </Card>
);

const CategoryPage = ({ id }) => {
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const [filters, setFilters] = useState({
    sort: 'az',
    priceRange: [0, 12],
    rating: [],
  });

  const clearFilters = () => {
    setFilters({ sort: 'az', priceRange: [0, 12], rating: [] });
  };

  useEffect(() => {
    setFetching(true);
    setProducts([]);
    const token = getAuthToken();
    fetch(`http://localhost:5001/products/by-category/${id}`, {
      credentials: "include",
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFetching(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setFetching(false);
      });
  }, [id]);

  useEffect(() => {
    if (searchQuery.length >= 3) {
      setSearchLoading(true);
      const timer = setTimeout(() => {
        const matched = products.filter(p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(matched);
        setSearchLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setSearchLoading(false);
    }
  }, [searchQuery, products]);

  const applyFilters = (productList) => {
    let filtered = [...productList];
    if (filters.priceRange) {
      filtered = filtered.filter(p =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
      );
    }
    if (filters.rating.length > 0) {
      filtered = filtered.filter(p =>
        filters.rating.includes(Math.floor(p.rating))
      );
    }
    switch (filters.sort) {
      case 'az': filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
      case 'za': filtered.sort((a, b) => b.name.localeCompare(a.name)); break;
      case 'low-high': filtered.sort((a, b) => a.price - b.price); break;
      case 'high-low': filtered.sort((a, b) => b.price - a.price); break;
      default: break;
    }
    return filtered;
  };

  const filteredProducts = applyFilters(products);
  const category = filteredProducts.length > 0 ? filteredProducts[0].category_name : 'Category';

  return (
    <Box display="flex" maxHeight="200vh" overflow="hidden" p={1} width="100%">
      <FilterPanel filters={filters} setFilters={setFilters} clearFilters={clearFilters} />
      <Box flex={1} ml={2} display="flex" flexDirection="column" maxHeight="200vh">
        <CategoryHeadingCard
          category_name={category}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {fetching && <CircularProgress color="success" sx={{ mb: 1 }} />}

        <Box flex={1} overflow="auto" pr={2}>
          {searchLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Grid2 container spacing={1}>
              {(searchQuery.length >= 3 ? searchResults : filteredProducts).map((product) => (
                <Grid2 item key={product.product_id}>
                  <ProductCard product={product} />
                </Grid2>
              ))}
            </Grid2>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryPage;