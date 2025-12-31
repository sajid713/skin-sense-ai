import { db } from "@/db";
import { scanSummary } from "@/db/schema";
import { auth } from "@/lib/auth";
import { hugging_client } from "@/lib/hugging_client";
import { openrouter } from "@/lib/openrouter";
import { supabaseServer } from "@/lib/supabase/server";
import { type NextRequest, NextResponse } from "next/server";
import { generateSlug } from "random-word-slugs";
import { v4 as uuidv4 } from "uuid";

const HF_INFERENCE_MODEL = process.env.HF_INFERENCE_MODEL;
const OPENROUTER_MODEL = process.env.OPENROUTER_MODEL;
const BUCKET_NAME = process.env.SUPABASE_BUCKET_NAME || "scans";

export async function POST(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const hasSubscription =
            req.headers.get("x-has-subscription") === "true";

        const formData = await req.formData();
        const image = formData.get("image") as File | null;

        if (!image) {
            return NextResponse.json(
                { error: "No image provided" },
                { status: 400 },
            );
        }

        const output = await hugging_client.imageClassification({
            data: image,
            model: HF_INFERENCE_MODEL,
            provider: "hf-inference",
        });

        const explanation = await openrouter.chat.send({
            model: OPENROUTER_MODEL,
            messages: [
                {
                    role: "user",
                    content: `Analyze this image classification data and provide a concise medical-style summary. DATA: ${JSON.stringify(output)}`,
                },
            ],
        });

        const rawContent = explanation.choices[0]?.message?.content;
        const messageText =
            typeof rawContent === "string"
                ? rawContent
                : "Analysis successfully generated.";

        if (hasSubscription) {
            const fileExt = image.name.split(".").pop();
            const fileName = `${session.user.id}/${uuidv4()}.${fileExt}`;

            const { data: uploadData, error: uploadError } =
                await supabaseServer.storage
                    .from(BUCKET_NAME)
                    .upload(fileName, image);

            if (uploadError) throw uploadError;
            const slug = generateSlug(3, {
                format: "title",
            });

            await db.insert(scanSummary).values({
                id: uuidv4(),
                name: slug,
                userId: session.user.id,
                summary: messageText,
                imageUrl: uploadData.path,
            });
        }

        return NextResponse.json(
            {
                message: messageText,
            },
            { status: 200 },
        );
    } catch (error) {
        console.error("SCAN_CREATE_ERROR:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}

export async function GET(req: NextRequest) {
    try {
        const session = await auth.api.getSession({ headers: req.headers });

        if (!session?.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        const data = await db.query.scanSummary.findMany({
            where: (scanSummary, { eq }) =>
                eq(scanSummary.userId, session.user.id),
            orderBy: (scanSummary, { desc }) => [desc(scanSummary.createdAt)],
        });

        return NextResponse.json({ data }, { status: 200 });
    } catch (error) {
        console.error("GET_SCAN_SUMMARY_ERROR:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
        );
    }
}
