const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/authroutes"); 

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("GearGuard Backend Running");
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);

module.exports = app;
