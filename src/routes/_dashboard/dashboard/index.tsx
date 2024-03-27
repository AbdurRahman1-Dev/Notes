import { createFileRoute, redirect } from "@tanstack/react-router";
import { getNotes } from "../../../api/notes";
import { useQuery } from "react-query";
import RecentNoteCard from "../../../components/dashboards/RecentNoteCard";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";

import SearchNotes from "../../../components/dashboards/SearchNotes";
import { ThemeSwitcher } from "../../../components/shared/ThemeSwitcher";

import AllFilterNotes from "../../../components/dashboards/AllFilterNotes";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import PrivateAuth from "../../../context/PrivateAuth";
import SearchModal from "../../../components/dashboards/SearchModal";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  // beforeLoad: async ({ context }) => {
  //   console.log("cont", context);

  //   // const { user } = useContext(AuthContext);
  //   if (context?.user) {
  //     throw redirect({
  //       to: "/signin",
  //     });
  //   }
  // },
  // loader: async () => {
  //   return <Auth />;
  // },
  component: () => (
    <PrivateAuth>
      <Dashboard />
    </PrivateAuth>
  ),
});

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // get notes
  const {
    data: notes,
    isError,
    isLoading,
  } = useQuery(["notes"], async () => await getNotes(), {});

  // recent Notes
  const recentNotes = notes && [...notes?.documents]?.reverse().slice(0, 6);

  if (isError) {
    return <p>Smwthing went wrong</p>;
  }

  return (
    <div className="md:space-y-5 space-y-3 ">
      {/* recent notes */}
      <section className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl text-gray-400">Recent Notes</h3>
          <div className="flex gap-2 items-center gap-2">
            <span className="text-sm md:text-base font-semibold text-gray-400 hidden md:block">
              Total Notes: {notes?.total}
            </span>
            <ThemeSwitcher />
          </div>
        </div>
        {isLoading ? (
          <div className="flex gap-5 my-5">
            <SkeletonLoading classes={"h-12 w-full "} />
            <SkeletonLoading classes={"h-12 w-full "} />
            <SkeletonLoading classes={"h-12 w-full "} />
          </div>
        ) : (
          <div>
            <RecentNoteCard recentNotes={recentNotes} />
          </div>
        )}
      </section>

      {/* search Notes */}
      <section>
        {/* <SearchNotes /> */}
        <SearchModal />
      </section>

      {/* filter notes */}

      <section>
        <AllFilterNotes
          notes={recentNotes}
          isError={isError}
          isLoading={isLoading}
        />
      </section>
    </div>
  );
};

export default Dashboard;
