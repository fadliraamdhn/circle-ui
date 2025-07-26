import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type LikeState = {
  [threadId: number]: {
    liked: "YES" | "NO";
  };
};

const initialState: LikeState = {};

const likeSlice = createSlice({
  name: "likes",
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<number>) => {
      const threadId = action.payload;
      const current = state[threadId];
      if (current) {
        state[threadId].liked = current.liked === "YES" ? "NO" : "YES";
      }
    },
    updateLikeFromBackend: (
      state,
      action: PayloadAction<{ threadId: number; liked: "YES" | "NO" }>
    ) => {
      const { threadId, liked } = action.payload;
      state[threadId] = { liked };
    },
  },
});

export const { toggleLike, updateLikeFromBackend } = likeSlice.actions;
export default likeSlice.reducer;
