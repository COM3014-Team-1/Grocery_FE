import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CartDrawer from '../../components/CartDrawer';
import { useCartStore } from '../../store/useCartStore';
import {act, render, screen, fireEvent, waitFor } from '@testing-library/react';

jest.mock('../../store/useCartStore', () => ({
    useCartStore: jest.fn(),
}));

jest.mock('../../utils/currencyUtil', () => ({
    formatCurrency: jest.fn((value) => `$${parseFloat(value).toFixed(2)}`),
    getTotalPrice: jest.fn((cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0)),
}));

describe('CartDrawer Component', () => {
    const mockOnClose = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useCartStore.mockReturnValue({
            fetchCart: jest.fn(() => Promise.resolve()),
            cart: [],
            removeProductFromCart: jest.fn(),
            updateQuantity: jest.fn(),
        });
    });


    it('renders the CartDrawer component when open', async () => {
        await act(async () => {
            render(
                <Router>
                    <CartDrawer open={true} onClose={mockOnClose} />
                </Router>
            );
        });
    
        expect(screen.getByText('Cart is Empty')).toBeInTheDocument();
    }); 

    it('displays cart items when cart is not empty', async () => {
        useCartStore.mockReturnValue({
            fetchCart: jest.fn(() => Promise.resolve()),
            cart: [
                { product_id: 1, product_name: 'Apple', price: 1.5, quantity: 2 },
                { product_id: 2, product_name: 'Banana', price: 0.5, quantity: 3 },
            ],
            removeProductFromCart: jest.fn(),
            updateQuantity: jest.fn(),
        });

        await act(async () => {
            render(
                <Router>
                    <CartDrawer open={true} onClose={mockOnClose} />
                </Router>
            );
        });

        expect(screen.getByText('Apple')).toBeInTheDocument();
        expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', async () => {
        await act(async () => {
        render(
            <Router>
                <CartDrawer open={true} onClose={mockOnClose} />
            </Router>
        );
        }
        );

        fireEvent.click(screen.getByRole('button', { name: /cancel/i }));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('navigates to the cart page on checkout button click', async () => {
        useCartStore.mockReturnValue({
            fetchCart: jest.fn(() => Promise.resolve()),
            cart: [
                { product_id: 1, name: 'Apple', price: 1.5, quantity: 2 },
            ],
            removeProductFromCart: jest.fn(),
            updateQuantity: jest.fn(),
        });

        await act(async () => {
            render(
                <Router>
                    <CartDrawer open={true} onClose={mockOnClose} />
                </Router>
            );
        }
        );

        fireEvent.click(screen.getByRole('button', { name: /checkout now/i }));
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('disables the checkout button when the cart is empty', async () => {
        await act(async () => {
        render(
            <Router>
                <CartDrawer open={true} onClose={mockOnClose} />
            </Router>
        );
        }
        );

        expect(screen.getByRole('button', { name: /checkout now/i })).toBeDisabled();
    });
});