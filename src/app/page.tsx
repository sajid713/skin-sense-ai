import { Button } from "@/components/ui/button";
import {
    Activity,
    AlertCircle,
    ArrowRight,
    Check,
    Microscope,
    ScanEye,
    ShieldCheck,
    Star,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white font-sans selection:bg-blue-100">
            {/* --- NAVIGATION --- */}
            <nav className="flex items-center justify-between px-6 py-5 border-b border-slate-50 max-w-7xl mx-auto w-full sticky top-0 bg-white/80 backdrop-blur-md z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-rose-600 p-1.5 rounded-xl shadow-lg shadow-rose-100">
                        <ScanEye className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-slate-900">
                        Skin Sense AI
                    </span>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
                    <Link
                        href="#how-it-works"
                        className="hover:text-rose-600 transition-colors"
                    >
                        How it Works
                    </Link>
                    <Link
                        href="#pricing"
                        className="hover:text-rose-600 transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/disclaimer"
                        className="hover:text-rose-600 transition-colors text-amber-600"
                    >
                        Medical Disclaimer
                    </Link>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/login" className="hidden sm:block">
                        <Button
                            variant="ghost"
                            className="text-slate-600 font-bold"
                        >
                            Login
                        </Button>
                    </Link>
                    <Link href="/sign-up">
                        <Button className="bg-rose-600 hover:bg-rose-700 rounded-full px-6 shadow-lg shadow-rose-100 font-bold transition-all active:scale-95">
                            Screen Now
                        </Button>
                    </Link>
                </div>
            </nav>

            <main className="flex-1">
                {/* --- HERO SECTION --- */}
                <section className="relative pt-20 pb-32 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
                        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-50 rounded-full blur-[120px] opacity-60" />
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px] opacity-60" />
                    </div>

                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 uppercase tracking-widest">
                            <Microscope className="w-3.5 h-3.5 text-rose-400" />
                            <span>AI Oncology Screening</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 leading-[0.85]">
                            Early Detection <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-rose-400">
                                Saves Lives.
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 font-medium">
                            Identify suspicious moles and potential skin cancer
                            indicators using advanced neural networks trained on
                            thousands of clinical cases.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            <Link href="/sign-up">
                                <Button
                                    size="lg"
                                    className="h-16 px-10 rounded-2xl bg-slate-900 text-lg font-bold shadow-2xl hover:bg-slate-800 transition-all hover:scale-105 active:scale-95 text-white"
                                >
                                    Start Urgent Screening
                                    <ArrowRight className="ml-2 w-5 h-5 text-rose-500" />
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-16 p-4 bg-amber-50 border border-amber-100 rounded-2xl max-w-lg mx-auto flex items-start gap-3 text-left">
                            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800 leading-relaxed">
                                <strong>Note:</strong> Skin Sense AI is a
                                screening aid, not a final diagnosis. Always
                                consult a specialist for a physical biopsy if
                                you notice changes in your skin.
                            </p>
                        </div>
                    </div>
                </section>

                {/* --- FEATURES SECTION --- */}
                <section id="how-it-works" className="py-32 bg-slate-50/50">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                            Clinical Grade Technology
                        </h2>
                    </div>
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-12">
                            <FeatureCard
                                icon={
                                    <Activity className="w-8 h-8 text-rose-600" />
                                }
                                title="Melanoma Analysis"
                                description="Specific algorithms built to detect irregular borders, color variegation, and asymmetrical patterns common in melanoma."
                            />
                            <FeatureCard
                                icon={
                                    <ShieldCheck className="w-8 h-8 text-rose-600" />
                                }
                                title="BCC & SCC Detection"
                                description="Extensive training on Basal Cell and Squamous Cell Carcinoma datasets to provide high-sensitivity screening."
                            />
                            <FeatureCard
                                icon={
                                    <ScanEye className="w-8 h-8 text-rose-600" />
                                }
                                title="Dermoscopic Detail"
                                description="Simulates dermoscopic analysis to look beneath the surface layer for vascular patterns and pigment structures."
                            />
                        </div>
                    </div>
                </section>

                {/* --- PRICING SECTION --- */}
                <section
                    id="pricing"
                    className="py-32 bg-white relative overflow-hidden"
                >
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Pro Health Monitoring
                            </h2>
                            <p className="text-slate-500 text-lg font-medium">
                                Continuous monitoring for long-term safety.
                            </p>
                        </div>

                        <div className="max-w-md mx-auto">
                            <div className="relative group">
                                <div className="absolute -inset-1 bg-gradient-to-r from-rose-600 to-rose-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                                <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 md:p-14 shadow-2xl">
                                    <div className="flex justify-between items-start mb-10">
                                        <div>
                                            <h3 className="text-3xl font-bold text-slate-900">
                                                Pro Plan
                                            </h3>
                                            <p className="text-slate-400 font-medium text-sm mt-1 tracking-wide uppercase font-mono">
                                                Polar Secure Billing
                                            </p>
                                        </div>
                                        <div className="bg-rose-600 p-3 rounded-2xl shadow-lg shadow-rose-200">
                                            <Star className="w-6 h-6 text-white fill-white" />
                                        </div>
                                    </div>

                                    <div className="mb-10">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-6xl font-black text-slate-900">
                                                $9.79
                                            </span>
                                            <span className="text-slate-400 font-bold text-xl">
                                                /mo
                                            </span>
                                        </div>
                                        <div className="mt-6 inline-flex items-center gap-2 py-2 px-5 bg-emerald-50 rounded-full border border-emerald-100">
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                            <p className="text-emerald-700 text-[10px] font-black uppercase tracking-[0.2em]">
                                                7 Days Free Screening
                                            </p>
                                        </div>
                                    </div>

                                    <ul className="space-y-5 mb-12">
                                        <PricingItem text="Unlimited Cancer Screenings" />
                                        <PricingItem text="Detailed Risk Factor Reports" />
                                        <PricingItem text="Time-lapse Mole Tracking" />
                                        <PricingItem text="Full Resolution Archives" />
                                    </ul>

                                    <Link href="/sign-up">
                                        <Button className="w-full h-16 rounded-[1.5rem] bg-rose-600 hover:bg-rose-700 text-lg font-black shadow-xl shadow-rose-200 transition-all hover:scale-[1.03] active:scale-95 text-white">
                                            Get 1 Week Free
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-900 py-20 text-slate-400">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-rose-600 p-1 rounded-lg">
                                <ScanEye className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold tracking-tight text-white">
                                Skin Sense AI
                            </span>
                        </div>
                        <p className="max-w-sm leading-relaxed">
                            Utilizing state-of-the-art vision transformers to
                            democratize early-stage cancer screening. Sensing
                            what the human eye misses.
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">
                            Medical Resources
                        </h4>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <Link href="/sign-up">Get Screened</Link>
                            <Link href="/about">How AI Detects Cancer</Link>
                            <Link href="/safety">Clinical Evidence</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-6">Legal</h4>
                        <div className="flex flex-col gap-4 text-sm font-medium">
                            <Link href="/privacy">Data Privacy</Link>
                            <Link href="/terms">Terms of Use</Link>
                            <Link href="/disclaimer" className="text-rose-400">
                                Medical Disclaimer
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// --- HELPERS ---

function FeatureCard({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group">
            <div className="mb-8 p-4 bg-slate-50 rounded-2xl w-fit group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 tracking-tight">
                {title}
            </h3>
            <p className="text-slate-500 leading-relaxed font-medium">
                {description}
            </p>
        </div>
    );
}

function PricingItem({ text }: { text: string }) {
    return (
        <li className="flex items-center gap-4">
            <div className="bg-emerald-100 rounded-full p-1.5 shrink-0">
                <Check className="w-3 h-3 text-emerald-600 stroke-[4px]" />
            </div>
            <span className="text-slate-700 font-bold text-sm tracking-tight">
                {text}
            </span>
        </li>
    );
}
