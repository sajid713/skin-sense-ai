"use client";

import { Button } from "@/components/ui/button";
import { useGetScanById } from "@/hooks/use-scans";
import { format } from "date-fns";
import {
    ArrowLeft,
    Calendar,
    Download,
    FileText,
    Loader2Icon,
    Share2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

interface Props {
    params: Promise<{ id: string }>;
}

export default function ScanDetailsPage({ params }: Props) {
    const { id: scanId } = use(params);
    const router = useRouter();
    const { data, isLoading, error } = useGetScanById(scanId);

    if (isLoading) {
        return (
            <div className="h-full w-full flex flex-col items-center justify-center space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20" />
                    <Loader2Icon className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
                </div>
                <p className="text-slate-500 font-medium animate-pulse">
                    Retrieving scan data...
                </p>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center">
                <div className="bg-red-50 p-4 rounded-full mb-4">
                    <FileText className="w-10 h-10 text-red-500" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                    Scan Not Found
                </h2>
                <p className="text-slate-500 max-w-sm mt-2">
                    We couldn't find the scan report you're looking for. It may
                    have been deleted.
                </p>
                <Button
                    onClick={() => router.push("/scans")}
                    variant="outline"
                    className="mt-6"
                >
                    Back to History
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-full bg-slate-50/30 p-4 md:p-8">
            {/* Top Navigation Bar */}
            <div className="max-w-7xl mx-auto flex items-center justify-between mb-8">
                <Button
                    variant="ghost"
                    onClick={() => router.push("/scans")}
                    className="hover:bg-white shadow-sm transition-all"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Scans
                </Button>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white"
                    >
                        <Share2 className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white"
                    >
                        <Download className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-8">
                {/* Left Column: Image Preview */}
                <div className="md:col-span-5 lg:col-span-4">
                    <div className="sticky top-8 space-y-6">
                        <div className="bg-white p-3 rounded-[2rem] shadow-xl shadow-slate-200/60 border border-slate-100">
                            <img
                                src={data.imageUrl || "/placeholder-skin.jpg"}
                                alt="Scan Preview"
                                className="w-full aspect-[4/5] object-cover rounded-[1.5rem]"
                            />
                        </div>

                        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
                                Metadata
                            </h3>
                            <div className="space-y-4">
                                <MetaRow
                                    icon={<Calendar className="w-4 h-4" />}
                                    label="Scanned on"
                                    value={format(
                                        new Date(data.createdAt),
                                        "PPP",
                                    )}
                                />
                                <MetaRow
                                    icon={<FileText className="w-4 h-4" />}
                                    label="Scan ID"
                                    value={data.id.slice(0, 8)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Analysis Report */}
                <div className="md:col-span-7 lg:col-span-8 space-y-6">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold tracking-widest mb-6 uppercase">
                            Clinical Summary
                        </div>

                        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                            Analysis Results
                        </h1>

                        <div className="prose prose-slate max-w-none">
                            <p className="text-xl text-slate-600 leading-relaxed italic border-l-4 border-blue-100 pl-6 my-8">
                                {data.summary}
                            </p>

                            <div className="h-px bg-slate-100 my-10" />

                            <h3 className="text-xl font-bold text-slate-900 mb-4">
                                Understanding your results
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                The AI model has identified visual markers in
                                the provided image. These patterns are
                                cross-referenced with dermatological databases
                                to provide a summary of characteristics.
                            </p>
                        </div>

                        {/* Disclaimer Section */}
                        <div className="mt-12 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4">
                            <div className="bg-amber-100 p-2 rounded-full h-fit">
                                <span className="text-amber-700 font-bold text-lg">
                                    !
                                </span>
                            </div>
                            <div className="text-sm text-amber-900/80 leading-relaxed">
                                <p className="font-bold text-amber-900 mb-1">
                                    Medical Disclaimer
                                </p>
                                This report is for informational purposes only
                                and does not constitute medical advice. Patterns
                                detected by AI can mimic various conditions.
                                Always consult a board-certified dermatologist
                                for a clinical diagnosis.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const MetaRow = ({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) => (
    <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-slate-400">
            {icon}
            <span>{label}</span>
        </div>
        <span className="font-semibold text-slate-700">{value}</span>
    </div>
);
