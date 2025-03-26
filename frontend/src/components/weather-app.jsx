// import React, { useState } from "react";
// import axios from "axios";
// import "./css/weather-app.css";

// export default function WeatherApp() {
//   const [city, setCity] = useState("");
//   const [weather, setWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);

//   const getWeather = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/weather?city=${city}`
//       );
//       setWeather(res.data);
//       console.log(weather);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const getLocalTime = (timezoneOffset) => {
//     const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
//     const localTime = new Date(utc + timezoneOffset * 1000);
//     return localTime.toLocaleString();
//   };

//   const getCurrentLocationWeather = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await axios.get(
//             `${import.meta.env.VITE_BACKEND_URL}/location?lat=${latitude}&lon=${longitude}`
//           );
//           setWeather(res.data);
//           setCity(res.data.name);
//         } catch (err) {
//           alert("Failed to fetch weather by location");
//           console.error(err);
//         }
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   };

//   const getForecast = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_BACKEND_URL}/forecast?city=${city}`
//       );
//       setForecast(res.data);
//       console.log(forecast);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="weather-container">
//       <h1 className="title">🌤️ Weather App</h1>

//       <div className="input-section">
//         <input
//           type="text"
//           placeholder="Enter city"
//           value={city}
//           onChange={(e) => setCity(e.target.value)}
//         />
//         <button onClick={getWeather}>Get Weather</button>
//         <button onClick={getForecast}>Get Forecast</button>
//         <button onClick={getCurrentLocationWeather}>📍 Use My Location</button>
//       </div>

//       {weather && (
//         <div className="weather-card">
//           <h1>Weather Details</h1>
//           <h2>{weather.name}</h2>
//           <img
//             src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
//             alt="Weather Icon"
//           />
//           <p className="description">{weather.weather[0].description}</p>
//           <p className="temp">🌡️ {weather.main.temp} °C</p>
//           <p>💨 Wind Speed: {weather.wind.speed} m/s</p>
//           <p>💧 Humidity: {weather.main.humidity}%</p>
//           <p>🕒 Local Time: {getLocalTime(weather.timezone)}</p>
//         </div>
//       )}

//       {forecast && (
//         <div className="forecast-card">
//           <h1>Forecast Details</h1>
//           <h2>{forecast.city.name}</h2>
//           {forecast.list.map((item, index) => (
//             <div key={index} className="forecast-card-items">
//               <p>{new Date(item.dt * 1000).toLocaleString()}</p>
//               <p>{item.weather[0].description}</p>
//               <p>🌡️ {item.main.temp} °C</p>

//               <p>Humidity - {item.main.humidity}</p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import "./css/weather-app.css";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/weather?city=${city}`
      );
      setWeather(res.data);
      console.log("Current weather:", res.data);
    } catch (err) {
      console.error("Error fetching weather:", err);
      alert("Failed to fetch weather data.");
    }
  };

  const getForecast = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/forecast?city=${city}`
      );
      setForecast(res.data);
      console.log("Forecast data:", res.data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
      alert("Failed to fetch forecast data.");
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/location?lat=${latitude}&lon=${longitude}`
          );
          setWeather(res.data);
          setCity(res.data.name);
          console.log("Location-based weather:", res.data);
        } catch (err) {
          console.error("Error fetching location weather:", err);
          alert("Failed to fetch weather by location");
        }
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getLocalTime = (timezoneOffset) => {
    const utc = new Date().getTime() + new Date().getTimezoneOffset() * 60000;
    const localTime = new Date(utc + timezoneOffset * 1000);
    return localTime.toLocaleString();
  };

  return (
    <div className="weather-container">
      <h1 className="title">🌤️ Weather App</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
        <button onClick={getForecast}>Get Forecast</button>
        <button onClick={getCurrentLocationWeather}>📍 Use My Location</button>
      </div>

      {weather && weather.weather && weather.weather[0] && (
        <div className="weather-card">
          <h1>Weather Details</h1>
          <h2>{weather.name}</h2>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather Icon"
          />
          <p className="description">{weather.weather[0].description}</p>
          <p className="temp">🌡️ {weather.main?.temp} °C</p>
          <p>💨 Wind Speed: {weather.wind?.speed} m/s</p>
          <p>💧 Humidity: {weather.main?.humidity}%</p>
          <p>🕒 Local Time: {getLocalTime(weather.timezone)}</p>
        </div>
      )}

      {forecast && forecast.list && forecast.city && (
        <div className="forecast-card">
          <h1>Forecast Details</h1>
          <h2>{forecast.city.name}</h2>
          {forecast.list.map((item) => (
            <div key={item.dt} className="forecast-card-items">
              <p>{new Date(item.dt * 1000).toLocaleString()}</p>
              <p>{item.weather[0]?.description}</p>
              <p>🌡️ {item.main.temp} °C</p>
              <p>💧 Humidity - {item.main.humidity}%</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
