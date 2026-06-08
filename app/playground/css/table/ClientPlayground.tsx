"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, CircleHelp, X } from "lucide-react";
import Link from "next/link";

type TableDocId =
    | "border-collapse"
    | "border-spacing"
    | "table-layout"
    | "caption-side"
    | "empty-cells"
    | "width"
    | "text-align"
    | "vertical-align"
    | "padding";

type PropertyDoc = {
    title: string;
    intro: string;
    syntax: string[];
    values?: { term: string; desc: string }[];
    tip?: string;
};

const TABLE_PROPERTY_DOCS: Record<TableDocId, PropertyDoc> = {
    "border-collapse": {
        title: "CSS border-collapse",
        intro:
            "Sets whether adjacent table cell borders are merged into a single border (collapse) or kept separate with spacing between them (separate).",
        syntax: ["border-collapse: collapse;", "border-collapse: separate;"],
        values: [
            { term: "collapse", desc: "Borders are shared between cells; border-spacing is ignored." },
            { term: "separate", desc: "Each cell has its own border; use border-spacing for gaps." },
        ],
    },
    "border-spacing": {
        title: "CSS border-spacing",
        intro:
            "Sets the distance between borders of adjacent cells. Only applies when border-collapse is separate.",
        syntax: [
            "border-spacing: length;",
            "border-spacing: 4px;",
            "border-spacing: 2px 8px; /* horizontal | vertical */",
        ],
    },
    "table-layout": {
        title: "CSS table-layout",
        intro:
            "Defines the algorithm used to lay out table cells. auto sizes columns from content; fixed uses the first row (and width) to determine column widths.",
        syntax: ["table-layout: auto;", "table-layout: fixed;"],
        values: [
            { term: "auto", desc: "Column width follows content; table may reflow as content changes." },
            { term: "fixed", desc: "Widths follow first row and table width; faster, more predictable layout." },
        ],
        tip: "With fixed layout, a defined table width distributes column space evenly unless you set column widths.",
    },
    "caption-side": {
        title: "CSS caption-side",
        intro:
            "Positions the table caption relative to the table box. The caption describes the table and is associated via the <caption> element.",
        syntax: [
            "caption-side: top;",
            "caption-side: bottom;",
            "caption-side: left;",
            "caption-side: right;",
        ],
    },
    "empty-cells": {
        title: "CSS empty-cells",
        intro:
            "Controls whether borders and backgrounds of empty table cells are shown or hidden. An empty cell has no visible content.",
        syntax: ["empty-cells: show;", "empty-cells: hide;"],
        values: [
            { term: "show", desc: "Borders and background still render on empty cells." },
            { term: "hide", desc: "Empty cells look collapsed—borders and background are hidden." },
        ],
    },
    width: {
        title: "CSS width (on table)",
        intro:
            "Sets how wide the table is relative to its container. Percentage values are common for responsive tables.",
        syntax: ["width: 100%;", "width: 480px;", "width: auto;"],
    },
    "text-align": {
        title: "CSS text-align",
        intro:
            "Aligns inline content inside table cells horizontally. Applied on th and td elements.",
        syntax: [
            "text-align: left;",
            "text-align: center;",
            "text-align: right;",
            "text-align: justify;",
        ],
    },
    "vertical-align": {
        title: "CSS vertical-align",
        intro:
            "Aligns content inside a table cell vertically relative to the cell box.",
        syntax: [
            "vertical-align: top;",
            "vertical-align: middle;",
            "vertical-align: bottom;",
        ],
    },
    padding: {
        title: "CSS padding (on cells)",
        intro:
            "Adds space between the cell border and its content. Larger padding improves readability in data tables.",
        syntax: ["padding: 12px;", "padding: 8px 16px;"],
    },
};

const tableData = [
    { first: "John", last: "Doe", email: "john@example.com", role: "Developer" },
    { first: "Jane", last: "Smith", email: "jane@example.com", role: "Designer" },
    { first: "Bob", last: "Johnson", email: "", role: "Manager" },
    { first: "Alice", last: "Williams", email: "alice@example.com", role: "Marketer" },
];

const columns = ["first", "last", "email", "role"] as const;

export default function TablePlaygroundClient() {
    const [tableLayout, setTableLayout] = useState<"auto" | "fixed">("auto");
    const [captionSide, setCaptionSide] = useState<"top" | "bottom" | "left" | "right">("top");
    const [showCaption, setShowCaption] = useState(true);
    const [emptyCells, setEmptyCells] = useState<"show" | "hide">("show");
    const [borderCollapse, setBorderCollapse] = useState<"collapse" | "separate">("collapse");
    const [borderSpacing, setBorderSpacing] = useState(0);
    const [width, setWidth] = useState(100);
    const [padding, setPadding] = useState(12);
    const [textAlign, setTextAlign] = useState("left");
    const [verticalAlign, setVerticalAlign] = useState("middle");
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderColor, setBorderColor] = useState("#4b5563");
    const [textColor, setTextColor] = useState("#ffffff");
    const [headerBg, setHeaderBg] = useState("#1f2937");
    const [isStriped, setIsStriped] = useState(false);
    const [isHoverable, setIsHoverable] = useState(false);
    const [isResponsive, setIsResponsive] = useState(false);
    const [copied, setCopied] = useState(false);
    const [openDocId, setOpenDocId] = useState<TableDocId | null>(null);

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
        setTableLayout("auto");
        setCaptionSide("top");
        setShowCaption(true);
        setEmptyCells("show");
        setBorderCollapse("collapse");
        setBorderSpacing(0);
        setWidth(100);
        setPadding(12);
        setTextAlign("left");
        setVerticalAlign("middle");
        setBorderWidth(1);
        setBorderStyle("solid");
        setBorderColor("#4b5563");
        setTextColor("#ffffff");
        setHeaderBg("#1f2937");
        setIsStriped(false);
        setIsHoverable(false);
        setIsResponsive(false);
    };

    const generateCSS = () => {
        let code = "";
        if (isResponsive) {
            code += `.table-wrapper {\n  overflow-x: auto;\n}\n\n`;
        }
        code += `table {\n`;
        code += `  width: ${width}%;\n`;
        code += `  table-layout: ${tableLayout};\n`;
        code += `  border-collapse: ${borderCollapse};\n`;
        if (borderCollapse === "separate") {
            code += `  border-spacing: ${borderSpacing}px;\n`;
        }
        code += `  empty-cells: ${emptyCells};\n`;
        code += `  color: ${textColor};\n`;
        code += `}\n\n`;
        if (showCaption) {
            code += `caption {\n  caption-side: ${captionSide};\n}\n\n`;
        }
        code += `th, td {\n`;
        code += `  border: ${borderWidth}px ${borderStyle} ${borderColor};\n`;
        code += `  padding: ${padding}px;\n`;
        code += `  text-align: ${textAlign};\n`;
        code += `  vertical-align: ${verticalAlign};\n`;
        code += `}\n\n`;
        code += `th {\n  background-color: ${headerBg};\n}`;
        if (isStriped) {
            code += `\n\ntr:nth-child(even) {\n  background-color: rgba(255, 255, 255, 0.05);\n}`;
        }
        if (isHoverable) {
            code += `\n\ntr:hover {\n  background-color: rgba(255, 255, 255, 0.1);\n}`;
        }
        return code;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const cellStyle: React.CSSProperties = {
        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
        padding: `${padding}px`,
        textAlign: textAlign as React.CSSProperties["textAlign"],
        verticalAlign: verticalAlign as React.CSSProperties["verticalAlign"],
    };

    const tableEl = (
        <table
            style={{
                width: `${width}%`,
                tableLayout,
                borderCollapse,
                borderSpacing: borderCollapse === "separate" ? `${borderSpacing}px` : undefined,
                emptyCells,
                color: textColor,
            }}
        >
            {showCaption && (
                <caption style={{ captionSide: captionSide as React.CSSProperties["captionSide"], padding: "8px", fontWeight: 600 }}>
                    Employee directory (caption-side: {captionSide})
                </caption>
            )}
            <thead>
                <tr>
                    {columns.map((heading) => (
                        <th
                            key={heading}
                            style={{ ...cellStyle, backgroundColor: headerBg }}
                            className="uppercase text-xs font-bold tracking-wider"
                        >
                            {heading}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableData.map((row, idx) => (
                    <tr
                        key={idx}
                        style={{
                            backgroundColor: isStriped && idx % 2 !== 0 ? "rgba(255, 255, 255, 0.05)" : undefined,
                        }}
                        className={isHoverable ? "hover:bg-white/10 transition-colors" : ""}
                    >
                        {columns.map((col) => (
                            <td key={col} style={cellStyle}>
                                {row[col] || "\u00A0"}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">
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
                            Table Properties
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Table-specific CSS properties from the spec. Row 3 has an empty email cell to demo empty-cells.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">
                        <ControlGroup title="Table layout">
                            <SliderControl label="Width" docId="width" onOpenDoc={setOpenDocId} value={width} onChange={setWidth} min={50} max={100} unit="%" />
                            <ToggleRow label="Table layout" docId="table-layout" onOpenDoc={setOpenDocId}>
                                {(["auto", "fixed"] as const).map((mode) => (
                                    <SegmentButton key={mode} active={tableLayout === mode} onClick={() => setTableLayout(mode)}>
                                        {mode}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <ToggleRow label="Border collapse" docId="border-collapse" onOpenDoc={setOpenDocId}>
                                {(["collapse", "separate"] as const).map((mode) => (
                                    <SegmentButton key={mode} active={borderCollapse === mode} onClick={() => setBorderCollapse(mode)}>
                                        {mode}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            {borderCollapse === "separate" && (
                                <SliderControl label="Border spacing" docId="border-spacing" onOpenDoc={setOpenDocId} value={borderSpacing} onChange={setBorderSpacing} min={0} max={20} unit="px" />
                            )}
                            <ToggleRow label="Empty cells" docId="empty-cells" onOpenDoc={setOpenDocId}>
                                {(["show", "hide"] as const).map((mode) => (
                                    <SegmentButton key={mode} active={emptyCells === mode} onClick={() => setEmptyCells(mode)}>
                                        {mode}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                        </ControlGroup>

                        <ControlGroup title="Caption">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-300">Show caption</span>
                                <Switch checked={showCaption} onChange={setShowCaption} />
                            </div>
                            {showCaption && (
                                <ToggleRow label="Caption side" docId="caption-side" onOpenDoc={setOpenDocId}>
                                    {(["top", "bottom", "left", "right"] as const).map((side) => (
                                        <SegmentButton key={side} active={captionSide === side} onClick={() => setCaptionSide(side)}>
                                            {side}
                                        </SegmentButton>
                                    ))}
                                </ToggleRow>
                            )}
                        </ControlGroup>

                        <ControlGroup title="Cell borders">
                            <SliderControl label="Border width" value={borderWidth} onChange={setBorderWidth} min={0} max={6} unit="px" />
                            <select
                                value={borderStyle}
                                onChange={(e) => setBorderStyle(e.target.value)}
                                aria-label="Cell border style"
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                            >
                                {["solid", "dashed", "dotted", "double", "none"].map((s) => (
                                    <option key={s} value={s} className="bg-gray-900">{s}</option>
                                ))}
                            </select>
                            <ColorControl label="Border color" value={borderColor} onChange={setBorderColor} />
                        </ControlGroup>

                        <ControlGroup title="Cell content">
                            <SliderControl label="Padding" docId="padding" onOpenDoc={setOpenDocId} value={padding} onChange={setPadding} min={0} max={32} unit="px" />
                            <ToggleRow label="Text align" docId="text-align" onOpenDoc={setOpenDocId}>
                                {["left", "center", "right"].map((align) => (
                                    <SegmentButton key={align} active={textAlign === align} onClick={() => setTextAlign(align)}>
                                        {align[0].toUpperCase()}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <div className="space-y-1.5">
                                <PropertyLabel docId="vertical-align" onOpenDoc={setOpenDocId}>Vertical align</PropertyLabel>
                                <select
                                    value={verticalAlign}
                                    onChange={(e) => setVerticalAlign(e.target.value)}
                                    aria-label="Vertical align"
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    {["top", "middle", "bottom"].map((a) => (
                                        <option key={a} value={a} className="bg-gray-900">{a}</option>
                                    ))}
                                </select>
                            </div>
                            <ColorControl label="Text color" value={textColor} onChange={setTextColor} />
                            <ColorControl label="Header background" value={headerBg} onChange={setHeaderBg} />
                        </ControlGroup>

                        <ControlGroup title="Common patterns" subtitle="Not single properties — popular recipes">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Zebra striping (:nth-child)</span>
                                <Switch checked={isStriped} onChange={setIsStriped} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Row hover (:hover)</span>
                                <Switch checked={isHoverable} onChange={setIsHoverable} />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">Scroll wrapper (overflow-x)</span>
                                <Switch checked={isResponsive} onChange={setIsResponsive} />
                            </div>
                        </ControlGroup>
                    </div>

                    <button onClick={resetValues} className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300">
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex-1 flex flex-col gap-6">
                    <div className={`flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-start justify-center bg-[#111] p-8 ${isResponsive ? "overflow-x-auto" : ""}`}>
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>
                        <div className={`relative z-10 w-full ${isResponsive ? "min-w-[560px]" : ""}`}>
                            {isResponsive ? <div className="overflow-x-auto">{tableEl}</div> : tableEl}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS Output</span>
                            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-60 overflow-y-auto custom-scrollbar">
                            <pre>{generateCSS()}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>

            {openDocId && <PropertyExplainModal docId={openDocId} onClose={closeDoc} />}
            <Footer />
        </div>
    );
}

function DocHelpButton({ docId, onOpenDoc, label }: { docId: TableDocId; onOpenDoc: (id: TableDocId) => void; label: string }) {
    return (
        <button
            type="button"
            onClick={() => onOpenDoc(docId)}
            className="inline-flex items-center justify-center rounded-md p-0.5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            aria-label={`Learn about ${label}`}
        >
            <CircleHelp className="w-3.5 h-3.5" aria-hidden />
        </button>
    );
}

function PropertyLabel({ children, docId, onOpenDoc }: { children: React.ReactNode; docId: TableDocId; onOpenDoc: (id: TableDocId) => void }) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-xs text-gray-300">{children}</span>
            <DocHelpButton docId={docId} onOpenDoc={onOpenDoc} label={TABLE_PROPERTY_DOCS[docId].title} />
        </div>
    );
}

function PropertyExplainModal({ docId, onClose }: { docId: TableDocId; onClose: () => void }) {
    const doc = TABLE_PROPERTY_DOCS[docId];
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="table-doc-title">
            <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
            <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0c0c12] shadow-2xl custom-scrollbar">
                <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-emerald-600/40 bg-linear-to-r from-emerald-900/50 to-cyan-900/30 px-4 py-3">
                    <h2 id="table-doc-title" className="text-base font-semibold text-white">{doc.title}</h2>
                    <button type="button" onClick={onClose} className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/10" aria-label="Close">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4 p-4 text-sm text-gray-300 leading-relaxed">
                    <p>{doc.intro}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">Syntax</p>
                        <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-orange-200/95 space-y-1.5">
                            {doc.syntax.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                    </div>
                    {doc.values && (
                        <dl className="space-y-2 text-xs">
                            {doc.values.map(({ term, desc }) => (
                                <div key={term} className="rounded-lg bg-white/4 px-3 py-2 border border-white/5">
                                    <dt className="font-mono text-cyan-300/95 mb-0.5">{term}</dt>
                                    <dd className="text-gray-400">{desc}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                    {doc.tip && (
                        <div className="rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
                            <span className="font-semibold text-amber-400/95">Note: </span>{doc.tip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function ControlGroup({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
                {subtitle && <p className="text-[10px] text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

function ToggleRow({ label, docId, onOpenDoc, children }: { label: string; docId?: TableDocId; onOpenDoc?: (id: TableDocId) => void; children: React.ReactNode }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-1">
                <span className="text-xs text-gray-300">{label}</span>
                {docId && onOpenDoc && <DocHelpButton docId={docId} onOpenDoc={onOpenDoc} label={TABLE_PROPERTY_DOCS[docId].title} />}
            </div>
            <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-lg">{children}</div>
        </div>
    );
}

function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 min-w-0 py-1 px-2 text-xs rounded-md transition-all ${active ? "bg-cyan-500/20 text-cyan-400" : "text-gray-400 hover:text-white"}`}
        >
            {children}
        </button>
    );
}

function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button type="button" onClick={() => onChange(!checked)} className={`w-10 h-5 rounded-full transition-colors relative ${checked ? "bg-cyan-500" : "bg-gray-700"}`}>
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? "left-6" : "left-1"}`} />
        </button>
    );
}

function SliderControl({ label, docId, onOpenDoc, value, onChange, min, max, step = 1, unit = "" }: {
    label: string; docId?: TableDocId; onOpenDoc?: (id: TableDocId) => void;
    value: number; onChange: (n: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
    const id = `slider-${label.replace(/\s/g, "-")}`;
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-300" id={id}>{label}</span>
                    {docId && onOpenDoc && <DocHelpButton docId={docId} onOpenDoc={onOpenDoc} label={TABLE_PROPERTY_DOCS[docId].title} />}
                </div>
                <span className="text-xs font-mono text-cyan-400 shrink-0">{value}{unit}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-labelledby={id} className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );
}

function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{label}</span>
                <span className="text-xs font-mono text-cyan-400">{value}</span>
            </div>
            <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0" />
        </div>
    );
}
