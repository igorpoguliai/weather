import { SET_WEATHER, SET_FAVORITES } from "./types";

const initialState = {
  weather: null,
  scheduleWeather: null,
  favorites: [],
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FAVORITES: {
      const { isFavorite, city } = action.payload;

      return isFavorite
        ? {
            ...state,
            favorites: state.favorites.filter((item) => item !== city),
          }
        : {
            ...state,
            favorites: [...state.favorites, city],
          };
    }

    case SET_WEATHER: {
      const { weather, scheduleWeather } = action.payload;
      return {
        ...state,
        weather,
        scheduleWeather,
      };
    }

    default:
      return state;
  }
}
