import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import Search from "./model/search-model.js";
import connectDB from "./connection.js";
import router from "./routes/router.js";

dotenv.config();

const app = express();
app.use(cors());

const API_KEY = process.env.WEATHER_API_KEY;

connectDB();

app.use("/api", router);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(PORT, (error) => {
  if (error) {
    console.log("Server not started");
  } else {
    console.log(`Server running on port ${PORT}`) 
  }
});
