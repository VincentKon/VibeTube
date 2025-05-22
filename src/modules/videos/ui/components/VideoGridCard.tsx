import Link from "next/link";
import { VideoGetManyOutput } from "../../types";
import { VideoThumbnail, VideoThumbnailSkeleton } from "./VideoThumbnail";
import { VideoInfo, VideoInfoSkeleton } from "./VideoInfo";

interface VideoGridCardProps {
  data: VideoGetManyOutput["items"][number];
  onRemove?: () => void;
}

export const VideoGridCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <VideoThumbnailSkeleton></VideoThumbnailSkeleton>
      <VideoInfoSkeleton></VideoInfoSkeleton>
    </div>
  );
};

export const VideoGridCard = ({ data, onRemove }: VideoGridCardProps) => {
  return (
    <div className="flex flex-col gap-1 w-full group border-2 rounded-xl">
      <Link prefetch href={`/videos/${data.id}`}>
        <VideoThumbnail
          imageUrl={data.thumbnailUrl}
          previewUrl={data.previewUrl}
          title={data.title}
          duration={data.duration}
        ></VideoThumbnail>
      </Link>
      <VideoInfo data={data} onRemove={onRemove}></VideoInfo>
    </div>
  );
};
