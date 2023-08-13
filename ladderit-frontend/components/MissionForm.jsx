"use client";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadNotification, missionToastError } from "../utils/notifications";

import { useContractWrite, useContract, Web3Button } from "@thirdweb-dev/react";
import { MAIN_CONTRACT_ADDRESS } from "../constants";

export default function MissionForm({ text, setText }) {
  const { contract } = useContract(MAIN_CONTRACT_ADDRESS);
  const {
    mutateAsync: addTask,
    isLoading,
    error,
  } = useContractWrite(contract, "addTask");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (text.length < 3) {
      return handleLessText();
    }
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleLessText = () => {
    if (text.length < 3) {
      missionToastError();
    }
  };

  const handleProgression = () => {
    if (isLoading) {
      loadNotification();
    }
  };

  useEffect(() => {
    handleProgression();
  }, [isLoading]);

  return (
    <>
      <form
        className="w-1/2 h-72 p-12 flex flex-col justify-between bg-ultraViolet border border-solid border-ultraViolet rounded-md"
        onSubmit={handleFormSubmit}>
        <h2 className="text-2xl text-bgColor text-center">Add Missions</h2>
        <input
          className="h-[1.80rem] pl-2 py-4 rounded-xl border border-solid border-ultraViolet focus:outline-none"
          value={text}
          onChange={handleText}
        />
        <Web3Button
          className="mx-auto py-2 w-1/2 bg-bgColor rounded-3xl hover:bg-[#6A666C] hover:text-bgColor"
          contractAddress={MAIN_CONTRACT_ADDRESS}
          action={() => addTask({ args: [text] })}>
          Add
        </Web3Button>
        <ToastContainer />
      </form>
    </>
  );
}
