"use client";
import { useState, useContext, useEffect } from "react";
import { ContextAPI } from "../context/ContextProvider";
import styles from "../src/styles/MissionList.module.css";

export default function MissionList({ missions }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const { contractInstance, getProviderOrSigner, address } =
    useContext(ContextAPI);

  const handleCompleted = async (index) => {
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await contractInstance(signer);
      const tx = await contract.completeTask(index);
      setLoading(true);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const prov = await getProviderOrSigner();
      const contract = await contractInstance(prov);
      const query = await contract.getTasks();
      console.log(query);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClick = (index) => {
    setSelectedItems((prevSelectedItems) => {
      const updatedSelectedItems = [...prevSelectedItems];
      updatedSelectedItems[index] = !updatedSelectedItems[index];
      return updatedSelectedItems;
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return missions.map((mission, index) => (
    <div className="mt-16 w-2/3 h-24" key={index}>
      <div
        className={selectedItems[index] ? styles.cardChanging : styles.card}
        onClick={() => handleClick(index)}>
        <label className={styles.cardLabel}>
          <input
            type="checkbox"
            className={styles.cardInput}
            onClick={handleCompleted(index)}
          />
          <span className={styles.cardSpan}></span>
        </label>
        <p className="text-center text-bgColor text-2xl">{mission}</p>
      </div>
    </div>
  ));
}
