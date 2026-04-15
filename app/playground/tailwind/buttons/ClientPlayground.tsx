"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, MousePointer2, Layers, Palette, BoxSelect } from "lucide-react";
import Link from "next/link";

const TAILWIND_COLORS = [
    { name: "Slate", class: "slate", hex: "#64748b" },
    { name: "Gray", class: "gray", hex: "#6b7280" },
    { name: "Zinc", class: "zinc", hex: "#71717a" },
    { name: "Neutral", class: "neutral", hex: "#737373" },
    { name: "Stone", class: "stone", hex: "#78716c" },
    { name: "Red", class: "red", hex: "#ef4444" },
    { name: "Orange", class: "orange", hex: "#f97316" },
    { name: "Amber", class: "amber", hex: "#f59e0b" },
    { name: "Yellow", class: "yellow", hex: "#eab308" },
    { name: "Lime", class: "lime", hex: "#84cc16" },
    { name: "Green", class: "green", hex: "#22c55e" },
    { name: "Emerald", class: "emerald", hex: "#10b981" },
    { name: "Teal", class: "teal", hex: "#14b8a6" },
    { name: "Cyan", class: "cyan", hex: "#06b6d4" },
    { name: "Sky", class: "sky", hex: "#0ea5e9" },
    { name: "Blue", class: "blue", hex: "#3b82f6" },
    { name: "Indigo", class: "indigo", hex: "#6366f1" },
    { name: "Violet", class: "violet", hex: "#8b5cf6" },
    { name: "Purple", class: "purple", hex: "#a855f7" },
    { name: "Fuchsia", class: "fuchsia", hex: "#d946ef" },
    { name: "Pink", class: "pink", hex: "#ec4899" },
    { name: "Rose", class: "rose", hex: "#f43f5e" },
];

const SHADES = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];

const PADDING_OPTIONS = [
    { label: "S", x: "px-3", y: "py-1.5" },
    { label: "M", x: "px-4", y: "py-2" },
    { label: "L", x: "px-6", y: "py-3" },
    { label: "XL", x: "px-8", y: "py-4" },
];

const ROUNDED_OPTIONS = [
    { label: "None", value: "rounded-none" },
    { label: "SM", value: "rounded-sm" },
    { label: "MD", value: "rounded-md" },
    { label: "LG", value: "rounded-lg" },
    { label: "Full", value: "rounded-full" },
];

const SHADOW_OPTIONS = [
    { label: "None", value: "shadow-none" },
    { label: "SM", value: "shadow-sm" },
    { label: "MD", value: "shadow" },
    { label: "LG", value: "shadow-lg" },
    { label: "XL", value: "shadow-xl" },
    { label: "2XL", value: "shadow-2xl" },
];

const TW_BUTTONS_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind button utilities",
    intro:
        "Buttons are composed from palette-based `bg-*`, `text-*`, `px/py`, `rounded-*`, optional `border-*`, `shadow-*`, and `hover:` / `focus:` variants. This playground concatenates class strings—ensure dynamic colors are safelisted in your Tailwind config.",
    syntax: ['className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"'],
    values: [
        { term: "spacing + rounded", desc: "Padding and corner radius from the design scale." },
        { term: "hover: variants", desc: "Alternate colors on pointer hover." },
        { term: "focus:ring-*", desc: "Visible focus rings for keyboard users." },
    ],
    tip: "Use component libraries or `@apply` in CSS when the same bundle of classes repeats.",
};

export default function ButtonsClient() {
    // --- State ---
    const [activeTab, setActiveTab] = useState<"style" | "hover" | "shadow" | "group">("style");
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    // Content
    const [buttonText, setButtonText] = useState("Button");

    // Style Props
    const [bgStartColor, setBgStartColor] = useState("blue");
    const [bgShade, setBgShade] = useState("600");
    const [textStartColor, setTextStartColor] = useState("white");
    const [textShade, setTextShade] = useState(""); // empty for basic white/black, or a shade
    const [padding, setPadding] = useState(PADDING_OPTIONS[1]);
    const [rounded, setRounded] = useState(ROUNDED_OPTIONS[3]);
    const [borderWidth, setBorderWidth] = useState("border-transparent"); // or border, border-2
    const [borderColor, setBorderColor] = useState("border-transparent");

    // Hover Props
    const [hoverBgColor, setHoverBgColor] = useState("blue");
    const [hoverBgShade, setHoverBgShade] = useState("700");
    const [hoverTextColor, setHoverTextColor] = useState("white");
    const [hoverTextShade, setHoverTextShade] = useState("");
    const [transition, setTransition] = useState("transition-colors");
    const [duration, setDuration] = useState("duration-200");

    // Shadow Props
    const [shadow, setShadow] = useState(SHADOW_OPTIONS[0]);

    // Group Props
    const [isGroup, setIsGroup] = useState(false);
    const [groupSpace, setGroupSpace] = useState("space-x-2");

    // --- Computed Classes ---
    const getButtonClasses = () => {
        const bgClass = `bg-${bgStartColor}-${bgShade}`;
        // For text color, if shade is empty, handle special cases or default
        const textClass = textShade ? `text-${textStartColor}-${textShade}` : `text-${textStartColor}`;

        const hoverBgClass = `hover:bg-${hoverBgColor}-${hoverBgShade}`;
        const hoverTextClass = hoverTextShade ? `hover:text-${hoverTextColor}-${hoverTextShade}` : `hover:text-${hoverTextColor}`;

        const borderClass = borderWidth !== "border-transparent" ? `${borderWidth} ${borderColor}` : "";

        let classes = [
            bgClass,
            textClass,
            padding.x,
            padding.y,
            rounded.value,
            borderClass,
            shadow.value,
            transition,
            duration,
            hoverBgClass,
            hoverTextClass,
            "font-medium", // default good look
            "focus:outline-none focus:ring-2 focus:ring-offset-2", // accessibility defaults
            `focus:ring-${bgStartColor}-${bgShade}`
        ].filter(Boolean).join(" ");

        return classes;
    };

    const getGroupClasses = () => {
        return `flex ${groupSpace}`;
    };

    const generateCode = () => {
        const btnClass = getButtonClasses();
        if (isGroup) {
            return `<div class="${getGroupClasses()}">\n  <button class="${btnClass}">${buttonText} 1</button>\n  <button class="${btnClass}">${buttonText} 2</button>\n  <button class="${btnClass}">${buttonText} 3</button>\n</div>`;
        }
        return `<button class="${btnClass}">\n  ${buttonText}\n</button>`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const resetValues = () => {
        setButtonText("Button");
        setBgStartColor("blue");
        setBgShade("600");
        setTextStartColor("white");
        setTextShade("");
        setPadding(PADDING_OPTIONS[1]);
        setRounded(ROUNDED_OPTIONS[3]);
        setBorderWidth("border-transparent");
        setBorderColor("border-transparent");
        setHoverBgColor("blue");
        setHoverBgShade("700");
        setHoverTextColor("white");
        setHoverTextShade("");
        setTransition("transition-colors");
        setDuration("duration-200");
        setShadow(SHADOW_OPTIONS[0]);
        setIsGroup(false);
        setGroupSpace("space-x-2");
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">

                {/* Controls Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-96 shrink-0 flex flex-col gap-6 lg:sticky lg:top-24 max-h-none lg:max-h-[calc(100vh-120px)]"
                >
                    <div className="space-y-2">
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Tailwind Buttons
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind button utilities in this playground"
                                title={`What is ${TW_BUTTONS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Design Tailwind buttons using utility classes.
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
                        {[
                            { id: "style", icon: Palette, label: "Style" },
                            { id: "hover", icon: MousePointer2, label: "Hover" },
                            { id: "shadow", icon: Layers, label: "Shadow" },
                            { id: "group", icon: BoxSelect, label: "Group" },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${activeTab === tab.id
                                    ? "bg-cyan-500/10 text-cyan-400 shadow-sm ring-1 ring-cyan-500/50"
                                    : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <tab.icon className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-300px)]">

                        {/* STYLE TAB */}
                        {activeTab === "style" && (
                            <div className="space-y-6">
                                <ControlGroup title="Content">
                                    <div className="space-y-1.5">
                                        <label className="text-xs text-gray-300">Button Text</label>
                                        <input
                                            type="text"
                                            value={buttonText}
                                            onChange={(e) => setButtonText(e.target.value)}
                                            className="w-full bg-black/20 border border-white/10 rounded-lg h-9 text-xs text-gray-300 px-3 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Background Color">
                                    <TailwindColorPicker
                                        selectedColor={bgStartColor}
                                        selectedShade={bgShade}
                                        onColorChange={setBgStartColor}
                                        onShadeChange={setBgShade}
                                    />
                                </ControlGroup>

                                <ControlGroup title="Text Color">
                                    <div className="space-y-3">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => { setTextStartColor("white"); setTextShade(""); }}
                                                className={`px-3 py-1.5 text-xs rounded border transition-colors ${textStartColor === "white" ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                            >
                                                White
                                            </button>
                                            <button
                                                onClick={() => { setTextStartColor("black"); setTextShade(""); }}
                                                className={`px-3 py-1.5 text-xs rounded border transition-colors ${textStartColor === "black" ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                            >
                                                Black
                                            </button>
                                        </div>
                                    </div>
                                </ControlGroup>

                                <ControlGroup title="Size & Shape">
                                    <div className="space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300">Padding</label>
                                            <div className="grid grid-cols-4 gap-2">
                                                {PADDING_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.label}
                                                        onClick={() => setPadding(opt)}
                                                        className={`py-1.5 text-xs rounded border transition-colors ${padding.label === opt.label ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs text-gray-300">Rounded</label>
                                            <div className="grid grid-cols-5 gap-2">
                                                {ROUNDED_OPTIONS.map((opt) => (
                                                    <button
                                                        key={opt.label}
                                                        onClick={() => setRounded(opt)}
                                                        className={`py-1.5 px-0 text-[10px] rounded border transition-colors truncate ${rounded.label === opt.label ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                                        title={opt.label}
                                                    >
                                                        {opt.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </ControlGroup>
                            </div>
                        )}

                        {/* HOVER TAB */}
                        {activeTab === "hover" && (
                            <div className="space-y-6">
                                <ControlGroup title="Hover Background">
                                    <TailwindColorPicker
                                        selectedColor={hoverBgColor}
                                        selectedShade={hoverBgShade}
                                        onColorChange={setHoverBgColor}
                                        onShadeChange={setHoverBgShade}
                                    />
                                </ControlGroup>
                                <ControlGroup title="Transition Speed">
                                    <div className="grid grid-cols-3 gap-2">
                                        {["duration-75", "duration-100", "duration-150", "duration-200", "duration-300", "duration-500"].map((d) => (
                                            <button
                                                key={d}
                                                onClick={() => setDuration(d)}
                                                className={`py-1.5 text-xs rounded border transition-colors ${duration === d ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                            >
                                                {d.replace("duration-", "")}ms
                                            </button>
                                        ))}
                                    </div>
                                </ControlGroup>
                            </div>
                        )}

                        {/* SHADOW TAB */}
                        {activeTab === "shadow" && (
                            <div className="space-y-6">
                                <ControlGroup title="Box Shadow">
                                    <div className="grid grid-cols-3 gap-2">
                                        {SHADOW_OPTIONS.map((opt) => (
                                            <button
                                                key={opt.label}
                                                onClick={() => setShadow(opt)}
                                                className={`py-2 text-xs rounded border transition-colors ${shadow.label === opt.label ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </ControlGroup>
                            </div>
                        )}

                        {/* GROUP TAB */}
                        {activeTab === "group" && (
                            <div className="space-y-6">
                                <ControlGroup title="Button Group">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-300">Enable Group</span>
                                        <button
                                            onClick={() => setIsGroup(!isGroup)}
                                            className={`w-11 h-6 rounded-full transition-colors relative ${isGroup ? "bg-cyan-500" : "bg-white/10"}`}
                                        >
                                            <span className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${isGroup ? "translate-x-5" : "translate-x-0"}`} />
                                        </button>
                                    </div>
                                </ControlGroup>

                                {isGroup && (
                                    <ControlGroup title="Spacing">
                                        <div className="grid grid-cols-3 gap-2">
                                            {["space-x-0", "space-x-2", "space-x-4", "space-x-8"].map((s) => (
                                                <button
                                                    key={s}
                                                    onClick={() => setGroupSpace(s)}
                                                    className={`py-1.5 text-xs rounded border transition-colors ${groupSpace === s ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-400" : "bg-white/5 border-white/10 text-gray-400"}`}
                                                >
                                                    {s}
                                                </button>
                                            ))}
                                        </div>
                                    </ControlGroup>
                                )}
                            </div>
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#f0f0f0] group">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 z-0">
                            <div className="absolute inset-0 bg-[#f8f9fa]" />
                            <div className="absolute inset-0 bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-size-[20px_20px]" />
                        </div>

                        <div className="relative z-10 p-8">
                            {isGroup ? (
                                <div className={getGroupClasses()}>
                                    {[1, 2, 3].map((num) => (
                                        <button key={num} className={getButtonClasses()}>
                                            {buttonText} {num}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <button className={getButtonClasses()}>
                                    {buttonText}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">Tailwind HTML</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300">
                            <pre className="whitespace-pre-wrap break-all">{generateCode()}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal doc={TW_BUTTONS_GUIDE} onClose={closeGuide} titleId="tw-buttons-guide-title" />
            )}

            <Footer />
        </div>
    );
}

// Helpers
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

function TailwindColorPicker({ selectedColor, selectedShade, onColorChange, onShadeChange }: any) {
    return (
        <div className="space-y-3">
            <div className="space-y-1.5">
                <label className="text-xs text-gray-300">Color Family</label>
                <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto custom-scrollbar p-1">
                    {TAILWIND_COLORS.map((c) => (
                        <button
                            key={c.name}
                            onClick={() => onColorChange(c.class)}
                            className={`w-6 h-6 rounded-full transition-all ${selectedColor === c.class
                                ? "ring-2 ring-white scale-110"
                                : "opacity-80 hover:opacity-100 hover:scale-105"
                                }`}
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                        />
                    ))}
                </div>
            </div>

            <div className="space-y-1.5">
                <div className="flex justify-between">
                    <label className="text-xs text-gray-300">Shade</label>
                    <span className="text-xs font-mono text-cyan-400">{selectedShade}</span>
                </div>

                <input
                    type="range"
                    min="0"
                    max={SHADES.length - 1}
                    step="1"
                    value={SHADES.indexOf(selectedShade)}
                    onChange={(e) => onShadeChange(SHADES[Number(e.target.value)])}
                    className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
            </div>
        </div>
    );
}
