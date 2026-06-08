"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, SliderControl,
    ToggleRow, SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    width: { title: "CSS width", intro: "Sets the width of an element's content area.", syntax: ["width: 200px;", "width: 100%;", "width: auto;"] },
    height: { title: "CSS height", intro: "Sets the height of an element's content area.", syntax: ["height: 120px;", "height: 100%;", "height: auto;"] },
    "box-sizing": {
        title: "CSS box-sizing",
        intro: "Defines how width and height are calculated—whether padding and border are included.",
        syntax: ["box-sizing: content-box;", "box-sizing: border-box;"],
        values: [
            { term: "content-box", desc: "Width/height apply to content only; padding and border add to total size." },
            { term: "border-box", desc: "Width/height include padding and border." },
        ],
    },
    margin: { title: "CSS margin", intro: "Space outside the border, between this element and neighbors.", syntax: ["margin: 16px;", "margin: 8px 16px;"] },
    padding: { title: "CSS padding", intro: "Space between the border and the element's content.", syntax: ["padding: 16px;", "padding: 8px 24px;"] },
};

export default function BoxModelClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(120);
    const [margin, setMargin] = useState(16);
    const [padding, setPadding] = useState(20);
    const [boxSizing, setBoxSizing] = useState<"content-box" | "border-box">("content-box");

    const reset = () => { setWidth(200); setHeight(120); setMargin(16); setPadding(20); setBoxSizing("content-box"); };

    const css = `.box {
  width: ${width}px;
  height: ${height}px;
  margin: ${margin}px;
  padding: ${padding}px;
  box-sizing: ${boxSizing};
  border: 2px solid #3b82f6;
  background: #1e293b;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Box Model"
                description="width, height, margin, padding, and box-sizing on a single element."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Dimensions">
                            <SliderControl label="Width" docId="width" docs={DOCS} onOpenDoc={setOpenDocId} value={width} onChange={setWidth} min={80} max={360} unit="px" />
                            <SliderControl label="Height" docId="height" docs={DOCS} onOpenDoc={setOpenDocId} value={height} onChange={setHeight} min={60} max={240} unit="px" />
                            <ToggleRow label="Box sizing" docId="box-sizing" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["content-box", "border-box"] as const).map((v) => (
                                    <SegmentButton key={v} active={boxSizing === v} onClick={() => setBoxSizing(v)}>{v}</SegmentButton>
                                ))}
                            </ToggleRow>
                        </ControlGroup>
                        <ControlGroup title="Spacing">
                            <SliderControl label="Margin" docId="margin" docs={DOCS} onOpenDoc={setOpenDocId} value={margin} onChange={setMargin} min={0} max={48} unit="px" />
                            <SliderControl label="Padding" docId="padding" docs={DOCS} onOpenDoc={setOpenDocId} value={padding} onChange={setPadding} min={0} max={48} unit="px" />
                        </ControlGroup>
                    </>
                }
                preview={
                    <div className="rounded-lg border border-dashed border-white/20 p-4 bg-white/5">
                        <div className="text-[10px] text-gray-500 mb-2 font-mono">margin area (dashed)</div>
                        <div
                            className="border-2 border-blue-500 bg-slate-800 text-white text-xs flex items-center justify-center font-mono"
                            style={{ width, height, margin, padding, boxSizing }}
                        >
                            content
                        </div>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
