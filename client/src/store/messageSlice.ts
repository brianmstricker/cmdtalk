import { StateCreator } from "zustand";

export interface MessageSlice {
 messages: string[];
 addMessage: (message: string) => void;
}

export const messageSlice: StateCreator<MessageSlice, [], [], MessageSlice> = (set) => ({
 messages: [],
 addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
});
