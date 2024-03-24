import { createFileRoute } from "@tanstack/react-router";
import { getNotes } from "../../../api/notes";
import { useQuery } from "react-query";
import RecentNoteCard from "../../../components/dashboards/RecentNoteCard";
import SkeletonLoading from "../../../components/SkeletonLoading";

import SearchNotes from "../../../components/dashboards/SearchNotes";
import { ThemeSwitcher } from "../../../components/ThemeSwitcher";

export const Route = createFileRoute("/_dashboard/dashboard/")({
  component: () => <Dashboard />,
});

const Dashboard = () => {
  const { data: notes, isError, isLoading } = useQuery("notes", getNotes, {});
  console.log(notes);

  if (isError) {
    return <p>Smwthing went wrong</p>;
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-end">
        <ThemeSwitcher />
      </div>
      <section>
        <SearchNotes />
      </section>

      <section>
        <h3 className="font-semibold text-2xl flex items-center gap-2 text-gray-400">
          Recent Notes
        </h3>
        {isLoading ? (
          <div className="flex gap-5 my-5">
            <SkeletonLoading classes={"h-12 w-full "} />
            <SkeletonLoading classes={"h-12 w-full "} />
            <SkeletonLoading classes={"h-12 w-full "} />
          </div>
        ) : (
          <RecentNoteCard notes={notes} />
        )}
      </section>
    </div>
  );
};

export default Dashboard;
