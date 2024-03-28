import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import Editor from "../../../components/dashboards/Editor";
import { Button } from "@nextui-org/react";
import { Save, Star } from "lucide-react";
import { Block, PartialBlock } from "@blocknote/core";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../main";
import { deleteNotes, getSingleNote, updateNotes } from "../../../api/notes";
import { ThemeSwitcher } from "../../../components/shared/ThemeSwitcher";
import EditNote from "../../../components/dashboards/EditNote";
import Title from "../../../components/Title";
import SkeletonLoading from "../../../components/shared/SkeletonLoading";
import SelectCategory from "../../../components/dashboards/SelectCategory";
import { AuthContext } from "../../../context/AuthContext";
import PrivateAuth from "../../../context/PrivateAuth";
import toast from "react-hot-toast";
import NewData from "../../../@types/note";

export const Route = createFileRoute("/_dashboard/dashboard/$id")({
  component: () => (
    <PrivateAuth>
      <ViewNote></ViewNote>
    </PrivateAuth>
  ),
});

export default function ViewNote() {
  const { id } = useParams({ from: "/_dashboard/dashboard/$id" });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  // // get all note
  // const { data: allNote } = useQuery("notes", getNotes, {});

  // get single note
  const { data: note, isLoading } = useQuery(
    ["notes", id],
    () => getSingleNote(id),
    {}
  );

  // set data
  const [title, setTitle] = useState<string>(
    note?.title !== "" ? note?.title : ""
  );
  // const [parentID, setParentID] = useState<string>(
  //   note?.parentID !== "" ? note?.parentID : ""
  // );
  const [category, setCategory] = useState<string>(
    note?.category !== "" ? note?.category : ""
  );

  const [favorite, setFavorite] = useState<boolean>(
    note?.favorite ? note?.favorite : false
  );

  const [blocks, setBlocks] = useState<Block[]>([]);

  // new data
  const newData: NewData = {
    title,
    // parentID: parentID,
    tags: ["text"],
    contents: JSON.stringify(blocks),
    userId: user?.$id,
    category: category,
    favorite: favorite,
  };

  const { mutate, isLoading: isNoteLoading } = useMutation({
    mutationKey: "notes",
    mutationFn: () => updateNotes(id, newData),
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
    <main>
      <div className="flex  justify-between items-center mb-5  py-3 bg-background fixed w-full z-50 md:w-[77%] top-0 right-0 px-2 md:px-0 shadow-md md:shadow-none">
        <span className="text-sm md:text-base">
          {" "}
          {note?.title === ""
            ? "Untitled"
            : note?.title?.length > 25
              ? note?.title?.slice(0, 13) + "..."
              : note?.title}
        </span>

        <div className="flex items-center justify-between justify-items-center gap-2 ">
          <div>
            {note?.favorite ? <Star className="text-warning" /> : <Star />}
          </div>
          {/* Save Button */}
          {isNoteLoading ? (
            <Button size="sm" color="primary" isLoading>
              Saving...
            </Button>
          ) : (
            <Button
              size="sm"
              color="primary"
              startContent={<Save />}
              onClick={() => mutate()}
            >
              Save
            </Button>
          )}

          <div className="hidden md:block">
            <ThemeSwitcher />
          </div>
          <div className="hidden md:block">
            <EditNote
              deleteMutate={deleteMutate}
              mutate={mutate}
              setFavorite={setFavorite}
              note={note as NewData | undefined}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className=" space-y-5 mt-16 ">
          <SkeletonLoading classes={"h-4 w-full"} />
          <SkeletonLoading classes={"h-4 w-full"} />
        </div>
      ) : (
        <div className="space-y-4 mb-5 mt-16 ">
          <Title
            setTitle={setTitle}
            mutate={mutate}
            note={note as NewData | undefined}
          ></Title>

          <div>
            <SelectCategory
              mutate={mutate}
              note={note as NewData | undefined}
              setCategory={setCategory}
            />
            {/* <ParentIdSelect
              allNote={allNote}
              mutate={mutate}
              // filNote={filNote}
              note={note}
              parentID={parentID}
              setParentID={setParentID}
            /> */}
          </div>
        </div>
      )}

      <Editor
        setBlocks={setBlocks as Dispatch<SetStateAction<PartialBlock[]>>}
        note={note as NewData | undefined}
        id={id as string}
      />
    </main>
  );
}
