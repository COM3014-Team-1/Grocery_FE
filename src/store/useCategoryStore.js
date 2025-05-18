// store/categoryStore.js
import { create } from 'zustand';

const useCategoryStore = create((set) => ({
  categories: [],
  isLoading: true,
  fetchCategories: async () => {
    set({ isLoading: true });
    try {
    const response = await fetch("http://grocerybff-env.eba-vmrzu4fu.eu-west-2.elasticbeanstalk.com/categories", {
      headers: {
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

