const express = require("express");
const cors = require("cors");
const connectDB = require("./db");

const userRoutes = require("./routes/Userroutes");
const authRoutes = require("./routes/authroutes");
const forgotRoutes = require("./routes/forgotroutes");
const workCenterRoutes = require("./routes/workCenterRoutes");
const teamRoutes = require("./routes/teamRoutes");
const requestRoutes = require("./routes/requestRoutes.js");
// const maintenanceRequestSchemadis = require("./routes/maintenanceRoutesdis");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GearGuard Backend Running");
});

app.use("/api", userRoutes);
app.use("/api", authRoutes);
app.use("/api", forgotRoutes);
app.use("/api", workCenterRoutes);
app.use("/api", teamRoutes);
app.use("/api", requestRoutes);
// app.use("/api", maintenanceRequestSchemadis);
// app.use("/api", maintenanceRoutes);


module.exports = app;
