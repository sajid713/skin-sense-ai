import { db } from "@/db";
import { scanSummary } from "@/db/schema";
import { supabaseServer } from "@/lib/supabase/server";
import { eq } from "drizzle-orm";
import type { NextRequest } from "next/server";

export async function GET(
    _req: NextRequest,
    ctx: RouteContext<"/api/scans/[id]">,
) {
    try {
        const { id } = await ctx.params;

        const scans = await db
            .select()
            .from(scanSummary)
            .where(eq(scanSummary.id, id))
            .limit(1);

        if (!scans) {
            return Response.json({ error: "Scan not found" }, { status: 404 });
        }

        const scan = scans[0];

        // 2. Generate Signed URL if image exists
        let signedImageUrl = scan.imageUrl;
        if (scan.imageUrl) {
            const { data, error } = await supabaseServer.storage
                .from(process.env.SUPABASE_BUCKET_NAME!)
                .createSignedUrl(scan.imageUrl, 3600);

            if (error) {
                console.error("Supabase error:", error.message);
            } else {
                signedImageUrl = data.signedUrl;
            }
        }

        // 3. Return combined data
        return Response.json({
            ...scan,
            imageUrl: signedImageUrl,
        });
    } catch (error) {
        return Response.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
