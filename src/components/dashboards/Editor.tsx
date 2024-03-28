/* eslint-disable @typescript-eslint/no-unused-vars */
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  darkDefaultTheme,
  lightDefaultTheme,
  useCreateBlockNote,
} from "@blocknote/react";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/react/style.css";
import {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTheme } from "next-themes";
import SkeletonLoading from "../shared/SkeletonLoading";
import NewData from "../../@types/note";

type EditNote = {
  setBlocks: Dispatch<SetStateAction<PartialBlock[]>>;
  note: NewData | undefined;
  id: string;
};

const Editor: React.FC<EditNote> = ({ setBlocks, note, id }) => {
  const [, setInitialContent] = useState<Block[] | string>([]);
  const { theme } = useTheme();

  const parsedContent = useMemo(() => {
    if (note?.contents) {
      setInitialContent(JSON.parse(note?.contents));
      return JSON.parse(note?.contents);
    }
    return [];
  }, [note]);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent:
      parsedContent?.length > 0 ? (parsedContent as PartialBlock[]) : undefined,
  });

  useEffect(() => {
    if (parsedContent?.length > 0) {
      editor?.replaceBlocks(editor?.document, parsedContent);
    }
    // return () => {
    //   if (editor) {
    //     editor.replaceBlocks(editor?.document, parsedContent);
    //   }
    // };
  }, [parsedContent, note, id, editor]);

  return (
    <div className="-z-10 md:px-10 ">
      <Suspense fallback={<SkeletonLoading classes={"h-10 w-full"} />}>
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
    </div>
  );
};

export default Editor;
