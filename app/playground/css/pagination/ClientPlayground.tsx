"use client";

import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, Code } from "lucide-react";
import Link from "next/link";

const PAGINATION_GUIDE: PlaygroundGuideDoc = {
    title: "CSS pagination & breadcrumbs",
    intro:
        "Pagination UIs are usually a horizontal flex list of links with an active state. This generator outputs flex layouts, list reset, padding, borders, hover, and a breadcrumb variant using `::before` separators between items.",
    syntax: [
        ".pagination { display: flex; list-style: none; gap; justify-content; }",
        ".pagination a.active { background; color; }",
        ".breadcrumb li + li::before { content: \"/\"; }",
    ],
    values: [
        { term: "justify-content", desc: "Aligns the control group left, center, or right." },
        { term: "gap / padding / font-size", desc: "Controlled via size presets for tap targets and readability." },
        { term: "active link", desc: "Highlighted page using background and border color." },
        { term: "breadcrumb", desc: "Inline trail with slash dividers and last-item styling." },
    ],
    tip: "Pair with semantic `<nav aria-label=\"Pagination\">` in real markup.",
};

type PaginationStyle = "basic" | "bordered" | "rounded" | "breadcrumb";
type Size = "sm" | "md" | "lg";
type Alignment = "left" | "center" | "right";

export default function PaginationClient() {
    // State
    const [style, setStyle] = useState<PaginationStyle>("basic");
    const [size, setSize] = useState<Size>("md");
    const [alignment, setAlignment] = useState<Alignment>("center");
    const [spaceBetween, setSpaceBetween] = useState(0);
    const [activeColor, setActiveColor] = useState("#06b6d4"); // Cyan-500
    const [hoverEffect, setHoverEffect] = useState(true);
    const [transition, setTransition] = useState(true);
    const [activePage, setActivePage] = useState(2);

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    // Reset
    const resetValues = () => {
        setStyle("basic");
        setSize("md");
        setAlignment("center");
        setSpaceBetween(0);
        setActiveColor("#06b6d4");
        setHoverEffect(true);
        setTransition(true);
        setActivePage(2);
    };

    // Helper to get CSS values
    const getSizeValues = () => {
        switch (size) {
            case "sm": return { padding: "6px 12px", fontSize: "14px" };
            case "lg": return { padding: "12px 24px", fontSize: "18px" };
            default: return { padding: "8px 16px", fontSize: "16px" };
        }
    };

    const getBorderRadius = () => {
        switch (style) {
            case "rounded": return "50%"; // Circular for single digits/icon, or large pill
            case "bordered": return "4px";
            default: return "4px";
        }
    };

    const getAlignmentClass = () => {
        switch (alignment) {
            case "left": return "flex-start";
            case "right": return "flex-end";
            default: return "center";
        }
    };

    // Construct CSS String for display and copy
    const generateCSS = () => {
        const sizeVals = getSizeValues();
        const borderRadius = getBorderRadius();

        // Base styling for the list/container
        let css = `.pagination {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  justify-content: ${getAlignmentClass()};
  gap: ${spaceBetween}px;
}

`;

        // Styling for individual items/links
        css += `.pagination li a {
  display: block;
  padding: ${sizeVals.padding};
  font-size: ${sizeVals.fontSize};
  text-decoration: none;
  color: #fff;
  border: ${style === "bordered" ? "1px solid #333" : "1px solid transparent"};
  border-radius: ${style === "rounded" ? "5px" : borderRadius};
  ${transition ? "transition: all 0.3s ease;" : ""}
}

`;

        // Hover effect
        if (hoverEffect) {
            css += `.pagination li a:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.1);
  ${style === "bordered" ? "border-color: #555;" : ""}
}

`;
        }

        // Active state
        css += `.pagination li a.active {
  background-color: ${activeColor};
  color: white;
  border-color: ${activeColor};
}
`;

        // Breadcrumb specific overrides
        if (style === "breadcrumb") {
            css = `.breadcrumb {
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: ${getAlignmentClass()};
}

.breadcrumb li {
  display: flex;
  align-items: center;
  font-size: ${sizeVals.fontSize};
  color: #888;
}

.breadcrumb li + li::before {
  content: "/";
  padding: 0 10px;
  color: #555;
}

.breadcrumb li a {
  text-decoration: none;
  color: ${activeColor};
}

.breadcrumb li a:hover {
  text-decoration: underline;
}

.breadcrumb li:last-child {
  color: #fff;
}
`;
        }

        return css;
    };

    const cssCode = generateCSS();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            {/* Inject dynamic styles for the preview */}
            <style dangerouslySetInnerHTML={{ __html: cssCode }} />

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
                                Pagination
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS pagination in this playground"
                                title={`What is ${PAGINATION_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Customize navigation links with various styles, sizes, and states.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Layout & Style">
                            <div className="grid grid-cols-2 gap-2">
                                {['basic', 'bordered', 'rounded', 'breadcrumb'].map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setStyle(s as PaginationStyle)}
                                        className={`px-3 py-2 text-xs rounded-lg border transition-all capitalize ${style === s
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Size & Spacing">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Size</label>
                                    <div className="flex gap-2">
                                        {['sm', 'md', 'lg'].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setSize(s as Size)}
                                                className={`flex-1 py-1.5 text-xs rounded border transition-all uppercase ${size === s
                                                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                        : 'bg-white/5 border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {style !== 'breadcrumb' && (
                                    <SliderControl
                                        label="Space Between Items"
                                        value={spaceBetween}
                                        onChange={setSpaceBetween}
                                        min={0}
                                        max={20}
                                        unit="px"
                                    />
                                )}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Appearance">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Active Color</label>
                                    <div className="flex gap-2">
                                        {['#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map((c) => (
                                            <button
                                                key={c}
                                                onClick={() => setActiveColor(c)}
                                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${activeColor === c ? 'border-white' : 'border-transparent'
                                                    }`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-xs text-gray-300">Hover Effect</label>
                                    <Toggle checked={hoverEffect} onChange={setHoverEffect} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="text-xs text-gray-300">Smooth Transition</label>
                                    <Toggle checked={transition} onChange={setTransition} />
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Alignment">
                            <div className="flex gap-2">
                                {['left', 'center', 'right'].map((a) => (
                                    <button
                                        key={a}
                                        onClick={() => setAlignment(a as Alignment)}
                                        className={`flex-1 py-1.5 text-xs rounded border transition-all capitalize ${alignment === a
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                : 'bg-white/5 border-white/10 text-gray-400'
                                            }`}
                                    >
                                        {a}
                                    </button>
                                ))}
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
                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        </div>

                        {/* Pagination Preview */}
                        <div className="relative z-10 w-full px-8">
                            {style === 'breadcrumb' ? (
                                <ul className="breadcrumb">
                                    <li><a href="#">Home</a></li>
                                    <li><a href="#">Products</a></li>
                                    <li><a href="#">Electronics</a></li>
                                    <li>Current Page</li>
                                </ul>
                            ) : (
                                <ul className="pagination">
                                    <li><a href="#">&laquo;</a></li>
                                    <li><a href="#" className={activePage === 1 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage(1); }}>1</a></li>
                                    <li><a href="#" className={activePage === 2 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage(2); }}>2</a></li>
                                    <li><a href="#" className={activePage === 3 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage(3); }}>3</a></li>
                                    <li><a href="#" className={activePage === 4 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage(4); }}>4</a></li>
                                    <li><a href="#" className={activePage === 5 ? 'active' : ''} onClick={(e) => { e.preventDefault(); setActivePage(5); }}>5</a></li>
                                    <li><a href="#">&raquo;</a></li>
                                </ul>
                            )}
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
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-64 custom-scrollbar whitespace-pre">
                            {cssCode}
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={PAGINATION_GUIDE}
                    onClose={closeGuide}
                    titleId="css-pagination-guide-title"
                />
            )}

            <Footer />
        </div>
    );
}

// Reusable Components
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

function SliderControl({ label, value, onChange, min, max, unit = "" }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
}

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-10 h-5 rounded-full relative transition-colors ${checked ? 'bg-cyan-500' : 'bg-white/10'}`}
        >
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`} />
        </button>
    );
}
