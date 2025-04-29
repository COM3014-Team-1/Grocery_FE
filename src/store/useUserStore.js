import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  logout: () => {
    // Clear Zustand state
    set({ user: null });
    // Clear session storage
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  },
}));
