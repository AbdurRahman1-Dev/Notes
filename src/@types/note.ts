import { PartialBlock } from "@blocknote/core";
import { Dispatch, SetStateAction } from "react";

type NewData = {
  $id?: string;
  $createdAt?: string;
  title: string;
  parentID?: string;
  tags: string[];
  contents: string | Dispatch<SetStateAction<PartialBlock[]>> | object;
  userId: string | undefined;
  category: string;
  favorite: boolean;
};
export default NewData;
