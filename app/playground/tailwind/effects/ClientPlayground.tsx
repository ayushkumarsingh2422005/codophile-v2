"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function TailwindEffectsPlayground() {
    const [shadow, setShadow] = useState("shadow-lg");
    const [opacity, setOpacity] = useState("opacity-100");
    const [blur, setBlur] = useState("blur-none");
    const [mixBlend, setMixBlend] = useState("mix-blend-normal");

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setShadow("shadow-lg");
        setOpacity("opacity-100");
        setBlur("blur-none");
        setMixBlend("mix-blend-normal");
    };

    const elementClasses = `${shadow} ${opacity} ${blur} ${mixBlend} w-48 h-48 bg-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-xl`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${shadow} ${opacity} ${blur} ${mixBlend}`);
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-purple-500 to-fuchsia-500">
                            Effects & Filters
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Apply shadows, opacity, and blend modes.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Box Shadow">
                            <SelectControl
                                value={shadow}
                                onChange={setShadow}
                                options={["shadow-none", "shadow-sm", "shadow", "shadow-md", "shadow-lg", "shadow-xl", "shadow-2xl", "shadow-inner"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Opacity">
                            <SelectControl
                                value={opacity}
                                onChange={setOpacity}
                                options={["opacity-0", "opacity-25", "opacity-50", "opacity-75", "opacity-100"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Blur">
                            <SelectControl
                                value={blur}
                                onChange={setBlur}
                                options={["blur-none", "blur-sm", "blur", "blur-md", "blur-lg", "blur-xl", "blur-2xl", "blur-3xl"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mix Blend Mode">
                            <SelectControl
                                value={mixBlend}
                                onChange={setMixBlend}
                                options={["mix-blend-normal", "mix-blend-multiply", "mix-blend-screen", "mix-blend-overlay", "mix-blend-darken", "mix-blend-lighten", "mix-blend-color-dodge", "mix-blend-color-burn", "mix-blend-difference", "mix-blend-exclusion"]}
                            />
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex items-center justify-center">
                        {/* Background Pattern for transparency check */}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,#1f1f1f_25%,transparent_25%,transparent_75%,#1f1f1f_75%,#1f1f1f),linear-gradient(45deg,#1f1f1f_25%,transparent_25%,transparent_75%,#1f1f1f_75%,#1f1f1f)] bg-size-[20px_20px] bg-position-[0_0,10px_10px] opacity-20" />

                        {/* Overlay element for blend mode demo */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-64 h-64 bg-linear-to-r from-cyan-500 to-blue-500 rounded-full opacity-50 blur-xl translate-x-10 translate-y-10" />
                        </div>

                        <div className={`transition-all duration-300 relative z-10 ${elementClasses}`}>
                            Effect
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
                            {`${shadow} ${opacity} ${blur} ${mixBlend}`}
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
