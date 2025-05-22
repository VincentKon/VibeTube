import Link from "next/link";
import Image from "next/image";
import { SidebarTrigger } from "@/components/ui/sidebar";

import AuthButton from "@/modules/auth/ui/components/AuthButton";
import { StudioUploadModal } from "../StudioUploadModal";

export const StudioNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white flex items-center px-2 pr-5 z-50 border-b shadow-md">
      <div className="flex items-center gap-4 w-full">
        {/* Menu & Logo */}
        <div className="flex items-center flex-shrink-0">
          <SidebarTrigger />
          <Link prefetch href="/studio">
            <div className="flex items-center gap-1 p-4">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <p className="text-xl font-semibold tracking-tight hidden md:block">
                Studio
              </p>
            </div>
          </Link>
        </div>

        <div className="flex-1"></div>

        {/* Profile & Auth */}
        <div className="flex-shrink-0 items-center flex gap-4">
          <StudioUploadModal></StudioUploadModal>
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};
