import { DEFAULT_LIMIT } from "@/constants";
import { PlaylistsView } from "@/modules/playlists/ui/views/PlaylistsView";
import { trpc } from "@/trpc/server";
import { HydrateClient } from "@/trpc/server";
import React from "react";

export const dynamic = "force-dynamic";

const Page = () => {
  void trpc.playlists.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <PlaylistsView></PlaylistsView>
    </HydrateClient>
  );
};

export default Page;
