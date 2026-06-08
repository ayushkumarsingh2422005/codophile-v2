"use client";

import React, { useMemo, useState } from "react";
import {
    ControlGroup,
    CssPlaygroundShell,
    PropertyExplainModal,
    SliderControl,
    ToggleRow,
    SegmentButton,
    usePropertyDocModal,
    type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";

type DemoMode = "solid" | "image";

const BLEND_MODES = [
    "normal",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
] as const;

type BlendMode = (typeof BLEND_MODES)[number];

const DOCS: Record<string, PropertyDoc> = {
    opacity: {
        title: "CSS opacity",
        intro: "Sets transparency from 0 (fully transparent) to 1 (fully opaque). Unlike rgba(), opacity affects the entire element including children and blends with layers behind.",
        syntax: ["opacity: 0.5;", "opacity: 1;", "opacity: 0; /* invisible but still receives events unless pointer-events: none */"],
        tip: "The checkerboard in the preview shows where transparency lets the backdrop through.",
    },
    "mix-blend-mode": {
        title: "CSS mix-blend-mode",
        intro: "Defines how an element's pixels blend with the backdrop — everything painted behind it in the same stacking context (parent background, siblings below, etc.).",
        syntax: [
            "mix-blend-mode: multiply;",
            "mix-blend-mode: screen;",
            "mix-blend-mode: difference;",
            "mix-blend-mode: luminosity;",
        ],
        values: [
            { term: "normal", desc: "No blending — source pixels replace backdrop." },
            { term: "multiply", desc: "Darkens — like stacking transparent inks." },
            { term: "screen", desc: "Lightens — inverse of multiply." },
            { term: "overlay", desc: "Multiply or screen depending on backdrop brightness." },
            { term: "darken", desc: "Keeps the darker of source vs backdrop per channel." },
            { term: "lighten", desc: "Keeps the lighter of source vs backdrop." },
            { term: "color-dodge", desc: "Brightens backdrop toward white." },
            { term: "color-burn", desc: "Darkens backdrop toward black." },
            { term: "hard-light", desc: "Strong overlay — multiply or screen based on source." },
            { term: "soft-light", desc: "Gentler version of hard-light." },
            { term: "difference", desc: "Absolute difference between source and backdrop colors." },
            { term: "exclusion", desc: "Similar to difference but lower contrast." },
            { term: "hue", desc: "Backdrop luminance + saturation, source hue." },
            { term: "saturation", desc: "Backdrop hue + luminance, source saturation." },
            { term: "color", desc: "Backdrop luminance, source hue + saturation." },
            { term: "luminosity", desc: "Backdrop hue + saturation, source luminance." },
        ],
    },
};

/** Mountain scenery — rich colors make blend modes easy to see. */
const SCENERY_IMAGE =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80";

function Checkerboard() {
    return (
        <div
            className="absolute inset-0 opacity-30"
            style={{
                backgroundImage: `
          linear-gradient(45deg, #2a2a2a 25%, transparent 25%, transparent 75%, #2a2a2a 75%, #2a2a2a),
          linear-gradient(45deg, #2a2a2a 25%, transparent 25%, transparent 75%, #2a2a2a 75%, #2a2a2a)
        `,
                backgroundSize: "16px 16px",
                backgroundPosition: "0 0, 8px 8px",
            }}
        />
    );
}

export default function OpacityBlendClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [demoMode, setDemoMode] = useState<DemoMode>("solid");
    const [opacity, setOpacity] = useState(0.85);
    const [blend, setBlend] = useState<BlendMode>("multiply");

    const reset = () => {
        setDemoMode("solid");
        setOpacity(0.85);
        setBlend("multiply");
    };

    const css = useMemo(() => {
        if (demoMode === "solid") {
            return `.backdrop {
  /* colorful layer behind — blend modes need something to blend with */
  background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
}

.layer {
  opacity: ${opacity};
  mix-blend-mode: ${blend};
  background: #a855f7;
  width: 120px;
  height: 120px;
  border-radius: 9999px;
}`;
        }
        return `.backdrop {
  background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
}

img.layer {
  opacity: ${opacity};
  mix-blend-mode: ${blend};
  width: 220px;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
}`;
    }, [demoMode, opacity, blend]);

    const layerStyle: React.CSSProperties = {
        opacity,
        mixBlendMode: blend,
    };

    return (
        <>
            <CssPlaygroundShell
                title="Opacity & Blend"
                description="opacity and mix-blend-mode — compare a solid layer vs an image layer over a colorful backdrop."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Demo type" subtitle="Solid shape or image — blend behaves the same, image shows photo-like effects">
                            <ToggleRow label="Layer type">
                                <SegmentButton active={demoMode === "solid"} onClick={() => setDemoMode("solid")}>
                                    Solid
                                </SegmentButton>
                                <SegmentButton active={demoMode === "image"} onClick={() => setDemoMode("image")}>
                                    Image
                                </SegmentButton>
                            </ToggleRow>
                            <p className="text-[10px] text-gray-500 leading-relaxed">
                                {demoMode === "solid"
                                    ? "Purple circle over a gradient — good for seeing opacity and basic blend math."
                                    : "Scenery photo over the same gradient — shows how blend modes affect real photos."}
                            </p>
                        </ControlGroup>

                        <ControlGroup title="Visual properties">
                            <SliderControl
                                label="Opacity"
                                docId="opacity"
                                docs={DOCS}
                                onOpenDoc={setOpenDocId}
                                value={opacity}
                                onChange={setOpacity}
                                min={0}
                                max={1}
                                step={0.05}
                            />
                        </ControlGroup>

                        <ControlGroup title="Mix blend mode" subtitle="All 16 standard blend modes">
                            <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto custom-scrollbar pr-1">
                                {BLEND_MODES.map((m) => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setBlend(m)}
                                        className={`rounded-lg px-2 py-1.5 text-[10px] font-mono text-left border transition-colors ${blend === m ? "border-violet-500/50 bg-violet-500/10 text-violet-200" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"}`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpenDocId("mix-blend-mode")}
                                className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                            >
                                What does each blend mode do?
                            </button>
                        </ControlGroup>
                    </>
                }
                preview={
                    <div className="relative w-72 h-48 rounded-xl overflow-hidden border border-white/10">
                        <Checkerboard />
                        <div className="absolute inset-0 bg-linear-to-br from-cyan-500 via-violet-500 to-pink-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            {demoMode === "solid" ? (
                                <div
                                    className="w-28 h-28 rounded-full bg-violet-500 flex items-center justify-center text-xs font-mono text-white shadow-lg"
                                    style={layerStyle}
                                >
                                    layer
                                </div>
                            ) : (
                                /* eslint-disable-next-line @next/next/no-img-element */
                                <img
                                    src={SCENERY_IMAGE}
                                    alt="Mountain scenery"
                                    className="rounded-lg shadow-lg object-cover"
                                    width={220}
                                    height={150}
                                    style={layerStyle}
                                />
                            )}
                        </div>
                        <span className="absolute bottom-2 left-2 text-[9px] font-mono text-white/50 bg-black/40 px-1.5 py-0.5 rounded">
                            {demoMode} · {blend} · opacity {opacity}
                        </span>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
