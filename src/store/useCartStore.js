// import { create } from "zustand";
// import { persist } from "zustand/middleware";

// const INITIAL_STATE = {
//     cart: [],
//     totalItems: 0,
//     totalPrice: 0
// };

// export const useCartStore = create(
//     persist(
//         (set, get) => ({
//             cart: INITIAL_STATE.cart,
//             totalItems: INITIAL_STATE.totalItems,
//             totalPrice: INITIAL_STATE.totalPrice,
//             addToCart: (product) => {
//                 const cart = get().cart;
//                 const cartItem = cart.find((item) => item.id === product.id);

//                 if (cartItem) {
//                     const updatedCart = cart.map((item) =>
//                         item.id === product.id
//                             ? { ...item, quantity: item.quantity + 1 }
//                             : item
//                     );
//                     set((state) => ({
//                         cart: updatedCart,
//                         totalItems: state.totalItems + 1,
//                         totalPrice: state.totalPrice + product.price
//                     }));
//                 } else {
//                     const updatedCart = [...cart, { ...product, quantity: 1 }];

//                     set((state) => ({
//                         cart: updatedCart,
//                         totalItems: state.totalItems + 1,
//                         totalPrice: state.totalPrice + product.price
//                     }));
//                 }
//             },
//             removeFromCart: (product) => {
//                 const cart = get().cart;
//                 const cartItem = cart.find((item) => item.id === product.id);

//                 if (cartItem && cartItem.quantity > 1) {
//                     const updatedCart = cart.map((item) =>
//                         item.id === product.id
//                             ? { ...item, quantity: item.quantity - 1 }
//                             : item
//                     );
//                     set((state) => ({
//                         cart: updatedCart,
//                         totalItems: state.totalItems - 1,
//                         totalPrice: state.totalPrice - product.price
//                     }));
//                 } else {
//                     set((state) => ({
//                         cart: state.cart.filter((item) => item.id !== product.id),
//                         totalItems: state.totalItems - 1,
//                         totalPrice: state.totalPrice - product.price
//                     }));
//                 }
//             },
//             removeProductFromCart: (product) => {
//                 set((state) => ({
//                     cart: state.cart.filter((item) => item.id !== product.id),
//                     totalItems: state.totalItems - 1,
//                     totalPrice: state.totalPrice - product.price
//                 }));
//             },
//             emptyCart: () => {
//                 set(() => ({
//                     cart: [],
//                     totalItems: 0,
//                     totalPrice: 0
//                 }));
//             }
//         }),
//         {
//             name: "cart-storage"
//         }
//     )
// );


import { create } from "zustand";
import { useUserStore } from "./useUserStore";

const url = 'localhost:5001/order/cart';
const uid = useUserStore.getState().user?.uid || '123456';

export const useCartStore = create((set, get) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,

  fetchCart: async () => {
    try {
      const res = await fetch(`${url}/${uid}`, { credentials: "include" });
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
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  },

  removeFromCart: async (product) => {
    try {
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product.id, quantity: -1 }),
      });

      await get().fetchCart();
    } catch (err) {
      console.error("Failed to remove item from cart:", err);
    }
  },

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
      await fetch("/api/cart", {
        method: "DELETE",
        credentials: "include",
      });

      set({ cart: [], totalItems: 0, totalPrice: 0 });
    } catch (err) {
      console.error("Failed to empty cart:", err);
    }
  },
}));

