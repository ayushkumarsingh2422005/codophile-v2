"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function TailwindAnimationsPlayground() {
    const [animate, setAnimate] = useState("animate-none");
    const [transitionProperty, setTransitionProperty] = useState("transition-all");
    const [duration, setDuration] = useState("duration-300");
    const [ease, setEase] = useState("ease-in-out");
    const [hover, setHover] = useState(false);

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setAnimate("animate-none");
        setTransitionProperty("transition-all");
        setDuration("duration-300");
        setEase("ease-in-out");
    };

    const elementClasses = `${animate} ${transitionProperty} ${duration} ${ease} w-32 h-32 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-xl flex items-center justify-center text-white font-bold`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${animate} ${transitionProperty} ${duration} ${ease}`);
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-purple-600">
                            Animations
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Transitions and keyframe animations.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Animate">
                            <SelectControl
                                value={animate}
                                onChange={setAnimate}
                                options={["animate-none", "animate-spin", "animate-ping", "animate-pulse", "animate-bounce"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Transition Property">
                            <SelectControl
                                value={transitionProperty}
                                onChange={setTransitionProperty}
                                options={["transition-none", "transition-all", "transition", "transition-colors", "transition-opacity", "transition-shadow", "transition-transform"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Duration">
                            <SelectControl
                                value={duration}
                                onChange={setDuration}
                                options={["duration-75", "duration-100", "duration-150", "duration-200", "duration-300", "duration-500", "duration-700", "duration-1000"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Ease (Timing Function)">
                            <SelectControl
                                value={ease}
                                onChange={setEase}
                                options={["ease-linear", "ease-in", "ease-out", "ease-in-out"]}
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        <div className="mb-8 text-gray-400 text-sm">
                            {(transitionProperty !== 'transition-none') && (animate === 'animate-none') ? (
                                <span>Hover over the box to see the transition.</span>
                            ) : (
                                <span>Watch the animation loop.</span>
                            )}
                        </div>

                        <div
                            className={`${elementClasses} ${(hover && animate === 'animate-none') ? 'scale-125 rotate-12 bg-fuchsia-600' : ''}`}
                            onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)}
                        >
                            Animate
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
                            {`${animate} ${transitionProperty} ${duration} ${ease}`}
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
