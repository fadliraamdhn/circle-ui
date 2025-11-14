import { Heart, MessageSquareText } from "lucide-react";
import { useEffect, useState } from "react";
import type { ThreadCardProps } from "@/types/thread";
import { Link } from "react-router-dom";
import { shortFromNow } from "@/utils/dayjs";
import { axiosInstance } from "@/utils/axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toggleLike, updateLikeFromBackend } from "@/store/likeSlice";
import { baseUrl } from "@/utils/apiProd";

const ThreadCard: React.FC<ThreadCardProps> = ({
    id,
    photoProfile,
    fullname,
    username,
    content,
    image,
    numberReplies,
    createdAt,
    numberLikes,
}) => {
    const dispatch = useDispatch();
    const likeData = useSelector((state: RootState) => state.like[id]);
    const [likesCount, setLikesCount] = useState<number>(numberLikes ?? 0);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setLikesCount(numberLikes ?? 0);
    }, [numberLikes]);

    useEffect(() => {
        const fetchLike = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/like/${id}`);
            const likedFromBackend = res.data?.data?.liked;
            const likesCountFromBackend = res.data?.data?.likesCount;

            if (likedFromBackend) {
            dispatch(
                updateLikeFromBackend({ threadId: id, liked: likedFromBackend })
            );
            }

            if (typeof likesCountFromBackend === "number") {
            setLikesCount(likesCountFromBackend);
            }
        } catch (err) {
            console.error("fetchLike error", err);
        }
        };

        fetchLike();
    }, [id, dispatch]);

    const handleLike = async () => {
        if (isProcessing) return;

        const isLiked = likeData?.liked === "YES";
        setIsProcessing(true);

        setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
        dispatch(toggleLike(id));

        try {
        const res = await axiosInstance.post(`/api/v1/like/${id}`);
        const likesCountFromBackend = res.data?.data?.likesCount;
        const likedFromBackend = res.data?.data?.liked;

        if (typeof likesCountFromBackend === "number") {
            setLikesCount(likesCountFromBackend);
        }

        if (likedFromBackend) {
            dispatch(
            updateLikeFromBackend({ threadId: id, liked: likedFromBackend })
            );
        }
        } catch (err) {
        console.error("like request failed", err);
        setLikesCount((prev) => (isLiked ? prev + 1 : prev - 1));
        dispatch(toggleLike(id));
        } finally {
        setIsProcessing(false);
        }
    };

    return (
        <div key={id} className="flex gap-4 mt-6 py-2 px-6">
        <div>
            <img
            src={
                photoProfile
                ? `${baseUrl}/uploads/${photoProfile}`
                : "/default.jpg"
            }
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            alt={`${fullname} avatar`}
            />
        </div>

        <div className="flex-1 min-w-0">
            <div className="flex gap-2 flex-wrap items-center">
            <p className="font-medium">{fullname}</p>
            <p className="text-gray-400">@{username}</p>
            <p className="text-gray-400">• {shortFromNow(createdAt)}</p>
            </div>

            <p className="break-words">{content}</p>

            {image && (
            <img
                src={`${baseUrl}/uploads/${image}`}
                alt={image}
                className="w-full max-h-96 object-cover rounded mt-2"
            />
            )}

            <div className="flex gap-6 mt-4 items-center">
            <div
                className={`flex gap-3 items-center ${
                isProcessing ? "opacity-60 pointer-events-none" : ""
                }`}
            >
                <button
                onClick={handleLike}
                aria-pressed={likeData?.liked === "YES"}
                className="flex items-center gap-2"
                title={likeData?.liked === "YES" ? "Unlike" : "Like"}
                disabled={isProcessing}
                >
                <Heart
                    fill={likeData?.liked === "YES" ? "red" : "none"}
                    stroke={likeData?.liked === "YES" ? "red" : "currentColor"}
                    className="cursor-pointer"
                    size={18}
                />
                <span className="text-sm">{likesCount}</span>
                </button>
            </div>

            <Link
                to={`/thread/${id}`}
                className="cursor-pointer hover:text-green-700 transition flex gap-2 items-center"
            >
                <MessageSquareText />
                <p>{numberReplies}</p>
            </Link>
            </div>
        </div>
        </div>
    );
};

export default ThreadCard;
