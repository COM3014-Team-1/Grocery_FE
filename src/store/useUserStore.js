import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '', // optional: add avatar URL if you want to show user image
    userId: '7fe4a0ed-4206-4a77-9610-532d89fafc80'
  },
  setUser: (userData) => set({ user: userData }),
  logout: () => set({ user: null }),
}));
