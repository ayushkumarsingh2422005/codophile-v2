"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, User, Calculator, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function TabsPlaygroundClient() {
    // State
    const [style, setStyle] = useState("underline"); // underline, pills, bar, full
    const [withIcon, setWithIcon] = useState(false);
    const [color, setColor] = useState("indigo");
    const [activeTab, setActiveTab] = useState(0);

    const [copied, setCopied] = useState(false);

    const tabs = [
        { name: 'My Account', icon: User, content: 'Manage your account details and preferences.' },
        { name: 'Company', icon: Calculator, content: 'View company information and settings.' },
        { name: 'Team Members', icon: ShieldCheck, content: 'Manage team access and permissions.' },
        { name: 'Billing', icon: Calculator, content: 'View invoices and update payment methods.' },
    ];

    const resetValues = () => {
        setStyle("underline");
        setWithIcon(false);
        setColor("indigo");
        setActiveTab(0);
    };

    const colors: Record<string, string> = {
        indigo: "border-indigo-500 text-indigo-600 bg-indigo-100/10",
        blue: "border-blue-500 text-blue-600 bg-blue-100/10",
        green: "border-green-500 text-green-600 bg-green-100/10",
        red: "border-red-500 text-red-600 bg-red-100/10",
        teal: "border-teal-500 text-teal-600 bg-teal-100/10",
        orange: "border-orange-500 text-orange-600 bg-orange-100/10",
    };

    // For Pill styles
    const pillColors: Record<string, string> = {
        indigo: "bg-indigo-600 text-white",
        blue: "bg-blue-600 text-white",
        green: "bg-green-600 text-white",
        red: "bg-red-600 text-white",
        teal: "bg-teal-600 text-white",
        orange: "bg-orange-600 text-white",
    }

    // For Bar styles
    const barColors: Record<string, string> = {
        indigo: "bg-indigo-500",
        blue: "bg-blue-500",
        green: "bg-green-500",
        red: "bg-red-500",
        teal: "bg-teal-500",
        orange: "bg-orange-500",
    }

    const generateCode = () => {
        const activeColorClass = colors[color];

        // Base classes
        let navClass = "-mb-px flex space-x-8";
        let tabClass = "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium";
        let activeClass = activeColorClass;
        let inactiveClass = "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300";

        let containerClass = "border-b border-gray-200 dark:border-gray-700";

        // Styling Logic
        if (style === "pills") {
            navClass = "flex space-x-4";
            tabClass = "rounded-md px-3 py-2 text-sm font-medium transition-colors";
            activeClass = pillColors[color];
            inactiveClass = "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200";
            containerClass = ""; // No border for pills
        } else if (style === "full") {
            navClass = "-mb-px flex";
            tabClass = "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium";
            // Reuse active/inactive from underline
        } else if (style === "bar") {
            navClass = "isolate flex divide-x divide-gray-200 rounded-lg shadow dark:divide-gray-700";
            containerClass = "";
            // Active state for bar is tricky without conditional rendering in template literal loop
            // For the sake of the generator, we'll show the structure
        }

        const tabsHtml = tabs.map((tab, idx) => {
            const isActive = idx === 0; // Simulate first tab active in code snippet
            let currentTabClass = isActive ? activeClass : inactiveClass;

            // Specific logic for Bar style
            if (style === "bar") {
                let roundedClass = "";
                if (idx === 0) roundedClass = "rounded-l-lg";
                if (idx === tabs.length - 1) roundedClass = "rounded-r-lg";

                const baseBarClass = `group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:hover:bg-gray-700 ${roundedClass}`;

                return `
    <a href="#" class="${baseBarClass} ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'}" ${isActive ? 'aria-current="page"' : ''}>
      <span>${tab.name}</span>
      <span aria-hidden="true" class="${isActive ? barColors[color] : 'bg-transparent'} absolute inset-x-0 bottom-0 h-0.5"></span>
    </a>`;
            }

            // Icon handling
            const iconHtml = withIcon ? `
        <svg class="${isActive ? 'text-' + color + '-500' : 'text-gray-400 group-hover:text-gray-500'} -ml-0.5 mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <!-- icon path -->
        </svg>` : '';

            return `
    <a
      href="#" 
      class="${tabClass} ${currentTabClass} ${withIcon ? 'group inline-flex items-center' : ''}"
      ${isActive ? 'aria-current="page"' : ''}
    >
      ${iconHtml}
      ${tab.name}
    </a>`;
        }).join('\n    ');

        // Wrapper structure
        if (style === "bar") {
            return `
<div>
  <!-- Mobile Selector (optional) -->
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">Select a tab</label>
    <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500">
      ${tabs.map(t => `<option>${t.name}</option>`).join('')}
    </select>
  </div>
  <!-- Desktop Tabs -->
  <div class="hidden sm:block">
    <nav class="${navClass}" aria-label="Tabs">
    ${tabsHtml}
    </nav>
  </div>
</div>`;
        }

        return `
<div>
  <div class="sm:hidden">
    <label for="tabs" class="sr-only">Select a tab</label>
    <select id="tabs" name="tabs" class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
      <option selected>${tabs[0].name}</option>
      <!-- ... other options -->
    </select>
  </div>
  <div class="hidden sm:block">
    <div class="${containerClass}">
      <nav class="${navClass}" aria-label="Tabs">
      ${tabsHtml}
      </nav>
    </div>
  </div>
</div>`;
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
                            Tabs
                        </h1>
                        <p className="text-gray-400 text-xs">
                            Responsive tab navigations with underline, pill, and bar variations.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">

                        <ControlGroup title="Appearance">
                            <SelectControl
                                label="Style"
                                value={style}
                                onChange={setStyle}
                                options={["underline", "pills", "bar", "full"]}
                            />
                            <div className="flex items-center justify-between pt-2">
                                <label className="text-xs text-gray-300">With Icons</label>
                                <button
                                    onClick={() => setWithIcon(!withIcon)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${withIcon ? 'bg-teal-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${withIcon ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                            <div className="space-y-1.5 pt-2">
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

                        {/* Interactive Tabs */}
                        <div className="relative z-10 w-full max-w-3xl">
                            {/* Mobile View Placeholder (just for context) */}
                            <div className="sm:hidden mb-4">
                                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                                <select
                                    id="tabs"
                                    name="tabs"
                                    className="block w-full rounded-md border-gray-600 bg-gray-800 text-white py-2 pl-3 pr-10 text-base focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm mb-4"
                                    value={tabs[activeTab].name}
                                    onChange={(e) => setActiveTab(tabs.findIndex(t => t.name === e.target.value))}
                                >
                                    {tabs.map((tab) => (
                                        <option key={tab.name}>{tab.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Desktop/Tablet Tabs */}
                            <div className={`${style === 'bar' ? '' : 'sm:block'} ${style !== 'pills' && style !== 'bar' ? 'border-b border-gray-700' : ''}`}>
                                <nav className={`
                                    ${style === 'pills' ? 'flex space-x-4' : ''}
                                    ${style === 'bar' ? 'flex divide-x divide-gray-700 rounded-lg shadow-sm ring-1 ring-white/10' : ''}
                                    ${style === 'full' ? '-mb-px flex' : ''}
                                    ${style === 'underline' ? '-mb-px flex space-x-8' : ''}
                                `} aria-label="Tabs">
                                    {tabs.map((tab, idx) => {
                                        const isActive = idx === activeTab;

                                        // Dynamic Classes per style
                                        let tabClasses = "";
                                        let iconColor = "";

                                        if (style === "underline" || style === "full") {
                                            tabClasses = `${style === 'full' ? 'w-1/4 justify-center' : 'whitespace-nowrap'} border-b-2 py-4 px-1 text-sm font-medium ${isActive
                                                ? `${colors[color].split(' ')[0]} ${colors[color].split(' ')[1]}`
                                                : 'border-transparent text-gray-400 hover:border-gray-500 hover:text-gray-300'}`;
                                            iconColor = isActive ? colors[color].split(' ')[1] : 'text-gray-500 group-hover:text-gray-400';
                                        } else if (style === "pills") {
                                            tabClasses = `rounded-md px-3 py-2 text-sm font-medium transition-all ${isActive
                                                ? pillColors[color]
                                                : 'text-gray-400 hover:text-white hover:bg-gray-800'}`;
                                            iconColor = isActive ? 'text-white' : 'text-gray-400 group-hover:text-white';
                                        } else if (style === "bar") {
                                            tabClasses = `group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium hover:bg-gray-800 focus:z-10
                                                ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-300'}
                                                ${idx === 0 ? 'rounded-l-lg' : ''}
                                                ${idx === tabs.length - 1 ? 'rounded-r-lg' : ''}
                                                bg-gray-900
                                            `;
                                        }

                                        return (
                                            <button
                                                key={tab.name}
                                                onClick={() => setActiveTab(idx)}
                                                className={`
                                                    ${tabClasses}
                                                    ${withIcon ? 'group inline-flex items-center' : ''}
                                                    transition-colors
                                                `}
                                                aria-current={isActive ? 'page' : undefined}
                                            >
                                                {withIcon && (
                                                    <tab.icon className={`
                                                        ${style === 'underline' || style === 'full' ? '-ml-0.5 mr-2 h-5 w-5' : 'mr-2 h-5 w-5'}
                                                        ${iconColor}
                                                    `} />
                                                )}
                                                <span>{tab.name}</span>
                                                {style === 'bar' && isActive && (
                                                    <span aria-hidden="true" className={`${barColors[color]} absolute inset-x-0 bottom-0 h-0.5`} />
                                                )}
                                            </button>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Content Placeholder */}
                            <div className="mt-8 p-6 bg-gray-900/50 rounded-xl border border-white/5 text-gray-300">
                                <h3 className="text-lg font-medium text-white mb-2">{tabs[activeTab].name}</h3>
                                <p>{tabs[activeTab].content}</p>
                            </div>
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
