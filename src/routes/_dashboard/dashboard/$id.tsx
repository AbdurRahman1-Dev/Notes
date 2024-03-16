import { createFileRoute, useParams } from "@tanstack/react-router";
import Editor from "../../../components/dashboards/Editor";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Star } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/_dashboard/dashboard/$id")({
  component: () => <ViewNote></ViewNote>,
});

export default function ViewNote() {
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("");
  const { id } = useParams();

  const animals = ["tiger", "lion", "bird", "elephent", "bla"];

  return (
    <main>
      <div className="flex justify-between items-center mb-5 ">
        <div>untitled</div>
        <div className="flex items-center gap-2 ">
          <Star />
          <button>delete</button>
        </div>
      </div>
      <div className="space-y-4 mb-5">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Untitled"
          className="w-full border-0 h-full bg-background p-1 text-4xl font-semibold  focus:border-0 border-none outline-0"
          name="title"
        />
        <div>
          <Autocomplete
            // onChange={(value) => console.log(value)}
            onSelect={(e) => setFolder(e.target.value)}
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
      <Editor title={title} folder={folder} />
    </main>
  );
}
