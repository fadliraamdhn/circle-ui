import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { mapToProfile, type Follower } from "@/types/profile";
import { useDispatch } from "react-redux";
import { setProfile } from "@/store/profileSlice";
import { baseUrl } from "@/utils/apiProd";

const FollowersList = () => {
    const [followers, setFollowers] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchFollowers = async () => {
        try {
            const res = await axiosInstance.get("/api/v1/followers");
            
            setFollowers(res.data.data);
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

    if (followers.length === 0) {
        return <p className="text-center text-gray-400 mt-4">No followers yet.</p>;
    }
    
    const handleToggleFollow = async (targetUserId: number) => {
        try {
            await axiosInstance.post("/api/v1/follow", { targetUserId: targetUserId });
            
            setFollowers((prev) =>
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
        {followers.map((follower) => (
            <div  key={follower.id}  className="flex justify-between">
                <div className="flex items-center gap-4 pb-3">
                    <img
                        src={
                        follower.photo_profile
                            ? `${baseUrl}/uploads/${follower.photo_profile}`
                            : "default.jpg"
                        }
                        alt={follower.username}
                        className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                        <p className="font-semibold">{follower.full_name}</p>
                        <p className="text-sm text-gray-500">@{follower.username}</p>
                        <p className="text-sm text-gray-400">{follower.bio}</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => handleToggleFollow(follower.id)}
                        className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium ${
                        follower.isFollowed ? "bg-gray-200 text-black" : "bg-green-500 text-white"
                        }`}
                    >
                        {follower.isFollowed ? "Following" : "Follow"}
                    </button>
                </div>
            </div>
        ))}
        </div>
    );
};

export default FollowersList;
