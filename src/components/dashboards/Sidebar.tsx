import { Button, User } from "@nextui-org/react";
import { CirclePlus, Home, LogOut, NotebookText, Star } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { getNotes, handleCreateNote } from "../../api/notes";
import NotesFolder from "./NotesFolder";
import { Link, useNavigate } from "@tanstack/react-router";
import { queryClient } from "../../main";
import SearchModal from "./SearchModal";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import NewData from "../../@types/note";

const Sidebar: React.FC = () => {
  // const { user, logout } = useContext<AuthContextType>(AuthContext);
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const { data: notes, isError, isLoading } = useQuery("notes", getNotes, {});

  const { mutate } = useMutation({
    mutationKey: "notes",
    mutationFn: handleCreateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Successfully created");
      navigate<string>({
        to: `/dashboard/${data?.$id}`,
      });
    },
  });

  const favoriteNotes = notes?.documents
    ?.filter((note) => note?.favorite)
    .reverse();

  const privateNotes = notes?.documents
    ?.filter((note) => !note?.favorite)
    .reverse();

  return (
    <aside className="flex ">
      {/* <div className="bg-primary text-white shadow-md">
        <SidebarLeft />
      </div> */}

      <div className="flex flex-col  gap-4  p-3 w-full">
        {/* sidebar settings */}
        <div className="sticky top-0 left-0 overflow-hidden bg-secondarybg z-20  py-2">
          <div className="border-b border-b-gray-600 pb-2">
            {/* <h2 className="font-semibold text-2xl">{user?.name}</h2> */}
            <User name={user?.name} description={user?.email} />
          </div>
          <div className="w-full border-b border-b-gray-600 ">
            <div className="mt-1">
              <SearchModal />
            </div>{" "}
            <div>
              <Button
                onClick={() => mutate()}
                className="bg-inherit hover:bg-primary hover:text-white w-full  justify-start p-0 px-2 font-medium text-base mb-2"
                startContent={<CirclePlus size={20} />}
              >
                {" "}
                Add Notes
              </Button>
            </div>
          </div>
        </div>
        {/* sidebar favourites list */}

        <div className="h-screen mb-52">
          <NotesFolder
            notes={favoriteNotes as NewData[] | undefined}
            isError={isError}
            isLoading={isLoading}
            type={"favorite"}
            icon={<Star size={15} />}
            keys={"1"}
          ></NotesFolder>

          {/* sidebar private list */}

          <NotesFolder
            notes={privateNotes as NewData[] | undefined}
            isError={isError}
            isLoading={isLoading}
            type={"Private"}
            icon={<NotebookText size={15} />}
            keys={"2"}
          ></NotesFolder>
        </div>
        <div className="bg-secondarybg z-20 w-full relative">
          <div className=" border-t border-t-gray-600 flex justify-center items-center fixed  bottom-0 left-5 overflow-hidden bg-secondarybg w-[19%] gap-4 pt-1">
            <Button
              className="bg-inherit hover:bg-primary hover:text-white w-full   p-0 px-2 font-medium text-base mb-2"
              startContent={<Home size={20} />}
            >
              {" "}
              <Link to="/dashboard"> Home</Link>
            </Button>

            <Button
              onClick={logout}
              className="bg-inherit hover:bg-danger hover:text-white w-full   p-0 px-2 font-medium text-base mb-2"
              endContent={<LogOut size={20} />}
            >
              {" "}
              Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
