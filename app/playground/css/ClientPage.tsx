"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseDisplay from "@/components/AdSenseDisplay";

const categories = [
    { title: "Box Model", description: "width, height, margin, padding, box-sizing.", icon: "/icons/Layout-utilities.png", href: "/playground/css/box-model", color: "from-slate-500 to-zinc-500" },
    { title: "Border Properties", description: "border-width, border-style, border-color, border-radius.", icon: "/icons/Borders-and-Radius.png", href: "/playground/css/border", color: "from-pink-500 to-rose-500" },
    { title: "Outline", description: "outline, outline-style, outline-offset.", icon: "/icons/Borders-and-Radius.png", href: "/playground/css/outline", color: "from-rose-400 to-orange-500" },
    { title: "Positioning", description: "position, top, left, z-index.", icon: "/icons/Layout-utilities.png", href: "/playground/css/positioning", color: "from-indigo-500 to-violet-500" },
    { title: "Flexbox", description: "flex-direction, justify-content, align-items, gap.", icon: "/icons/Flexbox-layout.png", href: "/playground/css/flexbox", color: "from-emerald-500 to-teal-500" },
    { title: "Grid", description: "grid-template-columns, grid-template-rows, gap.", icon: "/icons/Layout-utilities.png", href: "/playground/css/grid", color: "from-cyan-500 to-indigo-500" },
    { title: "Table Properties", description: "border-collapse, table-layout, caption-side, empty-cells.", icon: "/icons/Layout-utilities.png", href: "/playground/css/table", color: "from-blue-400 to-cyan-500" },
    { title: "Overflow", description: "overflow, text-overflow, white-space.", icon: "/icons/Layout-utilities.png", href: "/playground/css/overflow", color: "from-gray-500 to-slate-600" },
    { title: "Typography", description: "font-size, font-weight, line-height, letter-spacing.", icon: "/icons/Typography.png", href: "/playground/css/typography", color: "from-amber-500 to-orange-500" },
    { title: "Text Layout", description: "text-decoration, word-break, overflow-wrap.", icon: "/icons/Typography.png", href: "/playground/css/text-layout", color: "from-orange-400 to-amber-600" },
    { title: "Lists", description: "list-style-type, list-style-position.", icon: "/icons/Typography.png", href: "/playground/css/lists", color: "from-lime-500 to-green-600" },
    { title: "Multi-column", description: "column-count, column-gap, column-rule.", icon: "/icons/Typography.png", href: "/playground/css/columns", color: "from-yellow-500 to-amber-500" },
    { title: "Backgrounds", description: "background-image, size, position, gradients.", icon: "/icons/Backgrounds.png", href: "/playground/css/backgrounds", color: "from-teal-400 to-cyan-500" },
    { title: "Object Fit", description: "object-fit, object-position.", icon: "/icons/Backgrounds.png", href: "/playground/css/object-fit", color: "from-sky-400 to-blue-500" },
    { title: "Opacity & Blend", description: "opacity, mix-blend-mode.", icon: "/icons/filters.png", href: "/playground/css/opacity-blend", color: "from-purple-500 to-fuchsia-500" },
    { title: "Box Shadow", description: "box-shadow offset, blur, spread, color.", icon: "/icons/Box-shadow.png", href: "/playground/css/box-shadow", color: "from-fuchsia-500 to-pink-500" },
    { title: "Text Shadow", description: "text-shadow layers, blur, color.", icon: "/icons/Text-shadow.png", href: "/playground/css/text-shadow", color: "from-red-500 to-orange-500" },
    { title: "Filters", description: "filter: blur, brightness, contrast, hue-rotate.", icon: "/icons/filters.png", href: "/playground/css/filters", color: "from-indigo-500 to-blue-500" },
    { title: "Backdrop Filter", description: "backdrop-filter blur, brightness, saturate.", icon: "/icons/Backdrop-filter.png", href: "/playground/css/backdrop-filter", color: "from-cyan-400 to-sky-500" },
    { title: "Clip Path", description: "clip-path: circle, inset, polygon.", icon: "/icons/filters.png", href: "/playground/css/clip-path", color: "from-violet-500 to-purple-600" },
    { title: "2D Transforms", description: "transform: rotate, scale, skew, translate.", icon: "/icons/2D-transforms.png", href: "/playground/css/2d-transforms", color: "from-blue-500 to-cyan-500" },
    { title: "3D Transforms", description: "perspective, rotateX/Y/Z, translate3d.", icon: "/icons/3D-transforms.png", href: "/playground/css/3d-transforms", color: "from-violet-500 to-purple-500" },
    { title: "Transitions", description: "transition-property, duration, timing-function.", icon: "/icons/Transitions.png", href: "/playground/css/transitions", color: "from-yellow-400 to-orange-500" },
    { title: "Animations", description: "animation-*, @keyframes, play-state.", icon: "/icons/Transitions.png", href: "/playground/css/animations", color: "from-pink-500 to-violet-500" },
    { title: "Scroll", description: "scroll-behavior, scroll-snap-type.", icon: "/icons/interactivity.png", href: "/playground/css/scroll", color: "from-teal-500 to-cyan-600" },
    { title: "Interaction", description: "cursor, pointer-events, user-select.", icon: "/icons/interactivity.png", href: "/playground/css/interaction", color: "from-green-500 to-emerald-600" },
    { title: "Visibility", description: "visibility, content-visibility.", icon: "/icons/interactivity.png", href: "/playground/css/visibility", color: "from-zinc-500 to-gray-600" },
];

export default function CSSPlaygroundClient() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 relative overflow-hidden">
            <Header />
            <div className="absolute inset-0 bg-[#030014] -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-0 translate-y-20 translate-x-10 blur-3xl opacity-20 w-96 h-96 bg-violet-600 rounded-full" />
            </div>
            <main className="pt-below-header-lg pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <div className="mb-16">
                    <Link href="/playground" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm group">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Selection
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                        CSS <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-fuchsia-400 to-white">Properties</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        Explore CSS by topic. Every control maps to a real property from the spec—tweak values, see the effect live, and copy production-ready code.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">{categories.length} topics · property-first playgrounds</p>
                </div>
                <AdSenseDisplay className="w-full max-w-3xl mb-10 sm:mb-12" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((item, idx) => (
                        <Link key={item.href} href={item.href} className="group relative">
                            <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 blur-xl`} />
                            <div className="relative h-full bg-transparent p-6 transition-all hover:-translate-y-1">
                                <div className="w-16 h-16 flex items-center justify-center mb-4 overflow-hidden rounded-lg group-hover:scale-110 transition-transform">
                                    <Image src={item.icon} alt={item.title} width={80} height={80} className="object-contain scale-[1.5]" priority={idx < 9} />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">{item.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
