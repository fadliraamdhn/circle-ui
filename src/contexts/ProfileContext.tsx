import { createContext } from "react";
import type { Profile } from "@/types/profile";

export type ProfileContextType = {
    profile: Profile | null
    setProfile: (profile: Profile | null) => void;
}

export const ProfileContext =  createContext<ProfileContextType | undefined>(undefined)