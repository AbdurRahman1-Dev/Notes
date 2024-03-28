import { Card, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import NewData from "../../@types/note";

interface RecentNoteCardProps {
  recentNotes: NewData[] | undefined;
}
const RecentNoteCard: React.FC<RecentNoteCardProps> = ({ recentNotes }) => {
  return (
    <div className="my-5 ">
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={15}
        centeredSlides={false}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        className="mySwiper w-full cursor-grab "
      >
        {recentNotes?.map((note) => (
          <SwiperSlide
            className="!max-w-[120px] md:min-w-[200px] p-2"
            key={note?.$id}
          >
            <Card className="max-w-[120px] md:min-w-[200px] w-full shadow-small">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <Link to={`/dashboard/${note?.$id}` as string}>
                    {" "}
                    <p className="text-sm md:text-lg text-primary">
                      {note?.title === ""
                        ? "Untitled"
                        : note?.title?.length > 15
                          ? note?.title?.slice(0, 9) + ".."
                          : note?.title}
                    </p>
                  </Link>
                  <span className="text-[10px] md:text-sm  text-default-500">
                    {new Date(note?.$createdAt).toDateString()}
                  </span>
                </div>
              </CardHeader>
              <Divider className="hidden md:block" />
              {/* <CardBody className="hidden md:block">
                {note?.tags?.map((tag, index) => (
                  <Chip key={index} size="sm" color="primary">
                    {tag}
                  </Chip>
                ))}
              </CardBody>
              <Divider /> */}
              <CardFooter className="hidden md:block">
                <Link to={`/dashboard/${note?.$id}` as string}>
                  <ExternalLink size={20} />
                </Link>
              </CardFooter>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default RecentNoteCard;
