import { useProfile } from "@/hooks/useProfile"
import type { ThreadCardProps } from "@/types/thread"
import { axiosInstance } from "@/utils/axios"
import { useEffect, useState } from "react"

const MyThreadCard = () => {
    const profile = useProfile()
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
        <div className="p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white">Postingan Saya</h1>

        {myThreads.map((thread) => (
            <div
            key={thread.id}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-6 shadow-sm hover:bg-zinc-800 transition"
            >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
                <div>
                    <p className="text-gray-400 text-sm">@{profile?.username}</p>
                </div>
            </div>

            {/* Content */}
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
