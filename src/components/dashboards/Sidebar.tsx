import { Button } from "@nextui-org/react";
import { CirclePlus, Search } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import { getNotes, handleCreateNote } from "../../api/notes";
import NotesFolder from "./NotesFolder";
import { useNavigate } from "@tanstack/react-router";
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

      <div className="flex flex-col  gap-4 relative p-3 w-full h-full">
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

        <NotesFolder
          notes={notes}
          isError={isError}
          isLoading={isLoading}
          type={"Favourite"}
        ></NotesFolder>

        {/* sidebar private list */}

        <NotesFolder
          notes={notes}
          isError={isError}
          isLoading={isLoading}
          type={"Private"}
        ></NotesFolder>
        {/* <div className="mt-4 bg-secondarybg h-fit w-full">
          <div className="fixed bottom-0 left-10">
            <Button
              color="primary"
              className="  w-full  justify-start p-0 px-2 font-medium text-base mb-2"
              startContent={<CirclePlus size={20} />}
            >
              {" "}
              Add Notes
            </Button>
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
