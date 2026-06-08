"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, ToggleRow,
    SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    "scroll-behavior": { title: "CSS scroll-behavior", intro: "Smooth scrolling for scroll containers.", syntax: ["scroll-behavior: smooth;", "scroll-behavior: auto;"] },
    "scroll-snap-type": { title: "CSS scroll-snap-type", intro: "Enables snap points along the scroll axis.", syntax: ["scroll-snap-type: x mandatory;", "scroll-snap-type: y proximity;"] },
};

export default function ScrollClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [behavior, setBehavior] = useState<"auto" | "smooth">("smooth");
    const [snapType, setSnapType] = useState<"none" | "x mandatory" | "y mandatory">("x mandatory");

    const reset = () => { setBehavior("smooth"); setSnapType("x mandatory"); };

    const css = `.scroller {
  scroll-behavior: ${behavior};
  scroll-snap-type: ${snapType};
  overflow-x: auto;
  display: flex;
  gap: 12px;
}

.slide {
  scroll-snap-align: start;
  flex: 0 0 120px;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Scroll Properties"
                description="scroll-behavior and scroll-snap-type."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Scroll properties">
                        <ToggleRow label="Scroll behavior" docId="scroll-behavior" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["auto", "smooth"] as const).map((b) => (
                                <SegmentButton key={b} active={behavior === b} onClick={() => setBehavior(b)}>{b}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Snap type" docId="scroll-snap-type" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["none", "x mandatory", "y mandatory"] as const).map((s) => (
                                <SegmentButton key={s} active={snapType === s} onClick={() => setSnapType(s)}>{s}</SegmentButton>
                            ))}
                        </ToggleRow>
                    </ControlGroup>
                }
                preview={
                    <div
                        className="flex gap-3 w-full max-w-sm overflow-x-auto p-2 rounded-lg border border-white/10"
                        style={{ scrollBehavior: behavior, scrollSnapType: snapType }}
                    >
                        {[1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className="shrink-0 w-28 h-20 rounded-lg bg-cyan-500/30 border border-cyan-500/50 flex items-center justify-center text-sm font-mono" style={{ scrollSnapAlign: snapType !== "none" ? "start" : undefined }}>
                                {n}
                            </div>
                        ))}
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
