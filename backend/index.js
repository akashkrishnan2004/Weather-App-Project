import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./connection.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();
// app.use(cors());

app.use(cors({
  origin: ['https://weather-app-project-frontenf.onrender.com'],
  credentials: true
}));

const API_KEY = process.env.WEATHER_API_KEY;

connectDB();

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server not started");
  } else {
    console.log(`Server running on port ${PORT}`) 
  }
});
