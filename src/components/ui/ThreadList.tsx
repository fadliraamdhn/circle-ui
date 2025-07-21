import { useEffect, useState } from "react";
import ThreadCard from "./ThreadCard";
import { axiosInstance } from "@/utils.ts/axios";

type Thread = {
    id: number;
    content: string;
    image?: string;
    createdByUser: {
        full_name: string;
        username: string;
    }
}

const ThreadList = () => {
    const [threads, setThreads] = useState<Thread[]>([]);

    useEffect(() => {
        const fetchThreads = async () => {
            try {
                const res = await axiosInstance.get("/api/v1/thread");
                setThreads(res.data.data);
            } catch (error) {
                console.error("Failed to fetch threads:", error);
            }
        }
        fetchThreads();
    }, [])

    return (
        <>
            {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                />
            ))}
             {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                />
            ))}
             {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                />
            ))}
             {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                />
            ))}
             {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                />
            ))}
        </>
    )
}

export default ThreadList;