import { CommentsSection } from "../sections/CommentsSection";
import { SuggestionsSection } from "../sections/SuggestionsSection";
import { VideoSection } from "../sections/VideoSection";

interface VideoViewProps {
  videoId: string;
}

export const VideoView = ({ videoId }: VideoViewProps) => {
  return (
    <div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10 ">
      <div className="flex flex-col xl:flex-row gap-6 ">
        <div className="flex-1 min-w-0">
          <VideoSection videoId={videoId}></VideoSection>
          <div className="xl:hidden block mt-4">
            <SuggestionsSection videoId={videoId} isManual></SuggestionsSection>
          </div>
          <CommentsSection videoId={videoId}></CommentsSection>
        </div>
        <div className="hidden xl:block w-full xl:w-[360px] 2xl:w-[460px] shrink-1">
          <SuggestionsSection videoId={videoId}></SuggestionsSection>
        </div>
      </div>
    </div>
  );
};
