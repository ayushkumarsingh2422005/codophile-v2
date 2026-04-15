"use client";

import React, { useCallback, useState, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, MousePointer2 } from "lucide-react";
import Link from "next/link";

const TW_SCROLL_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind scroll utilities",
    intro:
        "Scroll-smooth changes programmatic scrolling behavior; `snap-*` utilities enable CSS scroll snap on containers and children; `scroll-p-*` / `scroll-m-*` adjust padding and margin for scroll snapping alignment.",
    syntax: [
        'className="overflow-x-auto scroll-smooth snap-x snap-mandatory snap-center"',
        "/* scroll-padding / margin use scroll-p-* / scroll-m-* */",
    ],
    values: [
        { term: "scroll-smooth / scroll-auto", desc: "scroll-behavior for smooth scrolling." },
        { term: "snap-* (type, mandatory, align)", desc: "Defines axis and snap alignment for child items." },
        { term: "scroll-p-* / scroll-m-*", desc: "Offsets that affect snap alignment and padding." },
    ],
    tip: "The scroll container needs `overflow` set and children wider than the viewport for horizontal snap demos.",
};

export default function TailwindScrollPlayground() {
    const [scrollBehavior, setScrollBehavior] = useState("scroll-smooth");
    const [snapType, setSnapType] = useState("snap-x");
    const [snapStrictness, setSnapStrictness] = useState("snap-mandatory");
    const [snapAlign, setSnapAlign] = useState("snap-center");
    const [snapStop, setSnapStop] = useState("snap-normal");
    const [scrollPadding, setScrollPadding] = useState("scroll-p-0");
    const [scrollMargin, setScrollMargin] = useState("scroll-m-0");

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const resetValues = () => {
        setScrollBehavior("scroll-smooth");
        setSnapType("snap-x");
        setSnapStrictness("snap-mandatory");
        setSnapAlign("snap-center");
        setSnapStop("snap-normal");
        setScrollPadding("scroll-p-0");
        setScrollMargin("scroll-m-0");
    };

    const containerClasses = `flex overflow-x-auto w-full max-w-2xl h-64 rounded-xl border border-white/10 bg-black/40 ${scrollBehavior} ${snapType} ${snapStrictness} ${scrollPadding} custom-scrollbar`;
    const itemClasses = `flex-shrink-0 w-48 h-full flex flex-col items-center justify-center text-white font-bold text-2xl ${snapAlign} ${snapStop} ${scrollMargin} transition-all duration-300`;

    const handleCopy = () => {
        const classes = `${scrollBehavior} ${snapType} ${snapStrictness} ${snapAlign} ${snapStop} ${scrollPadding} ${scrollMargin}`;
        navigator.clipboard.writeText(classes);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const scrollToItem = (index: number) => {
        if (scrollContainerRef.current) {
            const itemWidth = 192; // w-48
            scrollContainerRef.current.scrollTo({
                left: index * itemWidth,
                behavior: scrollBehavior.includes('smooth') ? 'smooth' : 'auto'
            });
        }
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">
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
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-400 to-indigo-500">
                                Scroll Utilities
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind scroll utilities in this playground"
                                title={`What is ${TW_SCROLL_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Control scroll behavior, snapping, and offsets.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                        <ControlGroup title="Scroll Behavior">
                            <SelectControl
                                value={scrollBehavior}
                                onChange={setScrollBehavior}
                                options={["scroll-auto", "scroll-smooth"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Snap Type">
                            <SelectControl
                                value={snapType}
                                onChange={setSnapType}
                                options={["snap-none", "snap-x", "snap-y", "snap-both"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Snap Strictness">
                            <SelectControl
                                value={snapStrictness}
                                onChange={setSnapStrictness}
                                options={["snap-mandatory", "snap-proximity"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Snap Align">
                            <SelectControl
                                value={snapAlign}
                                onChange={setSnapAlign}
                                options={["snap-start", "snap-end", "snap-center", "snap-align-none"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Snap Stop">
                            <SelectControl
                                value={snapStop}
                                onChange={setSnapStop}
                                options={["snap-normal", "snap-always"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Scroll Padding">
                            <SelectControl
                                value={scrollPadding}
                                onChange={setScrollPadding}
                                options={["scroll-p-0", "scroll-p-4", "scroll-p-8", "scroll-p-12", "scroll-p-16", "scroll-px-8", "scroll-py-8"]}
                            />
                        </ControlGroup>

                        <ControlGroup title="Scroll Margin">
                            <SelectControl
                                value={scrollMargin}
                                onChange={setScrollMargin}
                                options={["scroll-m-0", "scroll-m-4", "scroll-m-8", "scroll-m-12", "scroll-m-16", "scroll-mx-8", "scroll-my-8"]}
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden bg-[#0a0a0a] p-8 flex flex-col items-center justify-center gap-8">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]" />

                        <div className="text-gray-400 text-sm max-w-md text-center">
                            Scroll horizontally in the area below to see snapping in action. Use the buttons to trigger programmatic smooth scrolling.
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex gap-2 z-10">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollToItem(i)}
                                    className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs hover:bg-white/10 transition-colors"
                                >
                                    Item {i + 1}
                                </button>
                            ))}
                        </div>

                        {/* Scroll Container */}
                        <div ref={scrollContainerRef} className={containerClasses}>
                            <div className={`${itemClasses} bg-linear-to-br from-blue-500 to-indigo-600`}>1</div>
                            <div className={`${itemClasses} bg-linear-to-br from-indigo-500 to-purple-600`}>2</div>
                            <div className={`${itemClasses} bg-linear-to-br from-purple-500 to-pink-600`}>3</div>
                            <div className={`${itemClasses} bg-linear-to-br from-pink-500 to-orange-600`}>4</div>
                            <div className={`${itemClasses} bg-linear-to-br from-orange-500 to-yellow-600`}>5</div>
                            <div className={`${itemClasses} bg-linear-to-br from-yellow-500 to-green-600`}>6</div>
                            <div className={`${itemClasses} bg-linear-to-br from-green-500 to-teal-600`}>7</div>
                            <div className={`${itemClasses} bg-linear-to-br from-teal-500 to-blue-600`}>8</div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <MousePointer2 className="w-3 h-3" />
                            Drag or use trackpad to scroll
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
                            {`${scrollBehavior} ${snapType} ${snapStrictness} ${snapAlign} ${snapStop} ${scrollPadding} ${scrollMargin}`}
                        </div>
                    </div>
                </motion.div>
            </div>
            {guideOpen && (
                <PlaygroundGuideModal doc={TW_SCROLL_GUIDE} onClose={closeGuide} titleId="tw-scroll-guide-title" />
            )}
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
