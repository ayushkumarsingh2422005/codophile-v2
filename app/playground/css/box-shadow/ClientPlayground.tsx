"use client";

import React, { useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, Plus, Trash2, Layers } from "lucide-react";
import Link from "next/link";

const BOX_SHADOW_GUIDE: PlaygroundGuideDoc = {
    title: "CSS box-shadow",
    intro:
        "`box-shadow` draws one or more shadows around an element’s border box. Each layer lists optional `inset`, X/Y offset, blur radius, spread radius, and color. Multiple shadows are comma-separated; earlier layers paint on top.",
    syntax: [
        "box-shadow: offset-x offset-y blur spread color;",
        "box-shadow: inset 0 2px 4px rgba(0,0,0,0.2), 0 8px 16px rgba(0,0,0,0.15);",
    ],
    values: [
        { term: "offset-x / offset-y", desc: "How far the shadow is shifted from the element." },
        { term: "blur-radius", desc: "Gaussian blur; 0 gives a hard edge." },
        { term: "spread-radius", desc: "Expands or shrinks the shadow before blur." },
        { term: "color", desc: "Often semi-transparent black or brand colors for depth." },
        { term: "inset", desc: "Draws the shadow inside the box for pressed or inset UI." },
    ],
    tip: "Stack soft outer shadows with tighter darker ones to mimic realistic elevation.",
};

interface ShadowLayer {
    id: string;
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
}

export default function BoxShadowClient() {
    const [layers, setLayers] = useState<ShadowLayer[]>([
        { id: "layer-1", x: 0, y: 4, blur: 14, spread: 0, color: "rgba(0, 0, 0, 0.5)", inset: false }
    ]);
    const [activeLayerId, setActiveLayerId] = useState<string>("layer-1");
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    // Get active layer safely
    const activeLayer = layers.find(l => l.id === activeLayerId) || layers[0];

    // Update active layer property
    const updateLayer = (key: keyof ShadowLayer, value: any) => {
        setLayers(layers.map(layer =>
            layer.id === activeLayerId ? { ...layer, [key]: value } : layer
        ));
    };

    // Add new layer
    const addLayer = () => {
        const newId = `layer-${Date.now()}`;
        setLayers([...layers, { id: newId, x: 10, y: 10, blur: 0, spread: 0, color: "#000000", inset: false }]);
        setActiveLayerId(newId);
    };

    // Remove active layer
    const removeLayer = () => {
        if (layers.length <= 1) return;
        const newLayers = layers.filter(l => l.id !== activeLayerId);
        setLayers(newLayers);
        setActiveLayerId(newLayers[newLayers.length - 1].id);
    };

    // Reset all
    const resetValues = () => {
        setLayers([{ id: "layer-1", x: 0, y: 4, blur: 14, spread: 0, color: "rgba(0,0,0,0.5)", inset: false }]);
        setActiveLayerId("layer-1");
    };

    // Convert hex to rgba if needed for better UX, but simple hex/rgba string is fine for now. 
    // We'll trust the input type="color" or text input.
    // Actually, input type="color" only supports hex. We might need a better color picker later, but basic hex is fine for now.
    // To support opacity, we might need a separate opacity slider or a better color picker. 
    // For this iteration, I'll stick to Hex color + Opacity slider for the active layer to construct rgba? 
    // Or just Hex for simplicity as per legacy? Legacy used hex.
    // Legacy `boxShadow.html` used `<input class="form-range" id="customRange1" type="color">`.
    // So I will stick to Hex.

    // Construct CSS string
    const boxShadowValue = layers.map(l =>
        `${l.inset ? "inset " : ""}${l.x}px ${l.y}px ${l.blur}px ${l.spread}px ${l.color}`
    ).join(", ");

    const handleCopy = () => {
        const code = `.box-element {\n    box-shadow: ${boxShadowValue};\n}`;
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
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Box Shadow
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS box-shadow in this playground"
                                title={`What is ${BOX_SHADOW_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Add shadow effects around an element's frame. Support for multiple layers.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        {/* Layer Manager */}
                        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Layers
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={addLayer}
                                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-cyan-400"
                                        title="Add Layer"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={removeLayer}
                                        disabled={layers.length <= 1}
                                        className="p-1.5 hover:bg-white/10 rounded-md transition-colors text-red-400 disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Remove Layer"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                                {layers.map((layer, index) => (
                                    <button
                                        key={layer.id}
                                        onClick={() => setActiveLayerId(layer.id)}
                                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all w-full text-left border ${activeLayerId === layer.id
                                                ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                                                : "bg-black/20 border-transparent text-gray-400 hover:bg-white/5"
                                            }`}
                                    >
                                        <div className="w-3 h-3 rounded-full border border-white/20" style={{ background: layer.color }} />
                                        Layer {index + 1}
                                        {layer.inset && <span className="ml-auto text-[10px] uppercase bg-white/10 px-1.5 py-0.5 rounded text-white/50">Inset</span>}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Controls for Active Layer */}
                        <ControlGroup title={`Layer Properties`}>
                            <SliderControl
                                label="X Offset"
                                value={activeLayer.x}
                                onChange={(val: number) => updateLayer("x", val)}
                                min={-100} max={100} unit="px"
                            />
                            <SliderControl
                                label="Y Offset"
                                value={activeLayer.y}
                                onChange={(val: number) => updateLayer("y", val)}
                                min={-100} max={100} unit="px"
                            />
                            <SliderControl
                                label="Blur"
                                value={activeLayer.blur}
                                onChange={(val: number) => updateLayer("blur", val)}
                                min={0} max={100} unit="px"
                            />
                            <SliderControl
                                label="Spread"
                                value={activeLayer.spread}
                                onChange={(val: number) => updateLayer("spread", val)}
                                min={-50} max={100} unit="px"
                            />

                            {/* Color & Inset */}
                            <div className="grid grid-cols-2 gap-4 pt-2">
                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-300 block">Color</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="color"
                                            value={activeLayer.color}
                                            onChange={(e) => updateLayer("color", e.target.value)}
                                            className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs text-gray-300 block">Inset</label>
                                    <button
                                        onClick={() => updateLayer("inset", !activeLayer.inset)}
                                        className={`w-full h-8 rounded-lg text-xs font-medium border transition-all ${activeLayer.inset
                                                ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400"
                                                : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                                            }`}
                                    >
                                        {activeLayer.inset ? "Inset On" : "Inset Off"}
                                    </button>
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#f0f0f0] group">
                        {/* Background Image / Pattern - Light background for shadows to pop */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-[#f8f9fa]" />
                            <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]" />
                        </div>

                        {/* The Element */}
                        <div
                            className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-white rounded-xl flex items-center justify-center p-6 text-center transition-all duration-200"
                            style={{
                                boxShadow: boxShadowValue
                            }}
                        >
                            <span className="text-gray-400 font-mono text-xs">Box Element</span>
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
                            <div className="text-purple-400">.box-element <span className="text-white">{`{`}</span></div>
                            <div className="pl-4">
                                <span className="text-cyan-400">box-shadow</span>: <span className="text-orange-300">{boxShadowValue}</span>;
                            </div>
                            <div className="text-white">{`}`}</div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={BOX_SHADOW_GUIDE}
                    onClose={closeGuide}
                    titleId="css-box-shadow-guide-title"
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
                <span className="text-xs font-mono text-cyan-400">{value}{unit}</span>
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

