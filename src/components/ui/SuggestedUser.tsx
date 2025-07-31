import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { mapToProfile, type Follower } from "@/types/profile";
import { useDispatch } from "react-redux";
import { setProfile } from "@/store/profileSlice";

const SuggestedUsers = () => {
    const [users, setUsers] = useState<Follower[]>([]);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/suggestions");

                const shuffled = res.data.data.sort(() => Math.random() - 0.5).slice(0, 3);
                setUsers(shuffled);
            } catch (err) {
                console.error("Failed to fetch suggested users", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSuggestions();
    }, []);

    if (loading) return <p>Loading suggestions...</p>;
    if (users.length === 0) return <p>No suggestions available.</p>;

    const handleToggleFollow = async (targetUserId: number) => {
        try {
            await axiosInstance.post("/api/v1/follow", { targetUserId: targetUserId });
                    
            setUsers((prev) =>
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
        <div className="mt-4 space-y-3 border border-gray-600 rounded-md shadow-sm p-6">
        {users.map(user => (
            <div key={user.id} className="flex justify-between">
                <div  className="flex items-center gap-3">
                    <img
                        src={
                        user.photo_profile
                            ? `http://localhost:3000/uploads/${user.photo_profile}`
                            : "/default.jpg"
                        }
                        className="w-10 h-10 rounded-full"
                        alt={user.username}
                    />
                    <div>
                        <p className="font-semibold">{user.full_name}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                        <p className="text-xs text-gray-400">{user.bio}</p>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => handleToggleFollow(user.id)}
                        className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium ${
                            user.isFollowed ? "bg-gray-200 text-black" : "bg-green-500 text-white"
                            }`}
                        >
                            {user.isFollowed ? "Following" : "Follow"}
                    </button>
                </div>
            </div>
        ))}
        </div>
    );
};

export default SuggestedUsers;
