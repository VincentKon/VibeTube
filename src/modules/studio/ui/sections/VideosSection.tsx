"use client";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DEFAULT_LIMIT } from "@/constants";
import { cn, toTitleCase } from "@/lib/utils";
import { VideoThumbnail } from "@/modules/videos/ui/components/VideoThumbnail";
import { trpc } from "@/trpc/client";
import { format } from "date-fns";
import { Globe2Icon, LockIcon } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const VideosSection = () => {
  return (
    <Suspense fallback={<VideosSectionSkeleton></VideosSectionSkeleton>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense></VideosSectionSuspense>
      </ErrorBoundary>
    </Suspense>
  );
};

const VideosSectionSkeleton = () => {
  return (
    <>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: DEFAULT_LIMIT }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="pl-6">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-20 w-36" />
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-4 w-[100px]" />
                      <Skeleton className="h-3 w-[180px]" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="text-xs truncate">
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

const VideosSectionSuspense = () => {
  const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    { limit: DEFAULT_LIMIT },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return (
    <div>
      <div className="border-y">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-6 w-[510px]">Video</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Comments</TableHead>
              <TableHead className="text-right pr-6">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {videos.pages
              .flatMap((page) => page.items)
              .map((video) => (
                <Link
                  prefetch
                  href={`/studio/videos/${video.id}`}
                  key={video.id}
                  legacyBehavior
                >
                  <TableRow className="cursor-pointer">
                    <TableCell className="pl-6">
                      <div className="flex items-center gap-4">
                        <div className="relative aspect-video w-3/6 shrink-0">
                          <VideoThumbnail
                            imageUrl={video.thumbnailUrl}
                            previewUrl={video.previewUrl}
                            title={video.title}
                            duration={video.duration || 0}
                          ></VideoThumbnail>
                        </div>
                        <div className="flex flex-col overflow-hidden gap-y-1">
                          <span className="text-sm line-clamp-1">
                            {video.title}
                          </span>
                          <span className="text-xs text-muted-foreground line-clamp-1">
                            {video.description || "No description"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {video.visibility === "private" ? (
                          <LockIcon className="size-4 mr-2"></LockIcon>
                        ) : (
                          <Globe2Icon className="size-4 mr-2"></Globe2Icon>
                        )}
                        {toTitleCase(video.visibility)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            video.muxStatus === "ready"
                              ? "bg-green-100 text-green-800"
                              : video.muxStatus === "preparing"
                              ? "bg-yellow-100 text-yellow-800"
                              : video.muxStatus === "waiting"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          )}
                        >
                          {toTitleCase(video.muxStatus || "error")}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-sm truncate">
                      {format(new Date(video.createdAt), "d MMM yyyy")}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {video.viewCount}
                    </TableCell>
                    <TableCell className="text-right text-sm">
                      {video.commentCount}
                    </TableCell>
                    <TableCell className="text-right text-sm pr-6">
                      {video.likeCount}
                    </TableCell>
                  </TableRow>
                </Link>
              ))}
          </TableBody>
        </Table>
      </div>
      <InfiniteScroll
        isManual
        hasNextPage={query.hasNextPage}
        isFetchingNextPage={query.isFetchingNextPage}
        fetchNextPage={query.fetchNextPage}
      ></InfiniteScroll>
    </div>
  );
};
