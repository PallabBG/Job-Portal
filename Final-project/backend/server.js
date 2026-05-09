const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require("./config/db");
const path = require("path");

dotenv.config();

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




app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/liveclasses",require("./routes/liveClassroutes"));

app.get('/', (req, res) => {
  res.send("api is running");
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});