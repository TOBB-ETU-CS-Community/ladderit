"use client";
import Link from "next/link";
// import { ConnectWallet } from "@thirdweb-dev/react";

export default function Navbar() {
  return (
    <div className="w-full h-20 flex justify-evenly items-center bg-[#6A666C] text-bgColor">
      <Link href="/" className="text-3xl">
        LADDERIT
      </Link>
      <Link href="/">Register</Link>
      {/* <ConnectWallet className="grow-0" /> */}
    </div>
  );
}
