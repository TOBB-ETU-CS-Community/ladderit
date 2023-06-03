"use client";
import { useState } from "react";
import styles from "../src/styles/MissionList.module.css";

export default function MissionList({ missions }) {
  const [selectedItems, setSelectedItems] = useState([]);

  const handleClick = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  return missions.map((mission, index) => (
    <div className="mt-16 w-2/3 h-24" key={index}>
      <div
        className={selectedItems[index] ? styles.cardChanging : styles.card}
        onClick={() => handleClick(index)}>
        <label className={styles.cardLabel}>
          <input type="checkbox" className={styles.cardInput} />
          <span className={styles.cardSpan}></span>
        </label>
        <p className="text-center text-bgColor text-2xl">{mission}</p>
      </div>
    </div>
  ));
}
