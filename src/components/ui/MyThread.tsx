import type { ThreadCardProps } from "@/types/thread"
import { axiosInstance } from "@/utils/axios"
import { useEffect, useState } from "react"

const MyThreadCard = () => {
    const [myThreads, setMyThreads] = useState<ThreadCardProps[] | null>(null)

    const fetchThread = async () => {
        try {
        const myThread = await axiosInstance.get("/api/v1/my-thread")
        console.log(myThread)

        setMyThreads(myThread.data.data)
        } catch (error) {
        console.error("Gagal fetch thread:", error)
        }
    }

    useEffect(() => {
        fetchThread()
    }, [])

    if (!myThreads) {
        return <p className="px-6 py-4 text-gray-400">Loading...</p>
    }

    return (
        <div className="space-y-6">

        {myThreads.map((thread) => (
            <div
                key={thread.id}
                className="rounded-xl border border-zinc-700 p-6 shadow-sm hover:bg-zinc-800 transition"
            >
                <div className="space-y-3">
                    <p className="text-gray-200">{thread.content}</p>
                    {thread.image && (
                    <img
                        src={`http://localhost:3000/uploads/${thread.image}`}
                        alt={thread.image}
                        className="w-full rounded-md border border-zinc-700"
                    />
                    )}
                </div>
            </div>
        ))}
        </div>
    )
}

export default MyThreadCard
