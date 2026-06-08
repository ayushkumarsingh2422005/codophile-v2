"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, ToggleRow,
    SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    "text-decoration": { title: "CSS text-decoration", intro: "Lines applied to text (underline, overline, line-through).", syntax: ["text-decoration: underline;", "text-decoration: line-through wavy red;"] },
    "word-break": { title: "CSS word-break", intro: "How words break when overflowing.", syntax: ["word-break: normal;", "word-break: break-all;", "word-break: keep-all;"] },
    "overflow-wrap": { title: "CSS overflow-wrap", intro: "Whether the browser may break long words.", syntax: ["overflow-wrap: normal;", "overflow-wrap: break-word;"] },
};

const LONG = "Supercalifragilisticexpialidocious pneumonoultramicroscopicsilicovolcanoconiosis";

export default function TextLayoutClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [decoration, setDecoration] = useState("none");
    const [wordBreak, setWordBreak] = useState<"normal" | "break-all" | "keep-all">("normal");
    const [overflowWrap, setOverflowWrap] = useState<"normal" | "break-word">("normal");

    const reset = () => { setDecoration("none"); setWordBreak("normal"); setOverflowWrap("normal"); };

    const css = `.text {
  width: 200px;
  text-decoration: ${decoration};
  word-break: ${wordBreak};
  overflow-wrap: ${overflowWrap};
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Text Layout"
                description="text-decoration, word-break, and overflow-wrap."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Text properties">
                        <ToggleRow label="Text decoration" docId="text-decoration" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {["none", "underline", "overline", "line-through"].map((d) => (
                                <SegmentButton key={d} active={decoration === d} onClick={() => setDecoration(d)}>{d}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Word break" docId="word-break" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["normal", "break-all", "keep-all"] as const).map((w) => (
                                <SegmentButton key={w} active={wordBreak === w} onClick={() => setWordBreak(w)}>{w}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Overflow wrap" docId="overflow-wrap" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["normal", "break-word"] as const).map((w) => (
                                <SegmentButton key={w} active={overflowWrap === w} onClick={() => setOverflowWrap(w)}>{w}</SegmentButton>
                            ))}
                        </ToggleRow>
                    </ControlGroup>
                }
                preview={
                    <p
                        className="text-sm text-gray-300 border border-gray-600 p-3 rounded-lg font-mono"
                        style={{ width: 200, textDecoration: decoration, wordBreak, overflowWrap }}
                    >
                        {LONG}
                    </p>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
