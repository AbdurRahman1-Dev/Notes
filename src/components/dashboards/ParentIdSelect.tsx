import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const ParentIdSelect = ({ filNotes, mutate, id, setParentID }) => {
  return (
    <Autocomplete
      // onChange={(value) => console.log(value)}
      onSelect={(e) => {
        const dataPid = e.currentTarget.getAttribute("data-pid");
        console.log(dataPid);
        setParentID(dataPid);
        mutate();
      }}
      size="sm"
      data-pid={id}
      label="Select Folder"
      className="max-w-xs"
    >
      {filNotes?.map((note) => (
        <AutocompleteItem key={note?.$id} value={note?.title}>
          {note?.title}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default ParentIdSelect;
