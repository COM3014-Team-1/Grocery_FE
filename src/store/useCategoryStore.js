// store/categoryStore.js
import { create } from 'zustand';
import { getAuthToken } from '../utils/auth';

const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: true,
  fetchCategories: async () => {
    set({ isLoading: true });
    try {
    const token = getAuthToken();
    const response = await fetch("http://127.0.0.1:5001/categories", {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    const data = await response.json();
      set({ categories: data });
    } catch (err) {
      console.error('Failed to fetch categories', err);
    } finally {
      set({ isLoading: false });
    }
  }
}));

export default useCategoryStore;

