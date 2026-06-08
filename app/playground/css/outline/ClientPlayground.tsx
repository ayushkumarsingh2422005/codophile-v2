"use client";

import {
    ControlGroup, ColorControl, CssPlaygroundShell, PropertyExplainModal, SliderControl,
    ToggleRow, SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    outline: { title: "CSS outline", intro: "A line drawn outside the border edge; does not affect layout.", syntax: ["outline: 2px solid #3b82f6;", "outline: thick dashed red;"] },
    "outline-offset": { title: "CSS outline-offset", intro: "Space between the outline and the border edge.", syntax: ["outline-offset: 4px;", "outline-offset: -2px;"] },
    "outline-style": { title: "CSS outline-style", intro: "Style of the outline line.", syntax: ["outline-style: solid;", "outline-style: dashed;", "outline-style: dotted;"] },
};

export default function OutlineClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [width, setWidth] = useState(3);
    const [style, setStyle] = useState("solid");
    const [color, setColor] = useState("#22d3ee");
    const [offset, setOffset] = useState(4);

    const reset = () => { setWidth(3); setStyle("solid"); setColor("#22d3ee"); setOffset(4); };

    const css = `.element {
  outline: ${width}px ${style} ${color};
  outline-offset: ${offset}px;
  border: 2px solid #4b5563;
  padding: 24px;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Outline"
                description="outline, outline-style, and outline-offset — drawn outside the border."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Outline properties">
                        <SliderControl label="Width" value={width} onChange={setWidth} min={0} max={12} unit="px" />
                        <ToggleRow label="Style" docId="outline-style" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {["solid", "dashed", "dotted", "double"].map((s) => (
                                <SegmentButton key={s} active={style === s} onClick={() => setStyle(s)}>{s}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <ColorControl label="Color" value={color} onChange={setColor} />
                        <SliderControl label="Offset" docId="outline-offset" docs={DOCS} onOpenDoc={setOpenDocId} value={offset} onChange={setOffset} min={-4} max={16} unit="px" />
                    </ControlGroup>
                }
                preview={
                    <div
                        className="px-8 py-6 rounded-lg bg-slate-800 border-2 border-gray-600 text-sm font-mono text-gray-300"
                        style={{ outline: `${width}px ${style} ${color}`, outlineOffset: offset }}
                    >
                        outline demo
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
