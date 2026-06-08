"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, ToggleRow,
    SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import React, { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    "list-style-type": {
        title: "CSS list-style-type",
        intro: "Marker glyph for list items.",
        syntax: ["list-style-type: disc;", "list-style-type: decimal;", "list-style-type: none;"],
        values: [
            { term: "disc / circle / square", desc: "Bullets for unordered lists." },
            { term: "decimal / lower-alpha", desc: "Numbers or letters for ordered lists." },
            { term: "none", desc: "No marker shown." },
        ],
    },
    "list-style-position": {
        title: "CSS list-style-position",
        intro: "Whether the marker is inside or outside the content flow.",
        syntax: ["list-style-position: outside;", "list-style-position: inside;"],
    },
};

export default function ListsClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [listType, setListType] = useState("disc");
    const [position, setPosition] = useState<"inside" | "outside">("outside");
    const [ordered, setOrdered] = useState(false);

    const reset = () => { setListType("disc"); setPosition("outside"); setOrdered(false); };
    const effectiveType = ordered ? (listType === "disc" ? "decimal" : listType) : listType;

    const css = `ul, ol {
  list-style-type: ${effectiveType};
  list-style-position: ${position};
  padding-left: 1.5rem;
}`;

    const items = ["First item", "Second item with more text to show marker position", "Third item"];

    return (
        <>
            <CssPlaygroundShell
                title="List Properties"
                description="list-style-type and list-style-position."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="List properties">
                        <ToggleRow label="Ordered list">
                            <SegmentButton active={!ordered} onClick={() => setOrdered(false)}>ul</SegmentButton>
                            <SegmentButton active={ordered} onClick={() => { setOrdered(true); setListType("decimal"); }}>ol</SegmentButton>
                        </ToggleRow>
                        <ToggleRow label="Style type" docId="list-style-type" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(ordered ? ["decimal", "lower-alpha", "upper-roman", "none"] : ["disc", "circle", "square", "none"]).map((t) => (
                                <SegmentButton key={t} active={effectiveType === t} onClick={() => setListType(t)}>{t}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ToggleRow label="Position" docId="list-style-position" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["outside", "inside"] as const).map((p) => (
                                <SegmentButton key={p} active={position === p} onClick={() => setPosition(p)}>{p}</SegmentButton>
                            ))}
                        </ToggleRow>
                    </ControlGroup>
                }
                preview={
                    ordered ? (
                        <ol className="text-sm text-gray-300 text-left max-w-xs" style={{ listStyleType: effectiveType as React.CSSProperties["listStyleType"], listStylePosition: position, paddingLeft: "1.5rem" }}>
                            {items.map((i) => <li key={i}>{i}</li>)}
                        </ol>
                    ) : (
                        <ul className="text-sm text-gray-300 text-left max-w-xs" style={{ listStyleType: effectiveType as React.CSSProperties["listStyleType"], listStylePosition: position, paddingLeft: "1.5rem" }}>
                            {items.map((i) => <li key={i}>{i}</li>)}
                        </ul>
                    )
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
