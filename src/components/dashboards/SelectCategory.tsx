import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import NewData from "../../@types/note";
import React, { Dispatch, SetStateAction } from "react";

const categorys = ["personal", "work", "study", "ideas", "health"];

interface SelectCategoryType {
  mutate: () => void;
  setCategory: Dispatch<SetStateAction<string>>;
  note: NewData;
}

const SelectCategory: React.FC<SelectCategoryType> = ({
  mutate,
  note,
  setCategory,
}) => {
  return (
    <Autocomplete
      defaultInputValue={note?.category}
      onSelect={(e) => {
        // const dataPid = e.currentTarget.getAttribute("data-pid");
        setCategory((e.target as HTMLInputElement).value);
        const handler = setTimeout(() => {
          mutate();
        }, 100);

        return () => {
          clearTimeout(handler);
        };
      }}
      size="sm"
      // data-pid={filNote?.$id}
      label="Select category"
      className="max-w-xs"
    >
      {categorys?.map((category) => {
        return (
          <AutocompleteItem key={category} value={category}>
            {category}
          </AutocompleteItem>
        );
      })}
    </Autocomplete>
  );
};

export default SelectCategory;
