import MissionForm from "../../components/MissionForm";
import MissionList from "../../components/MissionList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MissionForm />
      <MissionList />
      <MissionList />
      <MissionList />
      <MissionList />
      <MissionList />
    </main>
  );
}
