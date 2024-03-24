import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import Editor from "../../../components/dashboards/Editor";
import { Button } from "@nextui-org/react";
import { Save } from "lucide-react";
import { Block } from "@blocknote/core";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../main";
import {
  deleteNotes,
  getNotes,
  getSingleNote,
  updateNotes,
} from "../../../api/notes";
import { ThemeSwitcher } from "../../../components/ThemeSwitcher";
import EditNote from "../../../components/dashboards/EditNote";

import Title from "../../../components/Title";

import SkeletonLoading from "../../../components/SkeletonLoading";
import SelectCategory from "../../../components/dashboards/SelectCategory";

export const Route = createFileRoute("/_dashboard/dashboard/$id")({
  component: () => <ViewNote></ViewNote>,
});

export default function ViewNote() {
  const { id } = useParams();
  const navigate = useNavigate();
  // // get all note
  // const { data: allNote } = useQuery("notes", getNotes, {});

  // get single note
  const { data: note, isLoading } = useQuery(
    ["notes", id],
    () => getSingleNote(id),
    {}
  );
  console.log(note);

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

  const [blocks, setBlocks] = useState<Block[]>([]);

  // new data
  let newData = {
    title,
    // parentID: parentID,
    tags: ["text"],
    contents: JSON.stringify(blocks),
    userId: "",
    category: category,
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

  const { mutate: deleteMutate, isLoading: loadingDelete } = useMutation({
    mutationKey: "notes",
    mutationFn: () => deleteNotes(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      navigate({
        to: `/dashboard`,
      });
    },
  });

  return (
    <main>
      <div className="flex justify-between items-center mb-5 sticky top-0 left-0 z-50 py-3 bg-background">
        <span className="text-sm md:text-base">
          {" "}
          {note?.title === ""
            ? "Untitled"
            : note?.title?.length > 25
              ? note?.title?.slice(0, 13) + "..."
              : note?.title}
        </span>

        <div className="flex items-center justify-between justify-items-center gap-2 ">
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
          <EditNote deleteMutate={deleteMutate} mutate={mutate} />
        </div>
      </div>
      {isLoading ? (
        <div className=" space-y-5">
          <SkeletonLoading classes={"h-4 w-full"} />
          <SkeletonLoading classes={"h-4 w-full"} />
        </div>
      ) : (
        <div className="space-y-4 mb-5 ">
          <Title setTitle={setTitle} mutate={mutate} note={note}></Title>
          <div>
            <SelectCategory
              mutate={mutate}
              note={note}
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

      <Editor setBlocks={setBlocks} note={note} isLoading={isLoading} id={id} />
    </main>
  );
}
