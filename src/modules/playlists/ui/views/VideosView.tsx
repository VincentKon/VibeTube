import React from "react";
import { PlaylistHeaderSection } from "../sections/PlaylistHeaderSection";
import { VideosSection } from "../sections/VideosSection";

interface VideosViewProps {
  playlistId: string;
}

export const VideosView = ({ playlistId }: VideosViewProps) => {
  return (
    <div className="max-w-screen-md mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <PlaylistHeaderSection playlistId={playlistId}></PlaylistHeaderSection>
      <VideosSection playlistId={playlistId}></VideosSection>
    </div>
  );
};
