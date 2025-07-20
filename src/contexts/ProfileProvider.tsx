import type { Profile } from "@/types/profile";
import { useState } from "react";
import { ProfileContext } from "./ProfileContext";

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null)

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
}