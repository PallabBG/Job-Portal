import {io} from "socket.io-client";
const socket = io("https://job-portal-v3nf.onrender.com");

socket.on("receiveNotification", (notification) => {
    console.log(notification);

    // Later:
    // setUnreadCount(prev => prev + 1);
    // setNotifications(prev => [notification, ...prev]);
});

export default socket;
