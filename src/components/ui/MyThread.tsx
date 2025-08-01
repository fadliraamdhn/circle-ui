import type { ThreadCardProps } from "@/types/thread"
import { axiosInstance } from "@/utils/axios"
import { useEffect, useState } from "react"

const MyThreadCard = () => {
    const [myThreads, setMyThreads] = useState<ThreadCardProps[] | null>(null)

    const fetchThread = async () => {
        try {
            const myThread = await axiosInstance.get("/api/v1/my-thread")
            console.log(myThread);
            
            setMyThreads(myThread.data.data)
        } catch (error) {
            console.error("Gagal fetch thread:", error);
        }
    };

    useEffect(() => {
        fetchThread();
    }, []);

    if (!myThreads) {
        return <p>Loading...</p>
    }

    return (
       <div className="space-y-4 mt-6 p-6">
            {myThreads.map((thread) => (
                <div key={thread.id} className="flex gap-4 py-2 px-6 border rounded-md shadow-sm">
                    <div>
                        <div className="flex gap-2">
                            <p className="font-medium">{thread.fullname}</p>
                            <p className="text-gray-400">{thread.username}</p>
                        </div>
                        <p>{thread.content}</p>
                        {thread.image && (
                            <img
                                src={`http://localhost:3000/uploads/${thread.image}`}
                                alt={thread.image}
                                className="w-100"
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default MyThreadCard