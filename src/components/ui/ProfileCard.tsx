import { useProfile } from "@/hooks/useProfile";
import { setProfile } from "@/store/profileSlice";
import { mapToProfile } from "@/types/profile";
import { baseUrl } from "@/utils/apiProd";
import { axiosInstance } from "@/utils/axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

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
        <div className="bg-zinc-900 rounded-xl overflow-hidden text-white lg:w-full mx-auto">
            <div className="bg-gradient-to-r from-green-300 via-yellow-300 to-green-400 h-24 w-full" />

            <div className="p-4 relative">
                <div className="absolute -top-10 left-4">
                <img
                    src= {profile?.photoProfile? `${baseUrl}/uploads/${profile?.photoProfile}` : "/default.jpg" } 
                    alt="profile"
                    className="w-20 h-20 rounded-full border-4 border-zinc-900"
                />
                </div>

                <div className="text-right">
                <Link to="/profile">
                    <button className="cursor-pointer border border-gray-500 rounded-full px-4 py-1 text-sm hover:bg-white hover:text-black transition">
                        Edit Profile
                    </button>
                </Link>
                </div>

                <div className="mt-4">
                <h2 className="font-bold text-xl">{profile?.fullname}</h2>
                <p className="text-gray-400">@{profile?.username}</p>
                <p className="mt-2 text-sm">
                    {profile?.bio ?? "No bio yet."}
                </p>

                <div className="flex gap-4 mt-3 text-sm text-gray-400">
                    <span><strong className="text-white">{profile?.following?.length}</strong> Following</span>
                    <span><strong className="text-white">{profile?.followers?.length}</strong> Followers</span>
                </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
