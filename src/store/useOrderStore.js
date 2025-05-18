import { create } from "zustand";
import { useUserStore } from "./useUserStore";
import { getAuthToken } from "../utils/auth";

const url = 'http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/order/user';

export const useOrderStore = create((set) => ({
  orders: [],
  fetchOrders: async () => {
    try {
      const token = getAuthToken();
      const uid = useUserStore.getState().user.userId;
      if (!uid) {
        console.error("User ID is not available. Cannot fetch orders.");
        return;
      }
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
