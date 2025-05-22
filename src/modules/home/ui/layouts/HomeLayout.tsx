import { SidebarProvider } from "@/components/ui/sidebar";
import { HomeNavbar } from "../components/HomeNavbar";
import { HomeSidebar } from "../components/HomeSidebar";

export const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        <HomeNavbar />
        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
