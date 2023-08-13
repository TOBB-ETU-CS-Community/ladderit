"use client";
import { useState } from "react";
import {
  useContractRead,
  useContractWrite,
  useContract,
  useAddress,
  Web3Button,
} from "@thirdweb-dev/react";

import styles from "../src/styles/MissionList.module.css";
import { MAIN_CONTRACT_ADDRESS } from "../constants";

export default function MissionList({}) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const userAddress = useAddress();
  const { contract } = useContract(MAIN_CONTRACT_ADDRESS);

  const {
    mutateAsync: handleCompleted,
    isLoading,
    error,
  } = useContractWrite(contract, "completeTask");

  const { data: missions } = useContractRead(contract, "getTasks", [
    userAddress,
  ]);

  const handleClick = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      setIsClicked(true);
      return updatedSelectedItems;
    });
  };

  return missions.map((mission, index) => (
    <ul className="mt-16 w-2/3 h-24" key={index}>
      <li
        className={selectedItems[index] ? styles.cardChanging : styles.card}
        onClick={() => handleClick(index)}>
        <label className={styles.cardLabel}>
          <input type="checkbox" className={styles.cardInput} />
          <span className={styles.cardSpan}></span>
        </label>
        <p className="text-center text-bgColor text-2xl">{mission}</p>
      </li>
      <Web3Button
        style={{ display: "none" }}
        contractAddress={MAIN_CONTRACT_ADDRESS}
        action={() => {
          isClicked && handleCompleted({ args: [index] });
        }}>
        Finish
      </Web3Button>
    </ul>
  ));
}
