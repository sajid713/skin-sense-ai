"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSignOut } from "@/hooks/use-auth";
import { Loader2Icon, LogOutIcon } from "lucide-react";

export const SidebarLogout = () => {
    const { mutate, isPending } = useSignOut();
    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => mutate(undefined)}
                disabled={isPending}
            >
                {isPending ? (
                    <Loader2Icon className="animate-spin" />
                ) : (
                    <>
                        <LogOutIcon className="mr-2" />
                        <span>Log Out</span>
                    </>
                )}
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
