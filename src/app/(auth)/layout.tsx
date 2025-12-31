import { requireUnauth } from "@/lib/auth-utilts";
import type React from "react";

export default async function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
     await requireUnauth()
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-background">
            {/* Shared modern background decoration */}
            <div className="absolute inset-0 z-0">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-3xl" />
            </div>

            <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
                {children}
            </main>
        </div>
    );
}
