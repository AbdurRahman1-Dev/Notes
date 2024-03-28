/* eslint-disable react-hooks/rules-of-hooks */
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import {
  ExternalLink,
  Grid,
  LayoutList,
  Star,
  TableProperties,
} from "lucide-react";
import SkeletonLoading from "../shared/SkeletonLoading";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import NewData from "../../@types/note";

interface AllFilterNotesType {
  notes: NewData[] | undefined;
  isError: boolean;
  isLoading: boolean;
}

const AllFilterNotes: React.FC<AllFilterNotesType> = ({
  notes,
  isError,
  isLoading,
}) => {
  // categories
  // const categorys = ["personal", "work", "study", "ideas", "health"];
  if (isError) {
    return <p>Something Went Wrong</p>;
  }

  type LayoutType = "grid" | "list";
  const [layout, setLayout] = useState<LayoutType>("grid");

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-2xl text-gray-400">Filter Notes</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Button variant="light">
              <span>All</span>

              <TableProperties size={20} />
            </Button>
          </div>

          <div>
            <Button onClick={() => setLayout("grid")} variant="light">
              <span>Grid</span>
              <Grid size={20} />
            </Button>

            <Button onClick={() => setLayout("list")} variant="light">
              <span>List</span>
              <LayoutList size={20} />
            </Button>
          </div>
        </div>

        <div>
          {isLoading ? (
            <div className="flex flex-col gap-5 ">
              <SkeletonLoading classes={"h-4 w-full "} />
              <SkeletonLoading classes={"h-4 w-full "} />
              <SkeletonLoading classes={"h-4 w-full "} />
            </div>
          ) : (
            /* <ul className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"> */

            <ul
              className={
                layout === "list"
                  ? "flex flex-col gap-2 flex-1 my-2"
                  : "grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
              }
            >
              {notes?.map((note) => (
                <Card
                  key={note?.$id}
                  className=" w-full shadow-small scale-[0.99] hover:scale-[1]"
                >
                  <CardHeader className="flex gap-3">
                    <div className="flex flex-col w-full">
                      <Link
                        className="flex justify-between w-full items-center"
                        to={`/dashboard/${note?.$id}` as string}
                      >
                        {" "}
                        <p className="text-sm md:text-lg text-primary ">
                          {note?.title === ""
                            ? "Untitled"
                            : note?.title?.length > 15
                              ? note?.title?.slice(0, 15) + ".."
                              : note?.title}
                        </p>
                        {note?.favorite ? (
                          <Star size={20} className="text-warning" />
                        ) : (
                          <Star size={20} />
                        )}
                      </Link>
                      <p className="text-[10px] md:text-sm  text-default-500">
                        {new Date(
                          note?.$createdAt as string | number | Date
                        ).toDateString()}
                      </p>
                    </div>
                  </CardHeader>
                  <Divider />

                  <CardFooter className="flex justify-between items-center gap-1">
                    <p className="text-xs md:text-sm text-gray-400 ">
                      Category: {note?.category ? note?.category : "N/A"}{" "}
                    </p>
                    <Link to={`/dashboard/${note?.$id}` as string}>
                      <ExternalLink size={20} />
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFilterNotes;
