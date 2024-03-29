import { useNavigate, useParams } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CirclePlus, Home } from "lucide-react";
import { useMutation, useQuery } from "react-query";
import {
  deleteNotes,
  getSingleNote,
  handleCreateNote,
  updateNotes,
} from "../../api/notes";
import { queryClient } from "../../main";
import EditNote from "./EditNote";
import { useState } from "react";
import SearchModal from "./SearchModal";
import toast from "react-hot-toast";
import NewData from "../../@types/note";

const MobileBottomMenu = () => {
  const { id } = useParams({ from: "/_dashboard/dashboard/$id" });
  const navigate = useNavigate();

  // get single note
  const { data: note } = useQuery(["notes", id], () => getSingleNote(id), {});

  const [favorite, setFavorite] = useState<boolean>(
    note?.favorite ? note?.favorite : false
  );

  const { mutate } = useMutation({
    mutationKey: "notes",
    mutationFn: handleCreateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Successfully Created!");
      navigate({
        to: `/dashboard/${data?.$id}` as string,
      });
    },
  });

  // // new data
  // let newData = {
  //   favorite: favorite,
  // };
  const { mutate: updateMuate } = useMutation({
    mutationKey: "notes",
    mutationFn: () => updateNotes(id, { favorite }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: "notes",
    mutationFn: () => deleteNotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      toast.success("Successfully Deleted");
      navigate({
        to: `/dashboard`,
      });
    },
  });
  return (
    <div className="bg-background border-t-1 border-secondarybg w-full h-14 shadow-2xl  shadow-black">
      <ul className="grid grid-cols-4 gap-2 justify-center items-center text-center w-full h-full">
        <li className=" h-full">
          <Link
            to={"/dashboard"}
            className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center"
          >
            <Home />
          </Link>
        </li>{" "}
        <li className=" hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center">
          <SearchModal />
        </li>{" "}
        <li className=" h-full">
          <button
            onClick={() => mutate()}
            className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center"
          >
            <CirclePlus />
          </button>
        </li>{" "}
        <li className=" h-full">
          <span className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center">
            <EditNote
              deleteMutate={deleteMutate}
              mutate={updateMuate}
              setFavorite={setFavorite}
              note={note as NewData | undefined}
            />
          </span>
        </li>{" "}
      </ul>
    </div>
  );
};

export default MobileBottomMenu;
