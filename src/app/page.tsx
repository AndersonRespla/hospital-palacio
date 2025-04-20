import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}
