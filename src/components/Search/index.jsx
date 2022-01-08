import styles from "./styles.module.scss";
import { ReactComponent as LoupeIcon } from "../../assets/icons/loupe.svg";

export default function Search({ onSubmit, value, onChange }) {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder="City"
      />
      <button type="submit" className={styles.loupe}>
        <LoupeIcon />
      </button>
    </form>
  );
}
