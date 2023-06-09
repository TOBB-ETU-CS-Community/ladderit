"use client";
import { useState, useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContextAPI } from "../../../context/ContextProvider";
import { loadNotification } from "../../../utils/notifications";

export default function Page() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const { contractInstance, getProviderOrSigner } = useContext(ContextAPI);

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const signer = await getProviderOrSigner(true);
      const contract = await contractInstance(signer);
      const tx = await contract.getUserName(text);
      setLoading(true);
      handleProgression();
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProgression = () => {
    if (loading) {
      loadNotification();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        className="w-1/2 h-72 p-12 flex flex-col justify-between bg-ultraViolet border border-solid border-ultraViolet rounded-md"
        onSubmit={handleOnSubmit}>
        <h2 className="text-2xl text-bgColor text-center">Register</h2>
        <label htmlFor="username" className="text-bgColor">
          Username:
        </label>
        <input
          className="h-[1.80rem] pl-2 py-4 rounded-xl border border-solid border-ultraViolet focus:outline-none"
          name="username"
          value={text}
          onChange={handleOnChange}
        />
        <button className="mx-auto py-2 w-1/2 bg-bgColor rounded-3xl hover:bg-[#6A666C] hover:text-bgColor">
          Submit
        </button>
        <ToastContainer />
      </form>
    </div>
  );
}
