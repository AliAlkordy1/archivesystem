import { create } from "zustand";

export const useAppStore = create((set) => ({
  userRole:"admin",
  setUserRole:(userRole) => set({ userRole }),
  userCollege:"",
  setUserCollege:(userCollege) => set({ userCollege }),
  userName:"",
  setUserName:(userName) => set({ userName }),
  

  useDep:"",
  setDep:(useDep) => set({ useDep }),
  isLoggedIn: false,
  setLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  
}));