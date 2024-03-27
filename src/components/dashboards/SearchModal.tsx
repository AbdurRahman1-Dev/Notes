import {
  Modal,
  ModalContent,
  Button,
  useDisclosure,
  Input,
  ModalHeader,
  ModalBody,
} from "@nextui-org/react";

import { ExternalLink, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getSearchNotes } from "../../api/notes";
import { useState } from "react";
import { useMutation } from "react-query";
import { queryClient } from "../../main";
import SkeletonLoading from "../shared/SkeletonLoading";

const SearchModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [text, setText] = useState("");

  const {
    mutate,
    data: searchedNotes,
    isLoading,
    isError,
  } = useMutation({
    mutationKey: "notes",
    mutationFn: () => getSearchNotes(text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });
    },
  });

  if (isError) {
    <p>Something went Wrong</p>;
  }

  return (
    <div className="z-[99]">
      <Button
        onPress={onOpen}
        className="bg-inherit hover:bg-primary hover:text-white w-full  justify-start p-0 px-2 font-medium text-base  hidden md:flex"
        startContent={<Search size={20} />}
      >
        {" "}
        Search Notes
      </Button>

      <Button onPress={onOpen} className="md:hidden bg-inherit">
        <Search />
      </Button>

      <Modal
        className="w-full h-fit maxh-[80%] "
        closeButton={<ExternalLink size={0} />}
        size="5xl"
        placement={"top"}
        shadow="lg"
        backdrop={"blur"}
        scrollBehavior={"inside"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="w-full z-[999] pb-2">
          {() => (
            <>
              <ModalHeader>
                <Input
                  onChange={(e) => {
                    setText(e.target.value);

                    const handler = setTimeout(() => {
                      mutate();
                    }, 1000);

                    return () => {
                      clearTimeout(handler);
                    };
                  }}
                  // onFocus={() => setOpen(true)}
                  // onFocusChange={() => setOpen(true)}
                  type="text"
                  placeholder="Search Notes"
                  endContent={<Search />}
                  // className="p-2"
                ></Input>
              </ModalHeader>
              <ModalBody className="w-full h-full">
                {isLoading ? (
                  <div className="flex flex-col items-baseline gap-3">
                    <SkeletonLoading classes={"h-4 w-full"} />
                    <SkeletonLoading classes={"h-4 w-full"} />
                    <SkeletonLoading classes={"h-4 w-full"} />
                  </div>
                ) : (
                  searchedNotes?.documents?.map((note) => (
                    <Link
                      onClick={() => onOpenChange(!isOpen)}
                      key={note?.$id}
                      to={`/dashboard/${note?.$id}`}
                    >
                      <div className="flex  justify-between items-center p-2  rounded-md bg-secondarybg hover:bg-primary duration-300">
                        <h3 className="text-sm md:text-xl font-medium   flex flex-col gap-1">
                          {note?.title?.slice(0, 20)}

                          <span className="text-[10px] md:text-sm  text-default-500">
                            {new Date(note?.$createdAt).toDateString()}
                          </span>
                        </h3>

                        {/* <p className="col-span-2 text-sm md:text-sm text-gray-400 hidden md:block">
                          Catgory:
                          {note?.category ? note?.category : "N/A"}
                        </p> */}

                        <span className="hidden md:block">
                          <ExternalLink />
                        </span>
                      </div>
                    </Link>
                  ))
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SearchModal;
