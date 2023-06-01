"use client";
import { useState } from "react";
import MissionForm from "../../components/MissionForm";
import MissionList from "../../components/MissionList";
import LimitMissionError from "../../components/LimitMissionError";

export default function Home() {
  const [missions, setMissions] = useState([]);
  const [text, setText] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {missions.length > 5 && <LimitMissionError />}
      <MissionForm text={text} setText={setText} setMissions={setMissions} />
      <MissionList missions={missions} />
    </main>
  );
}
