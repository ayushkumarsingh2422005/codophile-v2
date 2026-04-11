"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, LayoutGrid, BoxSelect } from "lucide-react";
import Link from "next/link";

const CSS_GRID_GUIDE: PlaygroundGuideDoc = {
    title: "CSS Grid layout",
    intro:
        "Grid defines a two-dimensional track system: `grid-template-columns` and `grid-template-rows` define the matrix, while `gap` and alignment properties distribute space. Items can span tracks with `grid-column` / `grid-row` line placements.",
    syntax: [
        ".grid { display: grid; grid-template-columns; grid-template-rows; gap; }",
        ".item { grid-column-start/end; grid-row-start/end; justify-self; align-self; }",
    ],
    values: [
        { term: "grid-template-columns / rows", desc: "Track sizing with fr, px, repeat(), minmax(), etc." },
        { term: "gap", desc: "Gutters between rows and columns." },
        { term: "justify-items / align-items", desc: "Default alignment of items in their cells." },
        { term: "justify-content / align-content", desc: "Distribution of the grid within the container when extra space exists." },
        { term: "grid-column / grid-row", desc: "Which lines each item spans." },
    ],
    tip: "Use the container vs. items tab to copy the right rule set for your layer.",
};

interface GridItemStyle {
    id: number;
    gridColumnStart: string;
    gridColumnEnd: string;
    gridRowStart: string;
    gridRowEnd: string;
    justifySelf: string;
    alignSelf: string;
    backgroundColor: string;
}

export default function GridClient() {
    const [activeTab, setActiveTab] = useState<"container" | "items">("container");
    const [activeItemId, setActiveItemId] = useState<number>(1);

    // Container State
    const [gridTemplateColumns, setGridTemplateColumns] = useState("repeat(3, 1fr)");
    const [gridTemplateRows, setGridTemplateRows] = useState("repeat(3, 100px)");
    const [gap, setGap] = useState(10);
    const [justifyItems, setJustifyItems] = useState("stretch");
    const [alignItems, setAlignItems] = useState("stretch");
    const [justifyContent, setJustifyContent] = useState("start");
    const [alignContent, setAlignContent] = useState("start");


    // Items State
    const defaultItems: GridItemStyle[] = [
        { id: 1, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#3b82f6" }, // Blue
        { id: 2, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#8b5cf6" }, // Violet
        { id: 3, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#ec4899" }, // Pink
        { id: 4, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#10b981" }, // Emerald
        { id: 5, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#f59e0b" }, // Amber
        { id: 6, gridColumnStart: "auto", gridColumnEnd: "auto", gridRowStart: "auto", gridRowEnd: "auto", justifySelf: "auto", alignSelf: "auto", backgroundColor: "#ef4444" }, // Red
    ];

    const [items, setItems] = useState<GridItemStyle[]>(defaultItems);
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const addItem = () => {
        const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
        const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b", "#ef4444", "#06b6d4", "#84cc16"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        const newItem: GridItemStyle = {
            id: newId,
            gridColumnStart: "auto",
            gridColumnEnd: "auto",
            gridRowStart: "auto",
            gridRowEnd: "auto",
            justifySelf: "auto",
            alignSelf: "auto",
            backgroundColor: randomColor
        };

        setItems([...items, newItem]);
        setActiveItemId(newId);
    };

    const removeItem = () => {
        if (items.length === 0) return;

        // Remove the active item if possible, otherwise remove the last one
        const itemToRemoveId = activeItemId;
        const newItems = items.filter(i => i.id !== itemToRemoveId);

        setItems(newItems);

        // Update active item ID
        if (newItems.length > 0) {
            // If we removed the active item, set active to the last available item or the one before it
            if (activeItemId === itemToRemoveId) {
                setActiveItemId(newItems[newItems.length - 1].id);
            }
        } else {
            // No items left
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
        setGridTemplateColumns("repeat(3, 1fr)");
        setGridTemplateRows("repeat(3, 100px)");
        setGap(10);
        setJustifyItems("stretch");
        setAlignItems("stretch");
        setJustifyContent("start");
        setAlignContent("start");
        setItems(defaultItems);
        setActiveItemId(1);
    };

    // Construct CSS strings
    const containerCSS = `display: grid;
    grid-template-columns: ${gridTemplateColumns};
    grid-template-rows: ${gridTemplateRows};
    gap: ${gap}px;
    justify-items: ${justifyItems};
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    align-content: ${alignContent};`;

    const itemCSS = `.item-${activeItemId} {
    grid-column-start: ${activeItem.gridColumnStart};
    grid-column-end: ${activeItem.gridColumnEnd};
    grid-row-start: ${activeItem.gridRowStart};
    grid-row-end: ${activeItem.gridRowEnd};
    justify-self: ${activeItem.justifySelf};
    align-self: ${activeItem.alignSelf};
}`;

    const handleCopy = () => {
        const code = activeTab === "container"
            ? `.container {\n    ${containerCSS}\n}`
            : itemCSS;
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
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                CSS Grid Layout
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS Grid in this playground"
                                title={`What is ${CSS_GRID_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Master grid layouts by controlling grid templates, gaps, and item placement.
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
                                    <TextInputControl
                                        label="Columns"
                                        value={gridTemplateColumns}
                                        onChange={setGridTemplateColumns}
                                        placeholder="e.g. 1fr 1fr 1fr"
                                    />
                                    <div className="flex gap-2 flex-wrap">
                                        {['repeat(3, 1fr)', '1fr 2fr 1fr', 'repeat(auto-fit, minmax(100px, 1fr))', '100px 100px'].map(v => (
                                            <button key={v} onClick={() => setGridTemplateColumns(v)} className="text-[10px] text-gray-500 hover:text-white bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:border-white/20 transition-colors">{v}</button>
                                        ))}
                                    </div>

                                    <TextInputControl
                                        label="Rows"
                                        value={gridTemplateRows}
                                        onChange={setGridTemplateRows}
                                        placeholder="e.g. 100px 100px"
                                    />
                                    <div className="flex gap-2 flex-wrap">
                                        {['repeat(3, 100px)', 'auto auto', '100px 200px'].map(v => (
                                            <button key={v} onClick={() => setGridTemplateRows(v)} className="text-[10px] text-gray-500 hover:text-white bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:border-white/20 transition-colors">{v}</button>
                                        ))}
                                    </div>
                                    <SliderControl label="Gap" value={gap} onChange={setGap} min={0} max={50} unit="px" />
                                </ControlGroup>

                                <ControlGroup title="Items Alignment (Inside Grid Area)">
                                    <SelectControl
                                        label="Justify Items (Horizontal)"
                                        value={justifyItems}
                                        onChange={setJustifyItems}
                                        options={['start', 'end', 'center', 'stretch']}
                                    />
                                    <SelectControl
                                        label="Align Items (Vertical)"
                                        value={alignItems}
                                        onChange={setAlignItems}
                                        options={['start', 'end', 'center', 'stretch']}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Content Alignment (Whole Grid)">
                                    <SelectControl
                                        label="Justify Content (Horizontal)"
                                        value={justifyContent}
                                        onChange={setJustifyContent}
                                        options={['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']}
                                    />
                                    <SelectControl
                                        label="Align Content (Vertical)"
                                        value={alignContent}
                                        onChange={setAlignContent}
                                        options={['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly']}
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
                                            className={`py-2 rounded-lg text-sm font-bold transition-all border ${activeItemId === item.id
                                                ? "ring-2 ring-white scale-105 border-transparent"
                                                : "opacity-60 hover:opacity-100 border-white/10"
                                                }`}
                                            style={{ backgroundColor: item.backgroundColor, color: 'white' }}
                                        >
                                            {item.id}
                                        </button>
                                    ))}
                                </div>

                                <ControlGroup title={`Item ${activeItemId} Placement`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextInputControl label="Col Start" value={activeItem.gridColumnStart} onChange={(v: string) => updateItem("gridColumnStart", v)} />
                                        <TextInputControl label="Col End" value={activeItem.gridColumnEnd} onChange={(v: string) => updateItem("gridColumnEnd", v)} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <TextInputControl label="Row Start" value={activeItem.gridRowStart} onChange={(v: string) => updateItem("gridRowStart", v)} />
                                        <TextInputControl label="Row End" value={activeItem.gridRowEnd} onChange={(v: string) => updateItem("gridRowEnd", v)} />
                                    </div>
                                    <div className="flex gap-2 mt-2 flex-wrap">
                                        {['auto', 'span 2', '1', '-1'].map(v => (
                                            <button key={v} onClick={() => { updateItem("gridColumnStart", v); }} className="text-[10px] text-gray-500 hover:text-white bg-white/5 px-2 py-0.5 rounded border border-white/5 hover:border-white/20 transition-colors">Col: {v}</button>
                                        ))}
                                    </div>
                                </ControlGroup>

                                <ControlGroup title={`Item ${activeItemId} Alignment`}>
                                    <SelectControl
                                        label="Justify Self"
                                        value={activeItem.justifySelf}
                                        onChange={(v: string) => updateItem("justifySelf", v)}
                                        options={['auto', 'start', 'end', 'center', 'stretch']}
                                    />
                                    <SelectControl
                                        label="Align Self"
                                        value={activeItem.alignSelf}
                                        onChange={(v: string) => updateItem("alignSelf", v)}
                                        options={['auto', 'start', 'end', 'center', 'stretch']}
                                    />
                                </ControlGroup>
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
                    className="flex-1 flex flex-col gap-6"
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
                            className="flex-1 p-8 overflow-auto custom-scrollbar pt-16"
                            style={{
                                display: "grid",
                                gridTemplateColumns: gridTemplateColumns,
                                gridTemplateRows: gridTemplateRows,
                                gap: `${gap}px`,
                                justifyItems: justifyItems,
                                alignItems: alignItems,
                                justifyContent: justifyContent,
                                alignContent: alignContent,
                            }}
                        >
                            {items.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    onClick={() => { setActiveTab("items"); setActiveItemId(item.id); }}
                                    className={`
                                        relative rounded-lg flex items-center justify-center p-4 cursor-pointer transition-all border-2
                                        ${activeItemId === item.id && activeTab === "items" ? "border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] z-10" : "border-transparent border-white/5 hover:border-white/20"}
                                    `}
                                    style={{
                                        backgroundColor: item.backgroundColor,
                                        gridColumnStart: item.gridColumnStart,
                                        gridColumnEnd: item.gridColumnEnd,
                                        gridRowStart: item.gridRowStart,
                                        gridRowEnd: item.gridRowEnd,
                                        justifySelf: item.justifySelf,
                                        alignSelf: item.alignSelf,
                                        minHeight: "60px",
                                    }}
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
                                {activeTab === "container" ? "Container CSS" : `Item ${activeItemId} CSS`}
                            </span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-40 overflow-y-auto custom-scrollbar whitespace-pre">
                            {activeTab === "container" ? (
                                <div>
                                    <div className="text-purple-400">.container <span className="text-white">{`{`}</span></div>
                                    <div className="pl-4 text-orange-300">display: <span className="text-cyan-300">grid</span>;</div>
                                    <div className="pl-4 text-orange-300">grid-template-columns: <span className="text-cyan-300">{gridTemplateColumns}</span>;</div>
                                    <div className="pl-4 text-orange-300">grid-template-rows: <span className="text-cyan-300">{gridTemplateRows}</span>;</div>
                                    <div className="pl-4 text-orange-300">gap: <span className="text-cyan-300">{gap}px</span>;</div>
                                    <div className="pl-4 text-orange-300">justify-items: <span className="text-cyan-300">{justifyItems}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-items: <span className="text-cyan-300">{alignItems}</span>;</div>
                                    <div className="pl-4 text-orange-300">justify-content: <span className="text-cyan-300">{justifyContent}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-content: <span className="text-cyan-300">{alignContent}</span>;</div>
                                    <div className="text-white">{`}`}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-purple-400">.item-{activeItemId} <span className="text-white">{`{`}</span></div>
                                    <div className="pl-4 text-orange-300">grid-column-start: <span className="text-cyan-300">{activeItem.gridColumnStart}</span>;</div>
                                    <div className="pl-4 text-orange-300">grid-column-end: <span className="text-cyan-300">{activeItem.gridColumnEnd}</span>;</div>
                                    <div className="pl-4 text-orange-300">grid-row-start: <span className="text-cyan-300">{activeItem.gridRowStart}</span>;</div>
                                    <div className="pl-4 text-orange-300">grid-row-end: <span className="text-cyan-300">{activeItem.gridRowEnd}</span>;</div>
                                    <div className="pl-4 text-orange-300">justify-self: <span className="text-cyan-300">{activeItem.justifySelf}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-self: <span className="text-cyan-300">{activeItem.alignSelf}</span>;</div>
                                    <div className="text-white">{`}`}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div >

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={CSS_GRID_GUIDE}
                    onClose={closeGuide}
                    titleId="css-grid-guide-title"
                />
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

function SliderControl({ label, value, onChange, min, max, step = 1, unit = "" }: any) {
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
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
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

function TextInputControl({ label, value, onChange, placeholder }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
            </div>
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50"
            />
        </div>
    );
}
