import { useUserStore } from "../store/useUserStore";
import { getTotalPrice } from "./currencyUtil";

export const orderResponseMapping = (cart, shippingAddress) => {
    const userId = useUserStore.getState().user.userId;
    if (!userId) {
        throw new Error("User ID is not available in the store.");
    }
    return {
        user_id: userId,
        shipping_address: shippingAddress,
        total_amount: getTotalPrice(cart),
        order_status: "pending",
        order_items: cart.map((item) => ({
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.unit_price,
        })),
    };
}