import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_WS_URL);

socket.on("connect", () => {
    console.log("Connected to WebSocket server in weather namespace");
});

export default socket;
