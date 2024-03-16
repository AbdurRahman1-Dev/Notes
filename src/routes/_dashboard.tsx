import { Outlet, createFileRoute } from "@tanstack/react-router";
import Sidebar from "../components/dashboards/Sidebar";

export const Route = createFileRoute("/_dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
  return (
    <main className="bg-background">
      <div className="grid sm:grid-cols-12 gap-3">
        <div className="w-[90%] md:col-span-3 bg-secondarybg  h-screen sticky overflow-auto top-0 left-0 shadow-md">
          <Sidebar />
        </div>
        <div className="md:col-span-9 p-5 ">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
