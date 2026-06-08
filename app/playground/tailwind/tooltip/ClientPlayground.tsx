"use client";

// Tooltip Client Playground for Tailwind CSS

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export default function TooltipClient() {
    // State
    const [position, setPosition] = useState<TooltipPosition>("top");
    const [showArrow, setShowArrow] = useState(true);
    const [theme, setTheme] = useState<"dark" | "light" | "cyan">("dark");
    const [textSize, setTextSize] = useState<"xs" | "sm" | "base">("sm");
    const [rounded, setRounded] = useState<"md" | "lg" | "xl">("lg");
    const [width, setWidth] = useState<"auto" | "w-32" | "w-48" | "w-64">("w-32");

    const [copied, setCopied] = useState(false);

    // Reset
    const resetValues = () => {
        setPosition("top");
        setShowArrow(true);
        setTheme("dark");
        setTextSize("sm");
        setRounded("lg");
        setWidth("w-32");
    };

    // Helper functions for class names
    const getBgColor = () => {
        switch (theme) {
            case "light": return "bg-gray-100 text-gray-900 border border-gray-200 shadow-sm";
            case "cyan": return "bg-cyan-900/90 text-cyan-50 border border-cyan-700/50 backdrop-blur-sm shadow-cyan-900/20 shadow-lg";
            default: return "bg-gray-900 text-white shadow-xl";
        }
    };

    const getArrowColor = () => {
        switch (theme) {
            case "light": return {
                top: "border-t-gray-100",
                bottom: "border-b-gray-100",
                left: "border-l-gray-100",
                right: "border-r-gray-100"
            };
            case "cyan": return {
                top: "border-t-cyan-900/90",
                bottom: "border-b-cyan-900/90",
                left: "border-l-cyan-900/90",
                right: "border-r-cyan-900/90"
            };
            default: return {
                top: "border-t-gray-900",
                bottom: "border-b-gray-900",
                left: "border-l-gray-900",
                right: "border-r-gray-900"
            };
        }
    };

    const getPositionClasses = () => {
        switch (position) {
            case "top": return "bottom-full left-1/2 -translate-x-1/2 mb-2";
            case "bottom": return "top-full left-1/2 -translate-x-1/2 mt-2";
            case "left": return "right-full top-1/2 -translate-y-1/2 mr-2";
            case "right": return "left-full top-1/2 -translate-y-1/2 ml-2";
        }
    };

    const getArrowPositionClasses = () => {
        switch (position) {
            case "top": return "top-full left-1/2 -translate-x-1/2 border-x-transparent border-b-transparent border-t-[6px]";
            case "bottom": return "bottom-full left-1/2 -translate-x-1/2 border-x-transparent border-t-transparent border-b-[6px]";
            case "left": return "left-full top-1/2 -translate-y-1/2 border-y-transparent border-r-transparent border-l-[6px]";
            case "right": return "right-full top-1/2 -translate-y-1/2 border-y-transparent border-l-transparent border-r-[6px]";
        }
    };

    // Construct Code
    const generateCode = () => {
        const arrow = showArrow ? `
    {/* Arrow */}
    <div className="absolute ${getArrowPositionClasses()} ${getArrowColor()[position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right']}"></div>` : '';

        return `<div className="group relative inline-block">
  <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">
    Hover Me
  </button>
  
  {/* Tooltip */}
  <div className="absolute z-10 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 ${getPositionClasses()}">
    <div className="${width} p-2 ${rounded !== 'md' ? 'rounded-' + rounded : 'rounded-md'} text-${textSize} text-center ${getBgColor()}">
      Tooltip Text${arrow}
    </div>
  </div>
</div>`;
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Tooltip Utility
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Generate Tailwind utility classes for tooltips with proper positioning and visibility.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Position">
                            <div className="grid grid-cols-2 gap-2">
                                {['top', 'bottom', 'left', 'right'].map((pos) => (
                                    <button
                                        key={pos}
                                        onClick={() => setPosition(pos as any)}
                                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${position === pos
                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Theme">
                            <div className="grid grid-cols-3 gap-2">
                                {['dark', 'light', 'cyan'].map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t as any)}
                                        className={`px-2 py-2 text-xs rounded-lg border transition-all capitalize ${theme === t
                                            ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Size & Style">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Width</label>
                                    <div className="flex gap-2">
                                        {['auto', 'w-32', 'w-48', 'w-64'].map((w) => (
                                            <button
                                                key={w}
                                                onClick={() => setWidth(w as any)}
                                                className={`flex-1 py-1.5 text-xs rounded border transition-all ${width === w ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {w.replace('w-', '')}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Text Size</label>
                                    <div className="flex gap-2">
                                        {['xs', 'sm', 'base'].map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => setTextSize(s as any)}
                                                className={`flex-1 py-1.5 text-xs rounded border transition-all ${textSize === s ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-300 block mb-2">Rounding</label>
                                    <div className="flex gap-2">
                                        {['md', 'lg', 'xl'].map((r) => (
                                            <button
                                                key={r}
                                                onClick={() => setRounded(r as any)}
                                                className={`flex-1 py-1.5 text-xs rounded border transition-all ${rounded === r ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400' : 'bg-white/5 border-white/10 text-gray-400'
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Options">
                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-300">Show Arrow</label>
                                <button
                                    onClick={() => setShowArrow(!showArrow)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${showArrow ? 'bg-cyan-500' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${showArrow ? 'left-6' : 'left-1'}`} />
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
                    className="flex-1 flex flex-col gap-6 min-w-0"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] group-master">
                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        </div>

                        {/* Interactive Element */}
                        <div className="group relative inline-block z-10">
                            <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors font-medium cursor-pointer">
                                Hover Me
                            </button>

                            {/* Tooltip */}
                            <div className={`absolute z-20 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-out ${getPositionClasses()}`}>
                                <div className={`relative ${width} p-2 text-center break-words ${rounded !== 'md' ? 'rounded-' + rounded : 'rounded-md'} text-${textSize} ${getBgColor()}`}>
                                    Tooltip Text
                                    {showArrow && (
                                        <div className={`absolute w-0 h-0 border-solid ${getArrowPositionClasses()} ${getArrowColor()[position === 'top' ? 'top' : position === 'bottom' ? 'bottom' : position === 'left' ? 'left' : 'right']}`} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">React / Tailwind Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 whitespace-pre">
                            {code}
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
