import { Skeleton } from "@nextui-org/react";

const SkeletonLoading = ({ classes }) => {
  return (
    <div className="w-full flex items-center gap-3">
      {/* <div>
        <Skeleton className="flex rounded-full w-12 h-12" />
      </div> */}
      {/* <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-3 w-full rounded-lg" />
      </div> */}
      <Skeleton className={`${classes}  rounded-lg`} />
    </div>
  );
};

export default SkeletonLoading;
