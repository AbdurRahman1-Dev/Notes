import { Input } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Search } from "lucide-react";
import { useState } from "react";

const SearchNotes = () => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="bg-secondarybg rounded-md">
      <Input
        onFocus={() => setOpen(true)}
        // onFocusChange={() => setOpen(true)}
        type="text"
        placeholder="Search Notes"
        endContent={<Search />}
        // className="p-2"
      ></Input>
      {isOpen ? (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="relative    h-fit  z-50  "
        >
          <div className=" absolute top-0 left-0 w-full h-fit backdrop-blur-xl   p-3  transition-all duration-300 rounded-md  space-y-2">
            <div className="flex justify-between items-center p-2 h-full  border-b-1 border-secondarybg hover:bg-secondarybg duration-200">
              <Link to="/">
                <h3 className="text-base md:text-xl">Title</h3>
              </Link>
              <p className="text-sm md:text-xl text-gray-400">categroy</p>
              <Link>
                <ExternalLink />
              </Link>
            </div>
          </div>
        </div>
      ) : undefined}
    </div>
  );
};

export default SearchNotes;
