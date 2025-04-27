import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductCard from '../../components/ProductCard';
import { formatCurrency } from '../../utils/currencyUtil';

jest.mock('../../utils/currencyUtil', () => ({
    formatCurrency: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

describe('ProductCard Component', () => {
    const mockProduct = {
        product_id: '123',
        name: 'Test Product',
        image_url: 'https://via.placeholder.com/150',
        price: 100,
        rating: 4.5,
    };

    beforeEach(() => {
        formatCurrency.mockReturnValue('$100.00');
    });

    it('renders product name, price, and rating', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );

        expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
        expect(screen.getByText('$100.00')).toBeInTheDocument();
        expect(screen.getByAltText( mockProduct.name)).toBeInTheDocument();
    });

    
    it('navigates to product details page on click', async () => {
        const mockNavigate = jest.fn();  // Create the mock function
        // Set the mockNavigate function for useNavigate
        require('react-router-dom').useNavigate.mockImplementation(mockNavigate);

        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );

        // Simulate the image load
        fireEvent.load(screen.getByAltText(mockProduct.name));  // Trigger onLoad event

        // Simulate a click on the entire Card component (use the product name as text)
        fireEvent.click(screen.getByText(mockProduct.name));

        // Check if the navigation was triggered with the correct URL
        expect(mockNavigate).toHaveBeenCalledWith(`/product/${mockProduct.product_id}`);
    });
    

    it('hides skeleton loader after image loads', () => {
        render(
            <BrowserRouter>
                <ProductCard product={mockProduct} />
            </BrowserRouter>
        );

        const image = screen.getByAltText(mockProduct.name);
        fireEvent.load(image);

        expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
});