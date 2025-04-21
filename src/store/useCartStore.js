import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import { getAuthToken } from "../utils/auth"; // Adjust the import path as necessary

const url = 'http://127.0.0.1:5001/order/cart';
const uid = useUserStore.getState().user.userId;

export const useCartStore = create((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  fetchCart: async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${url}/${uid}`, 
      { 
        method: "GET",
        credentials: "include", 
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      const totalItems = data.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = data.reduce((sum, item) => sum + item.quantity * item.price, 0);

      set({ cart: data, totalItems, totalPrice });
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  },

  addToCart: async (product) => {
    try {
      const token = getAuthToken();
      await fetch(`${url}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  },

  // removeFromCart: async (product) => {
  //   try {
  //     await fetch("/api/cart", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ productId: product.id, quantity: -1 }),
  //     });

  //     await get().fetchCart();
  //   } catch (err) {
  //     console.error("Failed to remove item from cart:", err);
  //   }
  // },

  removeProductFromCart: async (productId) => {
    try {
      await fetch(`/api/cart/${productId}`, {
        method: "DELETE",
        credentials: "include",
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to remove product from cart:", err);
    }
  },

  emptyCart: async () => {
    try {
      const token = getAuthToken();
      await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set({ cart: [], totalItems: 0, totalPrice: 0 });
    } catch (err) {
      console.error("Failed to empty cart:", err);
    }
  },

  increaseQuantity: async (productId) => {
    try {
      const token = getAuthToken();
      await fetch(`${url}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: 1 }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  },

  decreaseQuantity: async (productId) => {
    try {
      const token = getAuthToken();
      await fetch(`${url}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ productId, quantity: -1 }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
    }
  },
}));

