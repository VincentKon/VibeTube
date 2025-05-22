"use client";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  UserPageBanner,
  UserPageBannerSkeleton,
} from "../components/UserPageBanner";
import { UserPageInfo, UserPageInfoSkeleton } from "../components/UserPageInfo";
import { Separator } from "@/components/ui/separator";

interface UserSectionsProps {
  userId: string;
}

export const UserSections = (props: UserSectionsProps) => {
  return (
    <Suspense fallback={<UserSectionsSkeleton></UserSectionsSkeleton>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <UserSectionsSuspense {...props}></UserSectionsSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const UserSectionsSkeleton = () => {
  return (
    <div className="flex flex-col">
      <UserPageBannerSkeleton></UserPageBannerSkeleton>
      <UserPageInfoSkeleton></UserPageInfoSkeleton>
      <Separator></Separator>
    </div>
  );
};

const UserSectionsSuspense = ({ userId }: UserSectionsProps) => {
  const [user] = trpc.users.getOne.useSuspenseQuery({ id: userId });
  return (
    <div className="flex flex-col">
      <UserPageBanner user={user}></UserPageBanner>
      <UserPageInfo user={user}></UserPageInfo>
      <Separator></Separator>
    </div>
  );
};
