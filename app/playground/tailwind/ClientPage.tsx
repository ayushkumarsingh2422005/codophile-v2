"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    LayoutTemplate,
    Type,
    Square,
    Sparkles,
    MousePointer2,
    Palette,
    Move,
    Play,
    ArrowLeft
} from "lucide-react";
import Image from 'next/image';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import Mascot from "@/components/EffectsUI/Mascot";
import AdSenseDisplay from "@/components/AdSenseDisplay";

const categories = [
    {
        title: "Layout Utilities",
        description: "Master flex, grid, spacing, sizing, and positioning classes.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/tailwind/layout",
        color: "from-cyan-500 to-blue-500"
    },
    {
        title: "Grid Layout",
        description: "Master grid layouts using Tailwind utility classes.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/tailwind/grid",
        color: "from-cyan-400 to-purple-400"
    },
    {
        title: "Typography",
        description: "Control font-size, weight, leading, tracking, and colors.",
        icon: "/icons/Typography.png",
        href: "/playground/tailwind/typography",
        color: "from-sky-400 to-indigo-500"
    },
    {
        title: "Borders & Rings",
        description: "Experiment with rounded corners, border widths, and focus rings.",
        icon: "/icons/Borders-and-Radius.png",
        href: "/playground/tailwind/borders",
        color: "from-teal-400 to-emerald-500"
    },
    {
        title: "Effects & Filters",
        description: "Apply shadows, opacity, mix-blend modes, and backdrop blurs.",
        icon: "/icons/filters.png",
        href: "/playground/tailwind/effects",
        color: "from-purple-500 to-fuchsia-500"
    },
    {
        title: "Transforms",
        description: "Scale, rotate, translate, and skew elements using utility classes.",
        icon: "/icons/transforms.png",
        href: "/playground/tailwind/transforms",
        color: "from-orange-400 to-red-500"
    },
    {
        title: "Backgrounds",
        description: "Manage background colors, gradients, images, and sizes.",
        icon: "/icons/Backgrounds.png",
        href: "/playground/tailwind/backgrounds",
        color: "from-pink-500 to-rose-500"
    },
    {
        title: "Interactivity",
        description: "Customize cursors, pointer events, and user selection behavior.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/interactivity",
        color: "from-yellow-400 to-amber-500"
    },
    {
        title: "Animations",
        description: "Use built-in animate classes and configure transitions.",
        icon: "/icons/animations.png",
        href: "/playground/tailwind/animations",
        color: "from-violet-500 to-purple-600"
    },
    {
        title: "Tooltips",
        description: "Create custom tooltips with positioning, arrows, and visibility.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/tooltip",
        color: "from-lime-400 to-green-500"
    },
    {
        title: "Pagination",
        description: "Design custom navigation links, breadcrumbs, and pagination styles.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/tailwind/pagination",
        color: "from-sky-500 to-indigo-500"
    },
    {
        title: "Buttons",
        description: "Design and customize Tailwind CSS buttons with variants and sizes.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/buttons",
        color: "from-orange-500 to-red-500"
    },
    {
        title: "Tables",
        description: "Style tables with borders, striping, spacing, and responsive wrappers.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/tailwind/table",
        color: "from-blue-400 to-cyan-500"
    },
    {
        title: "Toggles",
        description: "Interactive switch components with simple, short, and icon variations.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/toggles",
        color: "from-teal-400 to-emerald-500"
    },
    {
        title: "Checkboxes",
        description: "Accessible checkbox lists with descriptions and various layouts.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/checkboxes",
        color: "from-green-400 to-teal-500"
    },
    {
        title: "Tabs",
        description: "Navigation tabs with underline, pills, and bar styles.",
        icon: "/icons/Layout-utilities.png",
        href: "/playground/tailwind/tabs",
        color: "from-blue-500 to-indigo-500"
    },
    {
        title: "Select Menus",
        description: "Customizable dropdowns with avatars, status indicators, and rich content.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/select-menus",
        color: "from-violet-500 to-purple-500"
    },
    {
        title: "Masks",
        description: "Control element visibility using image and gradient masks.",
        icon: "/icons/filters.png",
        href: "/playground/tailwind/masks",
        color: "from-teal-400 to-cyan-500"
    },
    {
        title: "Scroll",
        description: "Master scroll behavior, snap alignment, padding, and margin.",
        icon: "/icons/interactivity.png",
        href: "/playground/tailwind/scroll",
        color: "from-blue-400 to-indigo-500"
    },
    {
        title: "Transitions",
        description: "Control transition properties, duration, easing, and delays.",
        icon: "/icons/animations.png",
        href: "/playground/tailwind/transitions",
        color: "from-indigo-500 to-purple-500"
    }
];

export default function TailwindPlaygroundClient() {
    return (
        <div className="min-h-screen bg-[#030014] text-white selection:bg-cyan-500/30 relative overflow-hidden">
            <Header />

            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-[#030014] -z-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 right-0 translate-y-20 -translate-x-10 blur-3xl opacity-20 w-96 h-96 bg-cyan-600 rounded-full" />
            </div>

            <main className="pt-below-header-lg pb-20 px-6 max-w-7xl mx-auto relative z-10">
                <div className="mb-16 flex flex-col md:flex-row justify-between items-start gap-8">
                    <div>
                        <Link href="/playground" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm group">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Selection
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            Tailwind <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-400 to-white">Playground</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                            Rapidly prototype with Tailwind CSS utility classes.
                            Select a category to explore the available utilities visually.
                        </p>
                    </div>
                    {/* <div className="hidden md:block shrink-0 pr-8">
                        <Mascot />
                    </div> */}
                </div>

                <AdSenseDisplay className="w-full max-w-3xl mb-10 sm:mb-12" />

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
