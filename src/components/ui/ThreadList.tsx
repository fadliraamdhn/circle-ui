import { useEffect, useRef, useState } from "react";
import ThreadCard from "./ThreadCard";
import { axiosInstance } from "@/utils/axios";
import type { Thread } from "@/types/thread";
import { useSocket } from "@/hooks/useSocket";

const ThreadList = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const pageRef = useRef(1)

    const fetchThreads = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await axiosInstance.get(`/api/v1/thread?page=${pageRef.current}&limit=10`);
            const newThreads = res.data.data;
            
            if (newThreads.length === 0) {
                setHasMore(false);
            } else {
                setThreads(prev => {
                    const uniqueNewThreads = newThreads.filter((t: Thread) => !prev.some(p => p.id === t.id));
                    return [...prev, ...uniqueNewThreads];
                });
                pageRef.current += 1;
            }
        } catch (error) {
            console.error("Gagal fetch thread:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThreads();
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;

        const handleScroll = () => {
            if (loading || !hasMore) return;

            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 300;

            if (scrollPosition >= threshold) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    fetchThreads();
                }, 200);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore])

    const handleNewThread = (thread: any) => {
        setThreads((prev) => {
            const exists = prev.find(t => t.id === thread.id);
            if (exists) return prev;
            return [thread, ...prev];
        });
    };

    useSocket("new-thread", handleNewThread);

    return (
        <>
            {threads.map(thread => (
                <ThreadCard
                    key={thread.id}
                    id={thread.id}
                    fullname={thread.createdByUser.full_name}
                    photoProfile={thread.createdByUser.photo_profile}
                    username={thread.createdByUser.username}
                    content={thread.content}
                    image={thread.image || undefined}
                    numberLikes={thread.number_of_likes}
                    numberReplies={thread.number_of_replies}
                    createdAt={thread.created_at}
                />
            ))}

            {loading && (
                <p className="text-center text-gray-500 my-4">Loading...</p>
            )}


            {!hasMore && !loading && (
                <p className="text-center text-gray-500 my-4">Tidak ada data lagi.</p>
            )}
        </>
    )
}

export default ThreadList;