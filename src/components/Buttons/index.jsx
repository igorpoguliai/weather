import styles from "./styles.module.scss";
import cn from "classnames";

export default function Buttons({ tabs, activeTab, onClick }) {
  return (
    <div className={styles.buttons}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onClick(tab)}
          className={cn(styles.button, { [styles.active]: tab === activeTab })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
