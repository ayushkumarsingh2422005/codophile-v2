"use client";

import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { PlaygroundGuideModal, PlaygroundHelpButton, type PlaygroundGuideDoc } from "@/components/playground/PlaygroundGuideModal";
import { ArrowLeft, Copy, RefreshCw, Check } from "lucide-react";
import Link from "next/link";

const TABLE_STYLING_GUIDE: PlaygroundGuideDoc = {
    title: "CSS table styling",
    intro:
        "Tables combine `border-collapse` or `border-spacing`, cell borders, padding, alignment, and optional zebra striping or row hover. A wrapper with `overflow-x: auto` enables horizontal scrolling on small screens.",
    syntax: [
        "table { width; border-collapse; }",
        "th, td { border; padding; text-align; vertical-align; }",
        "tr:nth-child(even) { background; } /* striped */",
    ],
    values: [
        { term: "border-collapse", desc: "collapse merges adjacent borders; separate keeps distinct cells and uses border-spacing." },
        { term: "width / padding", desc: "Overall table width and cell padding for readability." },
        { term: "text-align / vertical-align", desc: "Align content within cells." },
        { term: "striped rows", desc: "Alternating row backgrounds via nth-child selectors." },
    ],
    tip: "Use `<th scope=\"col\">` in real HTML for accessibility.",
};

export default function TablePlaygroundClient() {
    // State
    const [borderWidth, setBorderWidth] = useState(1);
    const [borderStyle, setBorderStyle] = useState("solid");
    const [borderColor, setBorderColor] = useState("#4b5563"); // gray-600
    const [borderCollapse, setBorderCollapse] = useState("collapse");
    const [borderSpacing, setBorderSpacing] = useState(0);
    const [width, setWidth] = useState(100);
    const [padding, setPadding] = useState(12);
    const [textAlign, setTextAlign] = useState("left");
    const [verticalAlign, setVerticalAlign] = useState("middle");
    const [isStriped, setIsStriped] = useState(false);
    const [isHoverable, setIsHoverable] = useState(false);
    const [isResponsive, setIsResponsive] = useState(false);
    const [textColor, setTextColor] = useState("#ffffff");
    const [headerBg, setHeaderBg] = useState("#1f2937"); // gray-800

    const [copied, setCopied] = useState(false);
    const [guideOpen, setGuideOpen] = useState(false);
    const closeGuide = useCallback(() => setGuideOpen(false), []);

    const resetValues = () => {
        setBorderWidth(1);
        setBorderStyle("solid");
        setBorderColor("#4b5563");
        setBorderCollapse("collapse");
        setBorderSpacing(0);
        setWidth(100);
        setPadding(12);
        setTextAlign("left");
        setVerticalAlign("middle");
        setIsStriped(false);
        setIsHoverable(false);
        setIsResponsive(false);
        setTextColor("#ffffff");
        setHeaderBg("#1f2937");
    };

    const handleCopy = () => {
        let code = `/* Table Styles */
table {
    width: ${width}%;
    border-collapse: ${borderCollapse};
    ${borderCollapse === 'separate' ? `border-spacing: ${borderSpacing}px;` : ''}
    color: ${textColor};
}

th, td {
    border: ${borderWidth}px ${borderStyle} ${borderColor};
    padding: ${padding}px;
    text-align: ${textAlign};
    vertical-align: ${verticalAlign};
}

th {
    background-color: ${headerBg};
}`;

        if (isStriped) {
            code += `\n\ntr:nth-child(even) {
    background-color: rgba(255, 255, 255, 0.05);
}`;
        }

        if (isHoverable) {
            code += `\n\ntr:hover {
    background-color: rgba(255, 255, 255, 0.1);
}`;
        }

        if (isResponsive) {
            code = `.table-wrapper {
    overflow-x: auto;
}

` + code;
        }

        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const borderStyles = [
        "solid", "dashed", "dotted", "double",
        "groove", "ridge", "inset", "outset", "hidden", "none"
    ];

    const textAlignments = ["left", "center", "right", "justify"];
    const verticalAlignments = ["top", "middle", "bottom"];

    // Mock Data
    const tableData = [
        { id: 1, first: "John", last: "Doe", email: "john@example.com", role: "Developer" },
        { id: 2, first: "Jane", last: "Smith", email: "jane@example.com", role: "Designer" },
        { id: 3, first: "Bob", last: "Johnson", email: "bob@example.com", role: "Manager" },
        { id: 4, first: "Alice", last: "Williams", email: "alice@example.com", role: "Marketer" },
    ];

    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 font-sans">
            <Header />

            <div className="pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-100px)]">

                {/* Controls Sidebar */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full lg:w-80 shrink-0 flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <Link href="/playground/css" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                            <ArrowLeft className="w-4 h-4" /> Back to CSS
                        </Link>
                        <div className="flex items-center gap-1.5">
                            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-400">
                                Table Styling
                            </h1>
                            <PlaygroundHelpButton
                                onClick={() => setGuideOpen(true)}
                                ariaLabel="Learn about CSS table styling in this playground"
                                title={`What is ${TABLE_STYLING_GUIDE.title}?`}
                            />
                        </div>
                        <p className="text-gray-400 text-xs">
                            Design responsive and stylish tables with CSS properties.
                        </p>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-6 custom-scrollbar max-h-[600px] lg:max-h-[calc(100vh-250px)]">

                        <ControlGroup title="Layout & Size">
                            <SliderControl
                                label="Width (%)"
                                value={width}
                                onChange={setWidth}
                                min={10}
                                max={100}
                                unit="%"
                            />
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-300">Responsive Wrapper</label>
                                <button
                                    onClick={() => setIsResponsive(!isResponsive)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isResponsive ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isResponsive ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Borders">
                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Collapse</label>
                                <div className="flex bg-white/5 p-1 rounded-lg">
                                    {["collapse", "separate"].map((mode) => (
                                        <button
                                            key={mode}
                                            onClick={() => setBorderCollapse(mode)}
                                            className={`flex-1 py-1 text-xs rounded-md transition-all ${borderCollapse === mode ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {mode.charAt(0).toUpperCase() + mode.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {borderCollapse === 'separate' && (
                                <SliderControl
                                    label="Spacing"
                                    value={borderSpacing}
                                    onChange={setBorderSpacing}
                                    min={0}
                                    max={20}
                                    unit="px"
                                />
                            )}

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Style</label>
                                <select
                                    value={borderStyle}
                                    onChange={(e) => setBorderStyle(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    {borderStyles.map(style => (
                                        <option key={style} value={style} className="bg-gray-900 text-white">
                                            {style.charAt(0).toUpperCase() + style.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <SliderControl
                                label="Width"
                                value={borderWidth}
                                onChange={setBorderWidth}
                                min={0}
                                max={10}
                                unit="px"
                            />

                            <ColorControl label="Color" value={borderColor} onChange={setBorderColor} />
                        </ControlGroup>

                        <ControlGroup title="Content & Alignment">
                            <SliderControl
                                label="Cell Padding"
                                value={padding}
                                onChange={setPadding}
                                min={0}
                                max={40}
                                unit="px"
                            />

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Text Align</label>
                                <div className="flex bg-white/5 p-1 rounded-lg">
                                    {textAlignments.map((align) => (
                                        <button
                                            key={align}
                                            onClick={() => setTextAlign(align)}
                                            className={`flex-1 py-1 text-xs rounded-md transition-all ${textAlign === align ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-400 hover:text-white'}`}
                                        >
                                            {align.slice(0, 1).toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs text-gray-300">Vertical Align</label>
                                <select
                                    value={verticalAlign}
                                    onChange={(e) => setVerticalAlign(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 p-2 outline-none focus:border-cyan-500/50 cursor-pointer"
                                >
                                    {verticalAlignments.map(align => (
                                        <option key={align} value={align} className="bg-gray-900 text-white">
                                            {align.charAt(0).toUpperCase() + align.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </ControlGroup>

                        <ControlGroup title="Styling & Colors">
                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-300">Zebra Striped</label>
                                <button
                                    onClick={() => setIsStriped(!isStriped)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isStriped ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isStriped ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="text-xs text-gray-300">Hover Effect</label>
                                <button
                                    onClick={() => setIsHoverable(!isHoverable)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${isHoverable ? 'bg-cyan-500' : 'bg-gray-700'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isHoverable ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            <ColorControl label="Text Color" value={textColor} onChange={setTextColor} />
                            <ColorControl label="Header Bg" value={headerBg} onChange={setHeaderBg} />
                        </ControlGroup>
                    </div>

                    <button
                        onClick={resetValues}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-white/5 border border-white/10 rounded-lg text-sm hover:bg-white/10 transition-colors text-gray-300"
                    >
                        <RefreshCw className="w-4 h-4" /> Reset All
                    </button>
                </motion.div>


                {/* Preview Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col gap-6"
                >
                    {/* Visual Preview */}
                    <div className={`flex-1 min-h-[400px] rounded-2xl border border-white/10 relative overflow-hidden flex items-start justify-center bg-[#111] p-8 ${isResponsive ? 'overflow-x-auto' : ''}`}>
                        {/* Background Grid */}
                        <div className="absolute inset-0 z-0 pointer-events-none">
                            <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5" />
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[32px_32px]" />
                        </div>

                        {/* The Table */}
                        <div className={`relative z-10 w-full ${isResponsive ? 'min-w-[500px]' : ''}`}> {/* Force scroll width if responsive test */}
                            <table
                                style={{
                                    width: `${width}%`,
                                    borderCollapse: borderCollapse as any,
                                    borderSpacing: borderCollapse === 'separate' ? `${borderSpacing}px` : undefined,
                                    color: textColor,
                                }}
                            >
                                <thead>
                                    <tr>
                                        {Object.keys(tableData[0]).filter(k => k !== 'id').map((heading) => (
                                            <th
                                                key={heading}
                                                style={{
                                                    border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                                                    padding: `${padding}px`,
                                                    textAlign: textAlign as any,
                                                    verticalAlign: verticalAlign as any,
                                                    backgroundColor: headerBg,
                                                }}
                                                className="uppercase text-xs font-bold tracking-wider"
                                            >
                                                {heading}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData.map((row, idx) => (
                                        <tr
                                            key={row.id}
                                            style={{
                                                backgroundColor: isStriped && idx % 2 !== 0 ? 'rgba(255, 255, 255, 0.05)' : undefined,
                                            }}
                                            className={`transition-colors ${isHoverable ? "hover:bg-white/10" : ""}`}
                                        >
                                            {Object.entries(row).filter(([k]) => k !== 'id').map(([key, cell]) => (
                                                <td
                                                    key={key}
                                                    style={{
                                                        border: `${borderWidth}px ${borderStyle} ${borderColor}`,
                                                        padding: `${padding}px`,
                                                        textAlign: textAlign as any,
                                                        verticalAlign: verticalAlign as any,
                                                    }}
                                                >
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Code Output */}
                    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl p-0 overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/5">
                            <span className="text-xs font-medium text-gray-400">CSS Output</span>
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                {copied ? "Copied!" : "Copy CSS"}
                            </button>
                        </div>
                        <div className="p-4 font-mono text-sm overflow-x-auto text-gray-300 max-h-60 overflow-y-auto custom-scrollbar">
                            <pre>{`/* Table Wrapper */
${isResponsive ? `.table-wrapper {
  overflow-x: auto;
}
` : ''}
table {
  width: ${width}%;
  border-collapse: ${borderCollapse};
  ${borderCollapse === 'separate' ? `border-spacing: ${borderSpacing}px;` : ''}
  color: ${textColor};
}

th, td {
  border: ${borderWidth}px ${borderStyle} ${borderColor};
  padding: ${padding}px;
  text-align: ${textAlign};
  vertical-align: ${verticalAlign};
}

th {
  background-color: ${headerBg};
}${isStriped ? `

tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}` : ''}${isHoverable ? `

tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}` : ''}`}</pre>
                        </div>
                    </div>
                </motion.div>
            </div>

            {guideOpen && (
                <PlaygroundGuideModal
                    doc={TABLE_STYLING_GUIDE}
                    onClose={closeGuide}
                    titleId="css-table-guide-title"
                />
            )}

            <Footer />
        </div>
    );
}

// Reusable Components
function ControlGroup({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/5">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
}

function SliderControl({ label, value, onChange, min, max, step = 1, unit = "" }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}{unit}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
        </div>
    );
}

function ColorControl({ label, value, onChange }: any) {
    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <label className="text-xs text-gray-300">{label}</label>
                <span className="text-xs font-mono text-cyan-400">{value}</span>
            </div>
            <div className="flex items-center gap-2">
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-8 w-full rounded cursor-pointer bg-transparent border border-white/20 p-0"
                />
            </div>
        </div>
    );
}
