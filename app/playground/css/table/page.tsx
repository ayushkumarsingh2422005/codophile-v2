
import React from "react";
import ClientPlayground from "./ClientPlayground";

export const metadata = {
    title: "CSS Table Properties Playground | Codophile",
    description:
        "border-collapse, border-spacing, table-layout, caption-side, and empty-cells — every control maps to a real table CSS property.",
};

export default function TablePage() {
    return <ClientPlayground />;
}
