import { Heart } from "lucide-react"
import { useParams } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import type { Reply } from "@/types/thread";
import { axiosInstance } from "@/utils/axios";
import { useSocket } from "@/hooks/useSocket";
import { shortFromNow } from "@/utils/dayjs";
import { baseUrl } from "@/utils/apiProd";

const RepliesList = () => {
    const { threadId } = useParams();
    const [replies, setReplies] = useState<Reply[]>([]);

    const fetchReplies = async () => {
        try {
            const res = await axiosInstance.get(`/api/v1/thread/${threadId}/replies`);
            const replyData = res.data.data.numberReplies;
            setReplies(replyData);
        } catch (err) {
            console.error("Gagal fetch replies:", err);
        }
    }

    useEffect(() => {
        if (threadId) {
        fetchReplies();
    }
    }, [threadId]);

    const handleNewReply = useCallback((reply: Reply & { threadId: number }) => {
        if (String(reply.threadId) !== threadId) return;

        setReplies((prev) => {
            const exists = prev.find(r => r.id === reply.id);
            if (exists) return prev;
            return [reply, ...prev];
        });
    }, [threadId]);

    useSocket("new-reply", handleNewReply);

    return (
        (replies.map((reply) => (
            <div key={reply.id} className="flex gap-4 mt-3 py-2 px-6 border-b border-gray-600">  
                <div>
                    <img src={reply.user.photo_profile ? `${baseUrl}/uploads/${reply.user.photo_profile}` : "/default.jpg" } alt="" className="w-10 h-10 rounded-full"/>
                </div>
                    <div>
                        <div className="flex gap-2 items-center">
                            <p className="font-medium">{reply.user.full_name}</p>
                            <p className="text-gray-400">@{reply.user.username}</p>
                            <p className="text-gray-400">{shortFromNow(reply.created_at)}</p>
                        </div>
                        <p>{reply.content}</p>
                        {reply.image && (
                            <img
                                src={`${baseUrl}/uploads/${reply.image}`}
                                alt={reply.image}
                                className="w-100 mt-2"
                            />
                        )}
                        <div className="flex gap-6 mt-4">
                        <div className="flex gap-3">
                            <Heart className="cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </div>
        )))
    )
}

export default RepliesList