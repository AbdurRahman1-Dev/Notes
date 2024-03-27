import { createFileRoute } from "@tanstack/react-router";
import { getNotes } from "../../../api/notes";
import { useQuery } from "react-query";
import RecentNoteCard from "../../../components/dashboards/RecentNoteCard";
import SkeletonLoading from "../../../components/SkeletonLoading";

import SearchNotes from "../../../components/dashboards/SearchNotes";
import { ThemeSwitcher } from "../../../components/ThemeSwitcher";

import AllFilterNotes from "../../../components/dashboards/AllFilterNotes";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: () => <Dashboard />,
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
        <SearchNotes />
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
