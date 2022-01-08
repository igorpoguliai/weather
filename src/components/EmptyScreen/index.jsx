import styles from "./styles.module.scss";
import { ReactComponent as CloudIcon } from "../../assets/icons/cloud.svg";

export default function EmptyScreen({ message }) {
  return (
    <div className={styles.block}>
      <div className={styles.message}>
        {message}
        <div>
          <CloudIcon />
        </div>
      </div>
    </div>
  );
}
