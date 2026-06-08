"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, SliderControl,
    ToggleRow, SegmentButton, usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    "object-fit": {
        title: "CSS object-fit",
        intro: "How replaced content (img, video) fits its box.",
        syntax: ["object-fit: cover;", "object-fit: contain;", "object-fit: fill;"],
        values: [
            { term: "fill", desc: "Stretch to fill box; may distort." },
            { term: "contain", desc: "Scale to fit inside; letterboxing possible." },
            { term: "cover", desc: "Scale to cover box; may crop." },
            { term: "none", desc: "Original size." },
        ],
    },
    "object-position": { title: "CSS object-position", intro: "Alignment of the object within its box.", syntax: ["object-position: center;", "object-position: top left;", "object-position: 50% 20%;"] },
};

export default function ObjectFitClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [fit, setFit] = useState<"cover" | "contain" | "fill" | "none">("cover");
    const [posX, setPosX] = useState(50);
    const [posY, setPosY] = useState(50);

    const reset = () => { setFit("cover"); setPosX(50); setPosY(50); };

    const css = `.image-box {
  width: 320px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: ${fit};
  object-position: ${posX}% ${posY}%;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Object Fit"
                description="object-fit and object-position for images and replaced elements."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Object properties">
                        <ToggleRow label="Object fit" docId="object-fit" docs={DOCS} onOpenDoc={setOpenDocId}>
                            {(["cover", "contain", "fill", "none"] as const).map((v) => (
                                <SegmentButton key={v} active={fit === v} onClick={() => setFit(v)}>{v}</SegmentButton>
                            ))}
                        </ToggleRow>
                        <SliderControl label="Position X" docId="object-position" docs={DOCS} onOpenDoc={setOpenDocId} value={posX} onChange={setPosX} min={0} max={100} unit="%" />
                        <SliderControl label="Position Y" value={posY} onChange={setPosY} min={0} max={100} unit="%" />
                    </ControlGroup>
                }
                preview={
                    <div
                        className="border-2 border-dashed border-cyan-500/40 rounded-lg overflow-hidden bg-slate-900/60"
                        style={{ width: 320, aspectRatio: "16 / 9" }}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/logo.png"
                            alt="Demo"
                            className="w-full h-full"
                            style={{ objectFit: fit, objectPosition: `${posX}% ${posY}%` }}
                        />
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
