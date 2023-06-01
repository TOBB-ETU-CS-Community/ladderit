"use client";
import Image from "next/image";
import errorSVG from "../public/error-toast.svg";
import styles from "../src/styles/LimitMissionError.module.css";

export default function LimitMissionError() {
  return (
    <div className={styles.container}>
      <Image src={errorSVG} alt="Error icon" width={30} height={30} />
      <p>You have reached the mission limit</p>
    </div>
  );
}
