"use client";

import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, MousePointer2 } from "lucide-react";
import Link from "next/link";

const TOOLTIP_CSS_GUIDE: PlaygroundGuideDoc = {
    title: "CSS-only tooltips",
    intro:
        "This pattern uses a positioned container and a child that is hidden until `:hover`. Opacity transitions create a fade; optional `::after` borders form a CSS triangle arrow. Position values depend on whether the tooltip sits above, below, or beside the trigger.",
    syntax: [
        ".wrap { position: relative; }",
        ".tip { position: absolute; opacity: 0; transition: opacity; }",
        ".wrap:hover .tip { opacity: 1; }",
    ],
    values: [
        { term: "position + offsets", desc: "Places the bubble using top/bottom/left/right and transforms for centering." },
        { term: "visibility / opacity", desc: "Keeps the tip non-interactive until shown while animating fade." },
        { term: "::after arrow", desc: "Zero-size box with colored borders to mimic a caret." },
    ],
    tip: "For keyboard users, mirror hover behavior with `:focus-within` in production CSS.",
};

export default function TooltipClient() {
    // State
    const [position, setPosition] = useState<"top" | "bottom" | "left" | "right">("top");
    const [showArrow, setShowArrow] = useState(true);
    const [bgColor, setBgColor] = useState("#333333");
    const [textColor, setTextColor] = useState("#ffffff");
    const [borderRadius, setBorderRadius] = useState(6);
    const [padding, setPadding] = useState(10);
    const [width, setWidth] = useState(120);
    const [fadeInDuration, setFadeInDuration] = useState(0.3);
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    // Constants
    const arrowSize = 5;

    // Reset function
    const resetValues = () => {
        setPosition("top");
        setShowArrow(true);
        setBgColor("#333333");
        setTextColor("#ffffff");
        setBorderRadius(6);
        setPadding(10);
        setWidth(120);
        setFadeInDuration(0.3);
    };

    // Construct CSS Logic locally for preview and copying
    const generateCSS = () => {
        let css = `.tooltip-container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip-text {
  visibility: hidden;
  width: ${width}px;
  background-color: ${bgColor};
  color: ${textColor};
  text-align: center;
  border-radius: ${borderRadius}px;
  padding: ${padding}px;
  position: absolute;
  z-index: 1;
  opacity: 0;
  transition: opacity ${fadeInDuration}s;
  
  /* Positioning Base */
  ${position === 'top' || position === 'bottom' ? 'left: 50%;\n  transform: translateX(-50%);' : ''}
  ${position === 'left' || position === 'right' ? 'top: 50%;\n  transform: translateY(-50%);' : ''}
`;

        // Specific Position
        if (position === 'top') css += `  bottom: 125%;\n`;
        if (position === 'bottom') css += `  top: 125%;\n`;
        if (position === 'left') css += `  right: 110%;\n`;
        if (position === 'right') css += `  left: 110%;\n`;

        css += `}\n\n`;

        // Hover
        css += `.tooltip-container:hover .tooltip-text {
  visibility: visible;
  opacity: 1;
}\n`;

        // Arrow
        if (showArrow) {
            css += `\n/* Arrow */
.tooltip-text::after {
  content: "";
  position: absolute;
  border-width: ${arrowSize}px;
  border-style: solid;
`;
            if (position === 'top') {
                css += `  top: 100%;
  left: 50%;
  margin-left: -${arrowSize}px;
  border-color: ${bgColor} transparent transparent transparent;`;
            } else if (position === 'bottom') {
                css += `  bottom: 100%;
  left: 50%;
  margin-left: -${arrowSize}px;
  border-color: transparent transparent ${bgColor} transparent;`;
            } else if (position === 'left') {
                css += `  top: 50%;
  left: 100%;
  margin-top: -${arrowSize}px;
  border-color: transparent transparent transparent ${bgColor};`;
            } else if (position === 'right') {
                css += `  top: 50%;
  right: 100%;
  margin-top: -${arrowSize}px;
  border-color: transparent ${bgColor} transparent transparent;`;
            }
            css += `\n}`;
        }

        return css;
    };

    const cssCode = generateCSS();

    const handleCopy = () => {
        navigator.clipboard.writeText(cssCode);
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
                                Tooltip Generator
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS tooltips in this playground"
                                title={`What is ${TOOLTIP_CSS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Create custom CSS tooltips with positioning, arrows, and animations.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Position">
                            <div className="grid grid-cols-2 gap-2">
                                {['top', 'bottom', 'left', 'right'].map((pos) => (
                                    <button
                                        key={pos}
                                        onClick={() => setPosition(pos as any)}
                                        className={`px-3 py-2 text-sm rounded-lg border transition-all ${position === pos
                                                ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400'
                                                : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {pos.charAt(0).toUpperCase() + pos.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Appearance">
                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-gray-300 block mb-1">Background Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <input
                                            type="text"
                                            value={bgColor}
                                            onChange={(e) => setBgColor(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded px-2 text-xs text-gray-300 font-mono"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-300 block mb-1">Text Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={textColor}
                                            onChange={(e) => setTextColor(e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer bg-transparent border-none"
                                        />
                                        <input
                                            type="text"
                                            value={textColor}
                                            onChange={(e) => setTextColor(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded px-2 text-xs text-gray-300 font-mono"
                                        />
                                    </div>
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Dimensions & Style">
                            <SliderControl label="Width" value={width} onChange={setWidth} min={50} max={300} unit="px" />
                            <SliderControl label="Padding" value={padding} onChange={setPadding} min={0} max={30} unit="px" />
                            <SliderControl label="Border Radius" value={borderRadius} onChange={setBorderRadius} min={0} max={20} unit="px" />
                        </ControlGroup>

                        <ControlGroup title="Animation & Arrow">
                            <SliderControl label="Fade In Duration" value={fadeInDuration} onChange={setFadeInDuration} min={0} max={2} step={0.1} unit="s" />
                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-300">Show Arrow</label>
                                <button
                                    onClick={() => setShowArrow(!showArrow)}
                                    className={`w-10 h-5 rounded-full relative transition-colors ${showArrow ? 'bg-cyan-500' : 'bg-white/10'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${showArrow ? 'left-6' : 'left-1'}`} />
                                </button>
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
                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-linear-to-br from-blue-900/10 via-transparent to-purple-900/10" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[40px_40px]" />
                        </div>

                        {/* Style Injection */}
                        <style>{cssCode}</style>

                        {/* Interactive Element */}
                        <div className="tooltip-container px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors text-white font-medium">
                            Hover Me
                            <div className="tooltip-text">
                                Tooltip Text
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
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 whitespace-pre">
                            {cssCode}
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={TOOLTIP_CSS_GUIDE}
                    onClose={closeGuide}
                    titleId="css-tooltip-guide-title"
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
