import styles from "./styles.module.scss";
import { ReactComponent as HeartIcon } from "../../assets/icons/heart.svg";
import Buttons from "../Buttons/index";
import { getWeatherIconUrl } from "../../services/helpers";
import { formatTime } from "../../services/helpers";
import cn from "classnames";
import ScheduleItem from "../ScheduleItem";
import { useDispatch } from "react-redux";
import { setFavoritesAction } from "../../redux/weather/actions";

const tabs = ["Now", "Details", "Forecast"];

export default function BlockInfo({
  weather,
  scheduleWeather,
  activeTab,
  setActiveTab,
  isFavorite,
}) {
  const dispatch = useDispatch();
  function handleTabClick(tab) {
    setActiveTab(tab);
  }

  function handleHeartClick() {
    dispatch(setFavoritesAction(isFavorite, weather.city));
  }

  return (
    <div className={styles.block}>
      {activeTab === "Now" && (
        <>
          <h1 className={styles.degrees}>{weather.degrees}°</h1>
          <div className={styles.icon}>
            <img
              src={`${getWeatherIconUrl(weather.icon)}`}
              alt="icon weather"
            />
          </div>
          <div className={styles.added}>
            <h2>{weather.city}</h2>
            <button
              onClick={handleHeartClick}
              className={cn(styles.heart, { [styles.active]: isFavorite })}
            >
              <HeartIcon />
            </button>
          </div>
        </>
      )}

      {activeTab === "Details" && (
        <div className={styles.details}>
          <div>{weather.city}</div>
          <div>Temperature: {weather.degrees}°</div>
          <div>Feels like: {weather.feelsLike}°</div>
          <div>Weather: {weather.weatherDesc}</div>
          <div>Sunrise: {formatTime(weather.sunrise, "HH:mm")}</div>
          <div>Sunset: {formatTime(weather.sunset, "HH:mm")}</div>
        </div>
      )}

      {activeTab === "Forecast" && (
        <div className={styles.forecast}>
          <div>{scheduleWeather.city}</div>

          {scheduleWeather.schedule.map((item) => {
            return <ScheduleItem key={item.time} {...item} />;
          })}
        </div>
      )}
      <Buttons tabs={tabs} activeTab={activeTab} onClick={handleTabClick} />
    </div>
  );
}
