const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require("./config/db");
const path = require("path");
const http = require("http");
const {Server} = require("socket.io");
const { sockethandeler } = require("./socket/socket");
const notificationRoutes = require("./routes/notificationRoutes");
const socketInstance = require("./socket/socketInstance");

const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const app = express();

connectdb();

app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

//static images 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/uploads", express.static("uploads"));
app.use("/api/notifications", notificationRoutes);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/chatbot", require("./routes/chatboatRoutes"));

app.use("/api/ai", require("./routes/aiRoutes"));

app.use("/api/applications", applicationRoutes);


const server = http.createServer(app);
const io = new Server(server,{
  cors:{
    origin:"http://localhost:5173",
  },
});
socketInstance.init(io);
sockethandeler(io);


app.get('/', (req, res) => {
  res.send("api is running");
});

const port = process.env.PORT || 5500;

server.listen(port, () => {
  console.log(`server is running on port ${port}`);
});