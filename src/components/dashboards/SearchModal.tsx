import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import SearchNotes from "./SearchNotes";
import { Search } from "lucide-react";

const SearchModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Button
        onPress={onOpen}
        className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-0 px-2 font-medium text-base mt-1"
        startContent={<Search size={20} />}
      >
        Search Notes
      </Button>
      <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-full h-[50%]">
          {() => (
            <>
              <SearchNotes />
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchModal;
