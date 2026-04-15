"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const BORDER_PAGE_GUIDE: PlaygroundGuideDoc = {
    title: "CSS border playground",
    intro:
        "This module lets you build a single `border` declaration from width, style, and color. The shorthand sets all sides at once; together they control how the edge of the box is drawn.",
    syntax: [".element {", "    border: width style color;", "}"],
    values: [
        { term: "border (shorthand)", desc: "One declaration for width, line style, and color. Order is flexible, but style must be present for a visible edge." },
        { term: "Style", desc: "solid, dashed, dotted, double, groove, ridge, inset, outset, hidden, and other keywords change how the stroke is drawn." },
        { term: "Width", desc: "Thickness in px or keywords; 0 hides the border even if color is set." },
        { term: "Color", desc: "Any CSS color; pairs with the chosen style to produce the final look." },
    ],
    tip: "If you omit border-style, the border will not appear—even if width and color are set.",
};

export default function BorderPlaygroundClient() {
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderWidth, setBorderWidth] = useState(5);
    const [borderColor, setBorderColor] = useState("#3b82f6");
    const [copied, setCopied] = useState(false);
    const [pageGuideOpen, setPageGuideOpen] = useState(false);
    const closePageGuide = useCallback(() => setPageGuideOpen(false), []);

    const resetValues = () => {
        setBorderStyle("solid");
        setBorderWidth(5);
        setBorderColor("#3b82f6");
    };

    const borderValue = `${borderWidth}px ${borderStyle} ${borderColor}`;

    const handleCopy = () => {
        const code = `.element {\n    border: ${borderValue};\n}`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const borderStyles = [
        "solid", "dashed", "dotted", "double",
        "groove", "ridge", "inset", "outset", "hidden"
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">

                {/* Controls Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Border
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setPageGuideOpen(true)}
                                ariaLabel="Learn about this border playground"
                                title={`What is ${BORDER_PAGE_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Set the border style, width, and color of an element.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Border properties">
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Style</label>
                                <select
                                    value={borderStyle}
                                    onChange={(e) => setBorderStyle(e.target.value)}
                                    aria-label="Border style"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    {borderStyles.map(style => (
                                        <option key={style} value={style} className="bg-gray-900 text-white">
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <SliderControl
                                label="Width"
                                value={borderWidth}
                                onChange={setBorderWidth}
                                min={0}
                                max={50}
                                unit="px"
                            />

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-2">
                                    <label className="text-xs text-gray-300">Color</label>
                                    <span className="text-xs font-mono text-cyan-400 shrink-0">{borderColor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="color"
                                        value={borderColor}
                                        onChange={(e) => setBorderColor(e.target.value)}
                                        aria-label="Border color"
                                        className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                                    />
                                </div>
                            </div>
                        </ControlGroup>

                    </div>

                    <button
                        onClick={resetValues}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>


                {/* Preview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] group">
                        {/* Background Image / Pattern */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10" />
                            {/* Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Element */}
                        <div
                            className="relative z-10 w-64 h-64 md:w-80 md:h-64 bg-[#1a1a1a] flex items-center justify-center p-6 text-center shadow-lg transition-all duration-300"
                            style={{
                                border: borderValue,
                                borderRadius: '5px' // Matching the original CSS 5px radius logic
                            }}
                        >
                            <span className="text-white/50 font-mono text-sm">Box Element</span>
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300">
                            <div className="text-purple-400">.element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">border</span>: <span className="text-orange-300">{borderValue}</span>;
                            </div>
                            <div className="text-white">{`}`}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {pageGuideOpen && (
                <PlaygroundGuideModal
                    doc={BORDER_PAGE_GUIDE}
                    onClose={closePageGuide}
                    titleId="border-page-guide-title"
                />
            )}

            <Footer />
        </div>
    );
}

// Reusable Components
function ControlGroup({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SliderControl({
    label,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "",
}: {
    label: string;
    value: number;
    onChange: (n: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
                <label
                    className="text-xs text-gray-300"
                    id={`slider-label-${label.replace(/\s/g, "-")}`}
                >
                    {label}
                </label>
                <span className="text-xs font-mono text-cyan-400 shrink-0">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                aria-labelledby={`slider-label-${label.replace(/\s/g, "-")}`}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
}
