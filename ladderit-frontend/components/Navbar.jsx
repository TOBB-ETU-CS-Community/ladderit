"use client";
import Link from "next/link";
import { useContext } from "react";
import { ContextAPI } from "../context/ContextProvider";

export default function Navbar() {
  const { address, connectWallet, walletConnected } = useContext(ContextAPI);
  return (
    <div className="w-full h-20 flex justify-evenly items-center bg-[#6A666C] text-bgColor">
      <Link href="/" className="text-3xl">
        LADDERIT
      </Link>
      <Link href="/register">Register</Link>
      <button className="p-1.5" onClick={connectWallet}>
        {walletConnected
          ? `${address.slice(0, 5)}...${address.slice(-4)}`
          : "Connect Wallet"}
      </button>
    </div>
  );
}
