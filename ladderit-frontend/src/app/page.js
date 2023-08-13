"use client";
import { useState } from "react";
import { useContractRead, useContract, useAddress } from "@thirdweb-dev/react";

import MissionForm from "../../components/MissionForm";
import MissionList from "../../components/MissionList";
import { MAIN_CONTRACT_ADDRESS } from "../../constants";

export default function Home() {
  const [text, setText] = useState("");

  const { contract } = useContract(MAIN_CONTRACT_ADDRESS);
  const userAddress = useAddress();
  const { data: userName } = useContractRead(contract, "getUserName", [
    userAddress,
  ]);

  return (
    <>
      <h2 className="mt-8 ml-12 text-xl font-bold text-oxfordBlue underline decoration-ultraViolet">
        Welcome {userName}
      </h2>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MissionForm text={text} setText={setText} />
        <MissionList />
      </main>
    </>
  );
}
