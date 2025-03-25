import express from "express";

import controllers from "../controllers/controller.js"

const router = express.Router();

router.get("/weather", controllers.getWeather);

router.get("/weather/location", controllers.getWeatherByLocation);

router.get("/history", controllers.getHistory);

router.delete("/delete-history", controllers.deleteHistory)

router.get("/forecast", controllers.getForecast)

export default router;
