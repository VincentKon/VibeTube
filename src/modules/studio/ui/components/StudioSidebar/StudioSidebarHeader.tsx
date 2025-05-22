import { Button } from "@/components/ui/button";
import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/UserAvatar";
import { useClerk, useUser } from "@clerk/nextjs";
import { Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export const StudioSidebarHeader = () => {
  const { user } = useUser();
  const clerk = useClerk();
  const { state } = useSidebar();

  if (!user) {
    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-[112px] rounded-full"></Skeleton>
        <div className="flex flex-col items-center mt-2 gap-y-2">
          <Skeleton className="h-4 w-[80px]"></Skeleton>
          <Skeleton className="h-4 w-[100px]"></Skeleton>
        </div>
      </SidebarHeader>
    );
  }

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip={"Your Profile"} asChild>
          <Link prefetch href={"/users/current"}>
            <UserAvatar
              imageUrl={user.imageUrl}
              name={user.fullName || "User"}
              size={"xs"}
              // onClick={() => {
              //   clerk.openUserProfile();
              // }}
              className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
            ></UserAvatar>
            <span className="text-sm">Your Profile</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link prefetch href={"/users/current"}>
        <UserAvatar
          imageUrl={user?.imageUrl}
          name={user?.fullName || "User"}
          className="size-[112px] hover:opacity-80 transition-opacity cursor-pointer duration-300"
        ></UserAvatar>
      </Link>
      <div className="flex flex-col items-center mt-1 gap-y-1">
        <p className="text-sm font-medium">{user.fullName}</p>
        <Button
          className="flex items-center"
          variant={"outline"}
          onClick={() => {
            clerk.openUserProfile();
          }}
        >
          <p className="text-xs text-muted-foreground">Edit Profile</p>
          <Edit2 className="size-2"></Edit2>
        </Button>
      </div>
    </SidebarHeader>
  );
};
