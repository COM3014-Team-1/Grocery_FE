import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import { getAuthToken } from "../utils/auth";

const url = 'http://127.0.0.1:5001/order/user';
const uid = useUserStore.getState().user.userId;

export const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      const token = getAuthToken();
      const res = await fetch(`${url}/${uid}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      // Optional: Calculate total_quantity here if backend doesn't
      const ordersWithQty = data.map(order => ({
        ...order,
        total_quantity: order.order_items?.reduce((sum, item) => sum + item.quantity, 0) || 0
      }));

      set({ orders: ordersWithQty });
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  },
}));
