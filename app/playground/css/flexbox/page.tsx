"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, LayoutGrid, BoxSelect } from "lucide-react";
import Link from "next/link";

interface FlexItemStyle {
    id: number;
    flexGrow: number;
    flexShrink: number;
    flexBasis: string;
    alignSelf: string;
    order: number;
    backgroundColor: string;
    width?: string;
    height?: string;
    fontSize?: string;
}

export default function FlexboxPlayground() {
    const [activeTab, setActiveTab] = useState<"container" | "items">("container");
    const [activeItemId, setActiveItemId] = useState<number>(1);

    // Container State
    const [flexDirection, setFlexDirection] = useState("row");
    const [flexWrap, setFlexWrap] = useState("nowrap");
    const [justifyContent, setJustifyContent] = useState("flex-start");
    const [alignItems, setAlignItems] = useState("stretch");
    const [alignContent, setAlignContent] = useState("stretch");
    const [gap, setGap] = useState(10);

    // Items State
    const defaultItems: FlexItemStyle[] = [
        { id: 1, flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, backgroundColor: "#3b82f6", height: "100px", fontSize: "1.2rem" }, // Blue
        { id: 2, flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, backgroundColor: "#8b5cf6", height: "90px", fontSize: "1.5rem" },  // Violet
        { id: 3, flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, backgroundColor: "#ec4899", height: "120px", fontSize: "1rem" },  // Pink
        { id: 4, flexGrow: 0, flexShrink: 1, flexBasis: "auto", alignSelf: "auto", order: 0, backgroundColor: "#10b981", height: "150px", fontSize: "1.8rem" },  // Emerald
    ];

    const [items, setItems] = useState<FlexItemStyle[]>(defaultItems);
    const [copied, setCopied] = useState(false);

    // Get active item
    const activeItem = items.find(i => i.id === activeItemId) || items[0];

    // Update Item Function
    const updateItem = (key: keyof FlexItemStyle, value: any) => {
        setItems(items.map(item =>
            item.id === activeItemId ? { ...item, [key]: value } : item
        ));
    };

    // Reset All
    const resetValues = () => {
        setFlexDirection("row");
        setFlexWrap("nowrap");
        setJustifyContent("flex-start");
        setAlignItems("stretch");
        setAlignContent("stretch");
        setGap(10);
        setItems(defaultItems);
        setActiveItemId(1);
    };

    // Construct CSS strings
    const containerCSS = `display: flex;
    flex-direction: ${flexDirection};
    flex-wrap: ${flexWrap};
    justify-content: ${justifyContent};
    align-items: ${alignItems};
    align-content: ${alignContent};
    gap: ${gap}px;`;

    const itemCSS = `.item-${activeItemId} {
    flex-grow: ${activeItem.flexGrow};
    flex-shrink: ${activeItem.flexShrink};
    flex-basis: ${activeItem.flexBasis};
    align-self: ${activeItem.alignSelf};
    order: ${activeItem.order};
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Flexbox Layout
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Master flexible layouts by controlling container and item properties.
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
                                <ControlGroup title="Flow & Spacing">
                                    <SelectControl
                                        label="Direction"
                                        value={flexDirection}
                                        onChange={setFlexDirection}
                                        options={['row', 'row-reverse', 'column', 'column-reverse']}
                                    />
                                    <SelectControl
                                        label="Wrap"
                                        value={flexWrap}
                                        onChange={setFlexWrap}
                                        options={['nowrap', 'wrap', 'wrap-reverse']}
                                    />
                                    <SliderControl label="Gap" value={gap} onChange={setGap} min={0} max={50} unit="px" />
                                </ControlGroup>

                                <ControlGroup title="Alignment (Main Axis)">
                                    <SelectControl
                                        label="Justify Content"
                                        value={justifyContent}
                                        onChange={setJustifyContent}
                                        options={['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Alignment (Cross Axis)">
                                    <SelectControl
                                        label="Align Items"
                                        value={alignItems}
                                        onChange={setAlignItems}
                                        options={['stretch', 'flex-start', 'flex-end', 'center', 'baseline']}
                                    />
                                    <SelectControl
                                        label="Align Content"
                                        value={alignContent}
                                        onChange={setAlignContent}
                                        options={['stretch', 'flex-start', 'flex-end', 'center', 'space-between', 'space-around']}
                                        note="(Multi-line only)"
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

                                <ControlGroup title={`Item ${activeItemId} Sizing`}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <NumberControl label="Grow" value={activeItem.flexGrow} onChange={(v: number) => updateItem("flexGrow", v)} min={0} max={10} />
                                        <NumberControl label="Shrink" value={activeItem.flexShrink} onChange={(v: number) => updateItem("flexShrink", v)} min={0} max={10} />
                                    </div>
                                    <div className="pt-2">
                                        <label className="text-xs text-gray-300 mb-1 block">Flex Basis</label>
                                        <input
                                            type="text"
                                            value={activeItem.flexBasis}
                                            onChange={(e) => updateItem("flexBasis", e.target.value)}
                                            className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-purple-500/50"
                                        />
                                        <div className="flex gap-2 mt-1">
                                            {['auto', '0', '50%', '100%'].map(v => (
                                                <button key={v} onClick={() => updateItem("flexBasis", v)} className="text-[10px] text-gray-500 hover:text-white bg-white/5 px-2 py-0.5 rounded">{v}</button>
                                            ))}
                                        </div>
                                    </div>
                                </ControlGroup>

                                <ControlGroup title={`Item ${activeItemId} Position`}>
                                    <NumberControl label="Order" value={activeItem.order} onChange={(v: number) => updateItem("order", v)} min={-10} max={10} />
                                    <div className="pt-2">
                                        <SelectControl
                                            label="Align Self"
                                            value={activeItem.alignSelf}
                                            onChange={(v: string) => updateItem("alignSelf", v)}
                                            options={['auto', 'flex-start', 'flex-end', 'center', 'stretch', 'baseline']}
                                        />
                                    </div>
                                </ControlGroup>
                            </>
                        )}
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
                            <span className="text-xs font-mono text-gray-400">Flex Container Preview</span>
                            <div className="text-[10px] text-gray-500">
                                {items.length} Items
                            </div>
                        </div>

                        {/* The Actual Flex Container */}
                        <div
                            className="flex-1 p-8 overflow-auto custom-scrollbar pt-16"
                            style={{
                                display: "flex",
                                flexDirection: flexDirection as any,
                                flexWrap: flexWrap as any,
                                justifyContent: justifyContent,
                                alignItems: alignItems,
                                alignContent: alignContent,
                                gap: `${gap}px`
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
                                        flexGrow: item.flexGrow,
                                        flexShrink: item.flexShrink,
                                        flexBasis: item.flexBasis,
                                        alignSelf: item.alignSelf,
                                        order: item.order,
                                        height: alignItems === 'stretch' && item.alignSelf !== 'flex-start' && item.alignSelf !== 'center' && item.alignSelf !== 'flex-end' ? 'auto' : item.height,
                                        // Simple logic to demonstrate stretch vs fixed height. 
                                        // Real stretch needs height:auto or min-height. 
                                        // Legacy used fixed heights. To show 'stretch', we might need to remove fixed height.
                                        // For now, let's respect legacy fixed heights unless 'stretch' is explicitly what we want to demo, 
                                        // but stretch usually overrides height or width depending on direction. 
                                        // I'll keep fixed height for row direction visual clarity as per legacy reference which had fixed heights.
                                        // Actually, if align-items is stretch, having a fixed height prevents stretching in row mode. 
                                        // Let's make height: auto if stretch is active and direction is row?
                                        // Simpler: Just apply the style as is. CSS rules will apply.
                                        fontSize: item.fontSize,
                                        minWidth: "60px", // Ensure visibility
                                        minHeight: "60px"
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
                                    <div className="pl-4 text-orange-300">display: <span className="text-cyan-300">flex</span>;</div>
                                    <div className="pl-4 text-orange-300">flex-direction: <span className="text-cyan-300">{flexDirection}</span>;</div>
                                    <div className="pl-4 text-orange-300">flex-wrap: <span className="text-cyan-300">{flexWrap}</span>;</div>
                                    <div className="pl-4 text-orange-300">justify-content: <span className="text-cyan-300">{justifyContent}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-items: <span className="text-cyan-300">{alignItems}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-content: <span className="text-cyan-300">{alignContent}</span>;</div>
                                    <div className="pl-4 text-orange-300">gap: <span className="text-cyan-300">{gap}px</span>;</div>
                                    <div className="text-white">{`}`}</div>
                                </div>
                            ) : (
                                <div>
                                    <div className="text-purple-400">.item-{activeItemId} <span className="text-white">{`{`}</span></div>
                                    <div className="pl-4 text-orange-300">flex-grow: <span className="text-cyan-300">{activeItem.flexGrow}</span>;</div>
                                    <div className="pl-4 text-orange-300">flex-shrink: <span className="text-cyan-300">{activeItem.flexShrink}</span>;</div>
                                    <div className="pl-4 text-orange-300">flex-basis: <span className="text-cyan-300">{activeItem.flexBasis}</span>;</div>
                                    <div className="pl-4 text-orange-300">align-self: <span className="text-cyan-300">{activeItem.alignSelf}</span>;</div>
                                    <div className="pl-4 text-orange-300">order: <span className="text-cyan-300">{activeItem.order}</span>;</div>
                                    <div className="text-white">{`}`}</div>
                                </div>
                            )}
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

function NumberControl({ label, value, onChange, min, max, step = 1 }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}</span>
            </div>
            <input
                type="number"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50"
            />
        </div>
    );
}
