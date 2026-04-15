"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const TW_OUTLINE_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind outline utilities",
    intro:
        "`outline-*` sets `outline-width` and visibility; `outline-{color}` sets `outline-color`; `outline-offset-*` gaps the outline from the border edge. Unlike borders, outlines do not affect layout—ideal for focus rings.",
    syntax: ['className="outline-2 outline-offset-2 outline-dashed outline-emerald-500"'],
    values: [
        { term: "outline / outline-2 / outline-none", desc: "Width keywords; `outline-none` removes the outline (common for custom focus styles)." },
        { term: "outline-offset-*", desc: "Distance between the element edge and the outline." },
        { term: "outline-solid | dashed | dotted | double", desc: "Outline style utilities." },
        { term: "outline-{color}", desc: "Theme colors and arbitrary values, e.g. `outline-cyan-400`." },
    ],
    tip: "Pair `outline` utilities with `ring-*` when you need box-shadow–based rings; both are common in accessible focus patterns.",
};

const OUTLINE_WIDTHS = ["outline-none", "outline", "outline-1", "outline-2", "outline-4", "outline-8"] as const;
const OUTLINE_OFFSETS = ["outline-offset-0", "outline-offset-1", "outline-offset-2", "outline-offset-4", "outline-offset-8"] as const;
const OUTLINE_STYLES = ["outline-solid", "outline-dashed", "outline-dotted", "outline-double"] as const;
const OUTLINE_COLORS = [
    "outline-emerald-500",
    "outline-cyan-400",
    "outline-violet-500",
    "outline-amber-400",
    "outline-white",
    "outline-black",
] as const;

export default function TailwindOutlinePlayground() {
    const [outlineWidth, setOutlineWidth] = useState<(typeof OUTLINE_WIDTHS)[number]>("outline-2");
    const [outlineOffset, setOutlineOffset] = useState<(typeof OUTLINE_OFFSETS)[number]>("outline-offset-2");
    const [outlineStyle, setOutlineStyle] = useState<(typeof OUTLINE_STYLES)[number]>("outline-solid");
    const [outlineColor, setOutlineColor] = useState<(typeof OUTLINE_COLORS)[number]>("outline-emerald-500");
    const [insetOutline, setInsetOutline] = useState(false);

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const resetValues = () => {
        setOutlineWidth("outline-2");
        setOutlineOffset("outline-offset-2");
        setOutlineStyle("outline-solid");
        setOutlineColor("outline-emerald-500");
        setInsetOutline(false);
    };

    const classOutput = useMemo(() => {
        if (outlineWidth === "outline-none") {
            return "outline-none";
        }
        const parts = [outlineWidth, outlineOffset, outlineStyle, outlineColor];
        if (insetOutline) parts.push("outline-inset");
        return parts.join(" ");
    }, [outlineColor, outlineOffset, outlineStyle, outlineWidth, insetOutline]);

    const previewClasses = useMemo(() => {
        const base =
            "w-36 h-36 rounded-xl border border-white/25 bg-linear-to-br from-slate-700 to-slate-900 shadow-xl flex items-center justify-center text-white text-sm font-medium text-center px-3";
        if (outlineWidth === "outline-none") {
            return `${base} outline-none`;
        }
        return `${base} ${outlineWidth} ${outlineOffset} ${outlineStyle} ${outlineColor}${insetOutline ? " outline-inset" : ""}`;
    }, [insetOutline, outlineColor, outlineOffset, outlineStyle, outlineWidth]);

    const handleCopy = () => {
        navigator.clipboard.writeText(classOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">
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
                                Outline
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind outline utilities in this playground"
                                title={`What is ${TW_OUTLINE_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">Outline width, offset, style, and color utilities.</p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Outline width">
                            <SelectControl value={outlineWidth} onChange={setOutlineWidth} options={[...OUTLINE_WIDTHS]} />
                        </ControlGroup>

                        <ControlGroup title="Outline offset">
                            <SelectControl
                                value={outlineOffset}
                                onChange={setOutlineOffset}
                                options={[...OUTLINE_OFFSETS]}
                                disabled={outlineWidth === "outline-none"}
                            />
                        </ControlGroup>

                        <ControlGroup title="Outline style">
                            <SelectControl
                                value={outlineStyle}
                                onChange={setOutlineStyle}
                                options={[...OUTLINE_STYLES]}
                                disabled={outlineWidth === "outline-none"}
                            />
                        </ControlGroup>

                        <ControlGroup title="Outline color">
                            <SelectControl
                                value={outlineColor}
                                onChange={setOutlineColor}
                                options={[...OUTLINE_COLORS]}
                                disabled={outlineWidth === "outline-none"}
                            />
                        </ControlGroup>

                        <ControlGroup title="Inset">
                            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={insetOutline}
                                    onChange={(e) => setInsetOutline(e.target.checked)}
                                    disabled={outlineWidth === "outline-none"}
                                    className="rounded border-white/20 bg-black/30 text-emerald-500 focus:ring-cyan-500/40"
                                />
                                <span>outline-inset</span>
                            </label>
                        </ControlGroup>
                    </div>

                    <button
                        onClick={resetValues}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        <p className="mb-8 text-gray-400 text-sm text-center max-w-md">
                            The box uses a visible <span className="text-gray-300">border</span> so you can see how the outline sits outside it.{" "}
                            {outlineWidth === "outline-none" ? "Outline is removed." : "Adjust utilities to match your focus or debug ring."}
                        </p>

                        <div className={previewClasses}>Outline</div>
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
                        <div className="p-4 font-mono text-sm text-cyan-300 break-all">{classOutput}</div>
                    </div>
                </motion.div>
            </div>
            {guideOpen && (
                <PlaygroundGuideModal doc={TW_OUTLINE_GUIDE} onClose={closeGuide} titleId="tw-outline-guide-title" />
            )}
            <Footer />
        </div>
    );
}

function ControlGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function SelectControl({
    value,
    onChange,
    options,
    disabled,
}: {
    value: string;
    onChange: (val: string) => void;
    options: string[];
    disabled?: boolean;
}) {
    return (
        <select
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer transition-colors hover:border-white/20 disabled:opacity-40 disabled:cursor-not-allowed"
        >
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-gray-900 text-white">
                    {opt}
                </option>
            ))}
        </select>
    );
}
