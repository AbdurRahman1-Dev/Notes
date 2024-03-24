import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { CirclePlus, Ellipsis, Home, Search } from "lucide-react";
import { useMutation } from "react-query";
import { handleCreateNote } from "../../api/notes";
import { queryClient } from "../../main";

const MobileBottomMenu = () => {
  const navigate = useNavigate();

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
    <div className="bg-background border-t-1 border-secondarybg w-full h-14 ">
      <ul className="grid grid-cols-4 gap-2 justify-center items-center text-center w-full h-full">
        <li className=" h-full">
          <Link className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center">
            <Home />
          </Link>
        </li>{" "}
        <li className=" h-full">
          <Link className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center">
            <Search />
          </Link>
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
          <Link className="hover:bg-primary rounded-3xl hover:rounded-sm duration-300 w-full h-full flex justify-center items-center">
            <Ellipsis />
          </Link>
        </li>{" "}
      </ul>
    </div>
  );
};

export default MobileBottomMenu;
