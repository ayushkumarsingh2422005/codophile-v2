"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

export default function CheckboxesPlaygroundClient() {
    // State
    const [style, setStyle] = useState("description"); // description, inline, right, simple
    const [spacing, setSpacing] = useState("standard"); // compact, standard, loose
    const [color, setColor] = useState("indigo");
    const [rounded, setRounded] = useState("rounded"); // none, rounded, rounded-full
    const [isDisabled, setIsDisabled] = useState(false);

    const [copied, setCopied] = useState(false);

    // Mock Data for List
    const [items, setItems] = useState([
        { id: 1, title: 'Comments', desc: 'Get notified when someones posts a comment on a posting.', checked: true },
        { id: 2, title: 'Candidates', desc: 'Get notified when a candidate applies for a job.', checked: false },
        { id: 3, title: 'Offers', desc: 'Get notified when a candidate accepts or rejects an offer.', checked: false },
    ]);

    const toggleItem = (id: number) => {
        if (isDisabled) return;
        setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
    };

    const resetValues = () => {
        setStyle("description");
        setSpacing("standard");
        setColor("indigo");
        setRounded("rounded");
        setIsDisabled(false);
        setItems(items.map(item => ({ ...item, checked: item.id === 1 })));
    };

    const colors: Record<string, string> = {
        indigo: "text-indigo-600 focus:ring-indigo-600",
        blue: "text-blue-600 focus:ring-blue-600",
        green: "text-green-600 focus:ring-green-600",
        red: "text-red-600 focus:ring-red-600",
        purple: "text-purple-600 focus:ring-purple-600",
        orange: "text-orange-600 focus:ring-orange-600",
        teal: "text-teal-600 focus:ring-teal-600",
        pink: "text-pink-600 focus:ring-pink-600",
    };

    const generateCode = () => {
        const activeColor = colors[color];

        let containerClass = "space-y-5";
        let wrapperClass = "relative flex items-start";
        let checkboxClass = `h-4 w-4 border-gray-300 ${activeColor} ${rounded === 'none' ? 'rounded-none' : rounded === 'rounded-full' ? 'rounded-full' : 'rounded'}`;
        let labelClass = "text-sm font-medium leading-6 text-gray-900 dark:text-gray-300";
        let descClass = "text-gray-500 text-sm";

        if (style === "right") {
            wrapperClass = "relative flex items-center justify-between py-4";
            containerClass = "divide-y divide-gray-200 border-b border-t border-gray-200 mt-4";
        }

        // Example Item
        const item = items[0];

        const checkboxEl = `
      <div class="flex h-6 items-center">
        <input 
          id="comments" 
          aria-describedby="comments-description" 
          name="comments" 
          type="checkbox" 
          ${item.checked ? 'checked' : ''}
          class="${checkboxClass}"
          ${isDisabled ? 'disabled' : ''}
        >
      </div>`;

        const textEl = `
      <div class="ml-3 text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900">${item.title}</label>
        ${style === 'description' ? `<p id="comments-description" class="text-gray-500">${item.desc}</p>` : ''}
        ${style === 'inline' ? `<span id="comments-description" class="text-gray-500"><span class="sr-only">${item.title} </span>${item.desc}</span>` : ''}
      </div>`;

        if (style === "right") {
            return `
<fieldset>
  <legend class="sr-only">Notifications</legend>
  <div class="divide-y divide-gray-200 border-b border-t border-gray-200">
    <div class="relative flex items-start py-4">
      <div class="min-w-0 flex-1 text-sm leading-6">
        <label for="comments" class="select-none font-medium text-gray-900">${item.title}</label>
      </div>
      <div class="ml-3 flex h-6 items-center">
        <input id="comments" name="comments" type="checkbox" class="${checkboxClass}">
      </div>
    </div>
    <!-- ... other items -->
  </div>
</fieldset>`;
        }

        return `
<fieldset>
  <legend class="sr-only">Notifications</legend>
  <div class="space-y-5">
    <div class="relative flex items-start">
      ${checkboxEl}
      ${textEl}
    </div>
    <!-- ... other items -->
  </div>
</fieldset>`;
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(generateCode().trim());
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
                        <Link href="/playground/tailwind" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to Tailwind
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-green-400">
                            Checkboxes
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Accessible checkbox lists with detailed descriptions and layouts.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Layout & Style">
                            <SelectControl
                                label="Layout Style"
                                value={style}
                                onChange={setStyle}
                                options={["description", "inline", "right", "simple"]}
                            />
                            <SelectControl
                                label="Shape"
                                value={rounded}
                                onChange={setRounded}
                                options={["rounded", "rounded-full", "none"]}
                            />
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Accent Color</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {Object.keys(colors).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setColor(c)}
                                            className={`h-8 w-full rounded-md border-2 transition-all ${color === c ? 'border-white scale-105' : 'border-transparent hover:border-white/50'} bg-${c}-600`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="State">
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

                        {/* Interactive List */}
                        <div className="relative z-10 w-full max-w-lg bg-gray-900/80 backdrop-blur-sm p-6 rounded-xl border border-white/10 shadow-2xl">
                            <fieldset disabled={isDisabled} className={isDisabled ? 'opacity-50' : ''}>
                                <legend className="sr-only">Notifications</legend>

                                {style === 'right' ? (
                                    <div className="divide-y divide-gray-700 border-b border-t border-gray-700">
                                        {items.map((item) => (
                                            <div key={item.id} className="relative flex items-start py-4">
                                                <div className="min-w-0 flex-1 text-sm leading-6">
                                                    <label htmlFor={`item-${item.id}`} className="select-none font-medium text-white">
                                                        {item.title}
                                                    </label>
                                                </div>
                                                <div className="ml-3 flex h-6 items-center">
                                                    <input
                                                        id={`item-${item.id}`}
                                                        name={`item-${item.id}`}
                                                        type="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => toggleItem(item.id)}
                                                        className={`h-4 w-4 border-gray-600 bg-gray-700 ${colors[color]} ${rounded === 'none' ? 'rounded-none' : rounded === 'rounded-full' ? 'rounded-full' : 'rounded'}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-5">
                                        {items.map((item) => (
                                            <div key={item.id} className="relative flex items-start">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id={`item-${item.id}`}
                                                        aria-describedby={`item-${item.id}-desc`}
                                                        name={`item-${item.id}`}
                                                        type="checkbox"
                                                        checked={item.checked}
                                                        onChange={() => toggleItem(item.id)}
                                                        className={`h-4 w-4 border-gray-600 bg-gray-700 ${colors[color]} ${rounded === 'none' ? 'rounded-none' : rounded === 'rounded-full' ? 'rounded-full' : 'rounded'}`}
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor={`item-${item.id}`} className="font-medium text-white">
                                                        {item.title}
                                                    </label>
                                                    {style !== 'simple' && (
                                                        <span id={`item-${item.id}-desc`} className={`${style === 'inline' ? 'pl-2' : 'block'} text-gray-400`}>
                                                            {style === 'inline' && <span className="sr-only">{item.title} </span>}
                                                            {item.desc}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </fieldset>
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
