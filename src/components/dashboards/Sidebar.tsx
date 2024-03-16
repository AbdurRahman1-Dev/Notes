import { Button } from "@nextui-org/react";
import {
  ChevronRight,
  CirclePlus,
  GalleryVerticalEnd,
  Search,
  Star,
} from "lucide-react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";

const Sidebar = () => {
  const itemClasses = {
    base: "py-0 w-full ",
    title: "font-semibold text-medium hover:text-white",
    trigger:
      " p-1  transition-all duration-250  data-[hover=true]:bg-primary data-[hover=true]:text-white rounded-lg  flex items-center flex-row-reverse ",
    indicator: "text-medium rotate-[180deg] text-gray-200",
    content: "ps-3 text-small ",
  };
  const defaultContent = "open";

  return (
    <aside className="flex ">
      {/* <div className="bg-primary text-white shadow-md">
        <SidebarLeft />
      </div> */}

      <div className="flex flex-col  gap-4 relative p-3 w-full h-full">
        <div className="sticky top-0 left-0 overflow-hidden bg-secondarybg z-20  py-2">
          <div>
            <h2 className="font-semibold text-2xl">Abdur Rahman</h2>
          </div>
          <div className="w-full border-b border-b-gray-600 ">
            <div>
              <Button
                className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-0 px-2 font-medium text-base mt-1"
                startContent={<Search size={20} />}
              >
                Search Notes
              </Button>
            </div>{" "}
            <div>
              <Button
                className="bg-inherit hover:bg-primary hover:text-white w-full  justify-start p-0 px-2 font-medium text-base mb-2"
                startContent={<CirclePlus size={20} />}
              >
                {" "}
                Add Notes
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p className="font-semibold text-sm flex items-center gap-2 text-gray-400">
            <Star size={15} /> <span>Favourites</span>
          </p>
          <Accordion
            showDivider={false}
            selectionMode={"multiple"}
            itemClasses={itemClasses}
          >
            <AccordionItem key="1" aria-label="Accordion 1" title="my dailys">
              <ul>
                <li className=" px-2 ">
                  <Link>
                    <Button
                      // size="sm"
                      className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-1  font-medium h-fit"
                      startContent={<ChevronRight size={16} />}
                    >
                      Search Notes
                    </Button>
                    {/* <ChevronRight size={16} /> <span>One</span> */}
                  </Link>
                </li>{" "}
              </ul>
            </AccordionItem>{" "}
            <AccordionItem key="2" aria-label="Accordion 1" title="js">
              <ul>
                <li className=" px-2 ">
                  <Link>
                    <Button
                      // size="sm"
                      className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-1  font-medium h-fit"
                      startContent={<ChevronRight size={16} />}
                    >
                      Search Notes
                    </Button>
                    {/* <ChevronRight size={16} /> <span>One</span> */}
                  </Link>
                </li>{" "}
              </ul>
            </AccordionItem>
          </Accordion>
        </div>{" "}
        <div>
          <p className="font-semibold text-sm flex items-center gap-2 text-gray-400">
            <GalleryVerticalEnd size={15} /> <span>Private</span>
          </p>
          <Accordion
            showDivider={false}
            selectionMode={"multiple"}
            itemClasses={itemClasses}
          >
            <AccordionItem key="1" aria-label="Accordion 1" title="my dailys">
              <ul>
                <li className=" px-2 ">
                  <Link>
                    <Button
                      // size="sm"
                      className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-1  font-medium h-fit"
                      startContent={<ChevronRight size={16} />}
                    >
                      Search Notes
                    </Button>
                    {/* <ChevronRight size={16} /> <span>One</span> */}
                  </Link>
                </li>{" "}
              </ul>
            </AccordionItem>{" "}
            <AccordionItem key="2" aria-label="Accordion 1" title="js">
              <ul>
                <li className=" px-2 ">
                  <Link>
                    <Button
                      // size="sm"
                      className="bg-inherit hover:bg-primary hover:text-white  w-full  justify-start p-1  font-medium h-fit"
                      startContent={<ChevronRight size={16} />}
                    >
                      Search Notes
                    </Button>
                    {/* <ChevronRight size={16} /> <span>One</span> */}
                  </Link>
                </li>{" "}
              </ul>
            </AccordionItem>
          </Accordion>
        </div>
        {/* <div className="mt-4 bg-secondarybg h-fit w-full">
          <div className="fixed bottom-0 left-10">
            <Button
              color="primary"
              className="  w-full  justify-start p-0 px-2 font-medium text-base mb-2"
              startContent={<CirclePlus size={20} />}
            >
              {" "}
              Add Notes
            </Button>
          </div>
        </div> */}
      </div>
    </aside>
  );
};

export default Sidebar;
