import { Link, useParams } from "react-router-dom"
import { Heart, MessageSquareText } from "lucide-react"
import type { Thread } from "@/types/thread"
import { axiosInstance } from "@/utils/axios"
import { useCallback, useEffect, useState } from "react"
import { useSocket } from "@/hooks/useSocket"
import { formatTimeAndDate } from "@/utils/dayjs"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store"
import { toggleLike, updateLikeFromBackend } from "@/store/likeSlice"
import { baseUrl } from "@/utils/apiProd"

const RepliesCard = () => {
    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null);
    const dispatch = useDispatch()
    const likeData = useSelector((state: RootState) => state.like[Number(threadId)])
    const [likesCount, setLikesCount] = useState(0)
    console.log(thread);
    
    const fetchThread = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/thread/${threadId}`);
            const data = res.data.data;
            setThread(data)
            setLikesCount(data.number_of_likes)
        } catch (error) {
            console.error("Gagal fetch thread:", error);
        }
    }

    useEffect(() => {
        if (threadId) {
            fetchThread();
        }
    }, [threadId]);

    const handleReplyCountUpdate = useCallback((data: { threadId: number; number_of_replies: number }) => {
        if (String(data.threadId) === threadId) {
            setThread((prev) =>
                prev ? { ...prev, number_of_replies: data.number_of_replies } : prev
            );
        }
    }, [threadId]);

    useSocket("reply-count-updated", handleReplyCountUpdate)

    useEffect(() => {
        const fetchLike = async () => {
            try {
                const res = await axiosInstance.get(`/api/v1/like/${threadId}`)
                if (res.data?.data?.liked) {
                    dispatch(updateLikeFromBackend({
                        threadId: Number(threadId),
                        liked: res.data.data.liked
                    }))
                }
            } catch (err) {
                console.error(err)
            }
        }

        if (threadId) fetchLike()
    }, [threadId, dispatch])

    const handleLike = async () => {
        const isLiked = likeData?.liked === "YES"

        setLikesCount(prev => isLiked ? prev - 1 : prev + 1)
        dispatch(toggleLike(Number(threadId)))

        try {
            await axiosInstance.post(`/api/v1/like/${threadId}`)
        } catch (err) {
            console.error(err)
            setLikesCount(prev => isLiked ? prev + 1 : prev - 1)
            dispatch(toggleLike(Number(threadId)))
        }
    }

    const { time, date } = thread?.created_at
        ? formatTimeAndDate(thread.created_at)
        : { time: "", date: "" }

    return (
        <div className="flex gap-4 mt-6 py-2 flex-col px-4">
            <div className="flex gap-4">
                <img src={
                        thread?.createdByUser.photo_profile
                        ? `${baseUrl}/uploads/${thread.createdByUser.photo_profile}`
                        : "default.jpg"
                    } alt="" className="w-10 h-10 rounded-full" 
                />
                <div>
                    <p className="font-medium">{thread?.createdByUser.full_name}</p>
                    <p className="text-gray-400">@{thread?.createdByUser.username}</p>
                </div>
            </div>
            <div>
                <p>{thread?.content}</p>
                {thread?.image && (
                    <img src={`${baseUrl}/uploads/${thread?.image}`} className="rounded mt-2 w-full" />
                )}
            </div>
            <div>
                <p className="text-gray-400 text-md">
                    {time} · {date}
                </p>
            </div>
            <div className="flex gap-6 mt-2">
                <div className="flex gap-3">
                    <Heart
                        onClick={handleLike}
                        fill={likeData?.liked === "YES" ? "red" : "none"}
                        stroke={likeData?.liked === "YES" ? "red" : "currentColor"}
                        className="cursor-pointer"
                    />
                    <p>{likesCount}</p>
                </div>
                <Link to={"/"} className="cursor-pointer hover:text-green-700 transition flex gap-2">
                    <MessageSquareText />
                    <p>{thread?.number_of_replies}</p>
                </Link>
            </div>
        </div>
    )
}

export default RepliesCard
