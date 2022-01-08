import "./globalStyles.scss";
import styles from "./styles.module.scss";
import SearchForm from "./components/Search/index";
import BlockInfo from "./components/BlockInfo/index";
import BlockLocations from "./components/BlockLocations/index";
import { getCurrentWeather } from "./services/api";
import { getScheduleWeather } from "./services/api";
import { useState } from "react";
import EmptyScreen from "./components/EmptyScreen";
import { useDispatch, useSelector } from "react-redux";
import { setWeatherAction } from "./redux/weather/actions";

function App() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const [activeTab, setActiveTab] = useState("Now");
  const { favorites, weather, scheduleWeather } = useSelector(
    (state) => state.weather
  );

  function onSubmit(event, city) {
    if (event) {
      event.preventDefault();
    }

    const cityName = event ? value : city;

    Promise.all([
      getCurrentWeather(cityName),
      getScheduleWeather(cityName),
    ]).then(([weather, scheduleWeather]) => {
      dispatch(setWeatherAction(weather, scheduleWeather));
    });
  }

  function handleCityClick(clickCity) {
    onSubmit(null, clickCity);
  }

  return (
    <div className="App">
      <main className={styles.main}>
        <div className={styles.container}>
          <SearchForm
            value={value}
            onSubmit={onSubmit}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className={styles.wrapper}>
            {weather ? (
              <BlockInfo
                isFavorite={favorites.includes(weather?.city)}
                weather={weather}
                scheduleWeather={scheduleWeather}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            ) : (
              <EmptyScreen message={"Write city..."} />
            )}

            <BlockLocations
              weather={weather}
              favorites={favorites}
              onCityClick={handleCityClick}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
