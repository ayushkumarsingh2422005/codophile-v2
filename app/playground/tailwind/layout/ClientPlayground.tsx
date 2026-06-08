"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, LayoutTemplate } from "lucide-react";
import Link from "next/link";

export default function TailwindLayoutPlayground() {
    const [flexDirection, setFlexDirection] = useState("flex-row");
    const [justifyContent, setJustifyContent] = useState("justify-start");
    const [alignItems, setAlignItems] = useState("items-start");
    const [gap, setGap] = useState("gap-4");
    const [flexWrap, setFlexWrap] = useState("flex-nowrap");

    // Item count for demo
    const [itemCount, setItemCount] = useState(4);
    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setFlexDirection("flex-row");
        setJustifyContent("justify-start");
        setAlignItems("items-start");
        setGap("gap-4");
        setFlexWrap("flex-nowrap");
        setItemCount(4);
    };

    const containerClasses = `flex ${flexDirection} ${justifyContent} ${alignItems} ${gap} ${flexWrap} p-4 w-full h-full bg-white/5 rounded-lg border border-white/10 overflow-auto`;

    const handleCopy = () => {
        navigator.clipboard.writeText(containerClasses);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">
                {/* Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-blue-500">
                            Layout Utilities
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Master Flexbox with Tailwind classes.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Flex Direction">
                            <SelectControl
                                value={flexDirection}
                                onChange={setFlexDirection}
                                options={["flex-row", "flex-row-reverse", "flex-col", "flex-col-reverse"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Justify Content">
                            <SelectControl
                                value={justifyContent}
                                onChange={setJustifyContent}
                                options={["justify-start", "justify-end", "justify-center", "justify-between", "justify-around", "justify-evenly"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Align Items">
                            <SelectControl
                                value={alignItems}
                                onChange={setAlignItems}
                                options={["items-start", "items-end", "items-center", "items-baseline", "items-stretch"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Gap">
                            <SelectControl
                                value={gap}
                                onChange={setGap}
                                options={["gap-0", "gap-1", "gap-2", "gap-4", "gap-8", "gap-12", "gap-16"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Wrap">
                            <SelectControl
                                value={flexWrap}
                                onChange={setFlexWrap}
                                options={["flex-nowrap", "flex-wrap", "flex-wrap-reverse"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Items">
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-300">Count: {itemCount}</span>
                                <input
                                    type="range"
                                    min="1"
                                    max="12"
                                    value={itemCount}
                                    onChange={(e) => setItemCount(Number(e.target.value))}
                                    className="w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                />
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

                {/* Preview */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex flex-col">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        <div className={`relative z-10 transition-all duration-300 ${containerClasses}`}>
                            {Array.from({ length: itemCount }).map((_, i) => (
                                <div key={i} className="w-24 h-24 bg-linear-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-cyan-200 font-mono text-xl shadow-lg backdrop-blur-sm shrink-0">
                                    {i + 1}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">Class Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Classes"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm text-cyan-300 break-all">
                            {containerClasses}
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
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

function SelectControl({ value, onChange, options }: { value: string, onChange: (val: string) => void, options: string[] }) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-black/20 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer transition-colors hover:border-white/20"
        >
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-gray-900 text-white">
                    {opt}
                </option>
            ))}
        </select>
    );
}
