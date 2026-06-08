"use client";

import React, { useMemo, useState } from "react";
import {
    ControlGroup,
    CssPlaygroundShell,
    PropertyExplainModal,
    PropertyLabel,
    SliderControl,
    Switch,
    ToggleRow,
    SegmentButton,
    usePropertyDocModal,
    type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";

type PositionValue = "static" | "relative" | "absolute" | "fixed";
type ScenarioId =
    | "relative-absolute"
    | "static-absolute"
    | "relative-offset"
    | "fixed-viewport"
    | "absolute-center"
    | "custom";

const DOCS: Record<string, PropertyDoc> = {
    position: {
        title: "CSS position",
        intro:
            "Controls how an element is placed and which box other elements use as a reference. Only positioned elements (not static) can act as a containing block for absolute descendants and accept top/right/bottom/left offsets.",
        syntax: [
            "position: static;   /* default */",
            "position: relative;",
            "position: absolute;",
            "position: fixed;",
            "position: sticky;",
        ],
        values: [
            { term: "static", desc: "Normal document flow. top/left/right/bottom and z-index have no effect." },
            { term: "relative", desc: "Stays in flow (layout space preserved) but can be offset. Becomes a containing block for absolute children." },
            { term: "absolute", desc: "Removed from flow. Positioned against its containing block (nearest positioned ancestor, or the viewport)." },
            { term: "fixed", desc: "Removed from flow. Containing block is usually the viewport — not the parent, even if the parent is positioned." },
            { term: "sticky", desc: "Hybrid of relative + fixed based on scroll position." },
        ],
        tip: "A common pattern: parent { position: relative } + child { position: absolute } keeps the child anchored inside the parent box.",
    },
    "containing-block": {
        title: "Containing block",
        intro:
            "The rectangle an absolutely positioned element is placed against. For position: absolute, the browser walks up the DOM tree until it finds an ancestor with position other than static. If none exists, the initial containing block (viewport) is used.",
        syntax: [
            "/* Child absolute + parent relative → parent is containing block */",
            ".parent { position: relative; }",
            ".child  { position: absolute; top: 16px; left: 16px; }",
            "",
            "/* Parent static → child looks further up the tree */",
            ".parent { position: static; }",
        ],
        tip: "Setting position: relative on a parent without changing its layout is the standard way to scope absolute children.",
    },
    top: {
        title: "CSS top",
        intro: "Offset from the top edge of the containing block. Used with relative, absolute, fixed, or sticky positioning.",
        syntax: ["top: 24px;", "top: 10%;", "top: auto; /* default — no offset */"],
    },
    right: {
        title: "CSS right",
        intro: "Offset from the right edge of the containing block.",
        syntax: ["right: 16px;", "right: 0;", "right: auto;"],
    },
    bottom: {
        title: "CSS bottom",
        intro: "Offset from the bottom edge of the containing block.",
        syntax: ["bottom: 16px;", "bottom: 0;", "bottom: auto;"],
    },
    left: {
        title: "CSS left",
        intro: "Offset from the left edge of the containing block.",
        syntax: ["left: 24px;", "left: 50%;", "left: auto;"],
    },
    "z-index": {
        title: "CSS z-index",
        intro: "Stacking order along the z-axis. Only affects positioned elements (or flex/grid children). Higher values paint on top.",
        syntax: ["z-index: 1;", "z-index: 10;", "z-index: auto;"],
        tip: "z-index compares within the same stacking context. A parent with z-index creates a new context for its children.",
    },
    inset: {
        title: "Inset shorthand",
        intro: "Shorthand for top, right, bottom, and left together (same idea as margin/padding four-value syntax).",
        syntax: ["inset: 16px;", "inset: 10px 20px;", "inset: auto;"],
    },
};

const SCENARIOS: Record<
    ScenarioId,
    {
        label: string;
        hint: string;
        parent: PositionValue;
        child: PositionValue;
        top: number;
        right: number | null;
        bottom: number | null;
        left: number | null;
        zIndex: number;
        centerChild?: boolean;
        useRight?: boolean;
        useBottom?: boolean;
    }
> = {
    "relative-absolute": {
        label: "Relative parent + absolute child",
        hint: "Classic pattern: parent creates the box; child is placed inside it and ignores siblings' flow.",
        parent: "relative",
        child: "absolute",
        top: 24,
        right: null,
        bottom: null,
        left: 24,
        zIndex: 2,
    },
    "static-absolute": {
        label: "Static parent + absolute child",
        hint: "Parent does NOT contain the child. Absolute element escapes to a higher ancestor (here: the preview panel).",
        parent: "static",
        child: "absolute",
        top: 8,
        right: null,
        bottom: null,
        left: 8,
        zIndex: 5,
    },
    "relative-offset": {
        label: "Relative child only",
        hint: "Child stays in document flow — layout space is kept. Good for small visual nudges (icons, badges).",
        parent: "relative",
        child: "relative",
        top: 12,
        right: null,
        bottom: null,
        left: 20,
        zIndex: 1,
    },
    "fixed-viewport": {
        label: "Fixed to viewport",
        hint: "Fixed is relative to the browser viewport, not the parent — even if the parent is positioned.",
        parent: "relative",
        child: "fixed",
        top: 16,
        right: 16,
        bottom: null,
        left: null,
        zIndex: 50,
        useRight: true,
    },
    "absolute-center": {
        label: "Center in parent",
        hint: "Absolute + top/left 50% with translate(-50%, -50%) is a common centering recipe.",
        parent: "relative",
        child: "absolute",
        top: 50,
        right: null,
        bottom: null,
        left: 50,
        zIndex: 2,
        centerChild: true,
    },
    custom: {
        label: "Custom",
        hint: "Adjust parent, child, and offsets manually.",
        parent: "relative",
        child: "absolute",
        top: 24,
        right: null,
        bottom: null,
        left: 24,
        zIndex: 2,
    },
};

function isPositioned(p: PositionValue) {
    return p !== "static";
}

function getContainingBlockLabel(parentPos: PositionValue, childPos: PositionValue): string {
    if (childPos === "static") return "N/A — child is in normal flow";
    if (childPos === "fixed") return "Viewport (initial containing block)";
    if (childPos === "absolute" && isPositioned(parentPos)) return "Parent box (nearest positioned ancestor)";
    if (childPos === "absolute") return "Escaped parent — ancestor or viewport";
    if (childPos === "relative") return "Child's own normal position (offset from there)";
    return "—";
}

export default function PositioningClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [scenario, setScenario] = useState<ScenarioId>("relative-absolute");
    const [parentPosition, setParentPosition] = useState<PositionValue>("relative");
    const [childPosition, setChildPosition] = useState<PositionValue>("absolute");
    const [top, setTop] = useState(24);
    const [right, setRight] = useState<number | null>(null);
    const [bottom, setBottom] = useState<number | null>(null);
    const [left, setLeft] = useState(24);
    const [zIndex, setZIndex] = useState(2);
    const [centerChild, setCenterChild] = useState(false);
    const [useRight, setUseRight] = useState(false);
    const [useBottom, setUseBottom] = useState(false);

    const applyScenario = (id: ScenarioId) => {
        const s = SCENARIOS[id];
        setScenario(id);
        setParentPosition(s.parent);
        setChildPosition(s.child);
        setTop(s.top);
        setRight(s.right);
        setBottom(s.bottom);
        setLeft(s.left ?? 24);
        setZIndex(s.zIndex);
        setCenterChild(!!s.centerChild);
        setUseRight(s.useRight ?? s.right !== null);
        setUseBottom(s.useBottom ?? s.bottom !== null);
    };

    const reset = () => applyScenario("relative-absolute");

    const markCustom = () => setScenario("custom");

    const containingBlock = getContainingBlockLabel(parentPosition, childPosition);
    const parentIsContainingBlock = childPosition === "absolute" && isPositioned(parentPosition);

    const childStyle: React.CSSProperties = useMemo(() => {
        const style: React.CSSProperties = {
            position: childPosition,
            width: 96,
            height: 72,
            zIndex: childPosition === "static" ? undefined : zIndex,
        };
        if (childPosition !== "static") {
            style.top = `${top}${centerChild ? "%" : "px"}`;
            if (useRight && right !== null) style.right = `${right}px`;
            else style.right = "auto";
            if (useBottom && bottom !== null) style.bottom = `${bottom}px`;
            else style.bottom = "auto";
            style.left = useRight && !centerChild ? "auto" : `${left}${centerChild ? "%" : "px"}`;
            if (centerChild) {
                style.transform = "translate(-50%, -50%)";
            }
        }
        return style;
    }, [childPosition, top, right, bottom, left, zIndex, centerChild, useRight, useBottom]);

    const css = `/* ── Parent: establishes context when positioned ── */
.parent {
  position: ${parentPosition};
  min-height: 220px;
  padding: 16px;
  background: #1e293b;
  border: 2px ${parentIsContainingBlock ? "solid #22d3ee" : "dashed #475569"};
}

/* ── Child: ${childPosition} ── */
.child {
  position: ${childPosition};
${childPosition !== "static" ? `  top: ${top}${centerChild ? "%" : "px"};
  right: ${useRight && right !== null ? `${right}px` : "auto"};
  bottom: ${useBottom && bottom !== null ? `${bottom}px` : "auto"};
  left: ${useRight && !centerChild ? "auto" : `${left}${centerChild ? "%" : "px"}`};${centerChild ? "\n  transform: translate(-50%, -50%);" : ""}
  z-index: ${zIndex};` : "  /* static: offsets have no effect */"}
  width: 96px;
  height: 72px;
  background: #3b82f6;
}

/* Containing block for .child: ${containingBlock} */`;

    const scenarioHint = SCENARIOS[scenario].hint;

    return (
        <>
            <CssPlaygroundShell
                title="Positioning"
                description="Parent vs child, containing blocks, offsets, and common real-world scenarios."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Learn a scenario" subtitle="Preset combinations developers use daily">
                            <div className="space-y-2">
                                {(Object.keys(SCENARIOS) as ScenarioId[]).filter((k) => k !== "custom").map((id) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => applyScenario(id)}
                                        className={`w-full text-left rounded-lg px-3 py-2 text-xs border transition-colors ${scenario === id ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"}`}
                                    >
                                        {SCENARIOS[id].label}
                                    </button>
                                ))}
                            </div>
                            <div className="rounded-lg border-l-4 border-violet-500/60 bg-violet-500/5 px-3 py-2 text-xs text-gray-300 leading-relaxed">
                                <span className="font-semibold text-violet-300">Now: </span>
                                {scenarioHint}
                            </div>
                            <div className="rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-[11px] font-mono text-cyan-300/90">
                                Containing block → {containingBlock}
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Parent element">
                            <ToggleRow label="Parent position" docId="position" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["static", "relative", "absolute", "fixed"] as const).map((v) => (
                                    <SegmentButton
                                        key={v}
                                        active={parentPosition === v}
                                        onClick={() => { setParentPosition(v); markCustom(); }}
                                    >
                                        {v}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                {parentPosition === "static"
                                    ? "Static parent: does not scope absolute children."
                                    : "Positioned parent: can become the containing block for absolute descendants."}
                            </p>
                            <button
                                type="button"
                                onClick={() => setOpenDocId("containing-block")}
                                className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                            >
                                What is a containing block?
                            </button>
                        </ControlGroup>

                        <ControlGroup title="Child element">
                            <ToggleRow label="Child position" docId="position" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["static", "relative", "absolute", "fixed"] as const).map((v) => (
                                    <SegmentButton
                                        key={v}
                                        active={childPosition === v}
                                        onClick={() => { setChildPosition(v); markCustom(); }}
                                    >
                                        {v}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            {childPosition !== "static" && (
                                <>
                                    <SliderControl label="Top" docId="top" docs={DOCS} onOpenDoc={setOpenDocId} value={top} onChange={(v) => { setTop(v); markCustom(); }} min={0} max={centerChild ? 100 : 120} unit={centerChild ? "%" : "px"} />
                                    {!useRight && !centerChild && (
                                        <SliderControl label="Left" docId="left" docs={DOCS} onOpenDoc={setOpenDocId} value={left} onChange={(v) => { setLeft(v); markCustom(); }} min={0} max={160} unit="px" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <PropertyLabel docId="right" docs={DOCS} onOpenDoc={setOpenDocId}>Anchor from right</PropertyLabel>
                                        <Switch checked={useRight} onChange={(on) => { setUseRight(on); if (on) setCenterChild(false); markCustom(); }} />
                                    </div>
                                    {useRight && (
                                        <SliderControl label="Right" docId="right" docs={DOCS} onOpenDoc={setOpenDocId} value={right ?? 16} onChange={(v) => { setRight(v); markCustom(); }} min={0} max={160} unit="px" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-300">Use bottom</span>
                                        <Switch checked={useBottom} onChange={(on) => { setUseBottom(on); markCustom(); }} />
                                    </div>
                                    {useBottom && (
                                        <SliderControl label="Bottom" docId="bottom" docs={DOCS} onOpenDoc={setOpenDocId} value={bottom ?? 16} onChange={(v) => { setBottom(v); markCustom(); }} min={0} max={120} unit="px" />
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-300">Center with translate(-50%, -50%)</span>
                                        <Switch checked={centerChild} onChange={(on) => { setCenterChild(on); if (on) { setUseRight(false); setTop(50); setLeft(50); } markCustom(); }} />
                                    </div>
                                    <SliderControl label="Z-index" docId="z-index" docs={DOCS} onOpenDoc={setOpenDocId} value={zIndex} onChange={(v) => { setZIndex(v); markCustom(); }} min={0} max={20} />
                                </>
                            )}
                        </ControlGroup>

                        <ControlGroup title="Flow vs taken out" subtitle="Watch siblings when child is absolute/fixed">
                            <ul className="text-[10px] text-gray-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                                <li><strong className="text-gray-300">static / relative</strong> — child keeps space in the row; siblings stay separated.</li>
                                <li><strong className="text-gray-300">absolute / fixed</strong> — child removed from flow; siblings collapse as if it vanished.</li>
                                <li><strong className="text-gray-300">fixed</strong> — always uses the viewport, not the yellow parent.</li>
                            </ul>
                        </ControlGroup>
                    </>
                }
                preview={
                    <div className="relative w-full max-w-lg">
                        <span className="absolute -top-1 left-0 text-[10px] text-gray-500 font-mono z-20">preview panel (scroll ancestor)</span>
                        <div
                            className="relative mt-4 rounded-xl border-2 border-amber-500/30 bg-amber-500/5 p-3 min-h-[280px]"
                            style={{ position: "relative" }}
                        >
                            <div
                                className="rounded-lg p-3 min-h-[220px] transition-all duration-300"
                                style={{
                                    position: parentPosition,
                                    background: "#1e293b",
                                    border: parentIsContainingBlock ? "2px solid #22d3ee" : "2px dashed #64748b",
                                }}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] font-mono text-gray-400">
                                        .parent <span className="text-cyan-400">({parentPosition})</span>
                                    </span>
                                    {parentIsContainingBlock && (
                                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">containing block</span>
                                    )}
                                </div>

                                <div className="h-10 rounded bg-slate-700/80 border border-white/10 flex items-center px-2 text-[10px] font-mono text-gray-400 mb-2">
                                    .sibling-a (always in flow)
                                </div>

                                <div
                                    className="rounded-lg flex items-center justify-center text-[10px] font-mono text-white shadow-lg border border-white/20 mb-2 transition-all duration-300"
                                    style={{
                                        ...childStyle,
                                        background: childPosition === "fixed" ? "#a855f7" : "#3b82f6",
                                    }}
                                >
                                    .child ({childPosition})
                                </div>

                                <div className="h-10 rounded bg-slate-700/80 border border-white/10 flex items-center px-2 text-[10px] font-mono text-gray-400">
                                    .sibling-b (always in flow)
                                </div>
                            </div>

                            {childPosition === "absolute" && !isPositioned(parentPosition) && (
                                <p className="mt-2 text-[10px] text-amber-400/90 font-mono leading-relaxed">
                                    ↑ Child escaped static parent — positioned vs this amber panel or above.
                                </p>
                            )}
                            {childPosition === "fixed" && (
                                <p className="mt-2 text-[10px] text-purple-300/90 font-mono">
                                    Fixed child is anchored to the viewport (browser window), not the cyan parent.
                                </p>
                            )}
                        </div>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
