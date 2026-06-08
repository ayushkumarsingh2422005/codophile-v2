"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function BackdropFilterClient() {
    // State for all backdrop-filter properties
    const [blur, setBlur] = useState(0);
    const [brightness, setBrightness] = useState(100);
    const [contrast, setContrast] = useState(100);
    const [grayscale, setGrayscale] = useState(0);
    const [hueRotate, setHueRotate] = useState(0);
    const [invert, setInvert] = useState(0);
    const [opacity, setOpacity] = useState(1);
    const [sepia, setSepia] = useState(0);
    const [saturate, setSaturate] = useState(100);

    // Drop Shadow State
    const [dsX, setDsX] = useState(0);
    const [dsY, setDsY] = useState(0);
    const [dsBlur, setDsBlur] = useState(0);
    const [dsColor, setDsColor] = useState("#000000");

    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setBlur(0);
        setBrightness(100);
        setContrast(100);
        setGrayscale(0);
        setHueRotate(0);
        setInvert(0);
        setOpacity(1);
        setSepia(0);
        setSaturate(100);
        setDsX(0);
        setDsY(0);
        setDsBlur(0);
        setDsColor("#000000");
    };

    // Construct the CSS string
    const dropShadowValue = `drop-shadow(${dsX}px ${dsY}px ${dsBlur}px ${dsColor})`;
    const backdropFilterValue = [
        blur > 0 ? `blur(${blur}px)` : "",
        brightness !== 100 ? `brightness(${brightness}%)` : "",
        contrast !== 100 ? `contrast(${contrast}%)` : "",
        grayscale > 0 ? `grayscale(${grayscale}%)` : "",
        hueRotate > 0 ? `hue-rotate(${hueRotate}deg)` : "",
        invert > 0 ? `invert(${invert}%)` : "",
        opacity < 1 ? `opacity(${opacity})` : "",
        sepia > 0 ? `sepia(${sepia}%)` : "",
        saturate !== 100 ? `saturate(${saturate}%)` : "",
        (dsX !== 0 || dsY !== 0 || dsBlur !== 0) ? dropShadowValue : ""
    ].filter(Boolean).join(" ");

    // Handle Copy
    const handleCopy = () => {
        const code = `.glass-element {\n    backdrop-filter: ${backdropFilterValue || "none"};\n    -webkit-backdrop-filter: ${backdropFilterValue || "none"};\n}`;
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
                            Backdrop Filter
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Apply graphical effects to the area behind an element.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        {/* Control Group: Basic */}
                        <ControlGroup title="Basic Effects">
                            <SliderControl label="Blur" value={blur} onChange={setBlur} min={0} max={20} unit="px" />
                            <SliderControl label="Opacity" value={opacity} onChange={setOpacity} min={0} max={1} step={0.01} unit="" />
                            <SliderControl label="Saturate" value={saturate} onChange={setSaturate} min={0} max={200} unit="%" />
                        </ControlGroup>

                        {/* Control Group: Color */}
                        <ControlGroup title="Color Adjustments">
                            <SliderControl label="Hue Rotate" value={hueRotate} onChange={setHueRotate} min={0} max={360} unit="deg" />
                            <SliderControl label="Brightness" value={brightness} onChange={setBrightness} min={0} max={200} unit="%" />
                            <SliderControl label="Contrast" value={contrast} onChange={setContrast} min={0} max={200} unit="%" />
                            <SliderControl label="Grayscale" value={grayscale} onChange={setGrayscale} min={0} max={100} unit="%" />
                            <SliderControl label="Sepia" value={sepia} onChange={setSepia} min={0} max={100} unit="%" />
                            <SliderControl label="Invert" value={invert} onChange={setInvert} min={0} max={100} unit="%" />
                        </ControlGroup>

                        {/* Control Group: Drop Shadow */}
                        <ControlGroup title="Drop Shadow (Backdrop)">
                            <SliderControl label="X Offset" value={dsX} onChange={setDsX} min={-50} max={50} unit="px" />
                            <SliderControl label="Y Offset" value={dsY} onChange={setDsY} min={-50} max={50} unit="px" />
                            <SliderControl label="Blur" value={dsBlur} onChange={setDsBlur} min={0} max={50} unit="px" />
                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-400">Color</label>
                                <input
                                    type="color"
                                    value={dsColor}
                                    onChange={(e) => setDsColor(e.target.value)}
                                    className="w-6 h-6 rounded cursor-pointer bg-transparent border border-white/20 p-0"
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


                {/* Preview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] group">
                        {/* Background Image / Pattern */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20" />
                            {/* Abstract Shapes */}
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500 rounded-full blur-xl animate-pulse" />
                            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-purple-600 rounded-full blur-2xl opacity-60" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-20 border-pink-500/30 rounded-full blur-lg" />
                            {/* Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Glass Element */}
                        <div
                            className="relative z-10 w-64 h-64 md:w-96 md:h-64 rounded-xl border border-white/20 flex flex-col items-center justify-center p-6 text-center shadow-lg transition-all duration-300"
                            style={{
                                backdropFilter: backdropFilterValue || "none",
                                WebkitBackdropFilter: backdropFilterValue || "none",
                                backgroundColor: `rgba(255, 255, 255, 0.05)`
                            }}
                        >
                            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-white/70 mb-2">
                                Glass Effect
                            </h3>
                            <p className="text-sm text-white/70">
                                Adjust the sliders to experiment with the backdrop-filter property.
                            </p>
                            <div className="mt-4 px-4 py-2 bg-black/20 rounded-full text-xs font-mono text-cyan-300 border border-white/10">
                                .glass-card
                            </div>
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
                            <div className="text-purple-400">.glass-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">backdrop-filter</span>: <span className="text-orange-300">{backdropFilterValue || "none"}</span>;
                            </div>
                            <div className="pl-4 text-gray-500">/* Safari support */</div>
                            <div className="pl-4">
                                <span className="text-cyan-400">-webkit-backdrop-filter</span>: <span className="text-orange-300">{backdropFilterValue || "none"}</span>;
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

