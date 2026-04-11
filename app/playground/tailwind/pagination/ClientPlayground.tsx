"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, Code } from "lucide-react";
import Link from "next/link";

const TW_PAGINATION_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind pagination & breadcrumbs",
    intro:
        "Flex utilities lay out `<ul>` rows; `gap-*` spaces items; borders and `rounded-*` style pills; `bg-{color}-500` highlights the active page. Breadcrumb mode swaps to inline items with SVG chevrons between links.",
    syntax: ['className="flex list-none justify-center gap-2"', 'className="px-4 py-2 rounded border transition-all"'],
    values: [
        { term: "justify-*", desc: "Aligns the control cluster horizontally." },
        { term: "gap-* + padding utilities", desc: "Spacing and hit targets." },
        { term: "hover: / transition-all", desc: "Interactive feedback on links." },
    ],
    tip: "Dynamic class names like `bg-${color}-500` require safelisting in Tailwind JIT—this demo assumes those classes exist in your build.",
};

type PaginationStyle = "basic" | "bordered" | "rounded" | "breadcrumb";
type Size = "sm" | "md" | "lg";
type Alignment = "left" | "center" | "right";
type TailwindColor = "cyan" | "violet" | "pink" | "amber" | "emerald";

export default function PaginationClient() {
    // State
    const [style, setStyle] = useState<PaginationStyle>("basic");
    const [size, setSize] = useState<Size>("md");
    const [alignment, setAlignment] = useState<Alignment>("center");
    const [spaceBetween, setSpaceBetween] = useState(2);
    const [activeColor, setActiveColor] = useState<TailwindColor>("cyan");
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
        setSpaceBetween(2);
        setActiveColor("cyan");
        setHoverEffect(true);
        setTransition(true);
        setActivePage(2);
    };

    // Helper to get classes
    const getContainerClasses = () => {
        const classes = ["flex", "list-none", "p-0", "m-0"];

        // Alignment
        if (alignment === "left") classes.push("justify-start");
        if (alignment === "center") classes.push("justify-center");
        if (alignment === "right") classes.push("justify-end");

        // Spacing
        classes.push(`gap-${spaceBetween}`);

        return classes.join(" ");
    };

    const getLinkClasses = (isActive: boolean, isBreadcrumbItem: boolean = false) => {
        const classes = ["block", "text-white", "no-underline"];

        if (isBreadcrumbItem) {
            classes.push("flex", "items-center");
            if (isActive) {
                classes.push(`text-${activeColor}-400`);
            } else {
                classes.push("text-gray-400");
                if (hoverEffect) classes.push("hover:underline");
            }
            return classes.join(" ");
        }

        // Size
        if (size === "sm") classes.push("px-3 py-1.5 text-sm");
        if (size === "md") classes.push("px-4 py-2 text-base");
        if (size === "lg") classes.push("px-6 py-3 text-lg");

        // Border & Radius
        if (style === "bordered") classes.push("border border-white/20");
        else classes.push("border border-transparent");

        if (style === "rounded") classes.push("rounded-lg");
        else classes.push("rounded");

        // Transition
        if (transition) classes.push("transition-all duration-300");

        // Active State
        if (isActive) {
            classes.push(`bg-${activeColor}-500`, `border-${activeColor}-500`);
        } else {
            // Hover
            if (hoverEffect) {
                classes.push("hover:bg-white/10");
                if (style === "bordered") classes.push("hover:border-white/40");
            }
        }

        return classes.join(" ");
    };

    const generateCode = () => {
        const containerClass = getContainerClasses();
        const linkBaseClass = getLinkClasses(false, style === "breadcrumb").replace(/text-gray-400|hover:underline/g, "").trim(); // cleanse base link class for non-breadcrumb generic

        if (style === "breadcrumb") {
            const activeClass = `text-${activeColor}-400`;
            const inactiveClass = `text-gray-400 ${hoverEffect ? "hover:underline" : ""}`;

            return `<nav aria-label="Breadcrumb">
  <ol className="${containerClass}">
    <li className="flex items-center">
      <a href="#" className="${inactiveClass} hover:text-white transition-colors">Home</a>
      <svg className="w-4 h-4 mx-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </li>
    <li className="flex items-center">
      <a href="#" className="${inactiveClass} hover:text-white transition-colors">Products</a>
      <svg className="w-4 h-4 mx-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </li>
    <li className="flex items-center">
      <span className="${activeClass}" aria-current="page">Current Page</span>
    </li>
  </ol>
</nav>`;
        } else {
            const activeClass = getLinkClasses(true);
            const normalClass = getLinkClasses(false);

            return `<nav aria-label="Pagination">
  <ul className="${containerClass}">
    <li>
      <a href="#" className="${normalClass}">Previous</a>
    </li>
    <li>
      <a href="#" className="${normalClass}">1</a>
    </li>
    <li>
      <a href="#" className="${activeClass}" aria-current="page">2</a>
    </li>
    <li>
      <a href="#" className="${normalClass}">3</a>
    </li>
    <li>
      <a href="#" className="${normalClass}">Next</a>
    </li>
  </ul>
</nav>`;
        }
    };

    const code = generateCode();

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

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
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Pagination
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind pagination in this playground"
                                title={`What is ${TW_PAGINATION_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Customize navigation links with Tailwind utility classes.
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
                                        label="Space Between (gap)"
                                        value={spaceBetween}
                                        onChange={setSpaceBetween}
                                        min={0}
                                        max={8}
                                        unit=""
                                    />
                                )}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Appearance">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Active Color</label>
                                    <div className="flex gap-2">
                                        {[
                                            { name: 'cyan', hex: '#06b6d4' },
                                            { name: 'violet', hex: '#8b5cf6' },
                                            { name: 'pink', hex: '#ec4899' },
                                            { name: 'amber', hex: '#f59e0b' },
                                            { name: 'emerald', hex: '#10b981' }
                                        ].map((c) => (
                                            <button
                                                key={c.name}
                                                onClick={() => setActiveColor(c.name as TailwindColor)}
                                                className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${activeColor === c.name ? 'border-white' : 'border-transparent'
                                                    }`}
                                                style={{ backgroundColor: c.hex }}
                                                title={c.name}
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
                    className="flex-1 min-w-0 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] group">
                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        </div>

                        {/* Pagination Preview */}
                        <div className="relative z-10 w-full px-8 overflow-x-auto custom-scrollbar flex items-center justify-center">
                            {style === 'breadcrumb' ? (
                                <nav aria-label="Breadcrumb">
                                    <ol className={getContainerClasses()}>
                                        <li className="flex items-center shrink-0">
                                            <a href="#" className={`text-gray-400 hover:text-white transition-colors ${size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"}`}>Home</a>
                                            <svg className="w-4 h-4 mx-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </li>
                                        <li className="flex items-center shrink-0">
                                            <a href="#" className={`text-gray-400 hover:text-white transition-colors ${size === "sm" ? "text-sm" : size === "md" ? "text-base" : "text-lg"}`}>Products</a>
                                            <svg className="w-4 h-4 mx-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </li>
                                        <li className="flex items-center shrink-0">
                                            <span className={getLinkClasses(true, true)} aria-current="page">Current Page</span>
                                        </li>
                                    </ol>
                                </nav>
                            ) : (
                                <nav aria-label="Pagination">
                                    <ul className={getContainerClasses()}>
                                        <li>
                                            <a href="#" className={getLinkClasses(false)}>&laquo;</a>
                                        </li>
                                        {[1, 2, 3, 4, 5].map((page) => (
                                            <li key={page}>
                                                <a
                                                    href="#"
                                                    className={getLinkClasses(activePage === page)}
                                                    onClick={(e) => { e.preventDefault(); setActivePage(page); }}
                                                >
                                                    {page}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <a href="#" className={getLinkClasses(false)}>&raquo;</a>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">JSX / HTML Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-64 custom-scrollbar whitespace-pre">
                            {code}
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal doc={TW_PAGINATION_GUIDE} onClose={closeGuide} titleId="tw-pagination-guide-title" />
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
