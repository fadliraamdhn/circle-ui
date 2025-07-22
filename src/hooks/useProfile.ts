import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setProfile } from "@/store/profileSlice";

export function useProfile() {
    const profile = useSelector((state: RootState) => state.profile.profile);
    const dispatch = useDispatch();

    return {
        profile,
        setProfile: (profileData: any) => dispatch(setProfile(profileData)),
    };
}
