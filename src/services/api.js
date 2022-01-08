import { toast } from "react-toastify";
import { convertKelvinsToCelsius } from "./helpers";
import { isToday } from "date-fns";

const API = "http://api.openweathermap.org/data/2.5/";
const API_KEY = "f660a2fb1e4bad108d6160b7f58c555f";

const WEATHER_CITY_TYPE = {
  weather: "weather",
  forecast: "forecast",
};

async function getWeatherCity(url, cityName) {
  const response = await fetch(`${API}${url}?q=${cityName}&appid=${API_KEY}`);
  const result = await response.json();

  if (!response.ok) {
    toast.error(result.message);
  }

  return result;
}

export async function getCurrentWeather(cityName) {
  const city = await getWeatherCity(WEATHER_CITY_TYPE.weather, cityName);

  const { name, main, weather, sys } = city;

  return {
    city: name,
    degrees: convertKelvinsToCelsius(main.temp),
    icon: weather[0].icon,
    feelsLike: convertKelvinsToCelsius(main.feels_like),
    weatherDesc: weather[0].main,
    sunrise: sys.sunrise,
    sunset: sys.sunset,
  };
}

export async function getScheduleWeather(cityName) {
  const scheduleWeather = await getWeatherCity(
    WEATHER_CITY_TYPE.forecast,
    cityName
  );

  const { city, list } = scheduleWeather;
  return {
    city: city.name,
    schedule: getScheduleWeatherHelper(list),
  };
}

function getScheduleWeatherHelper(arr) {
  return arr
    .filter((item) => isToday(new Date(item.dt_txt)))
    .map((item) => {
      const { dt, main, weather } = item;
      return {
        time: dt,
        temp: convertKelvinsToCelsius(main.temp),
        feelsLike: convertKelvinsToCelsius(main.feels_like),
        weatherDesc: weather[0].main,
        icon: weather[0].icon,
      };
    });
}
