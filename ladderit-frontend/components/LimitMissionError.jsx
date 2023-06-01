"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import errorSVG from "../public/error-toast.svg";
import styles from "../src/styles/LimitMissionError.module.css";

export default function LimitMissionError() {
  const [showClass, setShowClass] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowClass(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className={`${styles.container} ${showClass ? styles.hide : ""}`}>
      <Image src={errorSVG} alt="Error icon" width={30} height={30} />
      <p>You have reached the mission limit</p>
    </div>
  );
}
