import { PlaylistGetManyOutput } from "@/modules/playlists/types";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constants";
import Link from "next/link";
import {
  PlaylistThumbnail,
  PlaylistThumbnailSkeleton,
} from "./PlaylistThumbnail";
import { PlaylistInfo, PlaylistInfoSkeleton } from "./PlaylistInfo";

interface PlaylistGridCardProps {
  data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistGridCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <PlaylistThumbnailSkeleton></PlaylistThumbnailSkeleton>
      <PlaylistInfoSkeleton></PlaylistInfoSkeleton>
    </div>
  );
};

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
  return (
    <Link prefetch href={`/playlists/${data.id}`}>
      <div className="flex flex-col gap-2 w-full group">
        <PlaylistThumbnail
          thumbnailUrl={data.thumbnailUrl || THUMBNAIL_FALLBACK}
          title={data.name}
          videoCount={data.videoCount}
        ></PlaylistThumbnail>
        <PlaylistInfo data={data}></PlaylistInfo>
      </div>
    </Link>
  );
};
