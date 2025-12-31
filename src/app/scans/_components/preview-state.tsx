import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Scan, X } from "lucide-react";

export const PreviewState = ({ preview, onReset, onScan, isLocked }: any) => (
    <div className="relative w-full h-full flex items-center justify-center group">
        <img
            src={preview}
            alt="Preview"
            className={cn(
                "rounded-[2rem] shadow-2xl transition-all duration-700 object-cover",
                isLocked
                    ? "max-h-[400px] w-full shadow-slate-200"
                    : "max-h-[450px] w-auto",
            )}
        />

        {!isLocked && (
            <>
                <button
                    onClick={onReset}
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur shadow-xl rounded-full hover:bg-red-50 hover:text-red-600 transition-all active:scale-90"
                >
                    <X size={20} />
                </button>

                <div className="absolute bottom-8 inset-x-0 flex justify-center animate-in slide-in-from-bottom-4">
                    <Button
                        size="lg"
                        onClick={(e) => {
                            e.stopPropagation();
                            onScan();
                        }}
                        className="rounded-full shadow-2xl bg-blue-600 hover:bg-blue-700 px-10 h-14 text-lg font-bold hover:scale-105 transition-transform"
                    >
                        <Scan className="mr-2 w-5 h-5" />
                        Analyze Now
                    </Button>
                </div>
            </>
        )}
    </div>
);
