import { Button } from "@/components/ui/button";
import { CheckCircle2, Info, RefreshCcw } from "lucide-react";

export const AnalysisResults = ({
    data,
    onReset,
}: {
    data: any;
    onReset: (e: React.MouseEvent) => void;
}) => (
    <div className="p-8 md:p-12 bg-slate-50/50 border-l border-slate-100 flex flex-col animate-in slide-in-from-right-8 duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-widest mb-6 w-fit uppercase">
            <CheckCircle2 className="w-3 h-3" />
            Analysis Successful
        </div>

        <h2 className="text-3xl font-bold text-slate-900 mb-2">Findings</h2>
        <p className="text-slate-600 leading-relaxed mb-8 text-lg">
            {data.message ||
                "Based on the image provided, the following characteristics were identified..."}
        </p>

        <div className="mt-8 pt-6 border-t border-slate-200">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl mb-8">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-700 leading-snug">
                    Results are based on visual patterns. This is not a
                    substitute for a biopsy or clinical exam.
                </p>
            </div>

            <Button
                onClick={onReset}
                size="lg"
                className="w-full rounded-2xl bg-slate-900 hover:bg-slate-800 h-14 text-base font-bold shadow-lg transition-transform active:scale-[0.98]"
            >
                <RefreshCcw className="w-4 h-4 mr-2" />
                New Analysis
            </Button>
        </div>
    </div>
);
