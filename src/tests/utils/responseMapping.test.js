import { orderResponseMapping } from "../../utils/responseMapping";
import { useUserStore } from "../../store/useUserStore";
import { getTotalPrice } from "../../utils/currencyUtil";

jest.mock("../../store/useUserStore", () => ({
    useUserStore: {
        getState: jest.fn(),
    },
}));

jest.mock("../../utils/currencyUtil", () => ({
    getTotalPrice: jest.fn(),
}));

describe("orderResponseMapping", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should map the response correctly when userId is available", () => {
        const mockUserId = "12345";
        const mockCart = [
            { product_id: "p1", quantity: 2, unit_price: 10 },
            { product_id: "p2", quantity: 1, unit_price: 20 },
        ];
        const mockShippingAddress = "123 Main St";
        const mockTotalPrice = 40;

        useUserStore.getState.mockReturnValue({ user: { userId: mockUserId } });
        getTotalPrice.mockReturnValue(mockTotalPrice);

        const result = orderResponseMapping(mockCart, mockShippingAddress);

        expect(result).toEqual({
            user_id: mockUserId,
            shipping_address: mockShippingAddress,
            total_amount: mockTotalPrice,
            order_status: "pending",
            order_items: [
                { product_id: "p1", quantity: 2, unit_price: 10 },
                { product_id: "p2", quantity: 1, unit_price: 20 },
            ],
        });
        expect(useUserStore.getState).toHaveBeenCalled();
        expect(getTotalPrice).toHaveBeenCalledWith(mockCart);
    });

    it("should throw an error when userId is not available", () => {
        const mockCart = [
            { product_id: "p1", quantity: 2, unit_price: 10 },
        ];
        const mockShippingAddress = "123 Main St";

        useUserStore.getState.mockReturnValue({ user: { userId: null } });

        expect(() => orderResponseMapping(mockCart, mockShippingAddress)).toThrow(
            "User ID is not available in the store."
        );
        expect(useUserStore.getState).toHaveBeenCalled();
    });

    it("should handle an empty cart correctly", () => {
        const mockUserId = "12345";
        const mockCart = [];
        const mockShippingAddress = "123 Main St";
        const mockTotalPrice = 0;

        useUserStore.getState.mockReturnValue({ user: { userId: mockUserId } });
        getTotalPrice.mockReturnValue(mockTotalPrice);

        const result = orderResponseMapping(mockCart, mockShippingAddress);

        expect(result).toEqual({
            user_id: mockUserId,
            shipping_address: mockShippingAddress,
            total_amount: mockTotalPrice,
            order_status: "pending",
            order_items: [],
        });
        expect(useUserStore.getState).toHaveBeenCalled();
        expect(getTotalPrice).toHaveBeenCalledWith(mockCart);
    });
});