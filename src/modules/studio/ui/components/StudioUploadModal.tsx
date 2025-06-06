"use client";

import { trpc } from "@/trpc/client";
import { Loader2Icon, PlusIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { ResponsiveModal } from "@/components/responsive-modal";
import { Button } from "@/components/ui/button";

import { StudioUploader } from "./StudioUploader";

export const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const router = useRouter();

  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created");
      utils.studio.getMany.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSuccess = () => {
    if (!create.data?.video.id) return;
    create.reset();
    router.push(`/studio/videos/${create.data.video.id}`);
  };
  return (
    <>
      <ResponsiveModal
        title="Upload a video"
        open={!!create.data?.url}
        onOpenChange={() => {
          create.reset();
        }}
      >
        {create.data?.url ? (
          <StudioUploader
            endpoint={create.data.url}
            onSuccess={onSuccess}
          ></StudioUploader>
        ) : (
          <Loader2Icon className="animate-spin"></Loader2Icon>
        )}
      </ResponsiveModal>
      <Button
        variant={"secondary"}
        onClick={() => create.mutate()}
        disabled={create.isPending}
      >
        {create.isPending ? (
          <Loader2Icon className="animate-spin"></Loader2Icon>
        ) : (
          <PlusIcon></PlusIcon>
        )}{" "}
        Create
      </Button>
    </>
  );
};
