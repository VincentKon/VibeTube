import { UserAvatar } from "@/components/UserAvatar";
import React from "react";
import { SubscriptionButton } from "./SubscriptionButton";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionItemProps {
  name: string;
  imageUrl: string;
  subscriberCount: number;
  onUnsubscribe: () => void;
  disabled: boolean;
}

export const SubscriptionItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="size-10 rounded-full"></Skeleton>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-4 w-24"></Skeleton>
            <Skeleton className="mt-1 h-3 w-20"></Skeleton>
          </div>
          <Skeleton className="h-8 w-20"></Skeleton>
        </div>
      </div>
    </div>
  );
};

export const SubscriptionItem = ({
  name,
  imageUrl,
  subscriberCount,
  onUnsubscribe,
  disabled,
}: SubscriptionItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <UserAvatar size={"lg"} imageUrl={imageUrl} name={name}></UserAvatar>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">
              {subscriberCount.toLocaleString()} subscribers
            </p>
          </div>
          <SubscriptionButton
            size={"sm"}
            onClick={(e) => {
              e.preventDefault();
              onUnsubscribe();
            }}
            disabled={disabled}
            isSubscribed
          ></SubscriptionButton>
        </div>
      </div>
    </div>
  );
};
