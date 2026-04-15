"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check, ChevronDown, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const TW_SELECT_MENUS_GUIDE: PlaygroundGuideDoc = {
    title: "Tailwind select menus",
    intro:
        "Native `<select>` uses full-width block classes with rings and focus states. Custom menus pair a `relative` container, `absolute` popover list (`z-10`, `shadow-lg`, `ring-1`), and a trigger button with `aria-haspopup` / `aria-expanded`. Options use hover/active background utilities.",
    syntax: [
        'className="mt-2 block w-full rounded-md ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-600"',
        '<ul class="absolute z-10 mt-1 max-h-56 overflow-auto rounded-md shadow-lg ring-1 ring-black/5">',
    ],
    values: [
        { term: "ring / shadow", desc: "Elevation and focus affordances on the control." },
        { term: "absolute + z-10", desc: "Positions the dropdown over surrounding content." },
        { term: "hover:bg-* on options", desc: "Highlights the row under the pointer." },
    ],
    tip: "For custom widgets, implement keyboard navigation (Arrow keys, Enter, Escape) to match native behavior.",
};

// Mock Data
const people = [
    { id: 1, name: 'Wade Cooper', avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online', description: '@wadecooper' },
    { id: 2, name: 'Arlene Mccoy', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'offline', description: '@arlene' },
    { id: 3, name: 'Devon Webb', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'busy', description: '@devonwebb' },
    { id: 4, name: 'Tom Cook', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'online', description: '@tomcook' },
    { id: 5, name: 'Tanya Fox', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80', status: 'offline', description: '@tanyafox' },
];

const statusColors: Record<string, string> = {
    online: 'bg-green-400',
    offline: 'bg-gray-400',
    busy: 'bg-red-400',
};

export default function SelectMenusPlaygroundClient() {
    // State
    const [style, setStyle] = useState("simple-custom"); // native, simple-custom, avatar, status, secondary
    const [selected, setSelected] = useState(people[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [label, setLabel] = useState("Assigned to");
    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const resetValues = () => {
        setStyle("simple-custom");
        setSelected(people[0]);
        setIsOpen(false);
        setLabel("Assigned to");
    };

    const generateCode = () => {
        const baseButton = "relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700";
        const baseList = "absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-gray-800 dark:ring-gray-700";

        if (style === "native") {
            return `
<div>
  <label for="location" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">${label}</label>
  <select id="location" name="location" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-700">
    ${people.map(p => `<option ${p.id === selected.id ? 'selected' : ''}>${p.name}</option>`).join('\n    ')}
  </select>
</div>`;
        }

        let buttonContent = `<span class="block truncate">${selected.name}</span>`;
        let optionContent = (p: typeof people[0]) => `<span class="block truncate font-normal">${p.name}</span>`;

        if (style === "avatar") {
            buttonContent = `
      <span class="flex items-center">
        <img src="${selected.avatar}" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
        <span class="ml-3 block truncate">${selected.name}</span>
      </span>`;
            optionContent = (p) => `
        <div class="flex items-center">
          <img src="${p.avatar}" alt="" class="h-5 w-5 flex-shrink-0 rounded-full">
          <span class="ml-3 block truncate font-normal">${p.name}</span>
        </div>`;
        } else if (style === "status") {
            buttonContent = `
      <span class="flex items-center">
        <span aria-label="${selected.status}" class="${statusColors[selected.status]} inline-block h-2 w-2 flex-shrink-0 rounded-full"></span>
        <span class="ml-3 block truncate">${selected.name}</span>
      </span>`;
            optionContent = (p) => `
        <div class="flex items-center">
          <span class="${statusColors[p.status]} inline-block h-2 w-2 flex-shrink-0 rounded-full" aria-hidden="true"></span>
          <span class="ml-3 block truncate font-normal">
            ${p.name}
            <span class="sr-only"> is ${p.status}</span>
          </span>
        </div>`;
        } else if (style === "secondary") {
            buttonContent = `
      <span class="flex flex-col">
        <span class="block truncate text-sm font-medium text-gray-900 dark:text-gray-100">${selected.name}</span>
        <span class="block truncate text-xs text-gray-500">${selected.description}</span>
      </span>`;
            // Button padding needs to be adjusted for taller content
            // Omitting detailed specific button class override for brevity in generator logic, but conceptually same structure
            optionContent = (p) => `
        <div class="flex flex-col">
           <span class="block truncate font-normal">${p.name}</span>
           <span class="block truncate text-gray-500 text-xs">${p.description}</span>
        </div>`;
        }

        return `
<div>
  <label id="listbox-label" class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">${label}</label>
  <div class="relative mt-2">
    <button type="button" class="${baseButton}" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
      ${buttonContent}
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <!--
      Select popover, show/hide based on select state.
    -->
    <ul class="${baseList}" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
      <!--
        Select option, manage "text-white bg-indigo-600" for active state and "text-gray-900 icon-invisible" for inactive state
      -->
      ${people.map(p => `
      <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white dark:text-gray-100" id="listbox-option-${p.id}" role="option">
        ${optionContent(p)}
        ${p.id === selected.id ? `
        <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 hover:text-white">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </span>` : ''}
      </li>`).join('')}
    </ul>
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

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">

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
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-teal-400 to-green-400">
                                Select Menus
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about Tailwind select menu patterns in this playground"
                                title={`What is ${TW_SELECT_MENUS_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Customizable dropdowns with avatars, status indicators, and more.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Configuration">
                            <SelectControl
                                label="Style Variant"
                                value={style}
                                onChange={setStyle}
                                options={["simple-custom", "native", "avatar", "status", "secondary"]}
                            />

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Label Text</label>
                                <input
                                    type="text"
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-teal-500/50"
                                />
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

                        {/* Interactive UI */}
                        <div className="relative z-10 w-full max-w-sm">
                            <label className="block text-sm font-medium leading-6 text-gray-300 mb-2">
                                {label}
                            </label>

                            {style === 'native' ? (
                                <select
                                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-3 pr-10 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    value={selected.name}
                                    onChange={(e) => setSelected(people.find(p => p.name === e.target.value) || people[0])}
                                >
                                    {people.map((person) => (
                                        <option key={person.id} className="bg-gray-900">{person.name}</option>
                                    ))}
                                </select>
                            ) : (
                                <div className="relative mt-2" ref={dropdownRef}>
                                    <button
                                        type="button"
                                        className="relative w-full cursor-default rounded-md bg-white/5 py-1.5 pl-3 pr-10 text-left text-white shadow-sm ring-1 ring-inset ring-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6 min-h-[36px]"
                                        aria-haspopup="listbox"
                                        aria-expanded={isOpen}
                                        onClick={() => setIsOpen(!isOpen)}
                                    >
                                        <span className="flex items-center min-h-[20px]">
                                            {style === 'avatar' && (
                                                <img src={selected.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full mr-3" />
                                            )}
                                            {style === 'status' && (
                                                <span className={`${statusColors[selected.status]} inline-block h-2 w-2 flex-shrink-0 rounded-full mr-3`} />
                                            )}
                                            <span className="flex flex-col">
                                                <span className="block truncate">{selected.name}</span>
                                                {style === 'secondary' && (
                                                    <span className="text-gray-400 text-xs">{selected.description}</span>
                                                )}
                                            </span>
                                        </span>
                                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                        </span>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.ul
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.1 }}
                                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm border border-white/10"
                                                role="listbox"
                                            >
                                                {people.map((person) => {
                                                    const isSelected = selected.id === person.id;
                                                    return (
                                                        <li
                                                            key={person.id}
                                                            className={`relative cursor-default select-none py-2 pl-3 pr-9 ${isSelected ? 'bg-indigo-600 text-white' : 'text-gray-300 hover:bg-indigo-600/50 hover:text-white'}`}
                                                            role="option"
                                                            onClick={() => {
                                                                setSelected(person);
                                                                setIsOpen(false);
                                                            }}
                                                        >
                                                            <div className="flex items-center">
                                                                {style === 'avatar' && (
                                                                    <img src={person.avatar} alt="" className="h-5 w-5 flex-shrink-0 rounded-full mr-3" />
                                                                )}
                                                                {style === 'status' && (
                                                                    <span className={`${statusColors[person.status]} inline-block h-2 w-2 flex-shrink-0 rounded-full mr-3`} />
                                                                )}
                                                                <span className={`block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`}>
                                                                    {person.name}
                                                                </span>
                                                                {style === 'secondary' && (
                                                                    <span className={`ml-2 truncate text-xs ${isSelected ? 'text-indigo-200' : 'text-gray-500'}`}>
                                                                        {person.description}
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {isSelected && (
                                                                <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`}>
                                                                    <Check className="h-5 w-5" aria-hidden="true" />
                                                                </span>
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </motion.ul>
                                        )}
                                    </AnimatePresence>
                                </div>
                            )}
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

            {guideOpen && (
                <PlaygroundGuideModal doc={TW_SELECT_MENUS_GUIDE} onClose={closeGuide} titleId="tw-select-menus-guide-title" />
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
