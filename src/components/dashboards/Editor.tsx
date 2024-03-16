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

const Editor = ({ title, folder }) => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  // Creates a new editor instance.
  const editor = useCreateBlockNote();
  return (
    <>
      <BlockNoteView
        onChange={() => {
          // Saves the document JSON to state.
          setBlocks(editor.document);
        }}
        theme={darkDefaultTheme}
        editor={editor}
      />
    </>
  );
};

export default Editor;
