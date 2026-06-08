"use client";

import React, { useMemo, useState } from "react";
import {
    ControlGroup,
    CssPlaygroundShell,
    PropertyExplainModal,
    PropertyLabel,
    SliderControl,
    Switch,
    ToggleRow,
    SegmentButton,
    usePropertyDocModal,
    type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";

type ShapeId = "none" | "circle" | "ellipse" | "inset" | "polygon";

type Point = { x: number; y: number };

const SCENERY_IMAGE =
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=500&q=80";

const POLYGON_PRESETS: Record<string, Point[]> = {
    Star: [
        { x: 50, y: 0 },
        { x: 100, y: 38 },
        { x: 82, y: 100 },
        { x: 18, y: 100 },
        { x: 0, y: 38 },
    ],
    Triangle: [
        { x: 50, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
    ],
    Diamond: [
        { x: 50, y: 0 },
        { x: 100, y: 50 },
        { x: 50, y: 100 },
        { x: 0, y: 50 },
    ],
    Arrow: [
        { x: 0, y: 35 },
        { x: 60, y: 35 },
        { x: 60, y: 15 },
        { x: 100, y: 50 },
        { x: 60, y: 85 },
        { x: 60, y: 65 },
        { x: 0, y: 65 },
    ],
    Hexagon: [
        { x: 25, y: 0 },
        { x: 75, y: 0 },
        { x: 100, y: 50 },
        { x: 75, y: 100 },
        { x: 25, y: 100 },
        { x: 0, y: 50 },
    ],
    Trapezoid: [
        { x: 20, y: 0 },
        { x: 80, y: 0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
    ],
};

const DEFAULT_POLYGON = POLYGON_PRESETS.Star;

const DOCS: Record<string, PropertyDoc> = {
    "clip-path": {
        title: "CSS clip-path",
        intro:
            "Clips an element to a region inside a path. Everything outside the path is hidden. Basic shapes (circle, ellipse, inset, polygon) work without SVG.",
        syntax: [
            "clip-path: none;",
            "clip-path: circle(50% at 50% 50%);",
            "clip-path: ellipse(40% 30% at center);",
            "clip-path: inset(10% 20% round 12px);",
            "clip-path: polygon(50% 0%, 100% 100%, 0% 100%);",
            "clip-path: polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%);",
        ],
        values: [
            { term: "none", desc: "No clipping — full element visible." },
            { term: "circle()", desc: "Circular clip. Radius + optional at position." },
            { term: "ellipse()", desc: "Elliptical clip. Two radii + optional at position." },
            { term: "inset()", desc: "Rectangular inset from each edge, optional rounded corners." },
            { term: "polygon()", desc: "Custom shape from comma-separated x y pairs (percentages or lengths)." },
        ],
        tip: "Coordinates in polygon() are relative to the element's border box. Minimum 3 points for a visible area.",
    },
    circle: {
        title: "clip-path: circle()",
        intro: "Clips to a circle. The radius can be a length, percentage, closest-side, or farthest-side.",
        syntax: ["circle(50% at 50% 50%);", "circle(80px at top left);", "circle(farthest-side at center);"],
    },
    ellipse: {
        title: "clip-path: ellipse()",
        intro: "Clips to an ellipse with separate horizontal and vertical radii.",
        syntax: ["ellipse(45% 30% at center);", "ellipse(60% 40% at 30% 70%);"],
    },
    inset: {
        title: "clip-path: inset()",
        intro: "Insets the visible area from top, right, bottom, and left edges. Optional round keyword rounds the inner corners.",
        syntax: [
            "inset(10%);",
            "inset(10% 20%); /* top/bottom | left/right */",
            "inset(5% 10% 15% 20% round 8px);",
        ],
    },
    polygon: {
        title: "clip-path: polygon()",
        intro: "Build any shape by listing vertices as x y pairs. Use evenodd fill rule for holes or self-intersecting paths.",
        syntax: [
            "polygon(50% 0%, 100% 100%, 0% 100%);",
            "polygon(evenodd, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 50% 50%);",
        ],
        tip: "Add or remove points in the playground to design your own shape. Each point is a percentage of width (x) and height (y).",
    },
};

function pointsToPolygon(points: Point[], evenodd: boolean) {
    const pairs = points.map((p) => `${p.x}% ${p.y}%`).join(", ");
    return evenodd ? `polygon(evenodd, ${pairs})` : `polygon(${pairs})`;
}

function buildClipPath(
    shape: ShapeId,
    circleRadius: number,
    ellipseRx: number,
    ellipseRy: number,
    posX: number,
    posY: number,
    insetUniform: boolean,
    insetAll: number,
    insetTop: number,
    insetRight: number,
    insetBottom: number,
    insetLeft: number,
    insetRound: number,
    polygonPoints: Point[],
    polygonEvenodd: boolean,
) {
    switch (shape) {
        case "none":
            return "none";
        case "circle":
            return `circle(${circleRadius}% at ${posX}% ${posY}%)`;
        case "ellipse":
            return `ellipse(${ellipseRx}% ${ellipseRy}% at ${posX}% ${posY}%)`;
        case "inset": {
            const round = insetRound > 0 ? ` round ${insetRound}px` : "";
            if (insetUniform) return `inset(${insetAll}%${round})`;
            return `inset(${insetTop}% ${insetRight}% ${insetBottom}% ${insetLeft}%${round})`;
        }
        case "polygon":
            return pointsToPolygon(polygonPoints, polygonEvenodd);
        default:
            return "none";
    }
}

export default function ClipPathClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [shape, setShape] = useState<ShapeId>("circle");

    const [circleRadius, setCircleRadius] = useState(45);
    const [ellipseRx, setEllipseRx] = useState(45);
    const [ellipseRy, setEllipseRy] = useState(35);
    const [posX, setPosX] = useState(50);
    const [posY, setPosY] = useState(50);

    const [insetUniform, setInsetUniform] = useState(true);
    const [insetAll, setInsetAll] = useState(12);
    const [insetTop, setInsetTop] = useState(10);
    const [insetRight, setInsetRight] = useState(15);
    const [insetBottom, setInsetBottom] = useState(10);
    const [insetLeft, setInsetLeft] = useState(15);
    const [insetRound, setInsetRound] = useState(12);

    const [polygonPoints, setPolygonPoints] = useState<Point[]>(DEFAULT_POLYGON);
    const [polygonEvenodd, setPolygonEvenodd] = useState(false);

    const reset = () => {
        setShape("circle");
        setCircleRadius(45);
        setEllipseRx(45);
        setEllipseRy(35);
        setPosX(50);
        setPosY(50);
        setInsetUniform(true);
        setInsetAll(12);
        setInsetTop(10);
        setInsetRight(15);
        setInsetBottom(10);
        setInsetLeft(15);
        setInsetRound(12);
        setPolygonPoints(DEFAULT_POLYGON);
        setPolygonEvenodd(false);
    };

    const clipPath = useMemo(
        () =>
            buildClipPath(
                shape,
                circleRadius,
                ellipseRx,
                ellipseRy,
                posX,
                posY,
                insetUniform,
                insetAll,
                insetTop,
                insetRight,
                insetBottom,
                insetLeft,
                insetRound,
                polygonPoints,
                polygonEvenodd,
            ),
        [
            shape,
            circleRadius,
            ellipseRx,
            ellipseRy,
            posX,
            posY,
            insetUniform,
            insetAll,
            insetTop,
            insetRight,
            insetBottom,
            insetLeft,
            insetRound,
            polygonPoints,
            polygonEvenodd,
        ],
    );

    const css = `.element {
  clip-path: ${clipPath};
  width: 224px;
  height: 224px;
  overflow: hidden;
}

.element img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`;

    const updatePoint = (index: number, axis: "x" | "y", value: number) => {
        setPolygonPoints((pts) => pts.map((p, i) => (i === index ? { ...p, [axis]: value } : p)));
    };

    const addPoint = () => {
        setPolygonPoints((pts) => {
            if (pts.length === 0) return [{ x: 50, y: 50 }];
            const last = pts[pts.length - 1];
            const first = pts[0];
            return [...pts, { x: Math.round((last.x + first.x) / 2), y: Math.round((last.y + first.y) / 2) }];
        });
    };

    const removePoint = (index: number) => {
        setPolygonPoints((pts) => (pts.length <= 3 ? pts : pts.filter((_, i) => i !== index)));
    };

    const applyPreset = (name: string) => {
        setPolygonPoints(POLYGON_PRESETS[name].map((p) => ({ ...p })));
    };

    return (
        <>
            <CssPlaygroundShell
                title="Clip Path"
                description="circle, ellipse, inset, and custom polygon — every shape with the controls it needs."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Shape" subtitle="Pick a clip-path function">
                            <ToggleRow label="Function" docId="clip-path" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["none", "circle", "ellipse", "inset", "polygon"] as const).map((s) => (
                                    <SegmentButton key={s} active={shape === s} onClick={() => setShape(s)}>
                                        {s}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                        </ControlGroup>

                        {shape === "circle" && (
                            <ControlGroup title="circle()" subtitle="Radius and center position">
                                <SliderControl
                                    label="Radius"
                                    docId="circle"
                                    docs={DOCS}
                                    onOpenDoc={setOpenDocId}
                                    value={circleRadius}
                                    onChange={setCircleRadius}
                                    min={5}
                                    max={70}
                                    unit="%"
                                />
                                <SliderControl label="Position X" value={posX} onChange={setPosX} min={0} max={100} unit="%" />
                                <SliderControl label="Position Y" value={posY} onChange={setPosY} min={0} max={100} unit="%" />
                            </ControlGroup>
                        )}

                        {shape === "ellipse" && (
                            <ControlGroup title="ellipse()" subtitle="Horizontal & vertical radii + center">
                                <SliderControl
                                    label="Radius X"
                                    docId="ellipse"
                                    docs={DOCS}
                                    onOpenDoc={setOpenDocId}
                                    value={ellipseRx}
                                    onChange={setEllipseRx}
                                    min={5}
                                    max={70}
                                    unit="%"
                                />
                                <SliderControl label="Radius Y" value={ellipseRy} onChange={setEllipseRy} min={5} max={70} unit="%" />
                                <SliderControl label="Position X" value={posX} onChange={setPosX} min={0} max={100} unit="%" />
                                <SliderControl label="Position Y" value={posY} onChange={setPosY} min={0} max={100} unit="%" />
                            </ControlGroup>
                        )}

                        {shape === "inset" && (
                            <ControlGroup title="inset()" subtitle="Crop from each edge; optional rounded inner corners">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-300">Uniform on all sides</span>
                                    <Switch checked={insetUniform} onChange={setInsetUniform} />
                                </div>
                                {insetUniform ? (
                                    <SliderControl
                                        label="Inset"
                                        docId="inset"
                                        docs={DOCS}
                                        onOpenDoc={setOpenDocId}
                                        value={insetAll}
                                        onChange={setInsetAll}
                                        min={0}
                                        max={45}
                                        unit="%"
                                    />
                                ) : (
                                    <>
                                        <SliderControl label="Top" value={insetTop} onChange={setInsetTop} min={0} max={45} unit="%" />
                                        <SliderControl label="Right" value={insetRight} onChange={setInsetRight} min={0} max={45} unit="%" />
                                        <SliderControl label="Bottom" value={insetBottom} onChange={setInsetBottom} min={0} max={45} unit="%" />
                                        <SliderControl label="Left" value={insetLeft} onChange={setInsetLeft} min={0} max={45} unit="%" />
                                    </>
                                )}
                                <SliderControl label="Round" value={insetRound} onChange={setInsetRound} min={0} max={48} unit="px" />
                            </ControlGroup>
                        )}

                        {shape === "polygon" && (
                            <>
                                <ControlGroup title="polygon() presets" subtitle="Start from a shape, then customize points">
                                    <div className="grid grid-cols-2 gap-1.5">
                                        {Object.keys(POLYGON_PRESETS).map((name) => (
                                            <button
                                                key={name}
                                                type="button"
                                                onClick={() => applyPreset(name)}
                                                className="rounded-lg px-2 py-1.5 text-[10px] border border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200 transition-colors"
                                            >
                                                {name}
                                            </button>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setOpenDocId("polygon")}
                                        className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                                    >
                                        How polygon() coordinates work
                                    </button>
                                </ControlGroup>

                                <ControlGroup
                                    title={`Custom points (${polygonPoints.length})`}
                                    subtitle="Min 3 points — add or remove to build your shape"
                                >
                                    <div className="flex items-center justify-between">
                                        <PropertyLabel docId="polygon" docs={DOCS} onOpenDoc={setOpenDocId}>
                                            evenodd fill rule
                                        </PropertyLabel>
                                        <Switch checked={polygonEvenodd} onChange={setPolygonEvenodd} />
                                    </div>

                                    <div className="space-y-3 max-h-52 overflow-y-auto custom-scrollbar pr-1">
                                        {polygonPoints.map((pt, i) => (
                                            <div
                                                key={i}
                                                className="rounded-lg border border-white/10 bg-black/20 p-2.5 space-y-2"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-mono text-cyan-400/90">
                                                        Point {i + 1}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => removePoint(i)}
                                                        disabled={polygonPoints.length <= 3}
                                                        className="text-[10px] px-2 py-0.5 rounded border border-red-500/30 text-red-400/90 hover:bg-red-500/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>
                                                <SliderControl
                                                    label="X"
                                                    value={pt.x}
                                                    onChange={(v) => updatePoint(i, "x", v)}
                                                    min={0}
                                                    max={100}
                                                    unit="%"
                                                />
                                                <SliderControl
                                                    label="Y"
                                                    value={pt.y}
                                                    onChange={(v) => updatePoint(i, "y", v)}
                                                    min={0}
                                                    max={100}
                                                    unit="%"
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={addPoint}
                                        className="w-full py-2 rounded-lg border border-dashed border-cyan-500/40 text-xs text-cyan-400/90 hover:bg-cyan-500/10 transition-colors"
                                    >
                                        + Add point
                                    </button>
                                </ControlGroup>
                            </>
                        )}

                        {shape === "none" && (
                            <ControlGroup title="none">
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                    No clipping applied — the full image is visible. Switch to another shape to clip the
                                    element.
                                </p>
                            </ControlGroup>
                        )}
                    </>
                }
                preview={
                    <div className="relative">
                        <div className="absolute -inset-1 border-2 border-dashed border-white/20 rounded-lg pointer-events-none" />
                        <div
                            className="w-56 h-56 overflow-hidden shadow-xl"
                            style={{ clipPath: shape === "none" ? undefined : clipPath }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={SCENERY_IMAGE} alt="Clipped scenery" className="w-full h-full object-cover" />
                        </div>
                        {shape === "polygon" && (
                            <svg
                                className="absolute inset-0 w-56 h-56 pointer-events-none opacity-40"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                            >
                                <polygon
                                    points={polygonPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                                    fill="none"
                                    stroke="cyan"
                                    strokeWidth="0.5"
                                    strokeDasharray="2 1"
                                />
                                {polygonPoints.map((p, i) => (
                                    <circle key={i} cx={p.x} cy={p.y} r="1.5" fill="#22d3ee" />
                                ))}
                            </svg>
                        )}
                        <span className="absolute -bottom-6 left-0 right-0 text-center text-[9px] font-mono text-gray-500 truncate px-2">
                            {clipPath}
                        </span>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
