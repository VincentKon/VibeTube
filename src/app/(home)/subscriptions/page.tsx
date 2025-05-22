import { DEFAULT_LIMIT } from "@/constants";
import { SubscriptionsView } from "@/modules/subscriptions/ui/views/SubscriptionsView";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Page = async () => {
  void trpc.subscriptions.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <SubscriptionsView></SubscriptionsView>
    </HydrateClient>
  );
};

export default Page;
