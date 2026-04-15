"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const TW_BACKGROUNDS_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind background utilities",
    intro:
        "Gradient presets combine direction helpers (`bg-linear-to-*`) with `from-*`, optional `via-*`, and `to-*` color stops from the palette. `bg-cover` and related utilities map to `background-size` for image-like fills.",
    syntax: ['className="bg-linear-to-r from-pink-500 to-rose-500 bg-cover"'],
    values: [
        { term: "bg-linear-to-*", desc: "Linear gradient angle / direction helpers (project-specific syntax)." },
        { term: "from / via / to", desc: "Color stops along the gradient." },
        { term: "bg-cover / bg-contain", desc: "How a background image (or gradient box) fills its area." },
    ],
    tip: "Arbitrary values like `from-[#ff00aa]` work in full Tailwind for one-off brand colors.",
};

export default function TailwindBackgroundsPlayground() {
    const [gradientDirection, setGradientDirection] = useState("bg-linear-to-r");
    const [fromColor, setFromColor] = useState("from-pink-500");
    const [viaColor, setViaColor] = useState("");
    const [toColor, setToColor] = useState("to-rose-500");
    const [bgSize, setBgSize] = useState("bg-cover");

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const resetValues = () => {
        setGradientDirection("bg-linear-to-r");
        setFromColor("from-pink-500");
        setViaColor("");
        setToColor("to-rose-500");
        setBgSize("bg-cover");
    };

    const elementClasses = `w-full h-full rounded-2xl ${gradientDirection} ${fromColor} ${viaColor} ${toColor} ${bgSize}`;
    const generatedClasses = `${gradientDirection} ${fromColor} ${viaColor} ${toColor} ${bgSize}`.replace(/  +/g, ' ').trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedClasses);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">
                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-pink-500 to-rose-500">
                                Backgrounds
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind background utilities in this playground"
                                title={`What is ${TW_BACKGROUNDS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Create gradients and manage background properties.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Gradient Direction">
                            <SelectControl
                                value={gradientDirection}
                                onChange={setGradientDirection}
                                options={["bg-none", "bg-linear-to-t", "bg-linear-to-tr", "bg-linear-to-r", "bg-linear-to-br", "bg-linear-to-b", "bg-linear-to-bl", "bg-linear-to-l", "bg-linear-to-tl"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="From Color">
                            <SelectControl
                                value={fromColor}
                                onChange={setFromColor}
                                options={["from-white", "from-black", "from-slate-500", "from-red-500", "from-orange-500", "from-amber-500", "from-yellow-500", "from-lime-500", "from-green-500", "from-emerald-500", "from-teal-500", "from-cyan-500", "from-sky-500", "from-blue-500", "from-indigo-500", "from-violet-500", "from-purple-500", "from-fuchsia-500", "from-pink-500", "from-rose-500"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Via Color (Optional)">
                            <SelectControl
                                value={viaColor}
                                onChange={setViaColor}
                                options={["", "via-white", "via-black", "via-slate-500", "via-red-500", "via-orange-500", "via-amber-500", "via-yellow-500", "via-lime-500", "via-green-500", "via-emerald-500", "via-teal-500", "via-cyan-500", "via-sky-500", "via-blue-500", "via-indigo-500", "via-violet-500", "via-purple-500", "via-fuchsia-500", "via-pink-500", "via-rose-500"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="To Color">
                            <SelectControl
                                value={toColor}
                                onChange={setToColor}
                                options={["to-white", "to-black", "to-slate-500", "to-red-500", "to-orange-500", "to-amber-500", "to-yellow-500", "to-lime-500", "to-green-500", "to-emerald-500", "to-teal-500", "to-cyan-500", "to-sky-500", "to-blue-500", "to-indigo-500", "to-violet-500", "to-purple-500", "to-fuchsia-500", "to-pink-500", "to-rose-500"]}
                            />
                        </ControlGroup>
                    </div>

                    <button
                        onClick={resetValues}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>

                {/* Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        <div className={elementClasses}>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">Class Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Classes"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm text-cyan-300 break-all">
                            {generatedClasses}
                        </div>
                    </div>
                </motion.div>
            </div>
            {guideOpen && (
                <PlaygroundGuideModal doc={TW_BACKGROUNDS_GUIDE} onClose={closeGuide} titleId="tw-backgrounds-guide-title" />
            )}
            <Footer />
        </div>
    );
}

function ControlGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SelectControl({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer transition-colors hover:border-white/20"
        >
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-gray-900 text-white">
                    {opt}
                </option>
            ))}
        </select>
    );
}
