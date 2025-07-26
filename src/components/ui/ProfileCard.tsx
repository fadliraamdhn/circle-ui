import { useProfile } from "@/hooks/useProfile";
import { setProfile } from "@/store/profileSlice";
import { mapToProfile } from "@/types/profile";
import { axiosInstance } from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const ProfileCard = () => {
    const dispatch = useDispatch();
    const profile = useProfile();

    useEffect(() => {
        const fetchProfile = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/auth/profile");
            const mapped = mapToProfile(res.data.data)

            dispatch(setProfile(mapped));
        } catch (err) {
            console.error("Failed to load profile:", err);
        }
        };

        if (!profile) {
            fetchProfile();
        }
    }, [dispatch, profile])

    return (
        <div className="bg-zinc-900 rounded-xl overflow-hidden text-white max-w-md mx-auto">
            <div className="bg-gradient-to-r from-green-300 via-yellow-300 to-green-400 h-24 w-full" />

            <div className="p-4 relative">
                <div className="absolute -top-10 left-4">
                <img
                    src={profile?.photoProfile || "data:image/jpeg;base64,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"}
                    alt="profile"
                    className="w-20 h-20 rounded-full border-4 border-zinc-900"
                />
                </div>

                <div className="text-right">
                <button className="border border-gray-500 rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition">
                    Edit Profile
                </button>
                </div>

                <div className="mt-4">
                <h2 className="font-bold text-xl">{profile?.fullname}</h2>
                <p className="text-gray-400">@{profile?.username}</p>
                <p className="mt-2 text-sm">
                    {profile?.bio ?? "No bio yet."}
                </p>

                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                    <span><strong className="text-white">{profile?.follower}</strong> Following</span>
                    <span><strong className="text-white">{profile?.following}</strong> Followers</span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
