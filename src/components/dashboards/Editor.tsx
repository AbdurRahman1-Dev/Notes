import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  useCreateBlockNote,
} from "@blocknote/react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/react/style.css";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import SkeletonLoading from "../SkeletonLoading";

const Editor = ({ setBlocks, note, isLoading, id }) => {
  const [initialContent, setInitialContent] = useState<Block[]>([]);
  const { theme, setTheme } = useTheme();

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
      editor.replaceBlocks(editor?.document, parsedContent);
    }
    // return () => {
    //   if (editor) {
    //     editor.replaceBlocks(editor?.document, parsedContent);
    //   }
    // };
  }, [parsedContent, note, id]);

  return (
    <>
      <Suspense fallback={<SkeletonLoading />}>
        <BlockNoteView
          onChange={() => {
            // Saves the document JSON to state.
            setBlocks(editor?.document);
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
      </Suspense>
    </>
  );
};

export default Editor;
