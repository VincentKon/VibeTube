import { ResponsiveModal } from "@/components/responsive-modal";
import { UploadDropzone } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import toast from "react-hot-toast";

interface BannerUploadModalProps {
  userId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BannerUploadModal = ({
  userId,
  open,
  onOpenChange,
}: BannerUploadModalProps) => {
  const utils = trpc.useUtils();

  const onUploadComplete = () => {
    utils.users.getOne.invalidate({ id: userId });
    toast.success("Banner updated");
    onOpenChange(false);
  };

  return (
    <ResponsiveModal
      title="Upload banner"
      open={open}
      onOpenChange={onOpenChange}
    >
      <UploadDropzone
        endpoint={"bannerUploader"}
        onClientUploadComplete={onUploadComplete}
      ></UploadDropzone>
    </ResponsiveModal>
  );
};
