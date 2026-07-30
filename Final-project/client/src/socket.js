import {io} from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL);

socket.on("receiveNotification", (notification) => {
    console.log(notification);

    // Later:
    // setUnreadCount(prev => prev + 1);
    // setNotifications(prev => [notification, ...prev]);
});

export default socket;