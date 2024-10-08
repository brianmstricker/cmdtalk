import { create } from "zustand";
import { MessageSlice, messageSlice } from "./messageSlice";
import { UserSlice, userSlice } from "./userSlice";

export const useBoundStore = create<MessageSlice & UserSlice>((...a) => ({
 ...messageSlice(...a),
 ...userSlice(...a),
}));
