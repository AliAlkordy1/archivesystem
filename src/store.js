import { create } from "zustand";

export const useAppStore = create((set) => ({
  

  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
}));