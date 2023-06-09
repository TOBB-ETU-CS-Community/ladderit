"use client";
import { useState, useContext, useEffect } from "react";
import MissionForm from "../../components/MissionForm";
import MissionList from "../../components/MissionList";
import { ContextAPI } from "../../context/ContextProvider";

export default function Home() {
  const [missions, setMissions] = useState([]);
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const { contractInstance, getProviderOrSigner, address, walletConnected } =
    useContext(ContextAPI);

  const getUsername = async () => {
    try {
      const provider = await getProviderOrSigner();
      const contract = await contractInstance(provider);
      const query = await contract.users(address);
      const name = query[1];
      setUsername(name);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsername();
  }, [walletConnected]);

  return (
    <>
      <h2 className="mt-8 ml-12 text-xl font-bold text-oxfordBlue underline decoration-ultraViolet">
        Welcome {username}
      </h2>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MissionForm
          text={text}
          setText={setText}
          setMissions={setMissions}
          missions={missions}
        />
        <MissionList missions={missions} />
      </main>
    </>
  );
}
