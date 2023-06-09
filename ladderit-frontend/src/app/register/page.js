"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [text, setText] = useState("");

  const handleOnChange = (e) => {
    setText(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await getUserName(text);
    load();
  };

  // const load = () => {
  //   if (isLoading) {
  //     toast("Transaction has sent", {
  //       position: "top-right",
  //       autoClose: 2000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //   }
  // };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="w-1/2 h-72 p-12 flex flex-col justify-between bg-ultraViolet border border-solid border-ultraViolet rounded-md">
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
