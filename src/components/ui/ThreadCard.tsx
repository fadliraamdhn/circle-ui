import { Heart, MessageSquareText } from "lucide-react"
import { useEffect, useState } from "react";
import type { ThreadCardProps } from "@/types/thread";
import { Link } from "react-router-dom";
import { shortFromNow } from "@/utils/dayjs";
import { axiosInstance } from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toggleLike, updateLikeFromBackend } from "@/store/likeSlice";
import { baseUrl } from "@/utils/apiProd";

const ThreadCard: React.FC<ThreadCardProps> = ({ id, photoProfile, fullname, username, content, image, numberReplies, createdAt, numberLikes }) => {
    const dispatch = useDispatch();
    const likeData = useSelector((state: RootState) => state.like[id]);
    const [likesCount, setLikesCount] = useState(numberLikes);

    const handleLike = async () => {
        const isLiked = likeData?.liked === "YES";

        setLikesCount((prev) => isLiked ? prev - 1 : prev + 1);
        dispatch(toggleLike(id));
        try {
            await axiosInstance.post(`/api/v1/like/${id}`)
        } catch (err) {
            console.error(err);
            setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
            dispatch(toggleLike(id));
        }
    };

    useEffect(() => {
        const fetchLike = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/like/${id}`)
            if (res.data?.data?.liked) {
                dispatch(
                updateLikeFromBackend({ threadId: id, liked: res.data.data.liked })
                );
            }
        } catch (err) {
            console.error(err);
        }
    };

    fetchLike();
    }, [id, dispatch]);

    return (
        <div key={id} className="flex gap-4 mt-6 py-2 px-6">
            <div>
                <img src={photoProfile? `${baseUrl}/uploads/${photoProfile}` : "default.jpg" } className="w-10 h-10 rounded-full" />
            </div>
            <div>
                <div className="flex gap-2">
                    <p className="font-medium">{fullname}</p>
                    <p className="text-gray-400">@{username}</p>
                    <p className="text-gray-400">• {shortFromNow(createdAt)}</p>
                </div>
                <p>{content}</p>
                {image && (
                <img src={`${baseUrl}/uploads/${image}`} alt={image} className="w-100" />
                )}
                <div className="flex gap-6 mt-4">
                    <div className="flex gap-3">
                        <Heart
                        onClick={handleLike}
                        fill={likeData?.liked === "YES" ? "red" : "none"}
                        stroke={likeData?.liked === "YES" ? "red" : "currentColor"}
                        className="cursor-pointer"
                        />
                        <p className="text-sm">{likeData?.liked === "YES" ? `you + ${likesCount - 1}` : `${likesCount}`}</p>
                    </div>
                    <Link to={`/thread/${id}`} className="cursor-pointer hover:text-green-700 transition flex gap-2">
                        <MessageSquareText />
                        <p>{numberReplies}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThreadCard