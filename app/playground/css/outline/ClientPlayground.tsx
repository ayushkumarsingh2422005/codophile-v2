"use client";

import React, { useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, Focus } from "lucide-react";
import Link from "next/link";

const OUTLINE_GUIDE: PlaygroundGuideDoc = {
    title: "CSS outline",
    intro:
        "Outlines draw a line outside the border box for focus rings and debugging. Unlike `border`, outline does not affect layout or box size. `outline-offset` shifts the outline away from the edge; `outline-color: invert` can guarantee contrast on any background.",
    syntax: [
        "outline: width style color;",
        "outline: 2px solid #22c55e;",
        "outline-offset: 4px;",
    ],
    values: [
        { term: "outline-style", desc: "Required for a visible outline (e.g. solid, dashed); `none` removes it." },
        { term: "outline-width", desc: "Thickness or keywords thin/medium/thick." },
        { term: "outline-color", desc: "Any color, or `invert` for automatic contrast." },
        { term: "outline-offset", desc: "Gap between the element’s border edge and the outline." },
    ],
    tip: "Prefer outlines for focus indicators so layout doesn’t shift when focus appears.",
};

const OUTLINE_STYLES = [
    "none",
    "hidden",
    "dotted",
    "dashed",
    "solid",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
] as const;

type OutlineStyle = (typeof OUTLINE_STYLES)[number];

type WidthMode = "thin" | "medium" | "thick" | "custom";

export default function OutlinePlaygroundClient() {
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderColor, setBorderColor] = useState("#000000");

    const [outlineStyle, setOutlineStyle] = useState<OutlineStyle>("solid");
    const [widthMode, setWidthMode] = useState<WidthMode>("custom");
    const [outlineWidthPx, setOutlineWidthPx] = useState(5);
    const [outlineColor, setOutlineColor] = useState("#22c55e");
    const [useInvert, setUseInvert] = useState(false);

    const [outlineOffset, setOutlineOffset] = useState(0);
    const [borderRadius, setBorderRadius] = useState(0);

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const outlineWidthCss = useMemo(() => {
        if (widthMode === "custom") return `${outlineWidthPx}px`;
        return widthMode;
    }, [widthMode, outlineWidthPx]);

    const outlineShorthand = useMemo(() => {
        if (outlineStyle === "none") return "none";
        if (useInvert) return `${outlineWidthCss} ${outlineStyle} invert`;
        return `${outlineWidthCss} ${outlineStyle} ${outlineColor}`;
    }, [outlineStyle, outlineWidthCss, outlineColor, useInvert]);

    const resetValues = () => {
        setBorderWidth(1);
        setBorderColor("#000000");
        setOutlineStyle("solid");
        setWidthMode("custom");
        setOutlineWidthPx(5);
        setOutlineColor("#22c55e");
        setUseInvert(false);
        setOutlineOffset(0);
        setBorderRadius(0);
    };

    const cssBlock = useMemo(() => {
        const lines: string[] = [];
        lines.push(`    border: ${borderWidth}px solid ${borderColor};`);

        if (outlineStyle === "none") {
            lines.push(`    outline: none;`);
        } else {
            lines.push(`    outline: ${outlineShorthand};`);
            if (outlineOffset !== 0) {
                lines.push(`    outline-offset: ${outlineOffset}px;`);
            }
        }

        if (borderRadius > 0) {
            lines.push(`    border-radius: ${borderRadius}px;`);
        }

        return `.element {\n${lines.join("\n")}\n}`;
    }, [
        borderColor,
        borderRadius,
        borderWidth,
        outlineOffset,
        outlineShorthand,
        outlineStyle,
    ]);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssBlock);
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
                        <Link
                            href="/playground/css"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-emerald-400 to-cyan-400">
                                CSS Outline
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS outline in this playground"
                                title={`What is ${OUTLINE_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs leading-relaxed">
                            An outline is drawn around an element, outside the border. It does not affect layout
                            size. Use{" "}
                            <code className="text-emerald-400/90">outline-style</code> (required for a visible
                            outline), <code className="text-emerald-400/90">outline-width</code>,{" "}
                            <code className="text-emerald-400/90">outline-color</code>,{" "}
                            <code className="text-emerald-400/90">outline-offset</code>, or the{" "}
                            <code className="text-emerald-400/90">outline</code> shorthand (
                            <a
                                href="https://www.w3schools.com/css/css_outline.asp"
                                className="text-cyan-400/90 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                outline
                            </a>
                            ,{" "}
                            <a
                                href="https://www.w3schools.com/css/css_outline_width.asp"
                                className="text-cyan-400/90 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                width
                            </a>
                            ,{" "}
                            <a
                                href="https://www.w3schools.com/css/css_outline_color.asp"
                                className="text-cyan-400/90 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                color
                            </a>
                            ,{" "}
                            <a
                                href="https://www.w3schools.com/css/css_outline_shorthand.asp"
                                className="text-cyan-400/90 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                shorthand
                            </a>
                            ,{" "}
                            <a
                                href="https://www.w3schools.com/css/css_outline_offset.asp"
                                className="text-cyan-400/90 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                offset
                            </a>
                            ).
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">
                        <ControlGroup title="Border (contrast)">
                            <p className="text-[11px] text-gray-500 leading-snug">
                                Outlines sit outside the border; a border makes the separation easy to see.
                            </p>
                            <SliderControl
                                label="Border width"
                                value={borderWidth}
                                onChange={setBorderWidth}
                                min={0}
                                max={12}
                                unit="px"
                            />
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Border color</label>
                                <input
                                    type="color"
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    aria-label="Border color"
                                    className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                                />
                            </div>
                        </ControlGroup>

                        <ControlGroup title="outline-style">
                            <p className="text-[11px] text-gray-500 leading-snug">
                                Other outline properties have no visible effect unless{" "}
                                <code className="text-gray-400">outline-style</code> is set (not{" "}
                                <code className="text-gray-400">none</code>).
                            </p>
                            <select
                                value={outlineStyle}
                                onChange={(e) => setOutlineStyle(e.target.value as OutlineStyle)}
                                aria-label="Outline style"
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-emerald-500/50 cursor-pointer"
                            >
                                {OUTLINE_STYLES.map((s) => (
                                    <option key={s} value={s} className="bg-gray-900 text-white">
                                        {s}
                                    </option>
                                ))}
                            </select>
                        </ControlGroup>

                        <ControlGroup title="outline-width">
                            <select
                                value={widthMode}
                                onChange={(e) => setWidthMode(e.target.value as WidthMode)}
                                aria-label="Outline width mode"
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-emerald-500/50 cursor-pointer"
                            >
                                <option value="thin" className="bg-gray-900">
                                    thin (typically 1px)
                                </option>
                                <option value="medium" className="bg-gray-900">
                                    medium (typically 3px)
                                </option>
                                <option value="thick" className="bg-gray-900">
                                    thick (typically 5px)
                                </option>
                                <option value="custom" className="bg-gray-900">
                                    Custom (px)
                                </option>
                            </select>
                            {widthMode === "custom" && (
                                <SliderControl
                                    label="Width"
                                    value={outlineWidthPx}
                                    onChange={setOutlineWidthPx}
                                    min={1}
                                    max={24}
                                    unit="px"
                                />
                            )}
                        </ControlGroup>

                        <ControlGroup title="outline-color">
                            <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={useInvert}
                                    onChange={(e) => setUseInvert(e.target.checked)}
                                    className="rounded border-white/20"
                                />
                                Use <code className="text-emerald-400/90">invert</code> (adapts to background)
                            </label>
                            {!useInvert && (
                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-300">Color</span>
                                        <span className="text-xs font-mono text-emerald-400">{outlineColor}</span>
                                    </div>
                                    <input
                                        type="color"
                                        value={outlineColor}
                                        onChange={(e) => setOutlineColor(e.target.value)}
                                        aria-label="Outline color"
                                        className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                                    />
                                </div>
                            )}
                        </ControlGroup>

                        <ControlGroup title="outline-offset">
                            <p className="text-[11px] text-gray-500 leading-snug">
                                Space between the border and the outline; the gap is transparent. Negative values
                                pull the outline inward.
                            </p>
                            <SliderControl
                                label="Offset"
                                value={outlineOffset}
                                onChange={setOutlineOffset}
                                min={-12}
                                max={32}
                                unit="px"
                            />
                        </ControlGroup>

                        <ControlGroup title="Rounded outline">
                            <p className="text-[11px] text-gray-500 leading-snug">
                                <code className="text-gray-400">border-radius</code> rounds the box; the outline
                                follows the shape.
                            </p>
                            <SliderControl
                                label="Border radius"
                                value={borderRadius}
                                onChange={setBorderRadius}
                                min={0}
                                max={32}
                                unit="px"
                            />
                        </ControlGroup>
                    </div>

                    <button
                        type="button"
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111]">
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-emerald-900/15 via-transparent to-cyan-900/15" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        </div>

                        <div
                            className="relative z-10 w-56 md:w-64 min-h-[140px] px-6 py-8 bg-[#1a1a1a] flex flex-col items-center justify-center gap-3 text-center shadow-lg transition-all duration-150"
                            style={{
                                border: `${borderWidth}px solid ${borderColor}`,
                                outline: outlineShorthand,
                                ...(outlineStyle === "none"
                                    ? {}
                                    : { outlineOffset: `${outlineOffset}px` }),
                                borderRadius: `${borderRadius}px`,
                            }}
                        >
                            <Focus className="w-8 h-8 text-emerald-400/80" aria-hidden />
                            <span className="text-white/80 font-mono text-sm">Outline preview</span>
                            <span className="text-gray-500 text-[11px] leading-snug">
                                Outline is outside the border and may overlap nearby content.
                            </span>
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS output</span>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <pre className="p-4 font-mono text-sm overflow-x-auto text-gray-300 whitespace-pre-wrap leading-relaxed">
                            {cssBlock}
                        </pre>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={OUTLINE_GUIDE}
                    onClose={closeGuide}
                    titleId="css-outline-guide-title"
                />
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
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-emerald-400">
                    {Math.round(value * 100) / 100}
                    {unit}
                </span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
        </div>
    );
}
