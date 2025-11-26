import { io, Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
    if (!socket) {
        socket = io(process.env.NEXT_PUBLIC_API_URL || "https://nossa-rede-backend.vercel.app", {
            withCredentials: true,
            autoConnect: false,
        });
    }
    return socket;
};
