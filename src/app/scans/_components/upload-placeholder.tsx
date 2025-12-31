import { UploadCloud } from "lucide-react";

export const UploaderPlaceholder = () => (
    <div className="flex flex-col items-center text-center p-12 transition-all">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            <UploadCloud className="w-10 h-10 text-blue-500" />
        </div>
        <div className="space-y-2">
            <p className="text-2xl font-bold text-slate-900">
                Drop your photo here
            </p>
            <p className="text-slate-500">
                or{" "}
                <span className="text-blue-600 font-semibold underline underline-offset-4">
                    browse files
                </span>{" "}
                from your device
            </p>
        </div>
        <div className="mt-8 flex gap-3">
            <span className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                JPG
            </span>
            <span className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                PNG
            </span>
            <span className="px-3 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-500 uppercase">
                Max 10MB
            </span>
        </div>
    </div>
);
