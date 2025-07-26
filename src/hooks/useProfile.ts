import { useSelector } from "react-redux";
import type { RootState } from "@/store";

export function useProfile() {
    return useSelector((state: RootState) => state.profile.profile);
}
