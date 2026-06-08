"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, ToggleRow,
    SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    overflow: {
        title: "CSS overflow",
        intro: "Controls what happens when content exceeds the element's box.",
        syntax: ["overflow: visible;", "overflow: hidden;", "overflow: scroll;", "overflow: auto;"],
        values: [
            { term: "visible", desc: "Content spills outside the box." },
            { term: "hidden", desc: "Clips overflowing content." },
            { term: "scroll", desc: "Always shows scrollbars when needed." },
            { term: "auto", desc: "Scrollbars appear only when needed." },
        ],
    },
    "text-overflow": {
        title: "CSS text-overflow",
        intro: "How overflowed inline text is signaled—commonly used with ellipsis.",
        syntax: ['text-overflow: ellipsis;', "text-overflow: clip;"],
        tip: "Requires overflow: hidden, white-space: nowrap, and a constrained width.",
    },
    "white-space": {
        title: "CSS white-space",
        intro: "Controls line wrapping and whitespace collapsing.",
        syntax: ["white-space: normal;", "white-space: nowrap;", "white-space: pre-wrap;"],
    },
};

const LOREM = "This is a long paragraph that demonstrates overflow behavior when the container is too small to fit all the text content at once.";

export default function OverflowClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [overflow, setOverflow] = useState<"visible" | "hidden" | "scroll" | "auto">("hidden");
    const [textOverflow, setTextOverflow] = useState<"clip" | "ellipsis">("ellipsis");
    const [whiteSpace, setWhiteSpace] = useState<"normal" | "nowrap">("nowrap");

    const reset = () => { setOverflow("hidden"); setTextOverflow("ellipsis"); setWhiteSpace("nowrap"); };

    const css = `.box {
  width: 200px;
  height: 80px;
  overflow: ${overflow};
  text-overflow: ${textOverflow};
  white-space: ${whiteSpace};
  border: 1px solid #4b5563;
  padding: 8px;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Overflow"
                description="overflow, text-overflow, and white-space."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Overflow properties">
                        <ToggleRow label="Overflow" docId="overflow" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["visible", "hidden", "scroll", "auto"] as const).map((v) => (
                                <SegmentButton key={v} active={overflow === v} onClick={() => setOverflow(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Text overflow" docId="text-overflow" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["clip", "ellipsis"] as const).map((v) => (
                                <SegmentButton key={v} active={textOverflow === v} onClick={() => setTextOverflow(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="White space" docId="white-space" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["normal", "nowrap"] as const).map((v) => (
                                <SegmentButton key={v} active={whiteSpace === v} onClick={() => setWhiteSpace(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                    </ControlGroup>
                }
                preview={
                    <div className="text-sm text-gray-300 border border-gray-600 p-2 rounded-lg font-mono" style={{ width: 200, height: 80, overflow, textOverflow, whiteSpace }}>
                        {LOREM}
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
