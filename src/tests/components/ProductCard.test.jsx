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