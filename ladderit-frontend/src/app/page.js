"use client";
import { useState, useEffect } from "react";
import { useContractRead, useContract, useAdress } from "@thirdweb-dev/react";

import MissionForm from "../../components/MissionForm";
import MissionList from "../../components/MissionList";
import { MAIN_CONTRACT_ADDRESS } from "../../constants";

export default function Home() {
  const [text, setText] = useState("");

  const { contract } = useContract(MAIN_CONTRACT_ADDRESS);
  const userAddress = useAdress();
  const { data, isLoading, error } = useContractRead(
    contract,
    "users",
    userAddress
  );

  return (
    <>
      <h2 className="mt-8 ml-12 text-xl font-bold text-oxfordBlue underline decoration-ultraViolet">
        Welcome {data}
      </h2>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MissionForm text={text} setText={setText} />
        <MissionList />
      </main>
    </>
  );
}
