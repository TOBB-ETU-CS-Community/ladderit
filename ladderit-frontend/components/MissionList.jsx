"use client";
import { useState } from "react";
import styles from "../src/styles/MissionList.module.css";

export default function MissionList({ missions }) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
  };

  let id;

  return missions.map((mission) => (
    <div className="mt-16 w-2/3 h-24" key={id}>
      <div
        className={isSelected ? styles.cardChanging : styles.card}
        onClick={handleClick}>
        <label className={styles.cardLabel}>
          <input type="checkbox" className={styles.cardInput} />
          <span className={styles.cardSpan}></span>
        </label>
        <p className="text-center text-bgColor text-2xl">{mission}</p>
      </div>
    </div>
  ));
}
