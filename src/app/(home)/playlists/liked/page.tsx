import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";
import { LikedView } from "../../../../modules/playlists/ui/views/LikedView";

const Page = async () => {
  void trpc.playlists.getLiked.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <LikedView></LikedView>
    </HydrateClient>
  );
};

export default Page;
