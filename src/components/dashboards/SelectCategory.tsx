import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

const categorys = ["personal", "work", "study", "ideas", "health"];

const SelectCategory = ({ mutate, note, setCategory }) => {
  // useEffect(() => {

  // }, []);

  return (
    <Autocomplete
      defaultInputValue={note?.category}
      onSelect={(e) => {
        // const dataPid = e.currentTarget.getAttribute("data-pid");
        setCategory(e.target.value);
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
