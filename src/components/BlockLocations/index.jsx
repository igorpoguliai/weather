import styles from "./styles.module.scss";
import { ReactComponent as CrossIcon } from "../../assets/icons/cross.svg";
import cn from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setFavoritesAction } from "../../redux/weather/actions";

export default function BlockLocations({ favorites, onCityClick }) {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state.weather);

  return (
    <div className={styles.block}>
      <h2 className={styles.text}>Added Locations:</h2>
      <ul className={styles.locations}>
        {favorites.length ? (
          favorites.map((city) => (
            <li
              onClick={() => onCityClick(city)}
              key={city}
              className={cn(styles.li, {
                [styles.active]: city === weather.city,
              })}
            >
              {city}
              <button
                onClick={() => dispatch(setFavoritesAction(true, city))}
                className={styles.remove}
              >
                <CrossIcon />
              </button>
            </li>
          ))
        ) : (
          <div className={styles.message}>No cities added</div>
        )}
      </ul>
    </div>
  );
}
