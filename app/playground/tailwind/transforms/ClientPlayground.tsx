"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function TailwindTransformsPlayground() {
    const [scale, setScale] = useState("scale-100");
    const [rotate, setRotate] = useState("rotate-0");
    const [translateX, setTranslateX] = useState("translate-x-0");
    const [translateY, setTranslateY] = useState("translate-y-0");
    const [skewX, setSkewX] = useState("skew-x-0");
    const [skewY, setSkewY] = useState("skew-y-0");

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setScale("scale-100");
        setRotate("rotate-0");
        setTranslateX("translate-x-0");
        setTranslateY("translate-y-0");
        setSkewX("skew-x-0");
        setSkewY("skew-y-0");
    };

    const elementClasses = `${scale} ${rotate} ${translateX} ${translateY} ${skewX} ${skewY} w-32 h-32 bg-linear-to-br from-orange-400 to-red-500 rounded-xl shadow-xl flex items-center justify-center text-white font-bold`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${scale} ${rotate} ${translateX} ${translateY} ${skewX} ${skewY}`);
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-orange-400 to-red-500">
                            Transforms
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Scale, rotate, translate, and skew.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Scale">
                            <SelectControl
                                value={scale}
                                onChange={setScale}
                                options={["scale-0", "scale-50", "scale-75", "scale-90", "scale-100", "scale-105", "scale-110", "scale-125", "scale-150"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Rotate">
                            <SelectControl
                                value={rotate}
                                onChange={setRotate}
                                options={["rotate-0", "rotate-1", "rotate-2", "rotate-3", "rotate-6", "rotate-12", "rotate-45", "rotate-90", "rotate-180", "-rotate-45", "-rotate-90", "-rotate-180"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Translate X">
                            <SelectControl
                                value={translateX}
                                onChange={setTranslateX}
                                options={["translate-x-0", "translate-x-1", "translate-x-2", "translate-x-4", "translate-x-8", "translate-x-16", "translate-x-1/2", "translate-x-full", "-translate-x-full", "-translate-x-1/2"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Translate Y">
                            <SelectControl
                                value={translateY}
                                onChange={setTranslateY}
                                options={["translate-y-0", "translate-y-1", "translate-y-2", "translate-y-4", "translate-y-8", "translate-y-16", "translate-y-1/2", "translate-y-full", "-translate-y-full", "-translate-y-1/2"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Skew X">
                            <SelectControl
                                value={skewX}
                                onChange={setSkewX}
                                options={["skew-x-0", "skew-x-1", "skew-x-2", "skew-x-3", "skew-x-6", "skew-x-12", "-skew-x-1", "-skew-x-2", "-skew-x-3", "-skew-x-6", "-skew-x-12"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Skew Y">
                            <SelectControl
                                value={skewY}
                                onChange={setSkewY}
                                options={["skew-y-0", "skew-y-1", "skew-y-2", "skew-y-3", "skew-y-6", "skew-y-12", "-skew-y-1", "-skew-y-2", "-skew-y-3", "-skew-y-6", "-skew-y-12"]}
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
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        {/* Ghost element to show original position */}
                        <div className="w-32 h-32 border border-white/10 rounded-xl absolute flex items-center justify-center">
                            <span className="text-xs text-gray-600">Original</span>
                        </div>

                        <div className={`transition-all duration-500 ease-in-out ${elementClasses}`}>
                            Transform
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
                            {`${scale} ${rotate} ${translateX} ${translateY} ${skewX} ${skewY}`}
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
