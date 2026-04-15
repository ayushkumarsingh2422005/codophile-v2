"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const TW_BORDERS_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind borders & radius",
    intro:
        "`rounded-*` sets `border-radius`; `border-*` width utilities set thickness; `border-color` utilities map to palette names; `border-solid` and friends set `border-style`. Together they replace most handwritten border declarations.",
    syntax: ['className="rounded-lg border-2 border-cyan-500 border-solid"'],
    values: [
        { term: "rounded-*", desc: "Corner radii from none through full (pill/circle contexts)." },
        { term: "border-* (width)", desc: "0, 2, 4, 8… pixel widths via default scale." },
        { term: "border-{color}", desc: "Theme colors applied to border-color." },
        { term: "border-dashed / dotted / …", desc: "Standard border styles." },
    ],
    tip: "Ring utilities (`ring-*`) are separate from borders and stack for focus rings in Tailwind.",
};

export default function TailwindBordersPlayground() {
    const [rounded, setRounded] = useState("rounded-lg");
    const [borderWidth, setBorderWidth] = useState("border-2");
    const [borderColor, setBorderColor] = useState("border-cyan-500");
    const [borderStyle, setBorderStyle] = useState("border-solid");

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const resetValues = () => {
        setRounded("rounded-lg");
        setBorderWidth("border-2");
        setBorderColor("border-cyan-500");
        setBorderStyle("border-solid");
    };

    const elementClasses = `w-48 h-48 bg-white/5 ${rounded} ${borderWidth} ${borderColor} ${borderStyle} flex items-center justify-center text-gray-400`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${rounded} ${borderWidth} ${borderColor} ${borderStyle}`);
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
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-emerald-500">
                                Borders & Rings
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind border utilities in this playground"
                                title={`What is ${TW_BORDERS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Style corners, widths, and colors.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Border Radius">
                            <SelectControl
                                value={rounded}
                                onChange={setRounded}
                                options={["rounded-none", "rounded-sm", "rounded", "rounded-md", "rounded-lg", "rounded-xl", "rounded-2xl", "rounded-3xl", "rounded-full"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Border Width">
                            <SelectControl
                                value={borderWidth}
                                onChange={setBorderWidth}
                                options={["border-0", "border", "border-2", "border-4", "border-8"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Border Color">
                            <SelectControl
                                value={borderColor}
                                onChange={setBorderColor}
                                options={["border-white", "border-gray-500", "border-red-500", "border-blue-500", "border-green-500", "border-yellow-500", "border-purple-500", "border-cyan-500", "border-transparent"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Border Style">
                            <SelectControl
                                value={borderStyle}
                                onChange={setBorderStyle}
                                options={["border-solid", "border-dashed", "border-dotted", "border-double", "border-hidden", "border-none"]}
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

                        <div className={`transition-all duration-300 ${elementClasses}`}>
                            Box
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
                            {`${rounded} ${borderWidth} ${borderColor} ${borderStyle}`}
                        </div>
                    </div>
                </motion.div>
            </div>
            {guideOpen && (
                <PlaygroundGuideModal doc={TW_BORDERS_GUIDE} onClose={closeGuide} titleId="tw-borders-guide-title" />
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
