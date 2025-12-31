import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { requireAuth } from "@/lib/auth-utilts";
import type React from "react";
import { ScanSidebar } from "./_components/scan-sidebar";

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    await requireAuth();
    return (
        <SidebarProvider defaultOpen={false}>
            <ScanSidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    );
}
