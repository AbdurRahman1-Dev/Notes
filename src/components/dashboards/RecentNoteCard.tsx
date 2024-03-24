import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const RecentNoteCard = ({ notes }) => {
  return (
    <div className="my-5">
      <Swiper
        className="mySwiper w-full p-5 overflow-hidden"
        slidesPerView={2}
        spaceBetween={10}
        preventClicks={false}
        grabCursor={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {notes?.documents?.map((note) => (
          <SwiperSlide key={note?.$id}>
            <Card className="max-w-[120px] md:min-w-[200px] w-full h-full">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-base md:text-md">
                    {note?.title === ""
                      ? "Untitled"
                      : note?.title?.length > 20
                        ? note?.title?.slice(0, 18) + "...."
                        : note?.title}
                  </p>
                  <p className="text-sm text-default-500">
                    {new Date(note?.$createdAt).toDateString()}
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                {note?.tags?.map((tag, index) => (
                  <Chip key={index} size="sm" color="primary">
                    {tag}
                  </Chip>
                ))}
              </CardBody>
              <Divider />
              <CardFooter>
                <Link to={`/dashboard/${note?.$id}`}>
                  <ExternalLink />
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
