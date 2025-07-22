import { Heart, MessageSquareText } from "lucide-react"
import { useState } from "react";
import type { ThreadCardProps } from "@/types/thread";

const ThreadCard: React.FC<ThreadCardProps> = ({id, fullname, username, content, image}) => {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(0)

    const handleLike = () => {
        if (liked) {
            setLikes(prev => prev - 1)
        } else {
            setLikes(prev => prev + 1)
        }
        setLiked(!liked)
    }

    return (
        <>
            <div key={id} className="flex gap-4 mt-6 py-2 px-6">  
                <div>
                    <img src="https://www.shutterstock.com/image-vector/man-character-face-avatar-glasses-600nw-542759665.jpg" alt="" className="w-10 h-10 rounded-full"/>
                </div>
                <div>
                    <div className="flex gap-2">
                        <p className="font-medium">{fullname}</p>
                        <p className="text-gray-400">@{username}</p>
                    </div>
                    <p>{content}</p>
                    {image && (
                        <img src={`http://localhost:3000/uploads/${image}`} alt={image} className="w-100" />
                    )}
                    <div className="flex gap-6 mt-4">
                        <div className="flex gap-3">
                            <Heart onClick={handleLike} fill={liked ? "red" : "none"} className="cursor-pointer"/>
                            <p>{likes}</p>
                        </div>
                        <MessageSquareText />
                    </div>
                </div>
            </div>
            <hr className="border-b border-gray-600"/>
        </>
    )
}

export default ThreadCard