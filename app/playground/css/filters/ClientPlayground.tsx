"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

const CSS_FILTERS_GUIDE: PlaygroundGuideDoc = {
    title: "CSS filter",
    intro:
        "`filter` applies graphical operations to an element’s rendered content (and descendants), unlike `backdrop-filter` which targets what is *behind* the element. Functions can be combined in one declaration.",
    syntax: ["filter: blur(4px) brightness(1.1) contrast(1.05);", "filter: drop-shadow(2px 4px 6px #000);"],
    values: [
        { term: "blur", desc: "Blurs the entire subtree’s pixels." },
        { term: "brightness / contrast / saturate", desc: "Tone and intensity adjustments." },
        { term: "grayscale / sepia / hue-rotate / invert", desc: "Color transformations." },
        { term: "opacity", desc: "Uniform transparency of the filtered result." },
        { term: "drop-shadow", desc: "Shadow that follows the alpha shape of the content." },
    ],
    tip: "Heavy filters can affect performance; prefer will-change or simpler stacks for animated UIs.",
};

export default function FiltersClient() {
    // State for all filter properties
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
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

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
    // Note: The order matters, but for a playground, a fixed order is usually fine.
    const dropShadowValue = `drop-shadow(${dsX}px ${dsY}px ${dsBlur}px ${dsColor})`;

    const filterValue = [
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

    const handleCopy = () => {
        const code = `.filtered-element {\n    filter: ${filterValue || "none"};\n}`;
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
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                CSS Filters
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS filter in this playground"
                                title={`What is ${CSS_FILTERS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Apply graphical effects like blur or color shift to an element.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Basic Effects">
                            <SliderControl label="Blur" value={blur} onChange={setBlur} min={0} max={20} unit="px" />
                            <SliderControl label="Opacity" value={opacity} onChange={setOpacity} min={0} max={1} step={0.01} unit="" />
                            <SliderControl label="Saturate" value={saturate} onChange={setSaturate} min={0} max={600} unit="%" />
                        </ControlGroup>

                        <ControlGroup title="Color Adjustments">
                            <SliderControl label="Brightness" value={brightness} onChange={setBrightness} min={0} max={400} unit="%" />
                            <SliderControl label="Contrast" value={contrast} onChange={setContrast} min={0} max={300} unit="%" />
                            <SliderControl label="Grayscale" value={grayscale} onChange={setGrayscale} min={0} max={100} unit="%" />
                            <SliderControl label="Hue Rotate" value={hueRotate} onChange={setHueRotate} min={0} max={360} unit="deg" />
                            <SliderControl label="Invert" value={invert} onChange={setInvert} min={0} max={100} unit="%" />
                            <SliderControl label="Sepia" value={sepia} onChange={setSepia} min={0} max={100} unit="%" />
                        </ControlGroup>

                        <ControlGroup title="Drop Shadow (Filter)">
                            <SliderControl label="X Offset" value={dsX} onChange={setDsX} min={-200} max={200} unit="px" />
                            <SliderControl label="Y Offset" value={dsY} onChange={setDsY} min={-200} max={200} unit="px" />
                            <SliderControl label="Spread/Blur" value={dsBlur} onChange={setDsBlur} min={0} max={200} unit="px" />
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
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0 opacity-20">
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Filtered Element (Image) */}
                        <div className="relative z-10 p-4 transition-all duration-300">
                            {/* Using a placeholder image that looks good with filters */}
                            <div
                                className="w-64 h-64 md:w-96 md:h-80 rounded-xl overflow-hidden shadow-2xl transition-all duration-300 bg-gray-800"
                                style={{
                                    filter: filterValue || "none",
                                    WebkitFilter: filterValue || "none"
                                }}
                            >
                                {/* We'll use a high quality gradient/pattern if image fails, or an actual image */}
                                <img
                                    src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                                    alt="Filter Preview"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <span className="text-white/50 text-xs font-mono bg-black/50 px-3 py-1 rounded-full">
                                    .filtered-element
                                </span>
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
                            <div className="text-purple-400">.filtered-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">filter</span>: <span className="text-orange-300">{filterValue || "none"}</span>;
                            </div>
                            <div className="text-white">{`}`}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={CSS_FILTERS_GUIDE}
                    onClose={closeGuide}
                    titleId="css-filters-guide-title"
                />
            )}

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

