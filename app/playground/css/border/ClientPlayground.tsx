"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, CircleHelp, X } from "lucide-react";
import Link from "next/link";

type BorderDocId = "border" | "border-style" | "border-width" | "border-color";

const BORDER_PROPERTY_DOCS: Record<
    BorderDocId,
    {
        title: string;
        intro: string;
        syntax: string[];
        values?: { term: string; desc: string }[];
        tip?: string;
    }
> = {
    border: {
        title: "CSS border",
        intro:
            "The border property is a shorthand that sets all border properties in one declaration. It can set border-width, border-style, and border-color at the same time. Values can be in any order, but border-style is required for a visible border.",
        syntax: [
            "border: width style color;",
            "border: 2px solid red;",
            "border: thick double #333;",
        ],
        tip: "If you omit border-style, the border will not appear—even if width and color are set.",
    },
    "border-style": {
        title: "CSS border-style",
        intro:
            "The border-style property sets the line style for all four sides of an element’s border. Different styles create different visual effects; some (like groove, ridge, inset, outset) use the element’s border-color to simulate 3D lighting.",
        syntax: ["border-style: value;", "border-style: dashed;", "border-style: solid dotted; /* top/bottom | left/right */"],
        values: [
            { term: "none", desc: "No border; width may compute to 0." },
            { term: "hidden", desc: "Like none, but affects border conflict resolution in tables." },
            { term: "solid", desc: "A single straight line." },
            { term: "dotted", desc: "A series of round dots." },
            { term: "dashed", desc: "A series of short dashes." },
            { term: "double", desc: "Two parallel solid lines; total width includes the gap." },
            { term: "groove", desc: "Carved-into look; depends on border-color." },
            { term: "ridge", desc: "Raised look; opposite of groove." },
            { term: "inset", desc: "Makes the box look embedded." },
            { term: "outset", desc: "Makes the box look coming out of the canvas." },
        ],
    },
    "border-width": {
        title: "CSS border-width",
        intro:
            "The border-width property sets the thickness of the border. You can use pixels (px), other length units, or the keywords thin, medium, and thick. Up to four values set top, right, bottom, and left in that order.",
        syntax: [
            "border-width: length;",
            "border-width: thin | medium | thick;",
            "border-width: 2px 4px; /* top/bottom | left/right */",
        ],
        values: [
            { term: "thin / medium / thick", desc: "Predefined widths; exact pixels depend on the browser." },
            { term: "length (e.g. px)", desc: "Exact thickness, e.g. 5px." },
        ],
        tip: "A width of 0 hides the border even if border-style is set.",
    },
    "border-color": {
        title: "CSS border-color",
        intro:
            "The border-color property sets the color of the border. You can use color names, hexadecimal (#rgb or #rrggbb), rgb(), rgba(), hsl(), hsla(), or the keyword transparent.",
        syntax: [
            "border-color: color;",
            "border-color: #3b82f6;",
            "border-color: rgb(59, 130, 246);",
            "border-color: red blue; /* top/bottom | left/right */",
        ],
        values: [
            { term: "named colors", desc: "e.g. red, steelblue." },
            { term: "hex", desc: "e.g. #ff0000 or #f00." },
            { term: "rgb / rgba", desc: "Red, green, blue (+ optional alpha)." },
            { term: "hsl / hsla", desc: "Hue, saturation, lightness (+ optional alpha)." },
            { term: "transparent", desc: "Fully transparent border (still takes layout space if width > 0)." },
        ],
    },
};

export default function BorderPlaygroundClient() {
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderWidth, setBorderWidth] = useState(5);
    const [borderColor, setBorderColor] = useState("#3b82f6");
    const [copied, setCopied] = useState(false);
    const [openDocId, setOpenDocId] = useState<BorderDocId | null>(null);

    const closeDoc = useCallback(() => setOpenDocId(null), []);

    useEffect(() => {
        if (!openDocId) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDoc();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [openDocId, closeDoc]);

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

            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">

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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Border
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Set the border style, width, and color of an element.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup
                            title="Border properties"
                            titleDocId="border"
                            onOpenDoc={setOpenDocId}
                        >
                            <div className="space-y-1.5">
                                <PropertyLabel docId="border-style" onOpenDoc={setOpenDocId}>
                                    Style
                                </PropertyLabel>
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
                                docId="border-width"
                                onOpenDoc={setOpenDocId}
                                value={borderWidth}
                                onChange={setBorderWidth}
                                min={0}
                                max={50}
                                unit="px"
                            />

                            <div className="space-y-1.5">
                                <div className="flex items-center justify-between gap-2">
                                    <PropertyLabel docId="border-color" onOpenDoc={setOpenDocId}>
                                        Color
                                    </PropertyLabel>
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

            {openDocId && (
                <PropertyExplainModal docId={openDocId} onClose={closeDoc} />
            )}

            <Footer />
        </div>
    );
}

function DocHelpButton({
    docId,
    onOpenDoc,
    label,
}: {
    docId: BorderDocId;
    onOpenDoc: (id: BorderDocId) => void;
    label: string;
}) {
    return (
        <button
            type="button"
            onClick={() => onOpenDoc(docId)}
            className="inline-flex items-center justify-center rounded-md p-0.5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
            aria-label={`Learn about ${label}`}
            title={`What is ${BORDER_PROPERTY_DOCS[docId].title}?`}
        >
            <CircleHelp className="w-3.5 h-3.5" aria-hidden />
        </button>
    );
}

function PropertyLabel({
    children,
    docId,
    onOpenDoc,
}: {
    children: React.ReactNode;
    docId: BorderDocId;
    onOpenDoc: (id: BorderDocId) => void;
}) {
    const title = BORDER_PROPERTY_DOCS[docId].title;
    return (
        <div className="flex items-center gap-1 min-w-0">
            <span className="text-xs text-gray-300">{children}</span>
            <DocHelpButton docId={docId} onOpenDoc={onOpenDoc} label={title} />
        </div>
    );
}

function PropertyExplainModal({ docId, onClose }: { docId: BorderDocId; onClose: () => void }) {
    const doc = BORDER_PROPERTY_DOCS[docId];
    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="border-doc-title"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close"
            />
            <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0c0c12] shadow-2xl shadow-black/50 custom-scrollbar">
                <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-emerald-600/40 bg-linear-to-r from-emerald-900/50 to-cyan-900/30 px-4 py-3">
                    <h2 id="border-doc-title" className="text-base font-semibold text-white pr-2">
                        {doc.title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4 p-4 text-sm text-gray-300 leading-relaxed">
                    <p>{doc.intro}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">Syntax</p>
                        <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-orange-200/95 space-y-1.5">
                            {doc.syntax.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </div>
                    {doc.values && doc.values.length > 0 && (
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">
                                Property values
                            </p>
                            <dl className="space-y-2 text-xs">
                                {doc.values.map(({ term, desc }) => (
                                    <div key={term} className="rounded-lg bg-white/4 px-3 py-2 border border-white/5">
                                        <dt className="font-mono text-cyan-300/95 mb-0.5">{term}</dt>
                                        <dd className="text-gray-400">{desc}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}
                    {doc.tip && (
                        <div className="rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
                            <span className="font-semibold text-amber-400/95">Note: </span>
                            {doc.tip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Reusable Components
function ControlGroup({
    title,
    titleDocId,
    onOpenDoc,
    children,
}: {
    title: string;
    titleDocId?: BorderDocId;
    onOpenDoc?: (id: BorderDocId) => void;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-1.5">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
                {titleDocId && onOpenDoc && (
                    <DocHelpButton
                        docId={titleDocId}
                        onOpenDoc={onOpenDoc}
                        label={BORDER_PROPERTY_DOCS[titleDocId].title}
                    />
                )}
            </div>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SliderControl({
    label,
    docId,
    onOpenDoc,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "",
}: {
    label: string;
    docId?: BorderDocId;
    onOpenDoc?: (id: BorderDocId) => void;
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
                <div className="flex items-center gap-1 min-w-0">
                    <span className="text-xs text-gray-300" id={`slider-label-${label.replace(/\s/g, "-")}`}>
                        {label}
                    </span>
                    {docId && onOpenDoc && (
                        <DocHelpButton
                            docId={docId}
                            onOpenDoc={onOpenDoc}
                            label={BORDER_PROPERTY_DOCS[docId].title}
                        />
                    )}
                </div>
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
