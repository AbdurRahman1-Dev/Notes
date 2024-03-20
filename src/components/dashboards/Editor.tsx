import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  useCreateBlockNote,
} from "@blocknote/react";
import { Block } from "@blocknote/core";
import "@blocknote/react/style.css";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getSingleNote, updateNotes } from "../../api/notes";
import { queryClient } from "../../main";

const Editor = ({ title, folder, id }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  const { data: note } = useQuery(["notes", id], () => getSingleNote(id), {});

  let newData = {
    title,
    parentID: "",
    tags: ["text"],
    contents: JSON.stringify(blocks),
    userId: "",
  };

  // if (note && note?.contents !== null) {
  //   let pars = JSON.parse(note?.contents);

  //   console.log("bar", pars);
  // }
  // const editor =
  //   note && note?.contents !== null
  //     ? useCreateBlockNote({
  //         initialContent: JSON.parse(note?.contents),
  //       })
  //     : useCreateBlockNote();

  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  const { mutate } = useMutation({
    mutationKey: "notes",
    mutationFn: () => updateNotes(id, newData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  return (
    <>
      <BlockNoteView
        onChange={() => {
          // Saves the document JSON to state.
          setBlocks(editor.document);
          mutate();
        }}
        theme={darkDefaultTheme}
        editor={editor}
      />
    </>
  );
};

export default Editor;
