import { createFileRoute, useParams } from "@tanstack/react-router";
import Editor from "../../../components/dashboards/Editor";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { queryClient } from "../../../main";
import { deleteNotes, getSingleNote, updateNotes } from "../../../api/notes";

export const Route = createFileRoute("/_dashboard/dashboard/$id")({
  component: () => <ViewNote></ViewNote>,
});

export default function ViewNote() {
  const { id } = useParams();
  const { data: note } = useQuery(["notes", id], () => getSingleNote(id), {});
  const [title, setTitle] = useState<string>("");
  const [folder, setFolder] = useState("");
  // const debouncedSearchTerm = useDebounce<string>(title, 500); // Debounce for 500ms

  const animals = ["tiger", "lion", "bird", "elephent", "bla"];

  const { mutate } = useMutation({
    mutationKey: "notes",
    mutationFn: () => updateNotes(id, { title }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      // setTitle(data.title);
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationKey: "notes",
    mutationFn: () => deleteNotes(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
      console.log(data);
    },
  });

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     mutate();
  //   }, 1000);

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [title]);
  return (
    <main>
      <div className="flex justify-between items-center mb-5 ">
        <div>{!note?.title == "" ? note?.title : "Untitled"}</div>
        <div className="flex items-center gap-2 ">
          <Star />
          <button onClick={deleteMutate}>delete</button>
        </div>
      </div>
      <div className="space-y-4 mb-5">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
            const handler = setTimeout(() => {
              mutate();
            }, 100);

            return () => {
              clearTimeout(handler);
            };
            // setTitle(e.target.value);
            // mutate();
          }}
          type="text"
          placeholder="Untitled"
          className="w-full border-0 h-full bg-background p-1 text-4xl font-semibold  focus:border-0 border-none outline-0"
          name="title"
          defaultValue={!note?.title == "" ? note?.title : ""}
        />
        <div>
          <Autocomplete
            // onChange={(value) => console.log(value)}
            onSelect={(e) => {
              setFolder(e.target.value);
            }}
            size="sm"
            label="Select Folder"
            className="max-w-xs"
          >
            {animals.map((animal) => (
              <AutocompleteItem key={animal} value={animal}>
                {animal}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>
      </div>
      <Editor title={title} folder={folder} id={id} />
    </main>
  );
}
