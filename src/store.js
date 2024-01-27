import { create } from "zustand";

export const useAppStore = create((set) => ({
  userRole:false,
  setUserRole:(userRole) => set({ userRole }),
  useDep:"",
  setDep:(useDep) => set({ useDep }),
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
}));