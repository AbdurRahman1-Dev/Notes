import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CirclePlus, Ellipsis, Star, Trash2 } from "lucide-react";

const EditNote = ({ deleteMutate, mutate }) => {
  const iconClasses =
    "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="light" size="sm">
          <Ellipsis className={iconClasses} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
        <DropdownItem
          onClick={() => mutate()}
          key="new"
          shortcut="⌘N"
          description="Create a new file"
          startContent={<CirclePlus className={iconClasses} />}
        >
          New Note
        </DropdownItem>

        <DropdownItem
          onClick={() => mutate()}
          key="edit"
          shortcut="⌘⇧E"
          showDivider
          description="Add to Favourite"
          startContent={<Star className={iconClasses} />}
        >
          Favourite
        </DropdownItem>
        <DropdownItem
          onClick={() => deleteMutate()}
          key="delete"
          className="text-danger"
          color="danger"
          shortcut="⌘⇧D"
          description="Permanently delete the file"
          startContent={<Trash2 className={iconClasses} />}
        >
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditNote;
