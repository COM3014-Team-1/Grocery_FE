// store/useUserStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (userData) => set({ user: userData }),
      logout: async () => {
        try {
          // Call BFF logout to clear token cookie
          await fetch("http://localhost:5001/user/logout", {
            method: "POST",
            credentials: "include",
          });

          // Clear Zustand state
          set({ user: null });

          // Clear persisted user from localStorage
          localStorage.removeItem('user-storage');
        } catch (error) {
          console.error("Logout failed:", error);
        }
      },
    }),
    {
      name: 'user-storage',
      getStorage: () => localStorage,
    }
  )
);
