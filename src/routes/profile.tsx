import { createFileRoute } from "@tanstack/react-router";
import RecentNoteCard from "../components/dashboards/RecentNoteCard";
import { useQuery } from "react-query";
import { getNotes } from "../api/notes";
import SearchNotes from "../components/dashboards/SearchNotes";

export const Route = createFileRoute("/profile")({
  component: () => <Profile />,
});

const Profile = () => {
  const { data: notes, isError, isLoading } = useQuery("notes", getNotes, {});
  return (
    <div>
      <section>
        <SearchNotes />
      </section>
      <RecentNoteCard notes={notes} />
    </div>
  );
};

export default Profile;
