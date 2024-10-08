import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export interface UserSlice {
 user: string;
 setUser: (user: string) => void;
 logout: () => void;
}

export const userSlice: StateCreator<UserSlice, [], [["zustand/persist", UserSlice]]> = persist(
 (set) => ({
  user: "",
  setUser: (user) => set(() => ({ user })),
  logout: () => set({ user: "" }),
 }),
 {
  name: "user-storage",
 }
);
