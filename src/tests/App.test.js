import { render, screen } from '@testing-library/react';
import App from '../App';
import useCategoryStore from '../store/useCategoryStore';
import { useCartStore } from '../store/useCartStore';
import React from 'react';
import { act } from '@testing-library/react'; 

// Mock the useCategoryStore hook
jest.mock('../store/useCategoryStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    useCategoryStore.mockReturnValue({
      categories: [{
        category_id: 1,
      }],
      fetchCategories: jest.fn(),
      isLoading: false,
    });
    act(() => {
      useCartStore.setState({
        cart: [],
        totalItems: 0,
        totalPrice: 0,
        fetchCart: jest.fn(),
        addToCart: jest.fn(),
        removeProductFromCart: jest.fn(),
        emptyCart: jest.fn(),
        updateQuantity: jest.fn(),
        placeOrder: jest.fn(),
      });
    });
  });

  test('renders the Header component', () => {
    render(
        <App />
    );
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Home component when on the root route', () => {
    render(
        <App />
    );
    const homeElement = screen.getByText(/Shop By Category/i);
    expect(homeElement).toBeInTheDocument();
  });

  test('renders the CircularProgress when loading', () => {
    useCategoryStore.mockReturnValueOnce({
      categories: [],
      fetchCategories: jest.fn(),
      isLoading: true,
    });

    render(
        <App />
    );
    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders the AuthForm component when on the /login route', () => {
    window.history.pushState({}, 'Login Page', '/login');
    render(
        <App />
    );
    const loginElement = screen.getByText(/Sign In to continue./i);
    expect(loginElement).toBeInTheDocument();
  });

  test('renders the SignupForm component when on the /signup route', () => {
    window.history.pushState({}, 'Signup Page', '/signup');
    render(
        <App />
    );
    const signupElement = screen.getByRole('button', {name: /sign up/i});
    expect(signupElement).toBeInTheDocument();
  });

  test('renders the CategoryPage component when on the /category/:id route', () => {
    window.history.pushState({}, 'Category Page', '/category/1');
    render(
        <App />
    );
    const categoryPageElement = screen.getByText(/category/i);
    expect(categoryPageElement).toBeInTheDocument();
  });
});

describe('ProductDetail page', () => {
  beforeEach(() => {
    // Mock MutationObserver
    global.MutationObserver = class {
      constructor(callback) {}
      disconnect() {}
      observe(element, initObject) {}
      takeRecords() { return []; }
    };
  
    // Mock fetch
    global.fetch = jest.fn((url) => {
      if (url.includes('/products/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({
            product_id: 1,
            name: 'Test Product',
            price: 9.99,
            description: 'using this product for testing',
            category_name: 'Test Category',
            image_url: 'http://example.com/image.jpg',
            quantity: 10,
            rating: 4.5,
            is_halal: true,
            is_vegan: false,
            category_id: 2,
          }),
        });
      }
      if (url.includes('/products/by-category/2')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([]),
        });
      }
      return Promise.reject(new Error('Unknown API endpoint'));
    });
  });
  

  afterEach(() => {
    jest.resetAllMocks(); // clean mocks after each test
  });

  test('renders the ProductDetail component when on the /product/:id route', async () => {
    window.history.pushState({}, 'Product Page', '/product/1');
    render(<App />);

    const productName = await screen.findByText(/test product/i);
    expect(productName).toBeInTheDocument();
  });
});


