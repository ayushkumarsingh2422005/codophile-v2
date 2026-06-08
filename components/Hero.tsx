"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Copy,
    Check,
    Sliders,
    Code,
    Move3d,
    Zap,
    Layers,
    Maximize2,
    Box,
    Palette
} from "lucide-react";

export default function Hero() {
    const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
    const [copied, setCopied] = useState(false);

    // Interactive State
    const [glowIntensity, setGlowIntensity] = useState(40);
    const [blurAmount, setBlurAmount] = useState(16);
    const [rotation, setRotation] = useState(12);
    const [borderRadius, setBorderRadius] = useState(12);
    const [opacity, setOpacity] = useState(90);
    const [hue, setHue] = useState(260);

    // Generate CSS based on state
    const cssCode = `.card {
  background: rgba(255, 255, 255, ${opacity / 1000});
  backdrop-filter: blur(${blurAmount}px);
  border-radius: ${borderRadius}px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 ${glowIntensity}px hsla(${hue}, 80%, 60%, 0.3);
  transform: rotateY(${rotation / 2}deg) rotateX(${rotation / 3}deg);
}`;

    const tailwindCode = `bg-white/[${opacity / 1000}] backdrop-blur-[${blurAmount}px] rounded-[${borderRadius}px] border border-white/10 shadow-[0_0_${glowIntensity}px_hsla(${hue},80%,60%,0.3)] rotate-y-[${rotation / 2}deg]`;

    const handleCopy = () => {
        navigator.clipboard.writeText(activeTab === "preview" ? cssCode : cssCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center pt-below-header-lg pb-20 overflow-hidden bg-transparent">


            <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

                {/* Left Content */}
                <div className="space-y-8 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                            CSS Effects, Components & Tailwind <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient-x">
                                Design live. Copy code.
                            </span>
                        </h1>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg text-gray-400 max-w-xl leading-relaxed"
                    >
                        Copy-paste animations, hover effects, and UI snippets. Tweak styles in the
                        visual playground and export clean CSS or Tailwind in seconds.
                    </motion.p>
                    <div className="mt-4 text-xs text-gray-600 opacity-70">
                        CSS animations • Tailwind generator • UI components • Copy-paste code
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-row gap-3 w-full max-w-md"
                    >
                        <button className="group relative flex-1 px-4 py-3 md:px-8 md:py-4 bg-white text-black font-bold text-xs md:text-sm tracking-wide overflow-hidden rounded-sm transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center">
                            <div className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                            <span className="relative z-10 whitespace-nowrap">START BUILDING</span>
                        </button>
                        <button className="flex-1 px-4 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 text-white font-bold text-xs md:text-sm tracking-wide hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-md rounded-sm whitespace-nowrap">
                            <Code className="w-4 h-4 text-violet-400" />
                            EXPERIMENT
                        </button>
                    </motion.div>

                    {/* Feature Highlights */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-10 border-t border-white/5"
                    >
                        {[
                            { label: "Zero Latency", value: "Visual Editor" },
                            { label: "TAILWIND & CSS", value: "Instant Export" },
                            { label: "UI COMPONENTS", value: "500+" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-xl md:text-2xl font-bold text-white font-mono wrap-break-word">{stat.value}</div>
                                <div className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Content - The Advanced Playground */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="relative"
                >
                    {/* Main Interface Window */}
                    <div className="relative z-20 bg-[#0e0e0e]/90 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-violet-500/20 ring-1 ring-white/5">

                        {/* Window Header */}
                        <div className="h-12 border-b border-white/5 bg-[#1a1a1a]/50 flex items-center justify-between px-4">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#fa5a57]" />
                                <div className="w-3 h-3 rounded-full bg-[#f6bb32]" />
                                <div className="w-3 h-3 rounded-full bg-[#3dbc4e]" />
                            </div>
                            <div className="flex bg-black/40 rounded-lg p-1 border border-white/5">
                                <button
                                    onClick={() => setActiveTab('preview')}
                                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'preview' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Interactive
                                </button>
                                <button
                                    onClick={() => setActiveTab('code')}
                                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${activeTab === 'code' ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                >
                                    Source Code
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row h-auto lg:h-[480px]">
                            {/* Controls Panel */}
                            <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-white/5 bg-black/20 p-4 space-y-0 grid grid-cols-2 gap-4 lg:block lg:space-y-6 overflow-y-auto custom-scrollbar">

                                {/* Control Group: Effects */}
                                <div className="space-y-4 col-span-1">
                                    <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Effects</h3>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 flex items-center gap-1.5"><Zap className="w-3 h-3 hidden md:block" /> Gloss</span>
                                            <span className="font-mono text-violet-400">{glowIntensity}%</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100" value={glowIntensity}
                                            onChange={(e) => setGlowIntensity(parseInt(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 flex items-center gap-1.5"><Sliders className="w-3 h-3 hidden md:block" /> Blur</span>
                                            <span className="font-mono text-violet-400">{blurAmount}px</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="40" value={blurAmount}
                                            onChange={(e) => setBlurAmount(parseInt(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Control Group: Geometry */}
                                <div className="space-y-4 col-span-1 border-t-0 pt-0 lg:pt-4 lg:border-t border-white/5">
                                    <h3 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2">Geometry</h3>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 flex items-center gap-1.5"><Box className="w-3 h-3 hidden md:block" /> Radius</span>
                                            <span className="font-mono text-violet-400">{borderRadius}px</span>
                                        </div>
                                        <input
                                            type="range" min="0" max="100" value={borderRadius}
                                            onChange={(e) => setBorderRadius(parseInt(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-gray-400 flex items-center gap-1.5"><Move3d className="w-3 h-3 hidden md:block" /> Tilt</span>
                                            <span className="font-mono text-violet-400">{rotation}°</span>
                                        </div>
                                        <input
                                            type="range" min="-45" max="45" value={rotation}
                                            onChange={(e) => setRotation(parseInt(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-violet-500 [&::-webkit-slider-thumb]:rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Control Group: Color */}
                                <div className="space-y-4 col-span-2 lg:col-span-1 pt-0 lg:pt-4 lg:border-t border-white/5">
                                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-2 flex items-center justify-between">
                                        <span>Accent Color</span>
                                        <div className="w-3 h-3 rounded-full" style={{ background: `hsl(${hue}, 80%, 60%)` }} />
                                    </div>
                                    <input
                                        type="range" min="0" max="360" value={hue}
                                        onChange={(e) => setHue(parseInt(e.target.value))}
                                        className="w-full h-2 rounded-md appearance-none cursor-pointer"
                                        style={{
                                            background: 'linear-gradient(to right, #ef4444, #eab308, #22c55e, #3b82f6, #a855f7, #ef4444)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Canvas Area */}
                            <div className="flex-1 relative bg-[#050505] overflow-hidden flex flex-col">
                                {/* Grid Pattern */}
                                <div className="absolute inset-0 bg-[linear-gradient(transparent_1px,transparent_1px),linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-size-[16px_16px]" />

                                <div className="flex-1 flex items-center justify-center p-4 lg:p-10 perspective-distant overflow-hidden min-h-[300px] lg:min-h-0">
                                    <AnimatePresence mode="wait">
                                        {activeTab === 'preview' ? (
                                            <motion.div
                                                key="card"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="relative w-64 h-80 transition-all duration-300 ease-out preserve-3d group"
                                                style={{
                                                    background: `rgba(255, 255, 255, ${activeTab === 'preview' ? 0.05 : 0})`, // Placeholder bg logic
                                                    backdropFilter: `blur(${blurAmount}px)`,
                                                    borderRadius: `${borderRadius}px`,
                                                    borderColor: 'rgba(255, 255, 255, 0.1)',
                                                    borderWidth: '1px',
                                                    boxShadow: `0 0 ${glowIntensity}px hsla(${hue}, 80%, 60%, 0.3)`,
                                                    transform: `perspective(1000px) rotateY(${rotation / 2}deg) rotateX(${rotation / -2}deg)`,
                                                }}
                                            >
                                                {/* Inner Card Content */}
                                                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-50 pointer-events-none" style={{ borderRadius: `${borderRadius}px` }} />

                                                <div className="h-full flex flex-col p-6 relative z-10">
                                                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-white/20 to-white/5 border border-white/10 mb-auto" />

                                                    <div className="space-y-3">
                                                        <div className="h-2 w-2/3 bg-white/20 rounded-full" />
                                                        <div className="h-2 w-full bg-white/10 rounded-full" />
                                                        <div className="h-2 w-full bg-white/10 rounded-full" />
                                                        <div className="h-2 w-1/2 bg-white/10 rounded-full" />
                                                    </div>
                                                </div>

                                                {/* Reflection Glint */}
                                                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="code"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="w-full max-w-md bg-[#111] rounded-lg border border-white/10 p-4 font-mono text-xs text-gray-400 overflow-hidden shadow-2xl"
                                            >
                                                <div className="flex gap-4 mb-4 border-b border-white/5 pb-2">
                                                    <span className="text-violet-400">Box Style</span>
                                                </div>
                                                <div className="space-y-1">
                                                    <p><span className="text-pink-400">.element</span> {'{'}</p>
                                                    <p className="pl-4"><span className="text-blue-400">backdrop-filter</span>: <span className="text-amber-300">blur</span>({blurAmount}px);</p>
                                                    <p className="pl-4"><span className="text-blue-400">border-radius</span>: <span className="text-amber-300">{borderRadius}</span>px;</p>
                                                    <p className="pl-4"><span className="text-blue-400">box-shadow</span>: 0 0 <span className="text-amber-300">{glowIntensity}</span>px <span className="text-green-300">hsla</span>({hue}, ...);</p>
                                                    <p className="pl-4"><span className="text-blue-400">transform</span>: <span className="text-amber-300">rotateY</span>({Math.round(rotation / 2)}deg);</p>
                                                    <p>{'}'}</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer Bar */}
                                <div className="h-12 border-t border-white/5 bg-[#0a0a0a] flex items-center justify-between px-4">
                                    <div className="flex gap-4 text-[10px] text-gray-500 font-mono">
                                        <span>W: 240px</span>
                                        <span>H: 320px</span>
                                    </div>
                                    <button
                                        onClick={handleCopy}
                                        className="flex items-center gap-2 text-[10px] bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-1.5 rounded transition-colors border border-white/5"
                                    >
                                        {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                        {copied ? "COPIED" : "COPY CODE"}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Decorative Blooms */}
                    <div className="absolute -top-10 -right-10 w-64 h-64 bg-violet-600/30 blur-[100px] rounded-full -z-10 animate-pulse" />
                    <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-pink-600/30 blur-[100px] rounded-full -z-10 animate-pulse" style={{ animationDelay: '1s' }} />

                </motion.div>
            </div>
        </section>
    );
}
