import { SidebarProvider } from "@/components/ui/sidebar";
import { StudioNavbar } from "../components/StudioNavbar";
import { StudioSidebar } from "../components/StudioSidebar";

export const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <StudioNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <StudioSidebar />
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
