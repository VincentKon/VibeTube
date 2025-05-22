import Link from "next/link";
import { VideoGetOneOutput } from "../../types";
import { UserAvatar } from "@/components/UserAvatar";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/SubscriptionButton";
import { UserInfo } from "@/modules/users/ui/components/UserInfo";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";

interface VideoOwnerProps {
  user: VideoGetOneOutput["user"];
  videoId: string;
}
export const VideoOwner = ({ videoId, user }: VideoOwnerProps) => {
  const { userId: clerkUserId, isLoaded } = useAuth();

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
    fromVideoId: videoId,
  });

  return (
    <div className="flex items-center sm:items-start justify-between sm:justify-start gap-3">
      <Link prefetch href={`/users/${user.id}`}>
        <div className="flex items-center gap-3 min-w-0">
          <UserAvatar
            size={"lg"}
            imageUrl={user.imageUrl}
            name={user.name}
          ></UserAvatar>
          <div className="flex flex-col gap-0 min-w-0">
            <UserInfo size={"lg"} name={user.name}></UserInfo>
            <span className="text-sm text-muted-foreground line-clamp-1">
              {user.subscriberCount} subscriber
            </span>
          </div>
        </div>
      </Link>
      {clerkUserId === user.clerkId ? (
        <Button variant={"secondary"} className="rounded-full" asChild>
          <Link prefetch href={`/studio/videos/${videoId}`}>
            Edit video
          </Link>
        </Button>
      ) : (
        <SubscriptionButton
          onClick={onClick}
          disabled={isPending || !isLoaded}
          isSubscribed={user.viewerSubscribed}
          className="flex-none"
        ></SubscriptionButton>
      )}
    </div>
  );
};
