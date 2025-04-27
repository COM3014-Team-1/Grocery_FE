import { formatCurrency, getTotalPrice } from "../../utils/currencyUtil";

describe("formatCurrency", () => {
    it("should format a number as currency with default GBP", () => {
        const result = formatCurrency(1234.56);
        expect(result).toBe("£1,234.56");
    });

    it("should format a number as currency with specified currency", () => {
        const result = formatCurrency(1234.56, "USD");
        expect(result).toBe("$1,234.56");
    });

    it("should format 0.0 as currency by default", () => {
        const result = formatCurrency();
        expect(result).toBe("£0.00");
    });

    it("should handle negative values correctly", () => {
        const result = formatCurrency(-1234.56, "EUR");
        expect(result).toBe("-€1,234.56");
    });
});

describe("getTotalPrice", () => {
    it("should calculate the total price of items in the cart", () => {
        const cart = [
            { subtotal: "10.50" },
            { subtotal: "20.75" },
            { subtotal: "5.25" },
        ];
        const result = getTotalPrice(cart);
        expect(result).toBe(36.5);
    });

    it("should return 0 for an empty cart", () => {
        const cart = [];
        const result = getTotalPrice(cart);
        expect(result).toBe(0);
    });

    it("should handle cart with one item", () => {
        const cart = [{ subtotal: "15.00" }];
        const result = getTotalPrice(cart);
        expect(result).toBe(15);
    });

    it("should handle cart with invalid subtotal values gracefully", () => {
        const cart = [
            { subtotal: "10.50" },
            { subtotal: "invalid" },
            { subtotal: "5.25" },
        ];
        const result = getTotalPrice(cart);
        expect(result).toBe(15.75);
    });
});