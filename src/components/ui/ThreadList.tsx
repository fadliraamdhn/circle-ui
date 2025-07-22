import { useEffect, useState, type RefObject } from "react";
import ThreadCard from "./ThreadCard";
import { axiosInstance } from "@/utils.ts/axios";
import type { Thread } from "@/types/thread";
import { useSocket } from "@/hooks/useSocket";


const ThreadList = () => {
    const [threads, setThreads] = useState<Thread[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchThreads = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const res = await axiosInstance.get(`/api/v1/thread?page=${page}&limit=10`);
            const newThreads = res.data.data;

            if (newThreads.length === 0) {
                setHasMore(false);
            } else {
                setThreads(prev => {
                    const uniqueNewThreads = newThreads.filter((t: Thread) => !prev.some(p => p.id === t.id));
                    return [...prev, ...uniqueNewThreads];
                });
                setPage(prev => prev + 1);
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
        const handleScroll = () => {
            if (loading || !hasMore) return;

            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.documentElement.scrollHeight - 300;

            if (scrollPosition >= threshold) {
                fetchThreads();
            }
        }
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore, page])

    const handleNewThread = (thread: any) => {
        setThreads((prev) => {
            const exists = prev.find(t => t.id === thread.id);
            if (exists) return prev;
            return [thread, ...prev];
        });
    };

    useSocket(handleNewThread);

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