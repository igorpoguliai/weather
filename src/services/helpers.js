import { format } from "date-fns";

export function convertKelvinsToCelsius(kelvins) {
  if (!kelvins) return null;

  return Math.floor(kelvins - 273.15);
}

export function getWeatherIconUrl(iconCode) {
  return `https://raw.githubusercontent.com/yuvraaaj/openweathermap-api-icons/master/icons/${iconCode}.png`;
}

export function formatTime(time, codTime) {
  return format(new Date(time * 1e3), codTime);
}
