"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function TablePlaygroundClient() {
    // State
    const [layout, setLayout] = useState("table-auto");
    const [borderCollapse, setBorderCollapse] = useState("border-collapse");
    const [borderSpacing, setBorderSpacing] = useState("border-spacing-2");
    const [borderWidth, setBorderWidth] = useState("border");
    const [borderColor, setBorderColor] = useState("border-gray-600");
    const [padding, setPadding] = useState("p-4");
    const [textAlign, setTextAlign] = useState("text-left");
    const [verticalAlign, setVerticalAlign] = useState("align-middle");
    const [isStriped, setIsStriped] = useState(false);
    const [isHoverable, setIsHoverable] = useState(false);

    // Width can be complicated in Tailwind without arbitrary values, keeping it simple
    const [width, setWidth] = useState("w-full");

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setLayout("table-auto");
        setBorderCollapse("border-collapse");
        setBorderSpacing("border-spacing-2");
        setBorderWidth("border");
        setBorderColor("border-gray-600");
        setPadding("p-4");
        setTextAlign("text-left");
        setVerticalAlign("align-middle");
        setIsStriped(false);
        setIsHoverable(false);
        setWidth("w-full");
    };

    const generateCode = () => {
        const tableClasses = [
            width,
            layout,
            borderCollapse,
            borderCollapse === 'border-separate' ? borderSpacing : '',
            'text-sm',
            'text-left',
            'rtl:text-right',
            'text-gray-500',
            'dark:text-gray-400'
        ].filter(Boolean).join(" ");

        const headClasses = "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400";

        // Row classes
        let rowClasses = "bg-white border-b dark:bg-gray-800 dark:border-gray-700";
        if (isStriped) rowClasses += " odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800";
        if (isHoverable) rowClasses += " hover:bg-gray-50 dark:hover:bg-gray-600";

        // Cell classes
        const cellClasses = [
            padding,
            borderWidth,
            borderColor,
            textAlign,
            verticalAlign
        ].filter(Boolean).join(" ");

        return `
<div class="relative overflow-x-auto">
    <table class="${tableClasses}">
        <thead class="${headClasses}">
            <tr>
                <th scope="col" class="${cellClasses} font-bold">Product name</th>
                <th scope="col" class="${cellClasses} font-bold">Color</th>
                <th scope="col" class="${cellClasses} font-bold">Category</th>
                <th scope="col" class="${cellClasses} font-bold">Price</th>
            </tr>
        </thead>
        <tbody>
            <tr class="${rowClasses}">
                <td class="${cellClasses} font-medium text-gray-900 dark:text-white">Apple MacBook Pro 17"</td>
                <td class="${cellClasses}">Silver</td>
                <td class="${cellClasses}">Laptop</td>
                <td class="${cellClasses}">$2999</td>
            </tr>
            <tr class="${rowClasses}">
                <td class="${cellClasses} font-medium text-gray-900 dark:text-white">Microsoft Surface Pro</td>
                <td class="${cellClasses}">White</td>
                <td class="${cellClasses}">Laptop PC</td>
                <td class="${cellClasses}">$1999</td>
            </tr>
            <tr class="${rowClasses}">
                <td class="${cellClasses} font-medium text-gray-900 dark:text-white">Magic Mouse 2</td>
                <td class="${cellClasses}">Black</td>
                <td class="${cellClasses}">Accessories</td>
                <td class="${cellClasses}">$99</td>
            </tr>
        </tbody>
    </table>
</div>`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode().trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Data for selects
    const layouts = ["table-auto", "table-fixed"];
    const borderCollapses = ["border-collapse", "border-separate"];
    const borderWidths = ["border-0", "border", "border-2", "border-4", "border-8"];
    // Tailwind colors - simplified set
    const borderColors = [
        { label: "Gray", value: "border-gray-600" },
        { label: "Blue", value: "border-blue-500" },
        { label: "Red", value: "border-red-500" },
        { label: "Green", value: "border-green-500" },
        { label: "None", value: "border-transparent" },
    ];
    const paddings = ["p-1", "p-2", "p-4", "p-6", "p-8", "px-6 py-3", "px-6 py-4"];
    const textAlignments = ["text-left", "text-center", "text-right", "text-justify"];
    const verticalAlignments = ["align-baseline", "align-top", "align-middle", "align-bottom"];
    const spacingValues = ["border-spacing-0", "border-spacing-1", "border-spacing-2", "border-spacing-4", "border-spacing-8"];

    // Mock Row Data for rendering
    const rows = [
        { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
        { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
        { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
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
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-teal-400">
                            Table Utilities
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Control table layouts, borders, and spacing with Tailwind classes.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Layout">
                            <SelectControl label="Table Layout" value={layout} onChange={setLayout} options={layouts} />
                            <SelectControl label="Collapse" value={borderCollapse} onChange={setBorderCollapse} options={borderCollapses} />

                            {borderCollapse === 'border-separate' && (
                                <SelectControl label="Border Spacing" value={borderSpacing} onChange={setBorderSpacing} options={spacingValues} />
                            )}

                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-300">Width Full</label>
                                <button
                                    onClick={() => setWidth(width === "w-full" ? "w-auto" : "w-full")}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${width === "w-full" ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${width === "w-full" ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Borders & Spacing">
                            <SelectControl label="Border Width" value={borderWidth} onChange={setBorderWidth} options={borderWidths} />

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Border Color</label>
                                <select
                                    value={borderColor}
                                    onChange={(e) => setBorderColor(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    {borderColors.map(opt => (
                                        <option key={opt.value} value={opt.value} className="bg-gray-900 text-white">
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <SelectControl label="Padding" value={padding} onChange={setPadding} options={paddings} />
                        </ControlGroup>

                        <ControlGroup title="Alignment">
                            <SelectControl label="Text Align" value={textAlign} onChange={setTextAlign} options={textAlignments} />
                            <SelectControl label="Vertical Align" value={verticalAlign} onChange={setVerticalAlign} options={verticalAlignments} />
                        </ControlGroup>

                        <ControlGroup title="Effects">
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-300">Zebra Striped</label>
                                <button
                                    onClick={() => setIsStriped(!isStriped)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isStriped ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isStriped ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-300">Hover Effect</label>
                                <button
                                    onClick={() => setIsHoverable(!isHoverable)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isHoverable ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isHoverable ? 'left-6' : 'left-1'}`} />
                                </button>
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center bg-[#111] p-8">
                        {/* Background Grid */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Table Container with Overflow Protection */}
                        <div className="relative z-10 w-full max-w-full overflow-x-auto rounded-lg shadow-xl">
                            <table className={`
                                ${width} ${layout} ${borderCollapse} 
                                ${borderCollapse === 'border-separate' ? borderSpacing : ''}
                                text-sm text-center text-gray-400
                            `}>
                                <thead className="text-xs text-white uppercase bg-gray-800">
                                    <tr>
                                        {['Product name', 'Color', 'Category', 'Price'].map((h, i) => (
                                            <th key={i} scope="col" className={`${padding} ${borderWidth} ${borderColor} ${textAlign} ${verticalAlign} font-bold`}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows.map((row, idx) => (
                                        <tr key={idx} className={`
                                            bg-gray-900 border-b border-gray-700
                                            ${isStriped ? 'odd:bg-gray-900 even:bg-gray-800' : ''}
                                            ${isHoverable ? 'hover:bg-gray-700' : ''}
                                        `}>
                                            <td className={`${padding} ${borderWidth} ${borderColor} ${textAlign} ${verticalAlign} font-medium text-white`}>
                                                {row.name}
                                            </td>
                                            <td className={`${padding} ${borderWidth} ${borderColor} ${textAlign} ${verticalAlign}`}>
                                                {row.color}
                                            </td>
                                            <td className={`${padding} ${borderWidth} ${borderColor} ${textAlign} ${verticalAlign}`}>
                                                {row.category}
                                            </td>
                                            <td className={`${padding} ${borderWidth} ${borderColor} ${textAlign} ${verticalAlign}`}>
                                                {row.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">HTML Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-60 overflow-y-auto custom-scrollbar">
                            <pre className="whitespace-pre-wrap break-all">{generateCode().trim()}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>

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

function SelectControl({ label, value, onChange, options }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-gray-900 text-white">
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
