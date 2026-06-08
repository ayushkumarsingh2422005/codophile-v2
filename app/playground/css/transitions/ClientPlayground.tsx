"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Zap, Play, PlayCircle, Clock } from "lucide-react";
import Link from "next/link";

export default function TransitionsClient() {
    // Transition Properties
    const [property, setProperty] = useState("all");
    const [duration, setDuration] = useState(0.5);
    const [timingFunction, setTimingFunction] = useState("ease-in-out");
    const [delay, setDelay] = useState(0);

    // Demonstration State
    const [isActive, setIsActive] = useState(false);

    // Properties to animate visually (fixed set for demo simplicity, but user can technically transition anything if 'all' is selected)
    // We'll let user toggle between two states: State A and State B
    // State A (Default)
    const stateA = {
        transform: "rotate(0deg) scale(1)",
        backgroundColor: "#3b82f6", // Blue-500
        borderRadius: "0.5rem", // rounded-lg
        width: "128px", // w-32
        opacity: 1
    };

    // State B (Active)
    const stateB = {
        transform: "rotate(45deg) scale(1.2)",
        backgroundColor: "#ec4899", // Pink-500
        borderRadius: "50%", // rounded-full
        width: "160px", // w-40 (approximated for demo visual)
        opacity: 0.8
    };

    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setProperty("all");
        setDuration(0.5);
        setTimingFunction("ease-in-out");
        setDelay(0);
        setIsActive(false);
    };

    // CSS Output
    const cssOutput = `transition-property: ${property};
    transition-duration: ${duration}s;
    transition-timing-function: ${timingFunction};
    transition-delay: ${delay}s;

    /* shorthand */
    transition: ${property} ${duration}s ${timingFunction} ${delay > 0 ? `${delay}s` : ''};`;

    const handleCopy = () => {
        const code = `.transition-element {\n    ${cssOutput.replace(/\n/g, '\n    ')}\n}`;
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
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Transitions
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Control the speed, curve, and delay of state changes.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Timing & Duration">
                            <SliderControl label="Duration" value={duration} onChange={setDuration} min={0.1} max={5} step={0.1} unit="s" />
                            <SliderControl label="Delay" value={delay} onChange={setDelay} min={0} max={2} step={0.1} unit="s" />
                        </ControlGroup>

                        <ControlGroup title="Timing Function (Easing)">
                            <div className="space-y-2">
                                <label className="text-xs text-gray-300">Curve Profile</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'].map((tf) => (
                                        <button
                                            key={tf}
                                            onClick={() => setTimingFunction(tf)}
                                            className={`py-1.5 px-2 text-xs rounded-md border transition-all ${timingFunction === tf
                                                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                    : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                                                }`}
                                        >
                                            {tf}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => setTimingFunction("cubic-bezier(0.68, -0.55, 0.27, 1.55)")} // Custom bounce
                                        className={`py-1.5 px-2 text-xs rounded-md border transition-all ${timingFunction.startsWith("cubic")
                                                ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                                                : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        Bounce (Custom)
                                    </button>
                                </div>
                            </div>

                            {/* Visual Easing Representation could go here in future */}
                        </ControlGroup>

                        <ControlGroup title="Target Properties">
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Transition Property</label>
                                <select
                                    value={property}
                                    onChange={(e) => setProperty(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    <option value="all" className="bg-gray-900">all</option>
                                    <option value="transform" className="bg-gray-900">transform</option>
                                    <option value="background-color" className="bg-gray-900">background-color</option>
                                    <option value="border-radius" className="bg-gray-900">border-radius</option>
                                    <option value="width" className="bg-gray-900">width</option>
                                    <option value="opacity" className="bg-gray-900">opacity</option>
                                </select>
                            </div>

                            <div className="pt-2">
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                    Choose 'all' to animate everything, or pick a specific property to isolate the effect.
                                </p>
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col bg-[#111]">

                        {/* Interactive Trigger Zone */}
                        <div
                            className="flex-1 flex items-center justify-center cursor-pointer group relative"
                            onClick={() => setIsActive(!isActive)}
                        >
                            <div className="absolute inset-x-0 top-0 p-4 flex justify-between items-start pointer-events-none">
                                <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                    {isActive ? <PlayCircle className="w-3 h-3 text-green-400" /> : <Clock className="w-3 h-3 text-gray-400" />}
                                    <span className="text-xs text-gray-300 font-mono">
                                        State: {isActive ? "Active (B)" : "Inactive (A)"}
                                    </span>
                                </div>
                                <div className="text-[10px] text-gray-500 bg-black/50 px-2 py-1 rounded">Click anywhere to toggle</div>
                            </div>

                            {/* The Animated Element */}
                            <div
                                className="shadow-2xl flex items-center justify-center"
                                style={{
                                    // Base styles
                                    height: "128px",
                                    cursor: "pointer",

                                    // Dynamic State Styles (A or B)
                                    width: isActive ? stateB.width : stateA.width,
                                    transform: isActive ? stateB.transform : stateA.transform,
                                    backgroundColor: isActive ? stateB.backgroundColor : stateA.backgroundColor,
                                    borderRadius: isActive ? stateB.borderRadius : stateA.borderRadius,
                                    opacity: isActive ? stateB.opacity : stateA.opacity,

                                    // The Transition Logic
                                    transitionProperty: property,
                                    transitionDuration: `${duration}s`,
                                    transitionTimingFunction: timingFunction,
                                    transitionDelay: `${delay}s`
                                }}
                            >
                                <Zap className={`w-8 h-8 text-white transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-50"}`} />
                            </div>

                        </div>

                        {/* Timeline Visualization (Simple Bar) */}
                        <div className="h-1 w-full bg-white/5 relative">
                            {isActive && (
                                <motion.div
                                    key={isActive ? "active" : "inactive"} // Reset animation on toggle
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{
                                        duration: duration,
                                        ease: "linear", // Helper bar is linear to show elapsed time
                                        delay: delay
                                    }}
                                    className="h-full bg-cyan-500/50"
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
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 whitespace-pre">
                            <div className="text-purple-400">.transition-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4 text-orange-300">transition-property: <span className="text-cyan-300">{property}</span>;</div>
                            <div className="pl-4 text-orange-300">transition-duration: <span className="text-cyan-300">{duration}s</span>;</div>
                            <div className="pl-4 text-orange-300">transition-timing-function: <span className="text-cyan-300">{timingFunction}</span>;</div>
                            <div className="pl-4 text-orange-300">transition-delay: <span className="text-cyan-300">{delay}s</span>;</div>
                            <div className="text-white">{`
    /* changes to animate */`}</div>
                            <div className="pl-4 text-gray-500">/* ... new styles (e.g. :hover) ... */</div>
                            <div className="text-white">{`}`}</div>
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
                <span className="text-xs font-mono text-cyan-400">{Math.round(value * 100) / 100}{unit}</span>
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

