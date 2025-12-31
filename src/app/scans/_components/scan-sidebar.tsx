import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ScanIcon } from "lucide-react";
import Link from "next/link";
import { ScanSidebarContent } from "./scan-sidebar-content";
import { ScanSidebarTrigger } from "./scan-sidebar-trigger";
import { ScanUpgradeToPro } from "./scan-upgrade-to-pro";
import { SidebarLogout } from "./sidebar-logout";

export const ScanSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <ScanSidebarTrigger />
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/scans">
                                <ScanIcon />
                                New Scan
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <ScanSidebarContent />
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <ScanUpgradeToPro />
                    <SidebarLogout />
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};
