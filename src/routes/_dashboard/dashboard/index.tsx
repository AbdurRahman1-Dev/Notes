import { createFileRoute } from "@tanstack/react-router";
import { getNotes } from "../../../api/notes";
import { useQuery } from "react-query";
import RecentNoteCard from "../../../components/dashboards/RecentNoteCard";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import { ThemeSwitcher } from "../../../components/shared/ThemeSwitcher";
import AllFilterNotes from "../../../components/dashboards/AllFilterNotes";

import PrivateAuth from "../../../context/PrivateAuth";
import { FileHeart, GitCompareArrows, ReceiptText } from "lucide-react";

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
  // const { user } = useContext(AuthContext);
  // get notes
  const {
    data: notes,
    isError,
    isLoading,
  } = useQuery(["notes"], async () => await getNotes(), {});

  // recent Notes
  const recentNotes = notes && [...notes?.documents]?.reverse().slice(0, 6);

  // favorites
  const favoriteNotes = notes?.documents?.filter(
    (note) => note?.favorite
  ).length;

  if (isError) {
    return <p>Smwthing went wrong</p>;
  }

  return (
    <div className="md:space-y-5 space-y-3 ">
      {/* recent notes */}
      <section className="w-full">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold text-2xl text-gray-400">Recent Notes</h3>
          <div className="flex  items-center gap-2">
            <span className="text-sm md:text-base font-semibold text-gray-400 hidden md:block">
              Switch
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

      {/* Details*/}
      <section>
        <h3 className="font-semibold text-2xl text-gray-400 mb-3">
          More Details
        </h3>
        <div className="grid grid-cols-3 gap-2 md:gap-5">
          <Details
            title={"Total"}
            icon={<ReceiptText className="hidden md:block" size={20} />}
            iconOp={<ReceiptText className="opacity-25" size={20} />}
            value={notes?.total}
            isLoading={isLoading}
          />
          <Details
            title={"Favorites"}
            icon={<FileHeart className="hidden md:block" size={20} />}
            iconOp={<FileHeart className="opacity-25" size={20} />}
            value={favoriteNotes}
            isLoading={isLoading}
          />
          <Details
            title={"Categories"}
            icon={<GitCompareArrows className="hidden md:block" size={20} />}
            iconOp={<GitCompareArrows className="opacity-25" size={20} />}
            value={notes?.total}
            isLoading={isLoading}
          />
        </div>
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

const Details = ({ title, icon, iconOp, value, isLoading }) => {
  return (
    <div className="w-full p-2 md:p-4 bg-gray-200 dark:bg-secondarybg rounded-md md:space-y-3">
      {isLoading ? (
        <>
          {" "}
          <SkeletonLoading classes={"h-5 w-full"}></SkeletonLoading>{" "}
        </>
      ) : (
        <>
          <h4 className="text-md md:text-2xl font-semibold flex justify-between items-center">
            {title}
            {icon}
          </h4>
          <span className="text-3xl md:text-4xl flex items-center gap-2">
            {" "}
            {iconOp} {value}
          </span>
        </>
      )}
    </div>
  );
};

export default Dashboard;
