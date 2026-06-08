"use client";

import {
    ControlGroup, CssPlaygroundShell, PropertyExplainModal, SliderControl,
    usePropertyDocModal, type PropertyDoc,
} from "@/components/playground/CssPlaygroundKit";
import { useState } from "react";

const DOCS: Record<string, PropertyDoc> = {
    "column-count": { title: "CSS column-count", intro: "Number of columns to flow content into.", syntax: ["column-count: 2;", "column-count: auto;"] },
    "column-gap": { title: "CSS column-gap", intro: "Gap between columns.", syntax: ["column-gap: 24px;", "column-gap: 2rem;"] },
    "column-rule": { title: "CSS column-rule", intro: "Shorthand for width, style, and color of the rule between columns.", syntax: ["column-rule: 1px solid #4b5563;"] },
};

const TEXT = "CSS multi-column layout splits block content into newspaper-style columns. Adjust column-count, column-gap, and column-rule to see how text reflows across columns automatically.";

export default function ColumnsClient() {
    const { openDocId, setOpenDocId, closeDoc } = usePropertyDocModal();
    const [count, setCount] = useState(2);
    const [gap, setGap] = useState(24);
    const [ruleWidth, setRuleWidth] = useState(1);

    const reset = () => { setCount(2); setGap(24); setRuleWidth(1); };

    const css = `.columns {
  column-count: ${count};
  column-gap: ${gap}px;
  column-rule: ${ruleWidth}px solid #4b5563;
}`;

    return (
        <>
            <CssPlaygroundShell
                title="Multi-column"
                description="column-count, column-gap, and column-rule."
                cssOutput={css}
                onReset={reset}
                controls={
                    <ControlGroup title="Column properties">
                        <SliderControl label="Column count" docId="column-count" docs={DOCS} onOpenDoc={setOpenDocId} value={count} onChange={setCount} min={1} max={4} />
                        <SliderControl label="Column gap" docId="column-gap" docs={DOCS} onOpenDoc={setOpenDocId} value={gap} onChange={setGap} min={8} max={48} unit="px" />
                        <SliderControl label="Rule width" docId="column-rule" docs={DOCS} onOpenDoc={setOpenDocId} value={ruleWidth} onChange={setRuleWidth} min={0} max={4} unit="px" />
                    </ControlGroup>
                }
                preview={
                    <p
                        className="text-sm text-gray-300 text-left max-w-lg leading-relaxed"
                        style={{ columnCount: count, columnGap: gap, columnRule: `${ruleWidth}px solid #4b5563` }}
                    >
                        {TEXT.repeat(3)}
                    </p>
                }
            />
            {openDocId && <PropertyExplainModal docId={openDocId} docs={DOCS} onClose={closeDoc} />}
        </>
    );
}
