"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    BoxSelect,
    Type,
    Layers,
    Move3d,
    Scaling,
    Palette,
    LayoutGrid,
    Zap,
    Maximize,
    ArrowLeft,
    Image as ImageIcon
} from "lucide-react";
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Mascot from "@/components/EffectsUI/Mascot";
import AdSenseDisplay from "@/components/AdSenseDisplay";

const categories = [
    {
        title: "Borders & Radius",
        description: "Control border radius, width, style, and colors visually.",
        icon: "/icons/Borders-and-Radius.png",
        href: "/playground/css/border",
        color: "from-pink-500 to-rose-500"
    },
    {
        title: "Outline",
        description: "Draw outlines outside the border: width, style, color, invert, offset, and radius.",
        icon: "/icons/Borders-and-Radius.png",
        href: "/playground/css/outline",
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "3D Transforms",
        description: "Master perspective, rotateX/Y/Z, and translate3d in 3D space.",
        icon: "/icons/3D-transforms.png",
        href: "/playground/css/3d-transforms",
        color: "from-violet-500 to-purple-500"
    },
    {
        title: "2D Transforms",
        description: "Scale, rotate, skew, and translate elements on a 2D plane.",
        icon: "/icons/2D-transforms.png",
        href: "/playground/css/2d-transforms",
        color: "from-blue-500 to-cyan-500"
    },
    {
        title: "Flexbox Layout",
        description: "Visually manage flex direction, alignment, and wrapping.",
        icon: "/icons/Flexbox-layout.png",
        href: "/playground/css/flexbox",
        color: "from-emerald-500 to-teal-500"
    },
    {
        title: "Grid Layout",
        description: "Master CSS Grid layout with interactive controls for columns, rows, gap, and item placement.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/css/grid",
        color: "from-cyan-500 to-indigo-500"
    },
    {
        title: "Typography",
        description: "Experiment with font weights, spacing, line heights, and families.",
        icon: "/icons/Typography.png",
        href: "/playground/css/typography",
        color: "from-amber-500 to-orange-500"
    },
    {
        title: "Backgrounds",
        description: "Master background images, gradients, blending, and clipping.",
        icon: "/icons/Backgrounds.png",
        href: "/playground/css/backgrounds",
        color: "from-teal-400 to-cyan-500"
    },
    {
        title: "Box Shadow",
        description: "Create depth with box-shadows, glow effects, and blurs.",
        icon: "/icons/Box-shadow.png",
        href: "/playground/css/box-shadow",
        color: "from-fuchsia-500 to-pink-500"
    },
    {
        title: "Text Shadow",
        description: "Apply shadows to text with multiple layers and blur effects.",
        icon: "/icons/Text-shadow.png",
        href: "/playground/css/text-shadow",
        color: "from-red-500 to-orange-500"
    },
    {
        title: "Filters",
        description: "Apply brightness, contrast, blur, and hue-rotate filters.",
        icon: "/icons/filters.png",
        href: "/playground/css/filters",
        color: "from-indigo-500 to-blue-500"
    },
    {
        title: "Backdrop Filter",
        description: "Create glassmorphism effects with blur, saturate, and color shifts.",
        icon: "/icons/Backdrop-filter.png",
        href: "/playground/css/backdrop-filter",
        color: "from-cyan-400 to-sky-500"
    },
    {
        title: "Transitions",
        description: "Smooth out property changes with duration and easing curves.",
        icon: "/icons/Transitions.png",
        href: "/playground/css/transitions",
        color: "from-yellow-400 to-orange-500"
    },
    {
        title: "Tooltips",
        description: "Create custom tooltips with positioning, arrows, and animations.",
        icon: "/icons/interactivity.png",
        href: "/playground/css/tooltip",
        color: "from-lime-400 to-green-500"
    },
    {
        title: "Pagination",
        description: "Design custom navigation links, breadcrumbs, and pagination styles.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/css/pagination",
        color: "from-sky-500 to-indigo-500"
    },
    {
        title: "Buttons",
        description: "Design custom buttons with colors, hover effects, and shadows.",
        icon: "/icons/interactivity.png",
        href: "/playground/css/buttons",
        color: "from-orange-500 to-amber-500"
    },
    {
        title: "Tables",
        description: "Style tables with borders, striping, spacing, and responsive wrappers.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/css/table",
        color: "from-blue-400 to-cyan-500"
    }
];

export default function CSSPlaygroundClient() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 relative overflow-hidden">
            <Header />

            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[#030014] -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-0 translate-y-20 translate-x-10 blur-3xl opacity-20 w-96 h-96 bg-violet-600 rounded-full" />
            </div>

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-8">
                    <div>
                        <Link href="/playground" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Selection
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            CSS <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-fuchsia-400 to-white">Playground</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Explore individual CSS properties specifically grouped for easier learning.
                            Click on a module to start experimenting with real-time feedback.
                        </p>
                    </div>
                    <div className="hidden md:block shrink-0 pr-8">
                        <Mascot />
                    </div>
                </div>

                <div className="flex justify-center mb-10 sm:mb-12">
                    <AdSenseDisplay className="w-full max-w-3xl min-h-[90px]" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((item, idx) => (
                        <Link key={idx} href={item.href} className="group relative">
                            {/* Subtle Hover Glow - Keep this for that "SaaS" feel */}
                            <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500 blur-xl`} />

                            {/* Card Body - Removed visible border and background color */}
                            <div className="relative h-full bg-transparent p-6 transition-all hover:-translate-y-1">

                                {/* Icon Container - No background or border */}
                                <div className="w-16 h-16 flex items-center justify-center mb-4 overflow-hidden rounded-lg group-hover:scale-110 transition-transform">
                                    <Image
                                        src={item.icon}
                                        alt={item.title}
                                        width={80}
                                        height={80}
                                        className="object-contain scale-[1.5]"
                                        priority={idx < 6}
                                    />
                                </div>

                                <h3 className="text-xl font-bold mb-3 text-gray-100 group-hover:text-white transition-colors">
                                    {item.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
}
