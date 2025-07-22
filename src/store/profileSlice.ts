import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Profile } from "@/types/profile";

type ProfileState = {
    profile: Profile | null;
};

const initialState: ProfileState = {
    profile: null
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile(state, action: PayloadAction<Profile | null>) {
            state.profile = action.payload;
        },
    },
});

export const { setProfile } = profileSlice.actions;
export default profileSlice.reducer;
