"use client";

import { useEffect } from "react";
import { CircleHelp, X } from "lucide-react";

export type PlaygroundGuideDoc = {
    title: string;
    intro: string;
    syntax: ReadonlyArray<string>;
    values?: ReadonlyArray<{ term: string; desc: string }>;
    tip?: string;
};

type PlaygroundGuideModalProps = {
    doc: PlaygroundGuideDoc;
    onClose: () => void;
    /** Must match `aria-labelledby` target — unique per page */
    titleId: string;
    /** Heading above the term/description list when `values` is set */
    valuesSectionTitle?: string;
};

export function PlaygroundGuideModal({
    doc,
    onClose,
    titleId,
    valuesSectionTitle = "Properties in this playground",
}: PlaygroundGuideModalProps) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = prev;
        };
    }, [onClose]);

    const hasValues = doc.values && doc.values.length > 0;

    return (
        <div
            className="fixed inset-0 z-100 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close"
            />
            <div className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-xl border border-white/10 bg-[#0c0c12] shadow-2xl shadow-black/50 custom-scrollbar">
                <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-emerald-600/40 bg-linear-to-r from-emerald-900/50 to-cyan-900/30 px-4 py-3">
                    <h2 id={titleId} className="text-base font-semibold text-white pr-2">
                        {doc.title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded-lg p-1.5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                        aria-label="Close"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-4 p-4 text-sm text-gray-300 leading-relaxed">
                    <p>{doc.intro}</p>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">Syntax</p>
                        <div className="rounded-lg border border-white/10 bg-black/40 p-3 font-mono text-xs text-orange-200/95 space-y-1.5">
                            {doc.syntax.map((line, i) => (
                                <div key={i}>{line}</div>
                            ))}
                        </div>
                    </div>
                    {hasValues && (
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400/90 mb-2">
                                {valuesSectionTitle}
                            </p>
                            <dl className="space-y-2 text-xs">
                                {doc.values!.map(({ term, desc }) => (
                                    <div key={term} className="rounded-lg bg-white/4 px-3 py-2 border border-white/5">
                                        <dt className="font-mono text-cyan-300/95 mb-0.5">{term}</dt>
                                        <dd className="text-gray-400">{desc}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    )}
                    {doc.tip && (
                        <div className="rounded-lg border-l-4 border-amber-500/70 bg-amber-500/5 px-3 py-2 text-xs text-amber-100/90">
                            <span className="font-semibold text-amber-400/95">Note: </span>
                            {doc.tip}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

type PlaygroundHelpButtonProps = {
    onClick: () => void;
    ariaLabel: string;
    title: string;
};

export function PlaygroundHelpButton({ onClick, ariaLabel, title }: PlaygroundHelpButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="inline-flex items-center justify-center rounded-md p-0.5 text-gray-500 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 shrink-0"
            aria-label={ariaLabel}
            title={title}
        >
            <CircleHelp className="w-3.5 h-3.5" aria-hidden />
        </button>
    );
}
