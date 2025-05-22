import { formatDistanceToNow } from "date-fns";
import { VideoGetManyOutput } from "../../types";
import { useMemo } from "react";
import Link from "next/link";
import { UserAvatar } from "@/components/UserAvatar";
import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { VideoMenu } from "./VideoMenu";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoInfoProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <Skeleton className="size-10 flex-shrink-0 rounded-full"></Skeleton>
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-5 w-[90%]"></Skeleton>
        <Skeleton className="h-5 w-[70%]"></Skeleton>
      </div>
    </div>
  );
};

export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact",
    }).format(data.viewCount);
  }, [data.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(data.createdAt, { addSuffix: true });
  }, [data.createdAt]);
  return (
    <div className="flex gap-3 py-1 px-2">
      <Link prefetch href={`/users/${data.user.id}`}>
        <UserAvatar
          imageUrl={data.user.imageUrl}
          name={data.user.name}
        ></UserAvatar>
      </Link>
      <div className="min-w-0 flex-1">
        <Link prefetch href={`/videos/${data.id}`}>
          <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
          </h3>
        </Link>
        <Link prefetch href={`/users/${data.user.id}`}>
          <UserInfo name={data.user.name}></UserInfo>
        </Link>
        <Link prefetch href={`/videos/${data.id}`}>
          <p className="text-sm text-gray-600 line-clamp-1">
            {compactViews} views • {compactDate}
          </p>
        </Link>
      </div>
      <div className="flex-shrink-0">
        <VideoMenu videoId={data.id} onRemove={onRemove}></VideoMenu>
      </div>
    </div>
  );
};
