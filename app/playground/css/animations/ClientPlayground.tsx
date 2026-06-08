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

type KeyframeId = "pulse" | "bounce" | "spin" | "slide" | "fade" | "shake" | "float" | "flip";
type TimingId = "linear" | "ease" | "ease-in" | "ease-out" | "ease-in-out" | "back" | "steps";
type DirectionId = "normal" | "reverse" | "alternate" | "alternate-reverse";
type FillModeId = "none" | "forwards" | "backwards" | "both";
type IterationId = "1" | "3" | "infinite";
type ScenarioId =
    | "loading-spinner"
    | "attention-bounce"
    | "entrance-slide"
    | "pulse-badge"
    | "delayed-start"
    | "reverse-play"
    | "custom";

const DOCS: Record<string, PropertyDoc> = {
    keyframes: {
        title: "CSS @keyframes",
        intro:
            "Defines the intermediate steps in an animation sequence. Each keyframe block sets CSS properties at a percentage along the timeline (0% = start, 100% = end). The animation property on an element references the rule by name.",
        syntax: [
            "@keyframes slide-in {",
            "  from { transform: translateX(-100%); opacity: 0; }",
            "  to   { transform: translateX(0); opacity: 1; }",
            "}",
            "",
            "/* or use percentages */",
            "@keyframes pulse {",
            "  0%, 100% { transform: scale(1); }",
            "  50%      { transform: scale(1.2); }",
            "}",
        ],
        tip: "Only animatable properties (transform, opacity, colors, etc.) can change inside @keyframes. layout properties like width can animate but may be janky.",
    },
    "animation-name": {
        title: "CSS animation-name",
        intro: "References one or more @keyframes rules. Use none to disable.",
        syntax: ["animation-name: pulse;", "animation-name: slide-in, fade-in; /* comma-separated */", "animation-name: none;"],
    },
    "animation-duration": {
        title: "CSS animation-duration",
        intro: "How long one full cycle takes from 0% to 100%.",
        syntax: ["animation-duration: 1s;", "animation-duration: 500ms;", "animation-duration: 0s; /* instant */"],
        tip: "Duration applies per iteration. With iteration-count: 3 and duration 1s, total time is ~3s (plus delays).",
    },
    "animation-timing-function": {
        title: "CSS animation-timing-function",
        intro: "Controls the speed curve between keyframes — how fast the element moves through the timeline.",
        syntax: [
            "animation-timing-function: ease;",
            "animation-timing-function: linear;",
            "animation-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);",
            "animation-timing-function: steps(5, end);",
        ],
        values: [
            { term: "linear", desc: "Constant speed — ideal for spinners." },
            { term: "ease / ease-in / ease-out / ease-in-out", desc: "Preset curves for natural motion." },
            { term: "cubic-bezier(...)", desc: "Custom curve; values outside 0–1 can overshoot (bounce effect)." },
            { term: "steps(n, end|start)", desc: "Discrete jumps — flipbook / typewriter style." },
        ],
    },
    "animation-delay": {
        title: "CSS animation-delay",
        intro: "Wait time before the animation starts. Negative values begin partway through the first cycle.",
        syntax: ["animation-delay: 0.5s;", "animation-delay: -0.25s; /* starts 25% in */"],
    },
    "animation-iteration-count": {
        title: "CSS animation-iteration-count",
        intro: "How many times the animation repeats. Use infinite for loops.",
        syntax: ["animation-iteration-count: 1;", "animation-iteration-count: 3;", "animation-iteration-count: infinite;"],
    },
    "animation-direction": {
        title: "CSS animation-direction",
        intro: "Whether each iteration plays forward, backward, or alternates.",
        syntax: ["animation-direction: normal;", "animation-direction: reverse;", "animation-direction: alternate;", "animation-direction: alternate-reverse;"],
        values: [
            { term: "normal", desc: "0% → 100% every iteration." },
            { term: "reverse", desc: "100% → 0% every iteration." },
            { term: "alternate", desc: "Even iterations forward, odd iterations backward." },
            { term: "alternate-reverse", desc: "Opposite of alternate — starts backward." },
        ],
    },
    "animation-fill-mode": {
        title: "CSS animation-fill-mode",
        intro: "What styles apply before the animation starts and after it ends (when not infinite).",
        syntax: ["animation-fill-mode: none;", "animation-fill-mode: forwards;", "animation-fill-mode: backwards;", "animation-fill-mode: both;"],
        values: [
            { term: "none", desc: "Element uses its normal styles outside active animation." },
            { term: "forwards", desc: "Keeps the last keyframe styles after animation ends." },
            { term: "backwards", desc: "Applies the first keyframe during animation-delay." },
            { term: "both", desc: "forwards + backwards combined." },
        ],
        tip: "Use forwards with iteration-count: 1 for entrance animations that should stay visible.",
    },
    "animation-play-state": {
        title: "CSS animation-play-state",
        intro: "Pause or resume a running animation without removing it.",
        syntax: ["animation-play-state: running;", "animation-play-state: paused;"],
    },
    animation: {
        title: "CSS animation shorthand",
        intro: "Sets all animation sub-properties in one declaration. Omitted values use their initial defaults.",
        syntax: [
            "animation: name duration timing-function delay iteration-count direction fill-mode play-state;",
            "animation: pulse 1.5s ease-in-out infinite alternate;",
            "animation: slide-in 0.6s ease-out 0.2s 1 forwards;",
        ],
    },
};

const KEYFRAMES: Record<KeyframeId, { label: string; hint: string; css: string; pgName: string }> = {
    pulse: {
        label: "Pulse",
        hint: "Scale + opacity — notification dots, live indicators.",
        pgName: "pg-pulse",
        css: `@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50%      { transform: scale(1.15); opacity: 0.7; }
}`,
    },
    bounce: {
        label: "Bounce",
        hint: "Vertical bounce — draw attention to CTAs or errors.",
        pgName: "pg-bounce",
        css: `@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  40%      { transform: translateY(-28px); }
  60%      { transform: translateY(-14px); }
}`,
    },
    spin: {
        label: "Spin",
        hint: "Continuous rotation — loading spinners (pair with linear + infinite).",
        pgName: "pg-spin",
        css: `@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}`,
    },
    slide: {
        label: "Slide in",
        hint: "Enter from the left — modals, toasts, page reveals.",
        pgName: "pg-slide",
        css: `@keyframes slide-in {
  from { transform: translateX(-80px); opacity: 0; }
  to   { transform: translateX(0); opacity: 1; }
}`,
    },
    fade: {
        label: "Fade",
        hint: "Opacity only — subtle appear/disappear.",
        pgName: "pg-fade",
        css: `@keyframes fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}`,
    },
    shake: {
        label: "Shake",
        hint: "Horizontal shake — invalid form fields.",
        pgName: "pg-shake",
        css: `@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}`,
    },
    float: {
        label: "Float",
        hint: "Gentle up/down — hero illustrations, idle motion.",
        pgName: "pg-float",
        css: `@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-16px); }
}`,
    },
    flip: {
        label: "Flip",
        hint: "3D rotateY — card flip, coin toss effects.",
        pgName: "pg-flip",
        css: `@keyframes flip {
  from { transform: perspective(400px) rotateY(0deg); }
  to   { transform: perspective(400px) rotateY(360deg); }
}`,
    },
};

const TIMING: Record<TimingId, { label: string; value: string }> = {
    linear: { label: "linear", value: "linear" },
    ease: { label: "ease", value: "ease" },
    "ease-in": { label: "ease-in", value: "ease-in" },
    "ease-out": { label: "ease-out", value: "ease-out" },
    "ease-in-out": { label: "ease-in-out", value: "ease-in-out" },
    back: { label: "back", value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
    steps: { label: "steps(5)", value: "steps(5, end)" },
};

const SCENARIOS: Record<
    ScenarioId,
    {
        label: string;
        hint: string;
        keyframe: KeyframeId;
        duration: number;
        timing: TimingId;
        delay: number;
        iteration: IterationId;
        direction: DirectionId;
        fillMode: FillModeId;
        paused: boolean;
    }
> = {
    "loading-spinner": {
        label: "Loading spinner",
        hint: "spin + linear + infinite = constant-speed loader. Timing function linear avoids easing pauses at the ends.",
        keyframe: "spin",
        duration: 1,
        timing: "linear",
        delay: 0,
        iteration: "infinite",
        direction: "normal",
        fillMode: "none",
        paused: false,
    },
    "attention-bounce": {
        label: "Attention bounce",
        hint: "alternate makes the bounce reverse each cycle — smoother than normal + reset jump.",
        keyframe: "bounce",
        duration: 0.7,
        timing: "ease-out",
        delay: 0,
        iteration: "infinite",
        direction: "alternate",
        fillMode: "none",
        paused: false,
    },
    "entrance-slide": {
        label: "Entrance (once)",
        hint: "iteration-count: 1 + fill-mode: forwards keeps the element at the end state after sliding in.",
        keyframe: "slide",
        duration: 0.6,
        timing: "ease-out",
        delay: 0,
        iteration: "1",
        direction: "normal",
        fillMode: "forwards",
        paused: false,
    },
    "pulse-badge": {
        label: "Pulse badge",
        hint: "Short pulse loop on a small element — common for unread counts.",
        keyframe: "pulse",
        duration: 1.2,
        timing: "ease-in-out",
        delay: 0,
        iteration: "infinite",
        direction: "alternate",
        fillMode: "none",
        paused: false,
    },
    "delayed-start": {
        label: "Delayed start",
        hint: "animation-delay waits before the first frame. Use backwards fill to show the 0% keyframe during the wait.",
        keyframe: "fade",
        duration: 1,
        timing: "ease-in",
        delay: 1,
        iteration: "1",
        direction: "normal",
        fillMode: "backwards",
        paused: false,
    },
    "reverse-play": {
        label: "Reverse direction",
        hint: "direction: reverse plays keyframes from 100% → 0%. Good for exit animations using the same @keyframes.",
        keyframe: "slide",
        duration: 0.8,
        timing: "ease-in",
        delay: 0,
        iteration: "infinite",
        direction: "reverse",
        fillMode: "none",
        paused: false,
    },
    custom: {
        label: "Custom",
        hint: "Tune every property yourself.",
        keyframe: "pulse",
        duration: 1.5,
        timing: "ease-in-out",
        delay: 0,
        iteration: "infinite",
        direction: "alternate",
        fillMode: "none",
        paused: false,
    },
};

function timingCss(id: TimingId) {
    return TIMING[id].value;
}

function buildShorthand(
    name: string,
    duration: number,
    timing: TimingId,
    delay: number,
    iteration: IterationId,
    direction: DirectionId,
    fillMode: FillModeId,
    paused: boolean,
) {
    const delayPart = delay > 0 ? ` ${delay}s` : "";
    const fillPart = fillMode !== "none" ? ` ${fillMode}` : "";
    const statePart = paused ? " paused" : "";
    return `${name} ${duration}s ${timingCss(timing)}${delayPart} ${iteration} ${direction}${fillPart}${statePart}`.trim();
}

export default function AnimationsClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [scenario, setScenario] = useState<ScenarioId>("pulse-badge");
    const [keyframe, setKeyframe] = useState<KeyframeId>("pulse");
    const [duration, setDuration] = useState(1.2);
    const [timing, setTiming] = useState<TimingId>("ease-in-out");
    const [delay, setDelay] = useState(0);
    const [iteration, setIteration] = useState<IterationId>("infinite");
    const [direction, setDirection] = useState<DirectionId>("alternate");
    const [fillMode, setFillMode] = useState<FillModeId>("none");
    const [paused, setPaused] = useState(false);
    const [replayKey, setReplayKey] = useState(0);

    const applyScenario = (id: ScenarioId) => {
        const s = SCENARIOS[id];
        setScenario(id);
        setKeyframe(s.keyframe);
        setDuration(s.duration);
        setTiming(s.timing);
        setDelay(s.delay);
        setIteration(s.iteration);
        setDirection(s.direction);
        setFillMode(s.fillMode);
        setPaused(s.paused);
        setReplayKey((k) => k + 1);
    };

    const reset = () => applyScenario("pulse-badge");

    const markCustom = () => setScenario("custom");

    const kf = KEYFRAMES[keyframe];
    const timingValue = timingCss(timing);

    const css = useMemo(() => {
        const shorthand = buildShorthand(kf.pgName.replace("pg-", ""), duration, timing, delay, iteration, direction, fillMode, paused);
        return `${kf.css.replace(/@keyframes (\w+)/, `@keyframes ${kf.pgName.replace("pg-", "")}`)}

.element {
  animation-name: ${kf.pgName.replace("pg-", "")};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingValue};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iteration};
  animation-direction: ${direction};
  animation-fill-mode: ${fillMode};
  animation-play-state: ${paused ? "paused" : "running"};
}

/* shorthand */
.element {
  animation: ${shorthand};
}`;
    }, [kf, duration, timingValue, delay, iteration, direction, fillMode, paused, timing]);

    const injectedKeyframes = useMemo(
        () =>
            (Object.values(KEYFRAMES) as (typeof KEYFRAMES)[KeyframeId][])
                .map((k) =>
                    k.css
                        .replace(/@keyframes \w+/, `@keyframes ${k.pgName}`)
                        .replace(/^/gm, (line) => (line.startsWith("@keyframes") ? line : line)),
                )
                .join("\n\n"),
        [],
    );

    const fillModeHint =
        fillMode === "forwards"
            ? "After the last iteration, the element keeps the 100% keyframe styles."
            : fillMode === "backwards"
              ? "During delay, the 0% keyframe styles apply before the animation runs."
              : fillMode === "both"
                ? "Applies 0% styles during delay and 100% styles after finish."
                : "Outside active frames, the element uses its normal CSS.";

    const scenarioHint = SCENARIOS[scenario].hint;

    return (
        <>
            <style>{injectedKeyframes}</style>
            <CssPlaygroundShell
                title="Animations"
                description="@keyframes rules and every animation-* property — duration, easing, delay, iteration, direction, fill-mode, and play-state."
                cssOutput={css}
                onReset={reset}
                controls={
                    <>
                        <ControlGroup title="Learn a scenario" subtitle="Real patterns from production UIs">
                            <div className="space-y-2">
                                {(Object.keys(SCENARIOS) as ScenarioId[])
                                    .filter((k) => k !== "custom")
                                    .map((id) => (
                                        <button
                                            key={id}
                                            type="button"
                                            onClick={() => applyScenario(id)}
                                            className={`w-full text-left rounded-lg px-3 py-2 text-xs border transition-colors ${scenario === id ? "border-violet-500/50 bg-violet-500/10 text-violet-200" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"}`}
                                        >
                                            {SCENARIOS[id].label}
                                        </button>
                                    ))}
                            </div>
                            <div className="rounded-lg border-l-4 border-violet-500/60 bg-violet-500/5 px-3 py-2 text-xs text-gray-300 leading-relaxed">
                                <span className="font-semibold text-violet-300">Now: </span>
                                {scenarioHint}
                            </div>
                            <button
                                type="button"
                                onClick={() => setOpenDocId("keyframes")}
                                className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                            >
                                How do @keyframes work?
                            </button>
                        </ControlGroup>

                        <ControlGroup title="@keyframes preset" subtitle="Each preset is a named animation sequence">
                            <div className="grid grid-cols-2 gap-1.5">
                                {(Object.keys(KEYFRAMES) as KeyframeId[]).map((id) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => {
                                            setKeyframe(id);
                                            markCustom();
                                            setReplayKey((k) => k + 1);
                                        }}
                                        className={`rounded-lg px-2 py-1.5 text-[11px] border transition-colors ${keyframe === id ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-200" : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20"}`}
                                    >
                                        {KEYFRAMES[id].label}
                                    </button>
                                ))}
                            </div>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{kf.hint}</p>
                        </ControlGroup>

                        <ControlGroup title="Timing & playback">
                            <SliderControl
                                label="Duration"
                                docId="animation-duration"
                                docs={DOCS}
                                onOpenDoc={setOpenDocId}
                                value={duration}
                                onChange={(v) => {
                                    setDuration(v);
                                    markCustom();
                                }}
                                min={0.2}
                                max={4}
                                step={0.1}
                                unit="s"
                            />
                            <SliderControl
                                label="Delay"
                                docId="animation-delay"
                                docs={DOCS}
                                onOpenDoc={setOpenDocId}
                                value={delay}
                                onChange={(v) => {
                                    setDelay(v);
                                    markCustom();
                                }}
                                min={0}
                                max={2}
                                step={0.1}
                                unit="s"
                            />
                            <ToggleRow label="Timing function" docId="animation-timing-function" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(Object.keys(TIMING) as TimingId[]).map((id) => (
                                    <SegmentButton
                                        key={id}
                                        active={timing === id}
                                        onClick={() => {
                                            setTiming(id);
                                            markCustom();
                                        }}
                                    >
                                        {TIMING[id].label}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <ToggleRow label="Iteration count" docId="animation-iteration-count" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["1", "3", "infinite"] as const).map((v) => (
                                    <SegmentButton
                                        key={v}
                                        active={iteration === v}
                                        onClick={() => {
                                            setIteration(v);
                                            markCustom();
                                            setReplayKey((k) => k + 1);
                                        }}
                                    >
                                        {v}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <ToggleRow label="Direction" docId="animation-direction" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["normal", "reverse", "alternate", "alternate-reverse"] as const).map((v) => (
                                    <SegmentButton
                                        key={v}
                                        active={direction === v}
                                        onClick={() => {
                                            setDirection(v);
                                            markCustom();
                                        }}
                                    >
                                        {v}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                        </ControlGroup>

                        <ControlGroup title="Before & after animation">
                            <ToggleRow label="Fill mode" docId="animation-fill-mode" docs={DOCS} onOpenDoc={setOpenDocId}>
                                {(["none", "forwards", "backwards", "both"] as const).map((v) => (
                                    <SegmentButton
                                        key={v}
                                        active={fillMode === v}
                                        onClick={() => {
                                            setFillMode(v);
                                            markCustom();
                                            setReplayKey((k) => k + 1);
                                        }}
                                    >
                                        {v}
                                    </SegmentButton>
                                ))}
                            </ToggleRow>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{fillModeHint}</p>
                            <div className="flex items-center justify-between">
                                <PropertyLabel docId="animation-play-state" docs={DOCS} onOpenDoc={setOpenDocId}>
                                    Paused
                                </PropertyLabel>
                                <Switch
                                    checked={paused}
                                    onChange={(v) => {
                                        setPaused(v);
                                        markCustom();
                                    }}
                                />
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Common patterns">
                            <ul className="text-[10px] text-gray-400 space-y-1.5 list-disc pl-4 leading-relaxed">
                                <li>
                                    <strong className="text-gray-300">Loader</strong> — spin + linear + infinite
                                </li>
                                <li>
                                    <strong className="text-gray-300">Entrance</strong> — slide/fade + 1 iteration + forwards
                                </li>
                                <li>
                                    <strong className="text-gray-300">Stagger</strong> — same @keyframes, different animation-delay per child
                                </li>
                                <li>
                                    <strong className="text-gray-300">Exit</strong> — reuse keyframes with direction: reverse
                                </li>
                            </ul>
                            <button
                                type="button"
                                onClick={() => setOpenDocId("animation")}
                                className="text-[10px] text-cyan-500 hover:text-cyan-400 underline underline-offset-2"
                            >
                                animation shorthand syntax
                            </button>
                        </ControlGroup>
                    </>
                }
                preview={
                    <div className="flex flex-col items-center gap-6 w-full max-w-md">
                        <div className="flex items-center gap-3 w-full justify-between">
                            <span className="text-[10px] font-mono text-gray-500">
                                @keyframes {kf.pgName.replace("pg-", "")}
                            </span>
                            <button
                                type="button"
                                onClick={() => setReplayKey((k) => k + 1)}
                                className="text-[10px] px-2.5 py-1 rounded-md border border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                            >
                                Replay
                            </button>
                        </div>

                        <div
                            key={replayKey}
                            className="w-28 h-28 rounded-xl shadow-lg flex items-center justify-center text-[10px] font-mono text-white/90 border border-white/20"
                            style={{
                                background: keyframe === "spin" ? "#06b6d4" : keyframe === "bounce" ? "#f59e0b" : "#8b5cf6",
                                boxShadow: `0 8px 32px ${keyframe === "spin" ? "rgba(6,182,212,0.35)" : keyframe === "bounce" ? "rgba(245,158,11,0.35)" : "rgba(139,92,246,0.35)"}`,
                                animationName: kf.pgName,
                                animationDuration: `${duration}s`,
                                animationTimingFunction: timingValue,
                                animationDelay: `${delay}s`,
                                animationIterationCount: iteration,
                                animationDirection: direction,
                                animationFillMode: fillMode,
                                animationPlayState: paused ? "paused" : "running",
                            }}
                        >
                            .element
                        </div>

                        <div className="w-full grid grid-cols-3 gap-2 text-center">
                            {["0%", "50%", "100%"].map((pct) => (
                                <div key={pct} className="rounded-lg border border-white/10 bg-white/5 px-2 py-1.5">
                                    <span className="text-[9px] font-mono text-cyan-400/80">{pct}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-[10px] text-gray-500 text-center leading-relaxed max-w-xs">
                            {paused
                                ? "play-state: paused — animation frozen mid-cycle."
                                : iteration === "1"
                                  ? `Runs once over ${duration}s${delay > 0 ? ` (after ${delay}s delay)` : ""}. Watch fill-mode after it ends.`
                                  : `Loops ${iteration === "infinite" ? "forever" : "3 times"} — direction: ${direction}.`}
                        </p>
                    </div>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
