import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import type { Follower } from "@/types/profile";
import { mapToProfile } from "@/types/profile";
import { useDispatch } from "react-redux";
import { setProfile } from "@/store/profileSlice";
import { baseUrl } from "@/utils/apiProd";


const FollowingList = () => {
    const [followings, setFollowings] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFollowers = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/followings");
            
            setFollowings(res.data.data);
        } catch (err) {
            console.error("Failed to fetch followers", err);
        } finally {
            setLoading(false);
        }
        };

        fetchFollowers();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-400 mt-4">Loading followers...</p>;
    }

    if (followings.length === 0) {
        return <p className="text-center text-gray-400 mt-4">No followers yet.</p>;
    }

    const handleToggleFollow = async (targetUserId: number) => {
        try {
            await axiosInstance.post("/api/v1/follow", { targetUserId: targetUserId });
                
            setFollowings((prev) =>
            prev.map((f) =>
                f.id === targetUserId ? { ...f, isFollowed: !f.isFollowed } : f
            )
            );
    
            const res = await axiosInstance.get("/api/v1/auth/profile");
            dispatch(setProfile(mapToProfile(res.data.data)));
        } catch (err) {
            console.error("Failed to toggle follow", err);
        }
    };

    return (
        <div className="w-full mx-auto px-4 mt-6 space-y-4">
        {followings.map((following) => (
            <div  key={following.id} className="flex justify-between">
                <div className="flex items-center gap-4 pb-3">
                    <img
                        src={
                        following.photo_profile
                            ? `${baseUrl}/uploads/${following.photo_profile}`
                            : "default.jpg"
                        }
                        alt={following.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{following.full_name}</p>
                        <p className="text-sm text-gray-500">@{following.username}</p>
                        <p className="text-sm text-gray-400">{following.bio}</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => handleToggleFollow(following.id)}
                        className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium ${
                        following.isFollowed ? "bg-gray-200 text-black" : "bg-green-500 text-white"
                        }`}
                    >
                        {following.isFollowed ? "Following" : "Follow"}
                    </button>
                </div>
            </div>
        ))}
        </div>
    );
};

export default FollowingList;
