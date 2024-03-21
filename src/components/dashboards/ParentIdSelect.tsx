import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useEffect, useState } from "react";

const ParentIdSelect = ({ allNote, mutate, note, parentID, setParentID }) => {
  const [parentNote, setParentNote] = useState(null);

  // filtered notes
  const filNotes = allNote?.documents?.filter(
    (filNotes) => filNotes?.$id !== note?.$id
  );

  // filtered note
  const filNote = filNotes?.filter((filNotes) => filNotes?.$id === parentID);

  useEffect(() => {
    filNotes?.forEach((element) => {
      if (element?.parentID == parentID) {
        setParentNote(element);
      } else {
        setParentNote(null);
      }
    });
  }, [parentID]);

  return (
    <Autocomplete
      defaultInputValue={parentNote?.title}
      onSelect={(e) => {
        const dataPid = e.currentTarget.getAttribute("data-pid");
        setParentID(dataPid);
        mutate();
        console.log(parentID);
      }}
      size="sm"
      data-pid={filNote?.$id}
      label="Select Parent"
      className="max-w-xs"
    >
      {filNotes?.map((note) => {
        return (
          <AutocompleteItem key={note?.$id} value={note?.title}>
            {note?.title}
          </AutocompleteItem>
        );
      })}
    </Autocomplete>
  );
};

export default ParentIdSelect;
