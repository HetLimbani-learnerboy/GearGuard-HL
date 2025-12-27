const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

// ROUTES
const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/authroutes");
const forgotRoutes = require("./routes/forgotroutes");
const workCenterRoutes = require("./routes/workCenterRoutes");
const teamRoutes = require("./routes/teamRoutes");
const requestRoutes = require("./routes/requestRoutes");

const app = express();

/* CONNECT DATABASE */
connectDB();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* ROOT CHECK */
app.get("/", (req, res) => {
  res.send("GearGuard Backend Running");
});

/* API ROUTES */
app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", forgotRoutes);
app.use("/api", workCenterRoutes);
app.use("/api", teamRoutes);
app.use("/api", requestRoutes);

/* EXPORT APP */
module.exports = app;
