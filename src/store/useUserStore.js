import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '', // optional: add avatar URL if you want to show user image
  },
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
