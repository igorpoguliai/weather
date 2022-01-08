import styles from "./styles.module.scss";
import { getWeatherIconUrl } from "../../services/helpers";
import { formatTime } from "../../services/helpers";

export default function ScheduleItem({
  time,
  temp,
  feelsLike,
  weatherDesc,
  icon,
}) {
  return (
    <div className={styles.schedule}>
      <div className={styles.time}>
        <div>{formatTime(time, "d MMM")}</div>
        <div>{formatTime(time, "HH:mm")}</div>
      </div>
      <div className={styles.description}>
        <div>
          <div>Temperature: {temp}°</div>
          <div>Feels like: {feelsLike}°</div>
        </div>
        <div>
          <div className={styles.wrapper}>
            {weatherDesc}
            <img src={`${getWeatherIconUrl(icon)}`} alt="icon weather" />
          </div>
        </div>
      </div>
    </div>
  );
}
