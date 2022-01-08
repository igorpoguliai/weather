import { SET_WEATHER, SET_FAVORITES } from "./types";

export function setFavoritesAction(isFavorite, city) {
  return {
    type: SET_FAVORITES,
    payload: { isFavorite, city },
  };
}

export function setWeatherAction(weather, scheduleWeather) {
  return {
    type: SET_WEATHER,
    payload: { weather, scheduleWeather },
  };
}
