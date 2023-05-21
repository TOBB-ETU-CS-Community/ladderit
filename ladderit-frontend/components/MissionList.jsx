"use client";
import { useState } from "react";
import styles from "../src/styles/MissionList.module.css";

export default function MissionList() {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  return (
    <div className="mt-16 w-2/3 h-24">
      <div
        className={isSelected ? styles.cardChanging : styles.card}
        onClick={handleClick}>
        <label className={styles.cardLabel}>
          <input type="checkbox" className={styles.cardInput} />
          <span className={styles.cardSpan}></span>
        </label>
      </div>
    </div>
  );
}
