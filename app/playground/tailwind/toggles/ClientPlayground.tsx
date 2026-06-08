"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, Check as CheckIcon, X as XIcon } from "lucide-react";
import Link from "next/link";

export default function TogglesPlaygroundClient() {
    // State
    const [style, setStyle] = useState("simple"); // simple, short, icon
    const [size, setSize] = useState("medium"); // small, medium, large
    const [color, setColor] = useState("indigo");
    const [isChecked, setIsChecked] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [label, setLabel] = useState("Toggle me");
    const [labelPosition, setLabelPosition] = useState("right"); // left, right, none

    const [copied, setCopied] = useState(false);

    const resetValues = () => {
        setStyle("simple");
        setSize("medium");
        setColor("indigo");
        setIsChecked(false);
        setIsDisabled(false);
        setLabel("Toggle me");
        setLabelPosition("right");
    };

    const colors: Record<string, string> = {
        indigo: "bg-indigo-600",
        blue: "bg-blue-600",
        green: "bg-green-600",
        red: "bg-red-600",
        purple: "bg-purple-600",
        orange: "bg-orange-600",
        teal: "bg-teal-600",
        gray: "bg-gray-600",
    };

    const focusColors: Record<string, string> = {
        indigo: "focus:ring-indigo-600",
        blue: "focus:ring-blue-600",
        green: "focus:ring-green-600",
        red: "focus:ring-red-600",
        purple: "focus:ring-purple-600",
        orange: "focus:ring-orange-600",
        teal: "focus:ring-teal-600",
        gray: "focus:ring-gray-600",
    };

    // Size config
    const sizes = {
        small: {
            switch: "h-5 w-9",
            circle: "h-4 w-4",
            translate: "translate-x-4",
            shortCircle: "h-5 w-5", // for short toggle
            shortSwitch: "h-3 w-7", // for short toggle
            padding: "p-0.5" // internal padding for simple toggle
        },
        medium: {
            switch: "h-6 w-11",
            circle: "h-5 w-5",
            translate: "translate-x-5",
            shortCircle: "h-6 w-6",
            shortSwitch: "h-4 w-9",
            padding: "p-0.5"
        },
        large: {
            switch: "h-7 w-14",
            circle: "h-6 w-6",
            translate: "translate-x-7",
            shortCircle: "h-7 w-7",
            shortSwitch: "h-5 w-11",
            padding: "p-0.5"
        }
    };

    const currentSize = sizes[size as keyof typeof sizes];

    const generateCode = () => {
        const activeColor = colors[color];
        const focusRing = focusColors[color];

        let switchClasses = `relative inline-flex flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${focusRing} focus:ring-offset-2`;
        let circleClasses = "pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out";

        // Handle Style Differences
        if (style === "short") {
            // Short toggle: smaller background bar, larger overlapping circle
            switchClasses = `group relative inline-flex flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus:ring-2 ${focusRing} focus:ring-offset-2`;
            // Override size classes for short toggle
            // Background bar
            const barClasses = `${currentSize.shortSwitch} rounded-full transition-colors duration-200 ease-in-out ${isChecked ? activeColor : 'bg-gray-200'}`;
            // Circle
            circleClasses = `${currentSize.shortCircle} absolute left-0 inline-block transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${isChecked ? currentSize.translate : 'translate-x-0'}`;

            if (isDisabled) {
                switchClasses += " opacity-50 cursor-not-allowed";
            }

            const labelCode = labelPosition !== 'none' ? `
  <span class="${labelPosition === 'left' ? 'mr-3' : 'ml-3'} text-sm font-medium text-gray-900 dark:text-gray-300">
    ${label}
  </span>` : '';

            return `<div class="flex items-center">
  ${labelPosition === 'left' ? labelCode : ''}
  <button 
    type="button" 
    class="${switchClasses}" 
    role="switch" 
    aria-checked="${isChecked}"
    ${isDisabled ? 'disabled' : ''}
  >
    <span class="sr-only">Use setting</span>
    <span 
      aria-hidden="true" 
      class="${barClasses}"
    ></span>
    <span 
      aria-hidden="true" 
      class="${circleClasses}"
    ></span>
  </button>
  ${labelPosition === 'right' ? labelCode : ''}
</div>`;

        } else {
            // Simple & Icon styles (Standard "Pill" styles)
            switchClasses += ` ${currentSize.switch} ${isChecked ? activeColor : 'bg-gray-200'}`;
            if (isDisabled) switchClasses += " opacity-50 cursor-not-allowed";

            circleClasses += ` ${currentSize.circle} ${isChecked ? currentSize.translate : 'translate-x-0'}`;

            // Add icons if needed
            let iconCode = '';
            let extraCircleClasses = '';

            if (style === "icon") {
                extraCircleClasses = " flex items-center justify-center";
                circleClasses += extraCircleClasses;

                // Standard Icon logic from Tailwind UI
                iconCode = `
      <span class="${isChecked ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
        <svg class="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
          <path d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="${isChecked ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity" aria-hidden="true">
        <svg class="h-3 w-3 ${color === 'white' ? 'text-gray-600' : colors[color].replace('bg-', 'text-')}" fill="currentColor" viewBox="0 0 12 12">
          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
        </svg>
      </span>`;
            }

            const labelCode = labelPosition !== 'none' ? `
  <span class="${labelPosition === 'left' ? 'mr-3' : 'ml-3'} text-sm font-medium text-gray-900 dark:text-gray-300">
    ${label}
  </span>` : '';

            return `<div class="flex items-center">
  ${labelPosition === 'left' ? labelCode : ''}
  <button 
    type="button" 
    class="${switchClasses}" 
    role="switch" 
    aria-checked="${isChecked}"
    ${isDisabled ? 'disabled' : ''}
  >
    <span class="sr-only">Use setting</span>
    <span 
      aria-hidden="true" 
      class="${circleClasses}"
    >${iconCode}</span>
  </button>
  ${labelPosition === 'right' ? labelCode : ''}
</div>`;
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode().trim());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Render Logic for Preview (Simplified copy of string-gen logic but with React)
    const renderPreview = () => {
        const activeColor = colors[color];
        // Short Style
        if (style === "short") {
            const barClasses = `${currentSize.shortSwitch} rounded-full transition-colors duration-200 ease-in-out ${isChecked ? activeColor : 'bg-gray-700/50'}`;
            const circleClasses = `${currentSize.shortCircle} absolute left-0 inline-block transform rounded-full border border-gray-200 bg-white shadow ring-0 transition-transform duration-200 ease-in-out ${isChecked ? currentSize.translate : 'translate-x-0'}`;
            return (
                <div className="flex items-center justify-center">
                    {labelPosition === 'left' && <Label text={label} position="left" />}
                    <button
                        onClick={() => !isDisabled && setIsChecked(!isChecked)}
                        className={`group relative inline-flex flex-shrink-0 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${focusColors[color]} ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        <span className={barClasses} />
                        <span className={circleClasses} />
                    </button>
                    {labelPosition === 'right' && <Label text={label} position="right" />}
                </div>
            )
        }

        // Simple & Icon Style
        const switchClasses = `${currentSize.switch} ${isChecked ? activeColor : 'bg-gray-700/50'} relative inline-flex flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 ${focusColors[color]} focus:ring-offset-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`;
        const circleClasses = `${currentSize.circle} ${isChecked ? currentSize.translate : 'translate-x-0'} pointer-events-none inline-block transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${style === 'icon' ? 'flex items-center justify-center' : ''}`;

        return (
            <div className="flex items-center justify-center">
                {labelPosition === 'left' && <Label text={label} position="left" />}
                <button
                    onClick={() => !isDisabled && setIsChecked(!isChecked)}
                    className={switchClasses}
                >
                    <span className={circleClasses}>
                        {style === "icon" && (
                            <>
                                <span className={`${isChecked ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}>
                                    <XIcon className="h-3 w-3 text-gray-400" />
                                </span>
                                <span className={`${isChecked ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out'} absolute inset-0 flex h-full w-full items-center justify-center transition-opacity`}>
                                    <CheckIcon className={`h-3 w-3 ${activeColor.replace('bg-', 'text-')}`} />
                                </span>
                            </>
                        )}
                    </span>
                </button>
                {labelPosition === 'right' && <Label text={label} position="right" />}
            </div>
        );
    }

    const Label = ({ text, position }: { text: string, position: 'left' | 'right' }) => (
        <span className={`${position === 'left' ? 'mr-3' : 'ml-3'} text-sm font-medium text-gray-300`}>
            {text}
        </span>
    );

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
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-green-400">
                            Toggles
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Accessible switch components with various styles and states.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Appearance">
                            <SelectControl
                                label="Style"
                                value={style}
                                onChange={setStyle}
                                options={["simple", "short", "icon"]}
                            />
                            <SelectControl
                                label="Size"
                                value={size}
                                onChange={setSize}
                                options={["small", "medium", "large"]}
                            />
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Color</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.keys(colors).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`h-8 w-full rounded-md border-2 transition-all ${color === c ? 'border-white scale-105' : 'border-transparent hover:border-white/50'} ${colors[c]}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Label & State">
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Label Text</label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-teal-500/50"
                                />
                            </div>
                            <SelectControl
                                label="Label Position"
                                value={labelPosition}
                                onChange={setLabelPosition}
                                options={["left", "right", "none"]}
                            />

                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-300">Interaction Disabled</label>
                                <button
                                    onClick={() => setIsDisabled(!isDisabled)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isDisabled ? 'bg-teal-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isDisabled ? 'left-6' : 'left-1'}`} />
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
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col items-center justify-center bg-[#111] p-8">
                        {/* Background Grid */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-br from-teal-500/5 via-green-500/5 to-emerald-500/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* Interactive Toggle */}
                        <div className="relative z-10 scale-125 md:scale-150">
                            {renderPreview()}
                        </div>

                        <div className="absolute bottom-4 text-xs text-gray-500">
                            {!isDisabled && "Click to toggle"}
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">HTML Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-teal-400 hover:text-teal-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy Code"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-60 overflow-y-auto custom-scrollbar">
                            <pre className="whitespace-pre-wrap break-all">{generateCode().trim()}</pre>
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
                className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-teal-500/50 cursor-pointer"
            >
                {options.map((opt: string) => (
                    <option key={opt} value={opt} className="bg-gray-900 text-white">
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
