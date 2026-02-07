"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Type } from "lucide-react";
import Link from "next/link";

export default function TypographyPlayground() {
    // Line Height & Letter Spacing
    const [lineHeight, setLineHeight] = useState(1.5);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [fontSize, setFontSize] = useState(16);
    const [fontWeight, setFontWeight] = useState(400);

    // Text Decoration
    const [textDecorationLine, setTextDecorationLine] = useState("none");
    const [textDecorationColor, setTextDecorationColor] = useState("#000000");
    const [textDecorationStyle, setTextDecorationStyle] = useState("solid");
    const [textDecorationThickness, setTextDecorationThickness] = useState(1);

    // Sample Text
    const [text, setText] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.");
    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setLineHeight(1.5);
        setLetterSpacing(0);
        setFontSize(16);
        setFontWeight(400);
        setTextDecorationLine("none");
        setTextDecorationColor("#000000");
        setTextDecorationStyle("solid");
        setTextDecorationThickness(1);
    };

    // Construct the CSS string
    const cssOutput = `font-size: ${fontSize}px;
    font-weight: ${fontWeight};
    line-height: ${lineHeight};
    letter-spacing: ${letterSpacing}px;
    text-decoration: ${textDecorationLine} ${textDecorationStyle} ${textDecorationColor} ${textDecorationThickness}px;`;

    // Modern shorthand vs individual properties. 
    // text-decoration shorthand: line style color thickness? (Thickness is often not in shorthand in older browsers but modern supports it).
    // Let's stick to the generated string logic which is robust.

    const handleCopy = () => {
        const code = `.typography-element {\n    ${cssOutput.replace(/\n/g, '\n    ')}\n}`;
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
                    className="w-full lg:w-96 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                            Typography
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Control line height, spacing, decoration, and font properties.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Spacing & Font">
                            <SliderControl label="Font Size" value={fontSize} onChange={setFontSize} min={12} max={64} unit="px" />
                            <SliderControl label="Line Height" value={lineHeight} onChange={setLineHeight} min={0.5} max={3} step={0.1} unit="" />
                            <SliderControl label="Letter Spacing" value={letterSpacing} onChange={setLetterSpacing} min={-5} max={10} step={0.1} unit="px" />
                            <SliderControl label="Font Weight" value={fontWeight} onChange={setFontWeight} min={100} max={900} step={100} unit="" />
                        </ControlGroup>

                        <ControlGroup title="Text Decoration">
                            <SelectControl
                                label="Line"
                                value={textDecorationLine}
                                onChange={setTextDecorationLine}
                                options={['none', 'underline', 'overline', 'line-through']}
                            />

                            {textDecorationLine !== 'none' && (
                                <>
                                    <SelectControl
                                        label="Style"
                                        value={textDecorationStyle}
                                        onChange={setTextDecorationStyle}
                                        options={['solid', 'double', 'dotted', 'dashed', 'wavy']}
                                    />

                                    <SliderControl label="Thickness" value={textDecorationThickness} onChange={setTextDecorationThickness} min={1} max={10} unit="px" />

                                    <div className="space-y-1.5 pt-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs text-gray-300">Color</label>
                                            <span className="text-xs font-mono text-cyan-400">{textDecorationColor}</span>
                                        </div>
                                        <input
                                            type="color"
                                            value={textDecorationColor}
                                            onChange={(e) => setTextDecorationColor(e.target.value)}
                                            className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                                        />
                                    </div>
                                </>
                            )}
                        </ControlGroup>

                        <ControlGroup title="Preview Text">
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 min-h-[100px] resize-y"
                                placeholder="Enter text..."
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


                {/* Preview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#f0f0f0] group">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-size-[20px_20px]" />
                        </div>

                        {/* The Text Element */}
                        <div
                            className="relative z-10 w-full max-w-2xl p-8 text-gray-900 transition-all duration-300"
                            style={{
                                fontSize: `${fontSize}px`,
                                lineHeight: lineHeight,
                                letterSpacing: `${letterSpacing}px`,
                                fontWeight: fontWeight,
                                textDecorationLine: textDecorationLine,
                                textDecorationStyle: textDecorationStyle as any,
                                textDecorationColor: textDecorationColor,
                                textDecorationThickness: `${textDecorationThickness}px`
                            }}
                        >
                            {text}
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
                            <div className="text-purple-400">.typography-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">font-size</span>: <span className="text-orange-300">{fontSize}px</span>;
                            </div>
                            <div className="pl-4">
                                <span className="text-cyan-400">font-weight</span>: <span className="text-orange-300">{fontWeight}</span>;
                            </div>
                            <div className="pl-4">
                                <span className="text-cyan-400">line-height</span>: <span className="text-orange-300">{lineHeight}</span>;
                            </div>
                            <div className="pl-4">
                                <span className="text-cyan-400">letter-spacing</span>: <span className="text-orange-300">{letterSpacing}px</span>;
                            </div>
                            <div className="pl-4">
                                <span className="text-cyan-400">text-decoration</span>: <span className="text-orange-300">{textDecorationLine} {textDecorationStyle} {textDecorationColor} {textDecorationThickness}px</span>;
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

function SelectControl({ label, value, onChange, options }: any) {
    return (
        <div className="space-y-1.5">
            <label className="text-xs text-gray-300">{label}</label>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-gray-900 text-white">
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}
