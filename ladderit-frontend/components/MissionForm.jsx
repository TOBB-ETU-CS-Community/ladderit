"use client";
import { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextAPI } from "../context/ContextProvider";

export default function MissionForm({ text, setText, setMissions, missions }) {
  const [loading, setLoading] = useState(false);
  const { contractInstance, getProviderOrSigner } = useContext(ContextAPI);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (text.length < 3) {
      return handleLessText();
    }
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await contractInstance(signer);
      const tx = await contract.addTask(text);
      setLoading(true);
      handleProgression();
      await tx.wait();
      setLoading(false);
      setMissions((prev) => [...prev, text]);
    } catch (error) {}
  };

  const handleText = (e) => {
    setText(e.target.value);
  };

  const handleLessText = () => {
    if (text.length < 3) {
      toast.error("You have to enter a mission", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleClick = () => {
    if (missions.length > 4) {
      toast.error("You reached the mission limit", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleProgression = () => {
    if (loading) {
      toast("Transaction has been sent", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };

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
        <button
          className="mx-auto py-2 w-1/2 bg-bgColor rounded-3xl hover:bg-[#6A666C] hover:text-bgColor"
          onClick={handleClick}>
          Add
        </button>
        <ToastContainer />
      </form>
    </>
  );
}
