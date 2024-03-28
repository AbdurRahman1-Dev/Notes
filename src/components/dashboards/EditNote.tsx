import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { CirclePlus, Ellipsis, Star, Trash2 } from "lucide-react";
import { ThemeSwitcher } from "../shared/ThemeSwitcher";
import { Dispatch, SetStateAction } from "react";
import NewData from "../../@types/note";

interface EditNoteType {
  deleteMutate: () => void;
  mutate: () => void;
  setFavorite: Dispatch<SetStateAction<boolean>>;
  note: NewData | undefined;
}

const EditNote: React.FC<EditNoteType> = ({
  deleteMutate,
  mutate,
  setFavorite,
  note,
}) => {
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
        {/* create new note */}
        <DropdownItem
          onClick={() => mutate()}
          key="new"
          description="Create a new file"
          startContent={<CirclePlus className={iconClasses} />}
        >
          New Note
        </DropdownItem>
        {/* set and remove Favourite */}
        {note?.favorite ? (
          <DropdownItem
            onClick={() => {
              setFavorite(false);
              const handler = setTimeout(() => {
                mutate();
              }, 500);

              return () => {
                clearTimeout(handler);
              };
            }}
            key="edit"
            showDivider
            description="Remove from Favourite"
            startContent={<Star className={iconClasses} />}
          >
            Favourite
          </DropdownItem>
        ) : (
          <DropdownItem
            onClick={() => {
              setFavorite(true);
              const handler = setTimeout(() => {
                mutate();
              }, 500);

              return () => {
                clearTimeout(handler);
              };
            }}
            key="edit"
            shortcut="⌘⇧E"
            showDivider
            description="Add to Favourite"
            startContent={<Star className={iconClasses} />}
          >
            Favourite
          </DropdownItem>
        )}
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
        {/* switch theme */}
        <DropdownItem
          className="md:hidden"
          shortcut={<ThemeSwitcher />}

          // startContent={<Trash2 className={iconClasses} />}
        >
          Toggole Theme
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default EditNote;
