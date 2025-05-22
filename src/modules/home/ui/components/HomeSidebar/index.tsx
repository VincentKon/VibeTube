import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { MainSection } from "./MainSection";
import { PersonalSection } from "./PersonalSection";
import { SignedIn } from "@clerk/nextjs";
import { SubscriptionsSection } from "./SubscriptionsSection";

export const HomeSidebar = () => {
  return (
    <Sidebar className="pt-16 z-40" collapsible="icon">
      <SidebarContent className="bg-background">
        <MainSection />
        <div className="px-4 w-full">
          <Separator />
        </div>
        <PersonalSection />
        <div className="px-4 w-full">
          <Separator />
        </div>
        <SignedIn>
          <SubscriptionsSection />
        </SignedIn>
        <div className="px-4 w-full">
          <Separator />
        </div>
      </SidebarContent>
    </Sidebar>
  );
};
