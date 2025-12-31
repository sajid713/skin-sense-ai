"use client";

import { useCreateScan } from "@/hooks/use-scans";
import { useHasActiveSubscription } from "@/hooks/use-subscriptions";
import { cn } from "@/lib/utils";
import { Activity, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { AnalysisResults } from "./analysis-results";
import { PreviewState } from "./preview-state";
import { UploaderPlaceholder } from "./upload-placeholder";

export const DropImage = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const scanMutation = useCreateScan();
    const { hasActiveSubscription } = useHasActiveSubscription();

    const isLocked = scanMutation.isSuccess;
    const isScanning = scanMutation.isPending;

    useEffect(() => {
        return () => {
            if (preview) URL.revokeObjectURL(preview);
        };
    }, [preview]);

    const handleFile = (file: File) => {
        if (!file?.type.startsWith("image/") || isLocked) return;
        setPreview(URL.createObjectURL(file));
        setImage(file);
    };

    const reset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setImage(null);
        setPreview(null);
        if (inputRef.current) inputRef.current.value = "";
        scanMutation.reset?.();
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 space-y-8">
            {/* Header Section */}
            {!isLocked && (
                <div className="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase">
                        <Sparkles className="w-3 h-3" />
                        AI-Powered Dermatology
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                        Skin Condition{" "}
                        <span className="text-blue-600">Analyzer</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                        Upload a clear photo for an instant AI analysis of skin
                        characteristics and patterns.
                    </p>
                </div>
            )}

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (!isLocked) handleFile(e.dataTransfer.files?.[0]);
                }}
                className={cn(
                    "relative min-h-[500px] rounded-[2.5rem] transition-all duration-700 overflow-hidden border-2 shadow-sm",
                    isLocked
                        ? "bg-white border-slate-100 shadow-2xl"
                        : "border-dashed",
                    isDragging
                        ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
                        : "border-slate-200 bg-slate-50/30",
                    !preview &&
                        !isLocked &&
                        "cursor-pointer hover:border-blue-400 hover:bg-white hover:shadow-xl hover:-translate-y-1",
                )}
                onClick={() =>
                    !preview && !isLocked && inputRef.current?.click()
                }
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0]!)}
                />

                <div
                    className={cn(
                        "h-full w-full transition-all duration-500",
                        isLocked
                            ? "grid md:grid-cols-2"
                            : "flex items-center justify-center",
                    )}
                >
                    {/* LEFT SIDE: Image / Placeholder */}
                    <div className="relative flex items-center justify-center p-8 min-h-[400px]">
                        {preview ? (
                            <PreviewState
                                preview={preview}
                                isLocked={isLocked}
                                onReset={reset}
                                onScan={() =>
                                    scanMutation.mutate({
                                        image: image!,
                                        hasActiveSubscription:
                                            !!hasActiveSubscription,
                                    })
                                }
                            />
                        ) : (
                            <UploaderPlaceholder />
                        )}

                        {isScanning && (
                            <div className="absolute inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-20 animate-in fade-in duration-300">
                                <div className="relative">
                                    <div className="absolute inset-0 rounded-full bg-blue-100 animate-ping opacity-20" />
                                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin relative z-10" />
                                </div>
                                <p className="mt-6 text-lg font-semibold text-slate-900">
                                    Analyzing patterns...
                                </p>
                                <p className="text-sm text-slate-500">
                                    Cross-referencing medical databases
                                </p>
                            </div>
                        )}
                    </div>

                    {/* RIGHT SIDE: Results */}
                    {isLocked && (
                        <AnalysisResults
                            data={scanMutation.data}
                            onReset={reset}
                        />
                    )}
                </div>
            </div>

            {/* Trust Badges */}
            {!isLocked && (
                <div className="flex items-center justify-center gap-8 text-sm font-medium text-slate-400">
                    <span className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-emerald-500" />{" "}
                        HIPPA Compliant
                    </span>
                    <span className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-blue-500" /> 98%
                        Accuracy
                    </span>
                </div>
            )}
        </div>
    );
};
