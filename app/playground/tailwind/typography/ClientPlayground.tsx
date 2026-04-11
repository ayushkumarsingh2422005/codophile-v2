"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const TW_TYPOGRAPHY_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind typography utilities",
    intro:
        "Font size (`text-*`), weight (`font-*`), alignment (`text-*`), color (`text-*`), decoration, `leading-*`, and `tracking-*` map to standard CSS with the design scale. They combine as utility strings on text nodes or containers.",
    syntax: ['className="text-lg font-semibold text-center leading-relaxed tracking-wide"'],
    values: [
        { term: "text-* (size)", desc: "Stepped scale from xs through 9xl." },
        { term: "font-* (weight)", desc: "thin through black weights where the font supports them." },
        { term: "leading-* / tracking-*", desc: "Line height and letter-spacing presets." },
    ],
    tip: "Use `prose` from @tailwindcss/typography for article blocks—this playground focuses on atomic utilities.",
};

export default function TailwindTypographyPlayground() {
    const [fontSize, setFontSize] = useState("text-base");
    const [fontWeight, setFontWeight] = useState("font-normal");
    const [textAlign, setTextAlign] = useState("text-left");
    const [textColor, setTextColor] = useState("text-white");
    const [decoration, setDecoration] = useState("no-underline");
    const [leading, setLeading] = useState("leading-normal");
    const [tracking, setTracking] = useState("tracking-normal");

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const resetValues = () => {
        setFontSize("text-base");
        setFontWeight("font-normal");
        setTextAlign("text-left");
        setTextColor("text-white");
        setDecoration("no-underline");
        setLeading("leading-normal");
        setTracking("tracking-normal");
    };

    const textClasses = `${fontSize} ${fontWeight} ${textAlign} ${textColor} ${decoration} ${leading} ${tracking}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(textClasses);
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
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-sky-400 to-indigo-500">
                                Typography
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind typography utilities in this playground"
                                title={`What is ${TW_TYPOGRAPHY_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Control font size, weight, and spacing.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Font Size">
                            <SelectControl
                                value={fontSize}
                                onChange={setFontSize}
                                options={["text-xs", "text-sm", "text-base", "text-lg", "text-xl", "text-2xl", "text-4xl", "text-6xl", "text-8xl"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Font Weight">
                            <SelectControl
                                value={fontWeight}
                                onChange={setFontWeight}
                                options={["font-thin", "font-light", "font-normal", "font-medium", "font-semibold", "font-bold", "font-extrabold", "font-black"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Text Align">
                            <SelectControl
                                value={textAlign}
                                onChange={setTextAlign}
                                options={["text-left", "text-center", "text-right", "text-justify"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Color">
                            <SelectControl
                                value={textColor}
                                onChange={setTextColor}
                                options={["text-white", "text-gray-400", "text-red-500", "text-blue-500", "text-green-500", "text-yellow-500", "text-purple-500", "text-cyan-500"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Decoration">
                            <SelectControl
                                value={decoration}
                                onChange={setDecoration}
                                options={["no-underline", "underline", "overline", "line-through"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Line Height (Leading)">
                            <SelectControl
                                value={leading}
                                onChange={setLeading}
                                options={["leading-none", "leading-tight", "leading-snug", "leading-normal", "leading-relaxed", "leading-loose"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Letter Spacing (Tracking)">
                            <SelectControl
                                value={tracking}
                                onChange={setTracking}
                                options={["tracking-tighter", "tracking-tight", "tracking-normal", "tracking-wide", "tracking-wider", "tracking-widest"]}
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

                        <div className={`relative z-10 transition-all duration-300 max-w-2xl ${textClasses}`}>
                            <p>
                                The quick brown fox jumps over the lazy dog. Tailwind CSS makes styling easy and efficient.
                            </p>
                            <p className="mt-4 opacity-80 text-[0.8em]">
                                Visualize your typography settings instantly.
                            </p>
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
                            {textClasses}
                        </div>
                    </div>
                </motion.div>
            </div>
            {guideOpen && (
                <PlaygroundGuideModal doc={TW_TYPOGRAPHY_GUIDE} onClose={closeGuide} titleId="tw-typography-guide-title" />
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
