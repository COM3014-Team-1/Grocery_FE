import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import { getAuthToken } from "../utils/auth"; // Adjust the import path as necessary
import { orderResponseMapping } from "../utils/responseMapping";

const url = 'http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/order/cart';

export const useCartStore = create((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  fetchCart: async () => {
    try {
      const uid = useUserStore.getState().user.userId;
      if (!uid) {
        console.error("User ID is not available. Cannot fetch cart.");
        return;
      }
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
      set({ cart: [] });
      set({ totalItems: 0 });
      set({ totalPrice: 0 });
      console.error("Failed to fetch cart:", err);
    }
  },

  addToCart: async (product) => {
    try {
      const token = getAuthToken();
      const uid = useUserStore.getState().user.userId;
      if (!uid) {
        console.error("User ID is not available. Cannot add to cart.");
        return;
      }
      await fetch(`${url}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ product_id: product.product_id, quantity: 1, user_id: uid, unit_price: product.price }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  },

  removeProductFromCart: async (productId) => {
    try {
      const token = getAuthToken();
      const uid = useUserStore.getState().user.userId;
      if (!uid) {
        console.error("User ID is not available. Cannot remove from cart.");
        return;
      }
      await fetch(`${url}/remove`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
        body: JSON.stringify({ products: [productId], user_id: uid }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to remove product from cart:", err);
    }
  },

  emptyCart: async () => { //call when  order is placed
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

  updateQuantity: async (productId, quantity) => {
    try {
      const token = getAuthToken();
      await fetch(`${url}/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ quantity }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to increase quantity:", err);
    }
  },
  
  placeOrder: async (shippingAddress) => {
    try {
      const token = getAuthToken();
      const orderData = orderResponseMapping(get().cart, shippingAddress);

      await fetch("http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      await get().fetchCart();
      // await get().emptyCart();
    } catch (err) {
      console.error("Failed to place order:", err);
    }
  },
}));

