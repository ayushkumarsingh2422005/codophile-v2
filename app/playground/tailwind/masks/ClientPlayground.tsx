"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function TailwindMasksPlayground() {
    const [maskImage, setMaskImage] = useState("mask-t-from-50%");
    const [maskClip, setMaskClip] = useState("mask-clip-border");
    const [maskSize, setMaskSize] = useState("mask-size-cover");
    const [maskPosition, setMaskPosition] = useState("mask-position-center");
    const [maskRepeat, setMaskRepeat] = useState("mask-repeat-no-repeat");
    const [maskComposite, setMaskComposite] = useState("mask-composite-add");
    const [maskMode, setMaskMode] = useState("mask-mode-match-source");
    const [maskType, setMaskType] = useState("mask-type-alpha");
    const [maskOrigin, setMaskOrigin] = useState("mask-origin-border");

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setMaskImage("mask-t-from-50%");
        setMaskClip("mask-clip-border");
        setMaskSize("mask-size-cover");
        setMaskPosition("mask-position-center");
        setMaskRepeat("mask-repeat-no-repeat");
        setMaskComposite("mask-composite-add");
        setMaskMode("mask-mode-match-source");
        setMaskType("mask-type-alpha");
        setMaskOrigin("mask-origin-border");
    };

    const elementClasses = `${maskImage} ${maskClip} ${maskSize} ${maskPosition} ${maskRepeat} ${maskComposite} ${maskMode} ${maskType} ${maskOrigin} w-64 h-64 shadow-2xl rounded-2xl transition-all duration-300`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`${maskImage} ${maskClip} ${maskSize} ${maskPosition} ${maskRepeat} ${maskComposite} ${maskMode} ${maskType} ${maskOrigin}`);
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
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-cyan-500">
                            Mask Effects
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Control an element's mask image and properties.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Mask Image">
                            <SelectControl
                                value={maskImage}
                                onChange={setMaskImage}
                                options={[
                                    "mask-none",
                                    "mask-t-from-50%",
                                    "mask-b-from-50%",
                                    "mask-l-from-50%",
                                    "mask-r-from-50%",
                                    "mask-x-from-50%",
                                    "mask-y-from-50%",
                                    "mask-linear-45 mask-linear-from-20% mask-linear-to-80%",
                                    "mask-radial mask-radial-at-center",
                                    "mask-conic-45 mask-conic-at-center"
                                ]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Clip">
                            <SelectControl
                                value={maskClip}
                                onChange={setMaskClip}
                                options={["mask-clip-border", "mask-clip-padding", "mask-clip-content", "mask-clip-fill-box", "mask-clip-stroke-box", "mask-clip-view-box", "mask-clip-no-clip"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Size">
                            <SelectControl
                                value={maskSize}
                                onChange={setMaskSize}
                                options={["mask-size-auto", "mask-size-cover", "mask-size-contain"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Position">
                            <SelectControl
                                value={maskPosition}
                                onChange={setMaskPosition}
                                options={["mask-position-center", "mask-position-top", "mask-position-bottom", "mask-position-left", "mask-position-right"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Repeat">
                            <SelectControl
                                value={maskRepeat}
                                onChange={setMaskRepeat}
                                options={["mask-repeat-repeat", "mask-repeat-no-repeat", "mask-repeat-round", "mask-repeat-space"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Composite">
                            <SelectControl
                                value={maskComposite}
                                onChange={setMaskComposite}
                                options={["mask-composite-add", "mask-composite-subtract", "mask-composite-intersect", "mask-composite-exclude"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Mode">
                            <SelectControl
                                value={maskMode}
                                onChange={setMaskMode}
                                options={["mask-mode-match-source", "mask-mode-alpha", "mask-mode-luminance"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Type">
                            <SelectControl
                                value={maskType}
                                onChange={setMaskType}
                                options={["mask-type-alpha", "mask-type-luminance"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mask Origin">
                            <SelectControl
                                value={maskOrigin}
                                onChange={setMaskOrigin}
                                options={["mask-origin-border", "mask-origin-padding", "mask-origin-content", "mask-origin-fill-box", "mask-origin-stroke-box", "mask-origin-view-box"]}
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
                            The background below is masked using the selected utilities.
                        </div>

                        {/* Masked Element */}
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-linear-to-r from-teal-500 to-cyan-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className={elementClasses}>
                                <div className="absolute inset-0 bg-linear-to-br from-teal-400 via-cyan-500 to-blue-600 rounded-2xl" />
                                <div className="absolute inset-0 flex items-center justify-center text-white/20 font-black text-6xl select-none pointer-events-none uppercase tracking-tighter">
                                    Mask
                                </div>
                            </div>
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
                        <div className="p-4 font-mono text-sm text-cyan-300 break-all leading-relaxed">
                            {`${maskImage} ${maskClip} ${maskSize} ${maskPosition} ${maskRepeat} ${maskComposite} ${maskMode} ${maskType} ${maskOrigin}`}
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
