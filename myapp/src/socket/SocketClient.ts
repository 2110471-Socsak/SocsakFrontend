import { io, type Socket } from "socket.io-client";

export class SocketClient {
    private static socket: Socket | null;

    public static getInstance(): Socket | null {
        const user = JSON.parse(localStorage.getItem("user") ?? "");

        if (!user.token) {
            return null;
        }

        if (!this.socket) {
            this.socket = io(import.meta.env.VITE_SOCKET_URI, {
                extraHeaders: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
        }
        return this.socket;
    }
}
