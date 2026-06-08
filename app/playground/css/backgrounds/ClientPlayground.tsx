"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function BackgroundClient() {
    const [activeTab, setActiveTab] = useState<"basics" | "image" | "advanced">("basics");

    // Basics: Color & Gradient
    const [type, setType] = useState<"color" | "gradient" | "image">("color");
    const [backgroundColor, setBackgroundColor] = useState("#3b82f6");
    const [gradientType, setGradientType] = useState("linear");
    const [gradientDirection, setGradientDirection] = useState("to right");
    const [gradientColor1, setGradientColor1] = useState("#3b82f6");
    const [gradientColor2, setGradientColor2] = useState("#9333ea");

    // Image Properties
    const [bgImage, setBgImage] = useState("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80");
    const [bgSize, setBgSize] = useState("cover");
    const [bgPosition, setBgPosition] = useState("center");
    const [bgRepeat, setBgRepeat] = useState("no-repeat");
    const [bgAttachment, setBgAttachment] = useState("scroll");

    // Advanced: Clip & Blend
    const [bgClip, setBgClip] = useState("border-box");
    const [bgBlendMode, setBgBlendMode] = useState("normal");
    const [bgOrigin, setBgOrigin] = useState("border-box");

    const [copied, setCopied] = useState(false);

    // Reset function
    const resetValues = () => {
        setType("color");
        setBackgroundColor("#3b82f6");
        setGradientType("linear");
        setGradientDirection("to right");
        setGradientColor1("#3b82f6");
        setGradientColor2("#9333ea");
        setBgSize("cover");
        setBgPosition("center");
        setBgRepeat("no-repeat");
        setBgAttachment("scroll");
        setBgClip("border-box");
        setBgBlendMode("normal");
        setBgOrigin("border-box");
    };

    // Construct the CSS string
    const getBackgroundValue = () => {
        if (type === "color") return backgroundColor;
        return `${gradientType}-gradient(${gradientDirection === 'center' ? 'circle at center' : gradientDirection}, ${gradientColor1}, ${gradientColor2})`;
    };

    const finalBackground = type === "image" ? `url('${bgImage}')` : getBackgroundValue();

    // Logic to optionally include image even in 'advanced' mode
    const isImageMode = activeTab === "image" || activeTab === "advanced";
    const computedBackground = isImageMode ? `url('${bgImage}')` : getBackgroundValue();

    // Generate output code
    let cssOutput = "";
    if (activeTab === "basics") {
        cssOutput = `background: ${getBackgroundValue()};`;
    } else if (activeTab === "image") {
        cssOutput = `background-image: url('${bgImage}');
    background-size: ${bgSize};
    background-position: ${bgPosition};
    background-repeat: ${bgRepeat};
    background-attachment: ${bgAttachment};`;
    } else {
        cssOutput = `background-image: url('${bgImage}');
    background-color: ${backgroundColor}; 
    background-blend-mode: ${bgBlendMode};
    background-clip: ${bgClip};
    background-origin: ${bgOrigin};
    /* Note: background-clip: text requires -webkit-background-clip: text; and color: transparent; */
    ${bgClip === 'text' ? '-webkit-background-clip: text;\n    color: transparent;' : ''}`;
    }

    const handleCopy = () => {
        const code = `.background-element {\n    ${cssOutput.replace(/\n/g, '\n    ')}\n}`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">

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
                            Backgrounds
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Master background colors, gradients, images, clipping, and blending.
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex p-1 bg-white/5 rounded-xl border border-white/5">
                        {["basics", "image", "advanced"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab as any); if (tab === 'image' || tab === 'advanced') setType('image'); else setType('color'); }}
                                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all capitalize ${activeTab === tab
                                    ? "bg-cyan-500/20 text-cyan-400 shadow-sm border border-cyan-500/20"
                                    : "text-gray-400 hover:text-white"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-300px)]">

                        {activeTab === "basics" && (
                            <>
                                <ControlGroup title="Background Type">
                                    <div className="flex gap-2">
                                        <button onClick={() => setType("color")} className={`flex-1 py-1.5 text-xs rounded border ${type === 'color' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-white/10 text-gray-400'}`}>Solid Color</button>
                                        <button onClick={() => setType("gradient")} className={`flex-1 py-1.5 text-xs rounded border ${type === 'gradient' ? 'border-cyan-500 text-cyan-400 bg-cyan-500/10' : 'border-white/10 text-gray-400'}`}>Gradient</button>
                                    </div>
                                </ControlGroup>

                                {type === "color" ? (
                                    <ControlGroup title="Solid Color">
                                        <ColorControl label="Color" value={backgroundColor} onChange={setBackgroundColor} />
                                    </ControlGroup>
                                ) : (
                                    <ControlGroup title="Gradient Settings">
                                        <SelectControl
                                            label="Type"
                                            value={gradientType}
                                            onChange={setGradientType}
                                            options={['linear', 'radial']}
                                        />
                                        <SelectControl
                                            label="Direction/Shape"
                                            value={gradientDirection}
                                            onChange={setGradientDirection}
                                            options={gradientType === 'linear' ? ['to right', 'to left', 'to bottom', 'to top', 'to bottom right', '45deg'] : ['circle', 'ellipse', 'closest-side', 'farthest-side']}
                                        />
                                        <ColorControl label="Stop 1" value={gradientColor1} onChange={setGradientColor1} />
                                        <ColorControl label="Stop 2" value={gradientColor2} onChange={setGradientColor2} />
                                    </ControlGroup>
                                )}
                            </>
                        )}

                        {activeTab === "image" && (
                            <>
                                <ControlGroup title="Image Source">
                                    <input
                                        type="text"
                                        value={bgImage}
                                        onChange={(e) => setBgImage(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg text-xs p-2 text-gray-300 outline-none focus:border-cyan-500"
                                    />
                                    <div className="flex gap-2 mt-2">
                                        <button onClick={() => setBgImage("https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1000&q=80")} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded">Abstract</button>
                                        <button onClick={() => setBgImage("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1000&q=80")} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded">City</button>
                                        <button onClick={() => setBgImage("https://images.unsplash.com/photo-1518531933037-91b2f5fe8e56?auto=format&fit=crop&w=1000&q=80")} className="text-[10px] bg-white/5 hover:bg-white/10 px-2 py-1 rounded">Space</button>
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Positioning">
                                    <SelectControl label="Size" value={bgSize} onChange={setBgSize} options={['cover', 'contain', 'auto', '100% 100%', '50%']} />
                                    <SelectControl label="Position" value={bgPosition} onChange={setBgPosition} options={['center', 'top', 'bottom', 'left', 'right', 'top left', 'bottom right']} />
                                    <SelectControl label="Repeat" value={bgRepeat} onChange={setBgRepeat} options={['no-repeat', 'repeat', 'repeat-x', 'repeat-y', 'space', 'round']} />
                                    <SelectControl label="Attachment" value={bgAttachment} onChange={setBgAttachment} options={['scroll', 'fixed', 'local']} />
                                </ControlGroup>
                            </>
                        )}

                        {activeTab === "advanced" && (
                            <>
                                <ControlGroup title="Blend Mode">
                                    <p className="text-[10px] text-gray-400 mb-2">Blends the image with the background color below.</p>
                                    <ColorControl label="Back Layer Color" value={backgroundColor} onChange={setBackgroundColor} />
                                    <SelectControl
                                        label="Blend Mode"
                                        value={bgBlendMode}
                                        onChange={setBgBlendMode}
                                        options={['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'saturation', 'color', 'luminosity']}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Clip & Origin">
                                    <SelectControl label="Origin" value={bgOrigin} onChange={setBgOrigin} options={['border-box', 'padding-box', 'content-box']} />
                                    <SelectControl label="Clip" value={bgClip} onChange={setBgClip} options={['border-box', 'padding-box', 'content-box', 'text']} />
                                </ControlGroup>
                            </>
                        )}

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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] p-8">
                        {/* Checkerboard for transparency */}
                        <div className="absolute inset-0 z-0 bg-[linear-gradient(45deg,#222_25%,transparent_25%,transparent_75%,#222_75%,#222),linear-gradient(45deg,#222_25%,transparent_25%,transparent_75%,#222_75%,#222)] bg-size-[20px_20px] bg-pos-[0_0,10px_10px]" />

                        {/* The Element */}
                        <div
                            className={`
                                relative z-10 w-full max-w-md h-64 md:h-80 border-[10px] border-dashed border-white/20 p-8
                                transition-all duration-300 flex items-center justify-center
                                ${bgClip === 'text' ? 'text-transparent text-6xl md:text-8xl font-black uppercase' : 'text-white text-lg font-medium'}
                            `}
                            style={{
                                background: activeTab === 'basics' && type === 'color' ? backgroundColor : undefined,
                                backgroundImage: activeTab === 'basics' && type === 'gradient' ? getBackgroundValue() : (activeTab === 'image' || activeTab === 'advanced' ? `url('${bgImage}')` : undefined),
                                backgroundColor: activeTab === 'advanced' ? backgroundColor : undefined, // For blending
                                backgroundSize: bgSize,
                                backgroundPosition: bgPosition,
                                backgroundRepeat: bgRepeat,
                                backgroundAttachment: bgAttachment,
                                backgroundClip: bgClip === 'text' ? 'text' : bgClip as any,
                                WebkitBackgroundClip: bgClip === 'text' ? 'text' : bgClip as any,
                                backgroundBlendMode: bgBlendMode as any,
                                backgroundOrigin: bgOrigin as any,
                                // For visualization of border/padding box
                                padding: '2rem',
                            }}
                        >
                            {bgClip === 'text' ? 'CLIP' : 'Background Content'}
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
                            <div className="text-purple-400">.background-element <span className="text-white">{`{`}</span></div>
                            <div className="text-orange-300 pl-4">{cssOutput}</div>
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

function ColorControl({ label, value, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}</span>
            </div>
            <div className="flex gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-8 rounded cursor-pointer bg-transparent border border-white/20 p-0"
                />
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg text-xs px-2 text-gray-300 outline-none focus:border-cyan-500/50"
                />
            </div>
        </div>
    );
}

