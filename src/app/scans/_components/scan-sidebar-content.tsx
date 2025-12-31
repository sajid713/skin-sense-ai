"use client";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import { useGetScans } from "@/hooks/use-scans";
import Link from "next/link";

export const ScanSidebarContent = () => {
    const { state } = useSidebar();

    const { data, isLoading } = useGetScans();

    if (state === "collapsed") return null;

    // Handle loading state
    if (isLoading) {
        return (
            <SidebarGroup>
                <SidebarGroupLabel>Loading Scans...</SidebarGroupLabel>
            </SidebarGroup>
        );
    }

    // Handle empty state
    if (!data || data.data.length === 0) {
        return (
            <SidebarGroup>
                <SidebarGroupLabel>No Scans Yet</SidebarGroupLabel>
            </SidebarGroup>
        );
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Previous Scans</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {data.data.map((scan) => (
                        <SidebarMenuItem key={scan.id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/scans/${scan.id}`}>
                                    {/* Displaying a truncated summary or a date */}
                                    <span className="truncate">
                                        {scan.name ||
                                            `Scan ${new Date(scan.createdAt).toLocaleDateString()}`}
                                    </span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
};
