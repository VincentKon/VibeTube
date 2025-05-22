import { DEFAULT_LIMIT } from "@/constants";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";
import { HistoryView } from "../../../../modules/playlists/ui/views/HistoryView";

export const dynamic = "force-dynamic";

const Page = async () => {
  void trpc.playlists.getHistory.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <HistoryView></HistoryView>
    </HydrateClient>
  );
};

export default Page;
