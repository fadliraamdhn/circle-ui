import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
    transports: ["websocket"], 
    withCredentials: true
});

export function useSocket(onNewThread: (thread: any) => void) {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Terhubung ke WebSocket");
        });

        socket.on("connect_error", (err) => {
            console.error("WebSocket Connection Error:", err.message);
        });

        socket.on("new-thread", (data) => {
            console.log("Thread baru diterima:", data);
            onNewThread(data);  // Callback saat ada thread baru
        });

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off("new-thread");
        };
    }, []);
}
