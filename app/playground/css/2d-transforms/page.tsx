"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Scaling } from "lucide-react";
import Link from "next/link";

export default function TwoDTransformsPlayground() {
    // Transform Origin
    const [originX, setOriginX] = useState(50);
    const [originY, setOriginY] = useState(50);

    // Transform Properties
    const [rotate, setRotate] = useState(0);
    const [skewX, setSkewX] = useState(0);
    const [skewY, setSkewY] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);

    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setOriginX(50);
        setOriginY(50);
        setRotate(0);
        setSkewX(0);
        setSkewY(0);
        setTranslateX(0);
        setTranslateY(0);
        setScaleX(1);
        setScaleY(1);
    };

    // Construct the CSS string
    const transformValue = `rotate(${rotate}deg) skew(${skewX}deg, ${skewY}deg) translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`;
    const transformOriginValue = `${originX}% ${originY}%`;

    const handleCopy = () => {
        const code = `.transformed-element {\n    transform: ${transformValue};\n    transform-origin: ${transformOriginValue};\n}`;
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
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            2D Transforms
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Manipulate elements in 2D space: rotate, scale, skew, and translate.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Transform Origin">
                            <SliderControl label="X Origin" value={originX} onChange={setOriginX} min={0} max={100} unit="%" />
                            <SliderControl label="Y Origin" value={originY} onChange={setOriginY} min={0} max={100} unit="%" />
                        </ControlGroup>

                        <ControlGroup title="Translate (Move)">
                            <SliderControl label="Translate X" value={translateX} onChange={setTranslateX} min={-200} max={200} unit="px" />
                            <SliderControl label="Translate Y" value={translateY} onChange={setTranslateY} min={-200} max={200} unit="px" />
                        </ControlGroup>

                        <ControlGroup title="Scale (Size)">
                            <SliderControl label="Scale X" value={scaleX} onChange={setScaleX} min={0.1} max={3} step={0.1} unit="" />
                            <SliderControl label="Scale Y" value={scaleY} onChange={setScaleY} min={0.1} max={3} step={0.1} unit="" />
                        </ControlGroup>

                        <ControlGroup title="Rotate & Skew">
                            <SliderControl label="Rotate" value={rotate} onChange={setRotate} min={-180} max={180} unit="deg" />
                            <SliderControl label="Skew X" value={skewX} onChange={setSkewX} min={-90} max={90} unit="deg" />
                            <SliderControl label="Skew Y" value={skewY} onChange={setSkewY} min={-90} max={90} unit="deg" />
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
                            {/* Center Lines */}
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/20" />
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20" />
                        </div>

                        {/* Reference Box (The ghost/original position) */}
                        <div className="absolute w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center pointer-events-none">
                            <span className="text-white/10 text-xs font-mono">Original</span>
                        </div>

                        {/* The Transformed Element */}
                        <div
                            className="relative z-10 w-32 h-32 md:w-48 md:h-48 bg-linear-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-md border border-white/30 rounded-lg flex flex-col items-center justify-center shadow-xl transition-all duration-0" // Duration 0 for instant slider feedback, or small duration for smooth
                            style={{
                                transform: transformValue,
                                transformOrigin: transformOriginValue,
                                transition: 'transform 0.1s ease-out' // Smooth entry but responsive slider
                            }}
                        >
                            <Scaling className="w-8 h-8 text-white/80 mb-2" />
                            <span className="text-white font-mono text-sm">Target</span>

                            {/* Origin Indicator Point */}
                            <div
                                className="absolute w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow-sm z-20"
                                style={{
                                    left: `${originX}%`,
                                    top: `${originY}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                                title="Transform Origin"
                            />
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
                            <div className="text-purple-400">.transformed-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">transform</span>: <span className="text-orange-300">{transformValue}</span>;
                            </div>
                            <div className="pl-4">
                                <span className="text-cyan-400">transform-origin</span>: <span className="text-orange-300">{transformOriginValue}</span>;
                            </div>
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
