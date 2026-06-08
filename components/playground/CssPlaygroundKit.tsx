"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, Copy, RefreshCw, Check, CircleHelp, X } from "lucide-react";
import Link from "next/link";

export type PropertyDoc = {
    title: string;
    intro: string;
    syntax: string[];
    values?: { term: string; desc: string }[];
    tip?: string;
};

export function usePropertyDocModal() {
    const [openDocId, setOpenDocId] = useState<string | null>(null);
    const closeDoc = useCallback(() => setOpenDocId(null), []);

    useEffect(() => {
        if (!openDocId) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeDoc();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [openDocId, closeDoc]);

    return { openDocId, setOpenDocId, closeDoc };
}

export function DocHelpButton({
    docId,
    docs,
    onOpenDoc,
}: {
    docId: string;
    docs: Record<string, PropertyDoc>;
    onOpenDoc: (id: string) => void;
}) {
    const label = docs[docId]?.title ?? docId;
    return (
        <button
            type="button"
            onClick={() => onOpenDoc(docId)}
            className="inline-flex items-center justify-center rounded-md p-0.5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
            aria-label={`Learn about ${label}`}
        >
            <CircleHelp className="w-3.5 h-3.5" aria-hidden />
        </button>
    );
}

export function PropertyLabel({
    children,
    docId,
    docs,
    onOpenDoc,
}: {
    children: React.ReactNode;
    docId: string;
    docs: Record<string, PropertyDoc>;
    onOpenDoc: (id: string) => void;
}) {
    return (
        <div className="flex items-center gap-1">
            <span className="text-xs text-gray-300">{children}</span>
            <DocHelpButton docId={docId} docs={docs} onOpenDoc={onOpenDoc} />
        </div>
    );
}

export function PropertyExplainModal({
    docId,
    docs,
    onClose,
}: {
    docId: string;
    docs: Record<string, PropertyDoc>;
    onClose: () => void;
}) {
    const doc = docs[docId];
    if (!doc) return null;
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4" role="dialog" aria-modal="true">
            <button type="button" className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-label="Close" />
            <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0c0c12] shadow-2xl custom-scrollbar">
                <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-emerald-600/40 bg-linear-to-r from-emerald-900/50 to-cyan-900/30 px-4 py-3">
                    <h2 className="text-base font-semibold text-white">{doc.title}</h2>
                    <button type="button" onClick={onClose} className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/10" aria-label="Close">
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4 p-4 text-sm text-gray-300 leading-relaxed">
                    <p>{doc.intro}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">Syntax</p>
                        <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-orange-200/95 space-y-1.5">
                            {doc.syntax.map((line, i) => <div key={i}>{line}</div>)}
                        </div>
                    </div>
                    {doc.values && (
                        <dl className="space-y-2 text-xs">
                            {doc.values.map(({ term, desc }) => (
                                <div key={term} className="rounded-lg bg-white/4 px-3 py-2 border border-white/5">
                                    <dt className="font-mono text-cyan-300/95 mb-0.5">{term}</dt>
                                    <dd className="text-gray-400">{desc}</dd>
                                </div>
                            ))}
                        </dl>
                    )}
                    {doc.tip && (
                        <div className="rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
                            <span className="font-semibold text-amber-400/95">Note: </span>{doc.tip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function ControlGroup({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
                {subtitle && <p className="text-[10px] text-gray-500 mt-1">{subtitle}</p>}
            </div>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

export function SegmentButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex-1 min-w-0 py-1 px-2 text-xs rounded-md transition-all ${active ? "bg-cyan-500/20 text-cyan-400" : "text-gray-400 hover:text-white"}`}
        >
            {children}
        </button>
    );
}

export function ToggleRow({
    label,
    docId,
    docs,
    onOpenDoc,
    children,
}: {
    label: string;
    docId?: string;
    docs?: Record<string, PropertyDoc>;
    onOpenDoc?: (id: string) => void;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center gap-1">
                <span className="text-xs text-gray-300">{label}</span>
                {docId && docs && onOpenDoc && <DocHelpButton docId={docId} docs={docs} onOpenDoc={onOpenDoc} />}
            </div>
            <div className="flex flex-wrap gap-1 bg-white/5 p-1 rounded-lg">{children}</div>
        </div>
    );
}

export function Switch({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button type="button" onClick={() => onChange(!checked)} className={`w-10 h-5 rounded-full transition-colors relative ${checked ? "bg-cyan-500" : "bg-gray-700"}`}>
            <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${checked ? "left-6" : "left-1"}`} />
        </button>
    );
}

export function SliderControl({
    label,
    docId,
    docs,
    onOpenDoc,
    value,
    onChange,
    min,
    max,
    step = 1,
    unit = "",
}: {
    label: string;
    docId?: string;
    docs?: Record<string, PropertyDoc>;
    onOpenDoc?: (id: string) => void;
    value: number;
    onChange: (n: number) => void;
    min: number;
    max: number;
    step?: number;
    unit?: string;
}) {
    const id = `slider-${label.replace(/\s/g, "-")}`;
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-300" id={id}>{label}</span>
                    {docId && docs && onOpenDoc && <DocHelpButton docId={docId} docs={docs} onOpenDoc={onOpenDoc} />}
                </div>
                <span className="text-xs font-mono text-cyan-400 shrink-0">{value}{unit}</span>
            </div>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} aria-labelledby={id} className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500" />
        </div>
    );
}

export function ColorControl({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300">{label}</span>
                <span className="text-xs font-mono text-cyan-400">{value}</span>
            </div>
            <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label} className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0" />
        </div>
    );
}

export function CssPlaygroundShell({
    title,
    description,
    controls,
    preview,
    cssOutput,
    onReset,
}: {
    title: string;
    description: string;
    controls: React.ReactNode;
    preview: React.ReactNode;
    cssOutput: string;
    onReset: () => void;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(cssOutput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />
            <div className="pt-below-header pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-var(--site-header-height)-5rem)]">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                    <div className="space-y-2">
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">{title}</h1>
                        <p className="text-gray-400 text-xs">{description}</p>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-var(--site-header-height)-9rem)]">
                        {controls}
                    </div>
                    <button onClick={onReset} className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300">
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="flex-1 flex flex-col gap-6">
                    <div className="flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center bg-[#111] p-8">
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>
                        <div className="relative z-10 w-full flex items-center justify-center">{preview}</div>
                    </div>
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS Output</span>
                            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-60 overflow-y-auto custom-scrollbar">
                            <pre>{cssOutput}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
}
