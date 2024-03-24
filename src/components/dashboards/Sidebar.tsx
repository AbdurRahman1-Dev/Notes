import { Button } from "@nextui-org/react";
import {
  CirclePlus,
  Home,
  LogOut,
  NotebookText,
  Search,
  Star,
} from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { getNotes, handleCreateNote } from "../../api/notes";
import NotesFolder from "./NotesFolder";
import { Link, useNavigate } from "@tanstack/react-router";
import { queryClient } from "../../main";

const Sidebar = () => {
  const navigate = useNavigate();
  const { data: notes, isError, isLoading } = useQuery("notes", getNotes, {});

  const { mutate } = useMutation({
    mutationKey: "notes",
    mutationFn: handleCreateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      navigate({
        to: `/dashboard/${data?.$id}`,
      });
    },
  });

  return (
    <aside className="flex ">
      {/* <div className="bg-primary text-white shadow-md">
        <SidebarLeft />
      </div> */}

      <div className="flex flex-col  gap-4  p-3 w-full">
        {/* sidebar settings */}
        <div className="sticky top-0 left-0 overflow-hidden bg-secondarybg z-20  py-2">
          <div>
            <h2 className="font-semibold text-2xl">Abdur Rahman</h2>
          </div>
          <div className="w-full border-b border-b-gray-600 ">
            <div>
              <Button
                className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-0 px-2 font-medium text-base mt-1"
                startContent={<Search size={20} />}
              >
                Search Notes
              </Button>
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
            notes={notes}
            isError={isError}
            isLoading={isLoading}
            type={"Favourite"}
            icon={<Star size={15} />}
            keys={"1"}
          ></NotesFolder>

          {/* sidebar private list */}

          <NotesFolder
            notes={notes}
            isError={isError}
            isLoading={isLoading}
            type={"Private"}
            icon={<NotebookText size={15} />}
            keys={"2"}
          ></NotesFolder>
        </div>
        <div className="bg-secondarybg z-20 w-full relative">
          <div className=" border-t border-t-gray-600 flex justify-center items-center fixed  bottom-0 left-5 overflow-hidden bg-secondarybg w-[19%]">
            <Button
              className="bg-inherit hover:bg-primary hover:text-white w-full  justify-start p-0 px-2 font-medium text-base mb-2"
              startContent={<Home size={20} />}
            >
              {" "}
              <Link to="/dashboard"> Home</Link>
            </Button>

            <Button
              // onClick={() => mutate()}
              className="bg-inherit hover:bg-danger hover:text-white w-full  justify-start p-0 px-2 font-medium text-base mb-2"
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
