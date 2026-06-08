"use client";

import React, { useMemo, useState } from "react";
import {
    ControlGroup,
    CssPlaygroundShell,
    PropertyExplainModal,
    ToggleRow,
    SegmentButton,
    usePropertyDocModal,
    type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";

/** All 36 standard CSS cursor keywords (CSS UI Level 3). */
const CURSOR_GROUPS: { title: string; values: readonly string[] }[] = [
    {
        title: "General",
        values: ["auto", "default", "none", "context-menu", "help"],
    },
    {
        title: "Links & status",
        values: ["pointer", "progress", "wait"],
    },
    {
        title: "Selection",
        values: ["cell", "crosshair", "text", "vertical-text"],
    },
    {
        title: "Drag & drop",
        values: ["alias", "copy", "move", "no-drop", "not-allowed", "grab", "grabbing"],
    },
    {
        title: "Resize — edges",
        values: ["e-resize", "n-resize", "ne-resize", "nw-resize", "s-resize", "se-resize", "sw-resize", "w-resize"],
    },
    {
        title: "Resize — axis & pan",
        values: ["ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "col-resize", "row-resize", "all-scroll"],
    },
    {
        title: "Zoom",
        values: ["zoom-in", "zoom-out"],
    },
];

const ALL_CURSORS = CURSOR_GROUPS.flatMap((g) => g.values);

type CursorValue = (typeof ALL_CURSORS)[number];

const CURSOR_HINTS: Record<string, string> = {
    auto: "Browser picks the cursor from the element (e.g. pointer on links).",
    default: "Standard arrow — explicit reset.",
    none: "Cursor hidden — use with custom cursor overlays.",
    "context-menu": "Right-click / context menu available.",
    help: "Help or more info available (? icon).",
    pointer: "Clickable link or button (hand).",
    progress: "Background task running; UI still usable.",
    wait: "Background task; UI may be busy (hourglass/spinner).",
    cell: "Spreadsheet cell or grid selection.",
    crosshair: "Precise point selection (canvas, maps).",
    text: "Horizontal text selection (I-beam).",
    "vertical-text": "Vertical text selection (CJK layouts).",
    alias: "Creates a shortcut or alias.",
    copy: "Item will be copied on drop.",
    move: "Item is being moved.",
    "no-drop": "Invalid drop target.",
    "not-allowed": "Action not allowed (disabled).",
    grab: "Draggable — grab to move (open hand).",
    grabbing: "Currently dragging (closed hand).",
    "e-resize": "Resize east (right) edge.",
    "n-resize": "Resize north (top) edge.",
    "ne-resize": "Resize north-east corner.",
    "nw-resize": "Resize north-west corner.",
    "s-resize": "Resize south (bottom) edge.",
    "se-resize": "Resize south-east corner.",
    "sw-resize": "Resize south-west corner.",
    "w-resize": "Resize west (left) edge.",
    "ew-resize": "Resize width (left ↔ right).",
    "ns-resize": "Resize height (top ↔ bottom).",
    "nesw-resize": "Resize along NE ↔ SW diagonal.",
    "nwse-resize": "Resize along NW ↔ SE diagonal.",
    "col-resize": "Resize column (↔ bar).",
    "row-resize": "Resize row (↕ bar).",
    "all-scroll": "Pan/scroll in any direction.",
    "zoom-in": "Zoom in (magnifier +).",
    "zoom-out": "Zoom out (magnifier −).",
};

const DOCS: Record<string, PropertyDoc> = {
    cursor: {
        title: "CSS cursor",
        intro:
            "Sets the mouse cursor when the pointer is over an element. Browsers support 36 keyword values plus custom images via url(). A mandatory keyword fallback is required after any url() list.",
        syntax: [
            "cursor: pointer;",
            "cursor: grab;",
            "cursor: nwse-resize;",
            "cursor: url('hand.cur'), pointer; /* custom + fallback */",
            "cursor: url(pointer.png) 4 12, auto; /* hotspot x y */",
        ],
        values: CURSOR_GROUPS.flatMap((g) =>
            g.values.map((term) => ({ term, desc: CURSOR_HINTS[term] ?? g.title })),
        ),
        tip: "On some OS/browser combos, similar cursors look identical (e.g. no-drop vs not-allowed on Windows).",
    },
    "pointer-events": {
        title: "CSS pointer-events",
        intro: "Controls whether an element receives pointer (mouse/touch) events.",
        syntax: ["pointer-events: auto;", "pointer-events: none;"],
        values: [
            { term: "auto", desc: "Element receives clicks, hovers, and taps normally." },
            { term: "none", desc: "Events pass through to elements below — useful for overlays." },
        ],
    },
    "user-select": {
        title: "CSS user-select",
        intro: "Controls whether the user can select text inside the element.",
        syntax: ["user-select: auto;", "user-select: none;", "user-select: text;", "user-select: all;"],
        values: [
            { term: "auto", desc: "Browser default per context." },
            { term: "none", desc: "Text cannot be selected — buttons, drag handles." },
            { term: "text", desc: "Only text content is selectable." },
            { term: "all", desc: "One click selects all text in the element." },
        ],
    },
};

export default function InteractionClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [cursor, setCursor] = useState<CursorValue>("pointer");
    const [pointerEvents, setPointerEvents] = useState<"auto" | "none">("auto");
    const [userSelect, setUserSelect] = useState<"auto" | "none" | "text" | "all">("text");
    const [hovering, setHovering] = useState(false);

    const reset = () => {
        setCursor("pointer");
        setPointerEvents("auto");
        setUserSelect("text");
    };

    const css = useMemo(
        () => `.interactive {
  cursor: ${cursor};
  pointer-events: ${pointerEvents};
  user-select: ${userSelect};
  padding: 16px;
  background: #1e293b;
  border: 1px solid rgba(34, 211, 238, 0.4);
  border-radius: 0.5rem;
}`,
        [cursor, pointerEvents, userSelect],
    );

    const activeGroup = CURSOR_GROUPS.find((g) => g.values.includes(cursor))?.title ?? "";

    return (
        <>
            <CssPlaygroundShell
                title="Interaction"
                description="All 36 CSS cursor keywords, plus pointer-events and user-select."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Cursor" subtitle={`All ${ALL_CURSORS.length} standard keyword values — hover the preview to see each one`}>
                            <div className="space-y-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-1">
                                {CURSOR_GROUPS.map((group) => (
                                    <div key={group.title}>
                                        <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                                            {group.title}
                                        </p>
                                        <div className="grid grid-cols-2 gap-1">
                                            {group.values.map((c) => (
                                                <button
                                                    key={c}
                                                    type="button"
                                                    onClick={() => setCursor(c as CursorValue)}
                                                    className={`rounded-lg px-2 py-1.5 text-[10px] font-mono text-left border transition-colors ${cursor === c ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"}`}
                                                >
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{CURSOR_HINTS[cursor]}</p>
                            <button
                                type="button"
                                onClick={() => setOpenDocId("cursor")}
                                className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                            >
                                Full cursor reference (incl. url())
                            </button>
                        </ControlGroup>

                        <ControlGroup title="Pointer events">
                            <ToggleRow label="Pointer events" docId="pointer-events" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["auto", "none"] as const).map((p) => (
                                    <SegmentButton key={p} active={pointerEvents === p} onClick={() => setPointerEvents(p)}>
                                        {p}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                {pointerEvents === "none"
                                    ? "Preview ignores the mouse — you won't see cursor changes while none is active."
                                    : "Preview receives hover events normally."}
                            </p>
                        </ControlGroup>

                        <ControlGroup title="User select">
                            <ToggleRow label="User select" docId="user-select" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["auto", "text", "none", "all"] as const).map((u) => (
                                    <SegmentButton key={u} active={userSelect === u} onClick={() => setUserSelect(u)}>
                                        {u}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                        </ControlGroup>
                    </>
                }
                preview={
                    <div className="flex flex-col items-center gap-4 w-full max-w-sm">
                        <div
                            className="w-full rounded-xl border-2 border-dashed border-cyan-500/40 bg-slate-800/80 px-5 py-8 text-center transition-colors"
                            style={{
                                cursor: pointerEvents === "none" ? "not-allowed" : cursor,
                                pointerEvents,
                                userSelect,
                            }}
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                        >
                            <p className="text-sm text-gray-200 mb-2">
                                {pointerEvents === "none"
                                    ? "pointer-events: none — events pass through"
                                    : "Move your mouse here"}
                            </p>
                            <p className="text-xs text-gray-400 leading-relaxed select-text">
                                Try selecting this sample text. Drag handles use grab/grabbing. Resize cursors appear on
                                panel edges in real UIs.
                            </p>
                        </div>

                        <div className="w-full rounded-lg bg-black/30 border border-white/10 px-3 py-2 font-mono text-[11px] text-center">
                            {pointerEvents === "none" ? (
                                <span className="text-amber-400/90">pointer-events: none — cursor not applied on this box</span>
                            ) : (
                                <>
                                    <span className="text-cyan-400">cursor: {cursor}</span>
                                    {hovering && activeGroup && (
                                        <span className="text-gray-500"> · {activeGroup}</span>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
