import {io} from "socket.io-client";
const socket = io("http://localhost:5500");

socket.on("receiveNotification", (notification) => {
    console.log(notification);

    // Later:
    // setUnreadCount(prev => prev + 1);
    // setNotifications(prev => [notification, ...prev]);
});

export default socket;