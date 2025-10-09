import { useEffect } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(SOCKET_URL, {
    transports: ["websocket"],
    withCredentials: true,
});


export function useSocket(event: string, callback: (data: any) => void) {
    useEffect(() => {
        if (!event || !callback) return;

        socket.on("connect", () => {
            console.log("Terhubung ke WebSocket");
        });

        socket.on("connect_error", (err) => {
            console.error("WebSocket Connection Error:", err.message);
        });

        socket.on(event, callback);

        return () => {
            socket.off("connect");
            socket.off("connect_error");
            socket.off(event, callback);
        };
    }, [event, callback]);
}
