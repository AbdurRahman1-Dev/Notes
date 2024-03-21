import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  useCreateBlockNote,
} from "@blocknote/react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/react/style.css";
import { useEffect, useMemo, useState } from "react";

import { useParams } from "@tanstack/react-router";
import { useTheme } from "next-themes";

const Editor = ({ mutate, setBlocks, note }) => {
  const [initialContent, setInitialContent] = useState<Block[]>([]);
  const { id } = useParams();
  const { theme, setTheme } = useTheme();

  // const { mutate, isLoading } = useMutation({
  //   mutationKey: ["notes", note?.$id],
  //   mutationFn: () => updateNotes(note?.$id, newData),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["notes"],
  //     });
  //   },
  // });

  const parsedContent = useMemo(() => {
    if (note?.contents) {
      setInitialContent(JSON.parse(note?.contents));
      return JSON.parse(note?.contents);
    }
    return [];
  }, [note, id]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent:
      parsedContent?.length > 0 ? (parsedContent as PartialBlock[]) : undefined,
  });

  useEffect(() => {
    if (parsedContent?.length > 0) {
      editor.replaceBlocks(editor.document, parsedContent);
    }
  }, [parsedContent, note, id]);

  return (
    <>
      <BlockNoteView
        onChange={() => {
          // Saves the document JSON to state.
          setBlocks(editor.document);
          // const handler = setTimeout(() => {
          //   mutate();
          // }, 100);

          // return () => {
          //   clearTimeout(handler);
          // };
        }}
        // onMouseLeave={() => mutate()}

        editable={true}
        theme={theme == "light" ? lightDefaultTheme : darkDefaultTheme}
        editor={editor}
      />
    </>
  );
};

export default Editor;
