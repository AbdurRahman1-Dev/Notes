import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import SkeletonLoading from "../shared/SkeletonLoading";
import NewData from "../../@types/note";
import React from "react";

interface NotesFolderType {
  notes: NewData[] | undefined;
  isError: boolean;
  isLoading: boolean;
  type: string | undefined;
  icon: JSX.Element;
  keys: string;
}

const NotesFolder: React.FC<NotesFolderType> = ({
  notes,
  isError,
  isLoading,
  type,
  icon,
  keys,
}) => {
  // items classes
  // const itemClasses = {
  //   base: "py-0 w-full ",
  //   title: "font-semibold text-medium hover:text-white",
  //   trigger:
  //     " p-1  transition-all duration-250  data-[hover=true]:bg-primary data-[hover=true]:text-white rounded-lg  flex items-center flex-row-reverse ",
  //   indicator: "text-medium rotate-[180deg] text-gray-200",
  //   content: "ps-3 text-small ",
  // };

  // items classes
  const itemClasses = {
    base: "py-0 w-full h-fit p-0",
    title: "font-semibold text-medium ",
    trigger:
      " p-1  transition-all duration-250   rounded-lg  flex items-center ",
    indicator: "text-medium rotate-[180deg] text-gray-200",
  };

  if (isError) {
    return <p>someting wnet wo</p>;
  }

  return (
    <div className="w-full">
      {/* <p className="font-semibold text-sm flex items-center gap-2 text-gray-400">
        <Star size={15} /> <span>{type}</span>{" "}
      </p> */}

      <Accordion
        defaultSelectedKeys={"2"}
        showDivider={false}
        selectionMode={"multiple"}
        itemClasses={itemClasses}
      >
        <AccordionItem
          key={keys}
          aria-label="Accordion 1"
          title={
            <p className="font-semibold text-sm flex items-center gap-2 text-gray-400">
              {icon} <span>{type}</span>{" "}
            </p>
          }
        >
          {isLoading ? (
            <SkeletonLoading classes={"h-3 w-full"} />
          ) : notes && notes?.length > 0 ? (
            <ul className="flex flex-col gap-2 flex-1 my-2">
              {notes?.map((note) => (
                <li key={note?.$id} className="w-full">
                  <Link
                    activeProps={{ className: "bg-primary" }}
                    to={`/dashboard/${note?.$id}` as string}
                    className={`w-full hover:bg-primary p-2 flex flex-1  items-center gap-1  rounded-md duration-250 `}
                  >
                    <ChevronRight size={23} />
                    {note?.title === ""
                      ? "Untitled"
                      : note?.title?.length > 25
                        ? note?.title?.slice(0, 22) + "...."
                        : note?.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-base font-semibold ps-5 text-gray-400">
              No Notes Found!
            </p>
          )}
        </AccordionItem>
      </Accordion>

      {/* {isLoading ? (
        <SkeletonLoading />
      ) : (
        <ul className="flex flex-col gap-2 flex-1 my-2">
          {notes?.documents?.map((note) => (
            <li key={note?.$id} className="w-full">
              <Link
                activeProps={{ className: "bg-primary" }}
                to={`/dashboard/${note?.$id}`}
                className={`w-full hover:bg-primary p-2 flex flex-1  items-center gap-1  rounded-md duration-250 hover:scale-[1.01]`}
              >
                <ChevronRight size={23} />
                {note?.title === ""
                  ? "Untitled"
                  : note?.title?.length > 25
                    ? note?.title?.slice(0, 25) + "...."
                    : note?.title}
              </Link>
            </li>
          ))}
        </ul>
      )} */}
    </div>
    // <div>
    //   <p className="font-semibold text-sm flex items-center gap-2 text-gray-400">
    //     <Star size={15} /> <span>{type}</span>
    //   </p>
    //   {isLoading ? (
    //     <p>Loading..</p>
    //   ) : notes?.documents?.length > 0 ? (
    //     <Accordion
    //       showDivider={false}
    //       selectionMode={"multiple"}
    //       itemClasses={itemClasses}
    //     >
    //       {notes?.documents.map((note) => (
    //         <AccordionItem
    //           onClick={() =>
    //             navigate({
    //               to: `/dashboard/${note?.$id}`,
    //             })
    //           }
    //           key={note.$id}
    //           aria-label={note?.title}
    //           title={
    //             note?.title === ""
    //               ? "Untitled"
    //               : note.title.length > 25
    //                 ? note.title.slice(0, 25) + "...."
    //                 : note.title
    //           }
    //         >
    //           <ul>
    //             <li className=" px-2 ">
    //               <Link to={`/dashboard/${note.$id}`}>
    //                 <Button
    //                   // size="sm"
    //                   className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-1  font-medium h-fit"
    //                   startContent={<ChevronRight size={16} />}
    //                 >
    //                   Search Notes
    //                 </Button>
    //                 {/* <ChevronRight size={16} /> <span>One</span> */}
    //               </Link>
    //             </li>{" "}
    //           </ul>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   ) : (
    //     <span className="text-sm font-bold text-gray-400 ps-5">
    //       No Notes Found
    //     </span>
    //   )}
    // </div>
  );
};

export default NotesFolder;
