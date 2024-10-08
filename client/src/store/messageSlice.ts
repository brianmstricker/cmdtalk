import { StateCreator } from "zustand";
import { persist } from "zustand/middleware";

export interface MessageSlice {
 messages: string[];
 addMessage: (message: string) => void;
}

export const messageSlice: StateCreator<MessageSlice, [], [["zustand/persist", MessageSlice]]> = persist(
 (set) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
 }),
 {
  name: "message-storage",
 }
);
