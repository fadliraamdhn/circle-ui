import { useEffect, useState, useRef } from "react";
import { axiosInstance } from "@/utils/axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store";
import { setProfile } from "@/store/profileSlice";
import { mapToProfile } from "@/types/profile"; // pastikan import ini sesuai path kamu
import { baseUrl } from "@/utils/apiProd";

type User = {
    id: number;
    username: string;
    full_name: string;
    photo_profile: string | null;
    bio: string;
};

const SearchUsersWithFollow = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<(User & { isFollowed: boolean })[]>([]);
    const [loading, setLoading] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    
    const dispatch = useDispatch();
    const profile = useSelector((state: RootState) => state.profile.profile);
    const myProfileId = profile?.id;
    const following = profile?.following || [];
    
    useEffect(() => {
        if (!query.trim()) return setResults([]);

        setLoading(true);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(async () => {
        try {
            const res = await axiosInstance.get("/api/v1/search/users", {
                params: { query },
            });
            console.log(res.data.data);
            
            const mapped: (User & { isFollowed: boolean })[] = res.data.data.map((user: User) => ({
            ...user,
                isFollowed: following.includes(Number(user.id)),
            }));

            setResults(mapped);
        } catch (err) {
            console.error("Search error:", err);
        } finally {
            setLoading(false);
        }
        }, 400);
    }, [query, following]);

    const handleFollowToggle = async (targetUserId: number, currentStatus: boolean) => {
        try {
        setResults((prevResults) =>
            prevResults.map((user) =>
                user.id === targetUserId ? { ...user, isFollowed: !currentStatus } : user
            )
        );

        await axiosInstance.post(`/api/v1/follow`, { userId: targetUserId });

        const res = await axiosInstance.get("/api/v1/auth/profile");

        dispatch(setProfile(mapToProfile(res.data.data)));
        } catch (err) {
            console.error("Follow/unfollow error:", err);
            setResults((prevResults) =>
            prevResults.map((user) =>
                    user.id === targetUserId ? { ...user, isFollowed: currentStatus } : user
                )
            );

        }
    };

    return (
        <div className="w-full p-4">
        <input
            type="text"
            placeholder="Search users..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
        />

        {loading && <p className="text-sm mt-6 text-gray-400 text-center">Searching...</p>}

        {!loading && results.length > 0 && (
            <ul className="mt-4 space-y-3">
            {results.map((user) => (
                <li key={user.id} className="flex items-center justify-between gap-3 pb-2">
                <div className="flex items-center gap-3">
                    <img
                    src={
                        user.photo_profile
                        ? `${baseUrl}/uploads/${user.photo_profile}`
                        : "default.jpg"
                    }
                    alt={user.username}
                    className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                    <p className="font-semibold">{user.full_name}</p>
                    <p className="text-sm text-gray-500">@{user.username}</p>
                    <p className="text-sm">{user.bio}</p>
                    </div>
                </div>
                {user.id !== myProfileId && (
                    <button
                    onClick={() => handleFollowToggle(user.id, user.isFollowed)}
                    className={`cursor-pointer px-3 py-1 text-sm rounded-full font-medium ${
                        user.isFollowed ? "bg-white text-black border" : "border px-4 text-white"
                    }`}
                    >
                    {user.isFollowed ? "Following" : "Follow"}
                    </button>
                )}
                </li>
            ))}
            </ul>
        )}

        {!loading && query.trim() !== "" && results.length === 0 && (
            <p className="text-sm text-gray-400 mt-3">No users found.</p>
        )}
        </div>
    );
};

export default SearchUsersWithFollow;
