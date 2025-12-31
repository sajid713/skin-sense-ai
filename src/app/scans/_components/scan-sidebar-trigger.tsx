"use client";
import { Button } from "@/components/ui/button";
import {
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar";
import { PanelLeftIcon } from "lucide-react";
import React from "react";

export const ScanSidebarTrigger = () => {
    const { toggleSidebar } = useSidebar();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton onClick={toggleSidebar}>
                <PanelLeftIcon />
                <span>Skin Sense AI</span>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
