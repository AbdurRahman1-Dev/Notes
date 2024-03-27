import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import Sidebar from "../components/dashboards/Sidebar";
import MobileBottomMenu from "../components/dashboards/MobileBottomMenu";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { Spinner } from "@nextui-org/react";

export const Route = createFileRoute("/_dashboard")({
  component: Dashboard,
});

export default function Dashboard() {
  const { isLoading: loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <Spinner size="lg" />
        </div>
      ) : (
        <main className="bg-background ">
          <div className="grid md:grid-cols-12 gap-3">
            <div className="md:w-full lg:w-[90%] md:col-span-3 bg-secondarybg  h-screen sticky overflow-auto top-0 left-0 shadow-md hidden md:block">
              <Sidebar />
            </div>
            <div className=" md:col-span-9 p-3 md:p-3 mb-20 h-full !w-full overflow-hidden md:-ms-4 ">
              <Outlet />
            </div>
            <div className="w-full  overflow-hidden fixed bottom-0  left-0 shadow-md  md:hidden z-50">
              <MobileBottomMenu />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
