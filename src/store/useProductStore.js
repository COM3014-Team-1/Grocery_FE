import { create } from "zustand";
const url = "https://dummyjson.com/products";

const INITIAL_STATE = {
    products: [
        {
            product_id: 1,
            name: "Product 1",
            price: 5.0,
            description: "Description 1",
            category: "Category 1",
            image_url: "https://ff8f0e5535f1a1c469eb29fb1a87cf079dfd66e26fdacc168f25888-apidata.googleusercontent.com/download/storage/v1/b/grocery-images-uos/o/broccoli.jpg?jk=AbSFce4u6wli-kZph1kh-sWvdiRaP8uCKIUNj3HqddAiyebhDFxRmGE4hB1Q_KCrxqtjxIR48-3d31lFOecsevH7HnkVqErRoQiV1Lk-VRRWHKC9_lT-RYMbJ5Qqv0QaX6vK21PNS8sFaqeiFvcmtaOV-yN6eacMXke9fMWJoMMxGKFULT3KYdM6GSLKrr4-_dOpsJysjrG4YIFYmmogvrS-w3BzWYOqO7VQuUYvB_nVhXMOLRMvoF67SmGdXJ_-6UKxYTJnNZJBS78-g-Cg-XXc4yfZzqviQD2E82VoE-mwEPyY8FSJ4cDC2cPwWWnTN-MFIn7K3f1LF-wOLszRBjfx9xICMH9ZGpwqHV7bcU09Xm557wKNMwjkz5s2KyBIr1EOk_vGqdH80PimyjlZ1cl9G_dN0F1VxgeXHsrhC6gKyGPmzBzR1WCXsMfgT8gqrE0C_Bx9MxAP8Ym6BvY_RFRrqzEyI5hcV7qwCZdliVNrIN-d1eJCaZgi3DkQ1EEyK9kxgxzsMEIAUu44tbC_ac4k3fhdOOLmCPA_i52eoyvV-D4ewZHVhRlcNanDk37tdinMpaIREq8lEzfy_5j6hqR3wqLRcNoC0H-WFti0PlkDMXKSoxNdQVWSwTqeq11bcOl1-dYAVzHXTjKbXXzH3HftEbfzoOawlYKEOV1bt9TP8_QHyoPPZYNkeTcCH_bDxglSorc-4JkDDhvGRkJ7MxcYIExZ5lFgBpWMbmi8FOxE2BNoCq0aOzT3jHn0gFYKB8fgHMH7dshIZw1da3uYLQ7QhhPc0V78ascrPAHq0COkNfe6EuXifFQYa22e0b91S08RNGDm8Pj943yLRqnkASV8ZTYktnc2IAAuQ0pIAiFFw5Pr0DUY_wNVb-m9dyMNcCL0aQ_uXRQuyC8Um1FplRHpVaZCKoqcEDIH0PBeBfonXNwyOaaOf6-lxi4FHX3RsGAc21i3Snss9mbx9fj5mBDXxzxcXyZAd6XMXJfhfNwMdYkiyB8n3pY0dqfpnNs7UvSpoKzzvFgg6WBWMtfe2Q7ywLdOLojwQOftApmxlLFDfUtV2_LdaN0aNuTxdn8nvIRk6kEL0W3_gng1hIyGsq4rvXUnM0CYD4JUWUsGV99Tu3ugr6Il6Dw&isca=1",
            quantity: 10,
            rating: 4.5,
            is_halal: true,
            is_vegan: false,
        }, 
        // {
        //     product_id: 2,
        //     name: "Product 2",
        //     price: 10.0,
        //     description: "Description 2",
        //     category: "Category 2",
        //     image_url: "https://dummyjson.com/image2.jpg",
        //     quantity: 20,
        //     rating: 4.0,
        //     is_halal: false,
        //     is_vegan: true,
        // }, 
        // {
        //     product_id: 3,
        //     name: "Product 3",
        //     price: 15.0,
        //     description: "Description 3",
        //     category: "Category 3",
        //     image_url: "https://dummyjson.com/image3.jpg",
        //     quantity: 30,
        //     rating: 4.8,
        //     is_halal: true,
        //     is_vegan: false,
        // }, 
        // {
        //     product_id: 4,
        //     name: "Product 4",
        //     price: 20.0,
        //     description: "Description 4",
        //     category: "Category 4",
        //     image_url: "https://dummyjson.com/image4.jpg",
        //     quantity: 40,
        //     rating: 4.2,
        //     is_halal: false,
        //     is_vegan: true,
        // }, 
        // {
        //     product_id: 5,
        //     name: "Product 5",
        //     price: 25.0,
        //     description: "Description 5",
        //     category: "Category 5",
        //     image_url: "https://dummyjson.com/image5.jpg",
        //     quantity: 50,
        //     rating: 4.1,
        //     is_halal: true,
        //     is_vegan: false,
        // }
    ],
    isLoading: false,
    error: null
};

export const useProductsStore = create((set) => ({
    products: INITIAL_STATE.products,
    isLoading: INITIAL_STATE.isLoading,
    error: INITIAL_STATE.error,
    fetchData: async () => {
        // Uncomment this when you want to fetch data from the API
        // try {
        //     set({ isLoading: true, error: null });
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     set({ products: data.products, isLoading: false });
        // } catch (error) {
        //     set({ error, isLoading: false });
        // }
    }
}));