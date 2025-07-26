import { Link, useParams } from "react-router-dom"
import { Heart, MessageSquareText } from "lucide-react"
import type { Thread } from "@/types/thread"
import { axiosInstance } from "@/utils/axios"
import { useCallback, useEffect, useState } from "react"
import { useSocket } from "@/hooks/useSocket"
import { formatTimeAndDate } from "@/utils/dayjs"

const RepliesCard = () =>{
    const { threadId } = useParams()
    const [thread, setThread] = useState<Thread | null>(null);

    const fetchThread = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/thread/${threadId}`);
            const data = res.data.data;
            setThread(data)
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

    const { time, date } = thread?.created_at ? formatTimeAndDate(thread.created_at) : { time: "", date: "" };
    
    return (
        <div className="flex gap-4 mt-6 py-2 flex-col px-4">  
            <div className="flex gap-4">
                <img src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-600nw-542759665.jpg" alt="" className="w-10 h-10 rounded-full"/>
                <div>
                    <p className="font-medium">{thread?.createdByUser.full_name}</p>
                    <p className="text-gray-400">@{thread?.createdByUser.username}</p>
                </div>
            </div>
            <div>
                <p>{thread?.content}</p>
                {thread?.image && (
                    <img src={`http://localhost:3000/uploads/${thread?.image}`} className="rounded mt-2 w-full" />
                )}
            </div>
            <div>
                <p className="text-gray-400 text-md">
                    {time} · {date}
                </p>
            </div>
            <div className="flex gap-6 mt-2">
                <div className="flex gap-3">
                    <Heart className="cursor-pointer"/>
                    <p>{thread?.number_of_likes}</p>
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