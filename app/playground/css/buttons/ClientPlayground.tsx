"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, MousePointer2, Layers, Palette, BoxSelect } from "lucide-react";
import Link from "next/link";

export default function ButtonsClient() {
    // --- State ---
    const [activeTab, setActiveTab] = useState<"style" | "hover" | "shadow" | "group">("style");
    const [copied, setCopied] = useState(false);

    // Style Props
    const [buttonText, setButtonText] = useState("Click Me");
    const [bgColor, setBgColor] = useState("#3b82f6");
    const [textColor, setTextColor] = useState("#ffffff");
    const [fontSize, setFontSize] = useState(16);
    const [paddingX, setPaddingX] = useState(24);
    const [paddingY, setPaddingY] = useState(12);
    const [borderRadius, setBorderRadius] = useState(8);
    const [borderWidth, setBorderWidth] = useState(0);
    const [borderColor, setBorderColor] = useState("#ffffff");

    // Hover Props
    const [hoverBgColor, setHoverBgColor] = useState("#2563eb");
    const [hoverTextColor, setHoverTextColor] = useState("#ffffff");
    const [transitionDuration, setTransitionDuration] = useState(0.3);
    const [cursor, setCursor] = useState("pointer");

    // Shadow Props
    const [shadowX, setShadowX] = useState(0);
    const [shadowY, setShadowY] = useState(4);
    const [shadowBlur, setShadowBlur] = useState(6);
    const [shadowSpread, setShadowSpread] = useState(0);
    const [shadowColor, setShadowColor] = useState("rgba(0, 0, 0, 0.1)");
    const [hasShadow, setHasShadow] = useState(true);

    // Group Props
    const [isGroup, setIsGroup] = useState(false);
    const [groupDirection, setGroupDirection] = useState<"row" | "column">("row");
    const [groupGap, setGroupGap] = useState(0); // usually 0 for attached groups, but can be more

    // --- Reset ---
    const resetValues = () => {
        setButtonText("Click Me");
        setBgColor("#3b82f6");
        setTextColor("#ffffff");
        setFontSize(16);
        setPaddingX(24);
        setPaddingY(12);
        setBorderRadius(8);
        setBorderWidth(0);
        setBorderColor("#ffffff");
        setHoverBgColor("#2563eb");
        setHoverTextColor("#ffffff");
        setTransitionDuration(0.3);
        setCursor("pointer");
        setShadowX(0);
        setShadowY(4);
        setShadowBlur(6);
        setShadowSpread(0);
        setShadowColor("rgba(0, 0, 0, 0.1)");
        setHasShadow(true);
        setIsGroup(false);
        setGroupDirection("row");
        setGroupGap(0);
    };

    // --- CSS Generation ---
    const generateCSS = () => {
        let css = `.custom-button {\n`;
        css += `    background-color: ${bgColor};\n`;
        css += `    color: ${textColor};\n`;
        css += `    font-size: ${fontSize}px;\n`;
        css += `    padding: ${paddingY}px ${paddingX}px;\n`;
        css += `    border: ${borderWidth === 0 ? "none" : `${borderWidth}px solid ${borderColor}`};\n`;
        css += `    border-radius: ${borderRadius}px;\n`;
        css += `    cursor: ${cursor};\n`;
        css += `    transition: all ${transitionDuration}s ease;\n`;

        if (hasShadow) {
            css += `    box-shadow: ${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor};\n`;
        }

        css += `}\n\n`;

        css += `.custom-button:hover {\n`;
        css += `    background-color: ${hoverBgColor};\n`;
        css += `    color: ${hoverTextColor};\n`;
        css += `}\n`;

        if (isGroup) {
            css += `\n.button-group {\n`;
            css += `    display: flex;\n`;
            css += `    flex-direction: ${groupDirection};\n`;
            css += `    gap: ${groupGap}px;\n`;
            css += `}\n`;
        }

        return css;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCSS());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // --- Render Helpers ---
    const buttonStyle = {
        backgroundColor: bgColor,
        color: textColor,
        fontSize: `${fontSize}px`,
        padding: `${paddingY}px ${paddingX}px`,
        border: borderWidth === 0 ? "none" : `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        cursor: cursor,
        transition: `all ${transitionDuration}s ease`,
        boxShadow: hasShadow ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}` : "none",
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">

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
                            CSS Buttons
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Design beautiful buttons with custom styles, hover effects, and group layouts.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                        {[
                            { id: "style", icon: Palette, label: "Style" },
                            { id: "hover", icon: MousePointer2, label: "Hover" },
                            { id: "shadow", icon: Layers, label: "Shadow" },
                            { id: "group", icon: BoxSelect, label: "Group" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${activeTab === tab.id
                                    ? "bg-cyan-500/10 text-cyan-400 shadow-sm ring-1 ring-cyan-500/50"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-300px)]">

                        {/* STYLE TAB */}
                        {activeTab === "style" && (
                            <div className="space-y-6">
                                <ControlGroup title="Content">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-300">Button Text</label>
                                        <input
                                            type="text"
                                            value={buttonText}
                                            onChange={(e) => setButtonText(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg h-9 text-xs text-gray-300 px-3 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Colors">
                                    <div className="grid grid-cols-2 gap-4">
                                        <ColorControl label="Background" value={bgColor} onChange={setBgColor} />
                                        <ColorControl label="Text" value={textColor} onChange={setTextColor} />
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Dimensions">
                                    <SliderControl label="Font Size" value={fontSize} onChange={setFontSize} min={10} max={32} unit="px" />
                                    <SliderControl label="Padding X" value={paddingX} onChange={setPaddingX} min={0} max={60} unit="px" />
                                    <SliderControl label="Padding Y" value={paddingY} onChange={setPaddingY} min={0} max={40} unit="px" />
                                </ControlGroup>

                                <ControlGroup title="Border">
                                    <SliderControl label="Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={50} unit="px" />
                                    <SliderControl label="Width" value={borderWidth} onChange={setBorderWidth} min={0} max={10} unit="px" />
                                    {borderWidth > 0 && (
                                        <div className="pt-2">
                                            <ColorControl label="Border Color" value={borderColor} onChange={setBorderColor} />
                                        </div>
                                    )}
                                </ControlGroup>
                            </div>
                        )}

                        {/* HOVER TAB */}
                        {activeTab === "hover" && (
                            <div className="space-y-6">
                                <ControlGroup title="Hover Colors">
                                    <div className="grid grid-cols-2 gap-4">
                                        <ColorControl label="Background" value={hoverBgColor} onChange={setHoverBgColor} />
                                        <ColorControl label="Text" value={hoverTextColor} onChange={setHoverTextColor} />
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Transition">
                                    <SliderControl label="Duration" value={transitionDuration} onChange={setTransitionDuration} min={0} max={2} step={0.1} unit="s" />
                                </ControlGroup>

                                <ControlGroup title="Cursor">
                                    <div className="space-y-2">
                                        <label className="text-xs text-gray-300">Cursor Type</label>
                                        <select
                                            value={cursor}
                                            onChange={(e) => setCursor(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg h-9 text-xs text-gray-300 px-2 focus:outline-none focus:border-cyan-500/50"
                                        >
                                            <option value="pointer">Pointer</option>
                                            <option value="default">Default</option>
                                            <option value="not-allowed">Not Allowed</option>
                                            <option value="wait">Wait</option>
                                            <option value="text">Text</option>
                                        </select>
                                    </div>
                                </ControlGroup>
                            </div>
                        )}

                        {/* SHADOW TAB */}
                        {activeTab === "shadow" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-sm font-medium text-gray-300">Enable Shadow</span>
                                    <button
                                        onClick={() => setHasShadow(!hasShadow)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${hasShadow ? "bg-cyan-500" : "bg-white/10"}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${hasShadow ? "translate-x-5" : "translate-x-0"}`} />
                                    </button>
                                </div>

                                {hasShadow && (
                                    <ControlGroup title="Shadow Properties">
                                        <SliderControl label="X Offset" value={shadowX} onChange={setShadowX} min={-50} max={50} unit="px" />
                                        <SliderControl label="Y Offset" value={shadowY} onChange={setShadowY} min={-50} max={50} unit="px" />
                                        <SliderControl label="Blur" value={shadowBlur} onChange={setShadowBlur} min={0} max={50} unit="px" />
                                        <SliderControl label="Spread" value={shadowSpread} onChange={setShadowSpread} min={-20} max={20} unit="px" />
                                        <div className="pt-2">
                                            <ColorControl label="Shadow Color" value={shadowColor} onChange={setShadowColor} />
                                        </div>
                                    </ControlGroup>
                                )}
                            </div>
                        )}

                        {/* GROUP TAB */}
                        {activeTab === "group" && (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                                    <span className="text-sm font-medium text-gray-300">Enable Group</span>
                                    <button
                                        onClick={() => setIsGroup(!isGroup)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${isGroup ? "bg-cyan-500" : "bg-white/10"}`}
                                    >
                                        <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isGroup ? "translate-x-5" : "translate-x-0"}`} />
                                    </button>
                                </div>

                                {isGroup && (
                                    <ControlGroup title="Group Layout">
                                        <div className="space-y-3">
                                            <div className="space-y-2">
                                                <label className="text-xs text-gray-300">Direction</label>
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => setGroupDirection("row")}
                                                        className={`flex-1 py-1.5 text-xs rounded border transition-colors ${groupDirection === "row" ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                                    >
                                                        Row
                                                    </button>
                                                    <button
                                                        onClick={() => setGroupDirection("column")}
                                                        className={`flex-1 py-1.5 text-xs rounded border transition-colors ${groupDirection === "column" ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                                    >
                                                        Column
                                                    </button>
                                                </div>
                                            </div>
                                            <SliderControl label="Gap" value={groupGap} onChange={setGroupGap} min={0} max={50} unit="px" />
                                        </div>
                                    </ControlGroup>
                                )}
                            </div>
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#f0f0f0] group/preview">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-[#f8f9fa]" />
                            <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]" />
                        </div>

                        {/* Interactive Element */}
                        <div className="relative z-10 p-8 flex items-center justify-center">
                            {isGroup ? (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: groupDirection,
                                    gap: `${groupGap}px`
                                }}>
                                    {[1, 2, 3].map((num) => (
                                        <PreviewButton
                                            key={num}
                                            label={`${buttonText} ${num}`}
                                            style={buttonStyle}
                                            hoverStyle={{ backgroundColor: hoverBgColor, color: hoverTextColor }}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <PreviewButton
                                    label={buttonText}
                                    style={buttonStyle}
                                    hoverStyle={{ backgroundColor: hoverBgColor, color: hoverTextColor }}
                                />
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
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300">
                            <pre>{generateCSS()}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
}

// Helper Components

function PreviewButton({ label, style, hoverStyle }: any) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            style={isHovered ? { ...style, ...hoverStyle } : style}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {label}
        </button>
    );
}

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
                <span className="text-xs font-mono text-cyan-400">{Math.round(value * 10) / 10}{unit}</span>
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

function ColorControl({ label, value, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs text-gray-300 block">{label}</label>
            <div className="flex gap-2 items-center">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border border-white/20 p-0 shrink-0"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border border-white/10 rounded px-2 h-8 text-xs font-mono text-gray-300 focus:outline-none focus:border-cyan-500/50"
                />
            </div>
        </div>
    );
}
