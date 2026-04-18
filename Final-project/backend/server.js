const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectdb = require("./config/db");
const jobrouter = require("./routes/jobRoutes");

const path = require("path");

dotenv.config();

const app = express();

//static images 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors());
app.use(express.json());

connectdb();

app.use('/api/jobs', jobrouter);


app.get('/', (req, res) => {
  res.send("api is running");
});

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});