"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, LayoutGrid, BoxSelect } from "lucide-react";
import Link from "next/link";

const TW_GRID_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind Grid utilities",
    intro:
        "`grid`, `grid-cols-*`, `grid-rows-*`, and `gap-*` define the track layout; alignment utilities (`justify-items`, `items-*`, `justify-*`, `content-*`) distribute space. Item utilities (`col-span-*`, `row-span-*`, `col-start-*`, etc.) place cells—mirroring CSS Grid with shorter class names.",
    syntax: ['className="grid grid-cols-3 grid-rows-3 gap-4 justify-items-center items-stretch"'],
    values: [
        { term: "grid-cols-* / grid-rows-*", desc: "Template tracks using the spacing scale or arbitrary values." },
        { term: "gap-*", desc: "Row and column gutters." },
        { term: "col-span / row-span / line placement", desc: "How far each item stretches across tracks." },
    ],
    tip: "Use the container vs. items tab here to copy the right class string for your layer.",
};

interface GridItemStyle {
    id: number;
    colStart: string;
    colSpan: string;
    rowStart: string;
    rowSpan: string;
    justifySelf: string;
    alignSelf: string;
    backgroundColor: string;
}

export function GridClient() {
    const [activeTab, setActiveTab] = useState<"container" | "items">("container");
    const [activeItemId, setActiveItemId] = useState<number>(1);

    // Container State
    const [gridCols, setGridCols] = useState("grid-cols-3");
    const [gridRows, setGridRows] = useState("grid-rows-3");
    const [gap, setGap] = useState("gap-4");
    const [justifyItems, setJustifyItems] = useState("justify-items-stretch");
    const [alignItems, setAlignItems] = useState("items-stretch");
    const [justifyContent, setJustifyContent] = useState("justify-start");
    const [alignContent, setAlignContent] = useState("content-start");


    // Items State
    const defaultItems: GridItemStyle[] = [
        { id: 1, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-blue-500" },
        { id: 2, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-violet-500" },
        { id: 3, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-pink-500" },
        { id: 4, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-emerald-500" },
        { id: 5, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-amber-500" },
        { id: 6, colStart: "col-auto", colSpan: "col-auto", rowStart: "row-auto", rowSpan: "row-auto", justifySelf: "justify-self-auto", alignSelf: "self-auto", backgroundColor: "bg-red-500" },
    ];

    const [items, setItems] = useState<GridItemStyle[]>(defaultItems);
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const colors = ["bg-blue-500", "bg-violet-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-red-500", "bg-cyan-500", "bg-lime-500"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newItem: GridItemStyle = {
            id: newId,
            colStart: "col-start-auto",
            colSpan: "col-auto",
            rowStart: "row-start-auto",
            rowSpan: "row-auto",
            justifySelf: "justify-self-auto",
            alignSelf: "self-auto",
            backgroundColor: randomColor
        };

        setItems([...items, newItem]);
        setActiveItemId(newId);
    };

    const removeItem = () => {
        if (items.length === 0) return;

        const itemToRemoveId = activeItemId;
        const newItems = items.filter(i => i.id !== itemToRemoveId);

        setItems(newItems);

        if (newItems.length > 0) {
            if (activeItemId === itemToRemoveId) {
                setActiveItemId(newItems[newItems.length - 1].id);
            }
        } else {
            setActiveItemId(0);
        }
    };

    // Get active item
    const activeItem = items.find(i => i.id === activeItemId) || items[0];

    // Update Item Function
    const updateItem = (key: keyof GridItemStyle, value: any) => {
        setItems(items.map(item =>
            item.id === activeItemId ? { ...item, [key]: value } : item
        ));
    };

    // Reset All
    const resetValues = () => {
        setGridCols("grid-cols-3");
        setGridRows("grid-rows-3");
        setGap("gap-4");
        setJustifyItems("justify-items-stretch");
        setAlignItems("items-stretch");
        setJustifyContent("justify-start");
        setAlignContent("content-start");
        setItems(defaultItems);
        setActiveItemId(1);
    };

    // Construct Class strings
    const containerClasses = `grid ${gridCols} ${gridRows} ${gap} ${justifyItems} ${alignItems} ${justifyContent} ${alignContent} w-full h-full min-h-[300px] p-4 overflow-auto border border-white/10 rounded-lg`;

    // Active item classes for display
    const itemClasses = activeItem ? `${activeItem.colStart} ${activeItem.colSpan} ${activeItem.rowStart} ${activeItem.rowSpan} ${activeItem.justifySelf} ${activeItem.alignSelf}` : "";

    const handleCopy = () => {
        const code = activeTab === "container"
            ? `<div className="${containerClasses}">\n  {/* items... */}\n</div>`
            : `<div className="${itemClasses} ...">\n  {/* content */}\n</div>`;
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
                    className="w-full lg:w-96 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Tailwind Grid Layout
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind Grid utilities in this playground"
                                title={`What is ${TW_GRID_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Master grid layouts using Tailwind utility classes.
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveTab("container")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === "container"
                                ? "bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/20"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <LayoutGrid className="w-4 h-4" /> Container
                        </button>
                        <button
                            onClick={() => setActiveTab("items")}
                            className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === "items"
                                ? "bg-purple-500/20 text-purple-400 shadow-sm border border-purple-500/20"
                                : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <BoxSelect className="w-4 h-4" /> Items
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[500px] lg:max-h-[calc(100vh-320px)]">

                        {activeTab === "container" ? (
                            <>
                                <ControlGroup title="Grid Template">
                                    <SelectControl
                                        label="Grid Cols"
                                        value={gridCols}
                                        onChange={setGridCols}
                                        options={['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4', 'grid-cols-5', 'grid-cols-6', 'grid-cols-12', 'grid-cols-none']}
                                    />
                                    <SelectControl
                                        label="Grid Rows"
                                        value={gridRows}
                                        onChange={setGridRows}
                                        options={['grid-rows-1', 'grid-rows-2', 'grid-rows-3', 'grid-rows-4', 'grid-rows-5', 'grid-rows-6', 'grid-rows-none']}
                                    />
                                    <SelectControl
                                        label="Gap"
                                        value={gap}
                                        onChange={setGap}
                                        options={['gap-0', 'gap-1', 'gap-2', 'gap-4', 'gap-8', 'gap-12']}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Items Alignment">
                                    <SelectControl
                                        label="Justify Items"
                                        value={justifyItems}
                                        onChange={setJustifyItems}
                                        options={['justify-items-start', 'justify-items-end', 'justify-items-center', 'justify-items-stretch']}
                                    />
                                    <SelectControl
                                        label="Align Items"
                                        value={alignItems}
                                        onChange={setAlignItems}
                                        options={['items-start', 'items-end', 'items-center', 'items-stretch']}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Content Alignment">
                                    <SelectControl
                                        label="Justify Content"
                                        value={justifyContent}
                                        onChange={setJustifyContent}
                                        options={['justify-start', 'justify-end', 'justify-center', 'justify-between', 'justify-around', 'justify-evenly']}
                                    />
                                    <SelectControl
                                        label="Align Content"
                                        value={alignContent}
                                        onChange={setAlignContent}
                                        options={['content-start', 'content-end', 'content-center', 'content-between', 'content-around', 'content-evenly']}
                                    />
                                </ControlGroup>
                            </>
                        ) : (
                            <>
                                {/* Item Selector */}
                                <div className="grid grid-cols-4 gap-2 mb-4">
                                    {items.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveItemId(item.id)}
                                            // Extract color class for style preview if possible or just use inline style for button bg
                                            // Since item.backgroundColor is a class string like 'bg-blue-500', we can apply it directly to className
                                            className={`${item.backgroundColor} py-2 rounded-lg text-sm font-bold transition-all border ${activeItemId === item.id
                                                ? "ring-2 ring-white scale-105 border-transparent"
                                                : "opacity-60 hover:opacity-100 border-white/10"
                                                }`}
                                        >
                                            {item.id}
                                        </button>
                                    ))}
                                </div>

                                {activeItem ? (
                                    <>
                                        <ControlGroup title={`Item ${activeItemId} Placement`}>
                                            <div className="grid grid-cols-2 gap-4">
                                                <SelectControl label="Col Start" value={activeItem.colStart} onChange={(v: string) => updateItem("colStart", v)}
                                                    options={['col-auto', 'col-start-1', 'col-start-2', 'col-start-3', 'col-start-4']} />
                                                <SelectControl label="Col Span" value={activeItem.colSpan} onChange={(v: string) => updateItem("colSpan", v)}
                                                    options={['col-auto', 'col-span-1', 'col-span-2', 'col-span-3', 'col-span-full']} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <SelectControl label="Row Start" value={activeItem.rowStart} onChange={(v: string) => updateItem("rowStart", v)}
                                                    options={['row-auto', 'row-start-1', 'row-start-2', 'row-start-3']} />
                                                <SelectControl label="Row Span" value={activeItem.rowSpan} onChange={(v: string) => updateItem("rowSpan", v)}
                                                    options={['row-auto', 'row-span-1', 'row-span-2', 'row-span-full']} />
                                            </div>
                                        </ControlGroup>

                                        <ControlGroup title={`Item ${activeItemId} Alignment`}>
                                            <SelectControl
                                                label="Justify Self"
                                                value={activeItem.justifySelf}
                                                onChange={(v: string) => updateItem("justifySelf", v)}
                                                options={['justify-self-auto', 'justify-self-start', 'justify-self-end', 'justify-self-center', 'justify-self-stretch']}
                                            />
                                            <SelectControl
                                                label="Align Self"
                                                value={activeItem.alignSelf}
                                                onChange={(v: string) => updateItem("alignSelf", v)}
                                                options={['self-auto', 'self-start', 'self-end', 'self-center', 'self-stretch']}
                                            />
                                        </ControlGroup>
                                    </>
                                ) : (
                                    <div className="p-4 text-center text-gray-400 bg-white/5 rounded-lg">
                                        No item selected. Add an item or select one to edit.
                                    </div>
                                )}
                            </>
                        )}


                        {/* Add/Remove Items Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={addItem}
                                className="flex-1 py-2 bg-green-500/20 text-green-400 border border-green-500/20 rounded-lg text-sm hover:bg-green-500/30 transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="text-lg font-bold">+</span> Add Box
                            </button>
                            <button
                                onClick={removeItem}
                                disabled={items.length === 0}
                                className="flex-1 py-2 bg-red-500/20 text-red-400 border border-red-500/20 rounded-lg text-sm hover:bg-red-500/30 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span className="text-lg font-bold">-</span> Remove Box
                            </button>
                        </div>
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
                    className="flex-1 flex flex-col gap-6 min-w-0"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col bg-[#1a1a1a]">
                        <div className="absolute top-0 left-0 right-0 p-3 bg-white/5 border-b border-white/5 flex justify-between items-center z-10">
                            <span className="text-xs font-mono text-gray-400">Grid Container Preview</span>
                            <div className="text-[10px] text-gray-500">
                                {items.length} Items
                            </div>
                        </div>

                        {/* The Actual Grid Container */}
                        <div
                            className={`${containerClasses} pt-16`}
                        >
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    onClick={() => { setActiveTab("items"); setActiveItemId(item.id); }}
                                    className={`
                                        relative rounded-lg flex items-center justify-center p-4 cursor-pointer transition-all border-2
                                        ${item.backgroundColor} 
                                        ${item.colStart} ${item.colSpan} ${item.rowStart} ${item.rowSpan}
                                        ${item.justifySelf} ${item.alignSelf}
                                        ${activeItemId === item.id && activeTab === "items" ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10" : "border-transparent border-white/5 hover:border-white/20"}
                                        min-h-[64px]
                                    `}
                                >
                                    <span className="text-white font-bold drop-shadow-md">{item.id}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">
                                {activeTab === "container" ? "Container Classes" : `Item ${activeItemId} Classes`}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-40 overflow-y-auto custom-scrollbar whitespace-pre">
                            {activeTab === "container" ? (
                                <div className="text-cyan-300">{containerClasses}</div>
                            ) : (
                                <div className="text-purple-300">{itemClasses}</div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div >

            {guideOpen && (
                <PlaygroundGuideModal doc={TW_GRID_GUIDE} onClose={closeGuide} titleId="tw-grid-guide-title" />
            )}

            <Footer />
        </div >
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

function SelectControl({ label, value, onChange, options, note }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label} {note && <span className="text-gray-500 text-[10px]">{note}</span>}</label>
            </div>
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
