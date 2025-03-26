import axios from "axios";
import Search from "../model/search-model.js";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;

const getWeather = async (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: "City is required" });
  }

  try {
    await Search.create({ city });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;

    const weatherData = {
      name: data.name,
      main: {
        temp: data.main.temp,
        humidity: data.main.humidity,
      },
      weather: data.weather,
      wind: {
        speed: data.wind.speed,
      },
      timezone: data.timezone,
    };

    res.json(weatherData);
  } catch (error) {
    console.error(
      "Error fetching weather data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Error fetching weather data" });
  }
};

const getWeatherByLocation = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: "Latitude and Longitude are required" });
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching location weather:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch weather by location" });
  }
};

const getForecast = async (req, res) => {
  try {
    const city = req.query.city;
    if (!city) return res.status(400).json({ message: "City is required" });

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch forecast" });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await Search.find().sort({ timestamp: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Error fetching history" });
  }
};

const deleteHistory = async (req, res) => {
  try {
    await Search.deleteMany({});
    res.json({ message: "Search history cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete history" });
  }
};

export default {
  getWeather,
  getHistory,
  deleteHistory,
  getWeatherByLocation,
  getForecast,
};
