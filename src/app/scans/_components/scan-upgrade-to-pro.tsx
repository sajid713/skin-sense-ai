"use client";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { useHasActiveSubscription } from "@/hooks/use-subscriptions";
import { authClient } from "@/lib/auth-client";
import { CreditCardIcon } from "lucide-react";

export const ScanUpgradeToPro = () => {
    const { hasActiveSubscription } = useHasActiveSubscription();

    if (hasActiveSubscription) return null;

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                onClick={() => {
                    authClient.checkout({ slug: "Skin_Sense_AI_Pro" });
                }}
            >
                <CreditCardIcon />
                Upgrade to Pro
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
};
