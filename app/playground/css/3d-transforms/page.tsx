"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Box } from "lucide-react";
import Link from "next/link";

export default function ThreeDTransformsPlayground() {
    // Parent Properties
    const [perspectiveOriginX, setPerspectiveOriginX] = useState(50);
    const [perspectiveOriginY, setPerspectiveOriginY] = useState(50);
    const [perspective, setPerspective] = useState(200);
    const [transformStyle, setTransformStyle] = useState<"flat" | "preserve-3d">("flat");

    // Child Properties
    const [originX, setOriginX] = useState(50);
    const [originY, setOriginY] = useState(50);

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [translateZ, setTranslateZ] = useState(0);

    const [scaleX, setScaleX] = useState(1);
    const [scaleY, setScaleY] = useState(1);
    const [scaleZ, setScaleZ] = useState(1);

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [rotateZ, setRotateZ] = useState(0);

    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setPerspectiveOriginX(50);
        setPerspectiveOriginY(50);
        setPerspective(200);
        setTransformStyle("flat");
        setOriginX(50);
        setOriginY(50);
        setTranslateX(0);
        setTranslateY(0);
        setTranslateZ(0);
        setScaleX(1);
        setScaleY(1);
        setScaleZ(1);
        setRotateX(0);
        setRotateY(0);
        setRotateZ(0);
    };

    // Construct the CSS string
    const parentStyle = `perspective: ${perspective}px;\n    perspective-origin: ${perspectiveOriginX}% ${perspectiveOriginY}%;\n    transform-style: ${transformStyle};`;
    const childStyle = `transform: translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale3d(${scaleX}, ${scaleY}, ${scaleZ}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg);\n    transform-origin: ${originX}% ${originY}%;`;

    const handleCopy = () => {
        const code = `.parent {\n    ${parentStyle}\n}\n\n.child {\n    ${childStyle}\n}`;
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
                            3D Transforms
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Control perspective and rotate elements in 3D space.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Parent Container Properties">
                            <SliderControl label="Perspective" value={perspective} onChange={setPerspective} min={0} max={1000} unit="px" />

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Perspective Origin</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <SliderControl label="X" value={perspectiveOriginX} onChange={setPerspectiveOriginX} min={0} max={100} unit="%" />
                                    <SliderControl label="Y" value={perspectiveOriginY} onChange={setPerspectiveOriginY} min={0} max={100} unit="%" />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300 block">Transform Style</label>
                                <div className="flex gap-2 p-1 bg-black/20 rounded-lg">
                                    {['flat', 'preserve-3d'].map((style) => (
                                        <button
                                            key={style}
                                            onClick={() => setTransformStyle(style as any)}
                                            className={`flex-1 py-1.5 text-xs font-medium rounded-md transition-all ${transformStyle === style
                                                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                                                    : "text-gray-400 hover:bg-white/5 border border-transparent"
                                                }`}
                                        >
                                            {style}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Element Transform">
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Translate 3D</label>
                                <SliderControl label="X" value={translateX} onChange={setTranslateX} min={-250} max={250} unit="px" />
                                <SliderControl label="Y" value={translateY} onChange={setTranslateY} min={-250} max={250} unit="px" />
                                <SliderControl label="Z" value={translateZ} onChange={setTranslateZ} min={-500} max={500} unit="px" />
                            </div>

                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs text-gray-300">Rotate 3D</label>
                                <SliderControl label="X" value={rotateX} onChange={setRotateX} min={-180} max={180} unit="deg" />
                                <SliderControl label="Y" value={rotateY} onChange={setRotateY} min={-180} max={180} unit="deg" />
                                <SliderControl label="Z" value={rotateZ} onChange={setRotateZ} min={-180} max={180} unit="deg" />
                            </div>

                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs text-gray-300">Scale 3D</label>
                                <SliderControl label="X" value={scaleX} onChange={setScaleX} min={0.1} max={5} step={0.1} unit="" />
                                <SliderControl label="Y" value={scaleY} onChange={setScaleY} min={0.1} max={5} step={0.1} unit="" />
                                <SliderControl label="Z" value={scaleZ} onChange={setScaleZ} min={0.1} max={5} step={0.1} unit="" />
                            </div>

                            <div className="space-y-1.5 pt-2">
                                <label className="text-xs text-gray-300">Transform Origin</label>
                                <div className="grid grid-cols-2 gap-2">
                                    <SliderControl label="X" value={originX} onChange={setOriginX} min={0} max={100} unit="%" />
                                    <SliderControl label="Y" value={originY} onChange={setOriginY} min={0} max={100} unit="%" />
                                </div>
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
                    <div className="flex-1 min-h-[500px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] group">

                        {/* 3D Space Background */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-b from-black via-purple-900/10 to-black" />
                            {/* Simple perspective grid guide */}
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                    perspective: '500px',
                                    transform: 'rotateX(60deg) scale(2)'
                                }}
                            />
                        </div>

                        {/* The Parent Container */}
                        <div
                            className="relative w-64 h-64 border-2 border-dashed border-white/20 rounded-xl flex items-center justify-center transition-all duration-300"
                            style={{
                                perspective: `${perspective}px`,
                                perspectiveOrigin: `${perspectiveOriginX}% ${perspectiveOriginY}%`,
                                transformStyle: transformStyle,
                                backgroundColor: 'rgba(255, 255, 255, 0.02)'
                            }}
                        >
                            <span className="absolute top-2 left-2 text-[10px] text-white/30 font-mono tracking-widest uppercase">Parent Container</span>

                            {/* The Child Element */}
                            <div
                                className="w-32 h-32 md:w-40 md:h-40 bg-linear-to-br from-cyan-500 to-purple-600 rounded-lg flex items-center justify-center shadow-2xl transition-all duration-0"
                                style={{
                                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) scale3d(${scaleX}, ${scaleY}, ${scaleZ}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
                                    transformOrigin: `${originX}% ${originY}%`,
                                }}
                            >
                                <div className="text-center">
                                    <Box className="w-8 h-8 text-white mx-auto mb-1" />
                                    <span className="text-white font-bold tracking-wider text-xs block">3D Object</span>
                                </div>

                                {/* Face indicators to help visualize rotation */}
                                <div className="absolute inset-0 border border-white/20 rounded-lg" />
                            </div>

                            {/* Origin Point Indicator */}
                            <div
                                className="absolute w-2 h-2 bg-red-500 rounded-full z-10"
                                style={{
                                    left: `${originX}%`,
                                    top: `${originY}%`,
                                    transform: 'translate(-50%, -50%)',
                                    opacity: 0.5
                                }}
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
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-40 overflow-y-auto custom-scrollbar">
                            <div className="text-purple-400">.parent <span className="text-white">{`{`}</span></div>
                            <div className="pl-4 text-orange-300">
                                perspective: <span className="text-cyan-300">{perspective}px</span>;
                            </div>
                            <div className="pl-4 text-orange-300">
                                perspective-origin: <span className="text-cyan-300">{perspectiveOriginX}% {perspectiveOriginY}%</span>;
                            </div>
                            <div className="pl-4 text-orange-300">
                                transform-style: <span className="text-cyan-300">{transformStyle}</span>;
                            </div>
                            <div className="text-white">{`}`}</div>

                            <div className="text-purple-400 mt-4">.child <span className="text-white">{`{`}</span></div>
                            <div className="pl-4 text-orange-300">
                                transform: <span className="text-cyan-300">
                                    translate3d({translateX}px, {translateY}px, {translateZ}px)
                                    scale3d({scaleX}, {scaleY}, {scaleZ})
                                    rotateX({rotateX}deg)
                                    rotateY({rotateY}deg)
                                    rotateZ({rotateZ}deg)
                                </span>;
                            </div>
                            <div className="pl-4 text-orange-300">
                                transform-origin: <span className="text-cyan-300">{originX}% {originY}%</span>;
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
