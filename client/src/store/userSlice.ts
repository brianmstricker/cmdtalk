import { StateCreator } from "zustand";

export interface UserSlice {
 user: string;
 setUser: (user: string) => void;
 logout: () => void;
}

export const userSlice: StateCreator<UserSlice, [], [], UserSlice> = (set) => ({
 user: "",
 setUser: (user) => set(() => ({ user })),
 logout: () => set({ user: "" }),
});
