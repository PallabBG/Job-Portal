const dns = require("node:dns");
// Force Node to use Google DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);
// CRITICAL FIX: Force IPv4 for Nodemailer on Render
dns.setDefaultResultOrder("ipv4first");

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require("./config/db");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { sockethandeler } = require("./socket/socket");
const notificationRoutes = require("./routes/notificationRoutes");
const socketInstance = require("./socket/socketInstance");

const applicationRoutes = require("./routes/applicationRoutes");

dotenv.config();


const app = express();

connectdb();

app.use(express.urlencoded({ extended: true }));
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5500",
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
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
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
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