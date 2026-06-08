"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, ToggleRow,
    SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    visibility: {
        title: "CSS visibility",
        intro: "Shows or hides an element while preserving its layout space (unlike display: none).",
        syntax: ["visibility: visible;", "visibility: hidden;", "visibility: collapse;"],
        values: [
            { term: "visible", desc: "Element is visible." },
            { term: "hidden", desc: "Invisible but still takes up space." },
            { term: "collapse", desc: "For table rows/columns; removes from layout in tables." },
        ],
    },
    "content-visibility": {
        title: "CSS content-visibility",
        intro: "Hints to skip rendering off-screen content for performance.",
        syntax: ["content-visibility: visible;", "content-visibility: auto;", "content-visibility: hidden;"],
        tip: "auto can improve performance on long pages; hidden skips painting entirely.",
    },
};

export default function VisibilityClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [visibility, setVisibility] = useState<"visible" | "hidden" | "collapse">("visible");
    const [contentVisibility, setContentVisibility] = useState<"visible" | "auto" | "hidden">("visible");

    const reset = () => { setVisibility("visible"); setContentVisibility("visible"); };

    const css = `.box {
  visibility: ${visibility};
  content-visibility: ${contentVisibility};
  width: 120px;
  height: 80px;
  background: #3b82f6;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Visibility"
                description="visibility and content-visibility."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Visibility properties">
                        <ToggleRow label="Visibility" docId="visibility" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["visible", "hidden", "collapse"] as const).map((v) => (
                                <SegmentButton key={v} active={visibility === v} onClick={() => setVisibility(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Content visibility" docId="content-visibility" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["visible", "auto", "hidden"] as const).map((v) => (
                                <SegmentButton key={v} active={contentVisibility === v} onClick={() => setContentVisibility(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                    </ControlGroup>
                }
                preview={
                    <div className="flex gap-4 items-center">
                        <div className="w-24 h-16 rounded bg-slate-700 border border-dashed border-white/20 text-[10px] flex items-center justify-center text-gray-500">spacer</div>
                        <div className="w-28 h-20 rounded bg-blue-500 flex items-center justify-center text-xs font-mono" style={{ visibility, contentVisibility }}>
                            box
                        </div>
                        <div className="w-24 h-16 rounded bg-slate-700 border border-dashed border-white/20 text-[10px] flex items-center justify-center text-gray-500">spacer</div>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
