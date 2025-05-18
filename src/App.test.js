import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import useCategoryStore from './store/useCategoryStore';
import React from 'react';
// Mock the useCategoryStore hook
jest.mock('./store/useCategoryStore', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('App Component', () => {
  beforeEach(() => {
    useCategoryStore.mockReturnValue({
      categories: [],
      fetchCategories: jest.fn(),
      isLoading: false,
    });
  });

  test('renders the Header component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const headerElement = screen.getByRole('banner'); // Assuming Header has a role="banner"
    expect(headerElement).toBeInTheDocument();
  });

  test('renders the Home component when on the root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const homeElement = screen.getByText(/categories/i); // Assuming Home displays "categories"
    expect(homeElement).toBeInTheDocument();
  });

  test('renders the CircularProgress when loading', () => {
    useCategoryStore.mockReturnValueOnce({
      categories: [],
      fetchCategories: jest.fn(),
      isLoading: true,
    });

    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loadingElement = screen.getByRole('progressbar'); // CircularProgress has role="progressbar"
    expect(loadingElement).toBeInTheDocument();
  });

  test('renders the AuthForm component when on the /login route', () => {
    window.history.pushState({}, 'Login Page', '/login');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const loginElement = screen.getByText(/login/i); // Assuming AuthForm displays "login"
    expect(loginElement).toBeInTheDocument();
  });

  test('renders the SignupForm component when on the /signup route', () => {
    window.history.pushState({}, 'Signup Page', '/signup');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const signupElement = screen.getByText(/signup/i); // Assuming SignupForm displays "signup"
    expect(signupElement).toBeInTheDocument();
  });

  test('renders the ProductDetail component when on the /product/:id route', () => {
    window.history.pushState({}, 'Product Page', '/product/1');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const productDetailElement = screen.getByText(/product detail/i); // Assuming ProductDetail displays "product detail"
    expect(productDetailElement).toBeInTheDocument();
  });

  test('renders the CategoryPage component when on the /category/:id route', () => {
    window.history.pushState({}, 'Category Page', '/category/1');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const categoryPageElement = screen.getByText(/category/i); // Assuming CategoryPage displays "category"
    expect(categoryPageElement).toBeInTheDocument();
  });

  test('renders the CheckoutPage component when on the /cart route', () => {
    window.history.pushState({}, 'Cart Page', '/cart');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const checkoutPageElement = screen.getByText(/checkout/i); // Assuming CheckoutPage displays "checkout"
    expect(checkoutPageElement).toBeInTheDocument();
  });
});

