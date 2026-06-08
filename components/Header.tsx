"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Github, Search, Command, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchModal from "@/components/search/SearchModal";

export default function Header() {
    const headerRef = useRef<HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Keep --site-header-height in sync with the real header (beta banner + nav)
    useEffect(() => {
        const el = headerRef.current;
        if (!el) return;

        const syncHeaderHeight = () => {
            document.documentElement.style.setProperty(
                "--site-header-height",
                `${el.getBoundingClientRect().height}px`
            );
        };

        syncHeaderHeight();

        const observer = new ResizeObserver(syncHeaderHeight);
        observer.observe(el);
        window.addEventListener("resize", syncHeaderHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", syncHeaderHeight);
        };
    }, []);

    // ⌘K / Ctrl+K handler
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
            if (e.key === "Escape") {
                setIsSearchOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <>
            <header
                ref={headerRef}
                className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#030014]/80 backdrop-blur-xl"
            >
                {/* Dev Banner */}
                <div className="bg-[#020204] border-b border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent,rgba(124,58,237,0.1)_50%,transparent)] bg-[length:200%_100%] animate-shine opacity-60" />
                    <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-3 text-xs font-medium text-gray-400 relative z-10">
                        <span className="bg-violet-500/10 text-violet-400 border border-violet-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            Beta
                        </span>
                        <span>
                            Codophile is currently in active development. Features may
                            change rapidly! 🚀
                        </span>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 shrink-0">
                        <img src="/logo.png" alt="Codophile Logo" className="w-8 h-8" />
                        <span className="text-xl font-bold tracking-tight text-white">
                            Codophile
                        </span>
                    </Link>

                    {/* Desktop Search Bar - Command Palette Style */}
                    <div
                        className="flex md:flex flex-1 max-w-md relative group mx-2 md:mx-4 cursor-pointer"
                        onClick={() => setIsSearchOpen(true)}
                    >
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-500 group-focus-within:text-violet-400 transition-colors" />
                        </div>
                        <input
                            readOnly
                            suppressHydrationWarning
                            type="text"
                            className="cursor-pointer block w-full pl-10 pr-3 py-2 border border-white/10 rounded-md leading-5 bg-white/5 text-gray-300 placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 sm:text-sm transition-all"
                            placeholder="Search playgrounds, effects, docs..."
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 hidden md:flex items-center pointer-events-none">
                            <span className="text-gray-600 text-xs border border-white/10 rounded px-1.5 py-0.5 flex items-center gap-1">
                                <Command className="w-3 h-3" /> K
                            </span>
                        </div>
                    </div>

                    {/* Desktop Navigation & Actions */}
                    <div className="hidden lg:flex items-center gap-4 shrink-0">
                        <nav className="flex items-center gap-6 mr-4">
                            {["Playground", "Effects", "Docs", "About"].map(
                                (item) => (
                                    <Link
                                        key={item}
                                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                                        className="text-sm font-medium text-gray-400 hover:text-white transition-colors relative group"
                                    >
                                        {item}
                                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-violet-500 transition-all group-hover:w-full" />
                                    </Link>
                                )
                            )}
                        </nav>

                        <div className="h-6 w-px bg-white/10" />

                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/ayushkumarsingh2422005/codophile-v2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/5 rounded-md"
                            >
                                <Github className="w-5 h-5" />
                            </a>

                            <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-sm font-semibold transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] border border-white/10">
                                Get Started
                            </button>
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center gap-4 z-50">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-400 hover:text-white"
                        >
                            {isMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute top-full left-0 right-0 h-[calc(100vh-100%)] bg-[#030014] border-b border-white/10 p-6 shadow-2xl lg:hidden flex flex-col gap-6 overflow-y-auto"
                        >
                            <nav className="flex flex-col gap-4">
                                {["Playground", "Effects", "Docs", "About"].map(
                                    (item) => (
                                        <Link
                                            key={item}
                                            href={`/${item.toLowerCase().replace(" ", "-")}`}
                                            onClick={() => setIsMenuOpen(false)}
                                            className="text-lg font-medium text-gray-300 hover:text-white py-2 border-b border-white/5"
                                        >
                                            {item}
                                        </Link>
                                    )
                                )}
                            </nav>

                            <div className="space-y-4">
                                <div className="relative" onClick={() => setIsSearchOpen(true)}>
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                                    <input
                                        readOnly
                                        type="text"
                                        className="w-full bg-white/5 border border-white/10 rounded-md py-3 pl-10 pr-4 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500/50"
                                        placeholder="Search..."
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <a
                                        href="https://github.com/ayushkumarsingh2422005/codophile-v2"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 p-3 text-gray-400 bg-white/5 border border-white/10 rounded-sm hover:text-white transition-colors"
                                    >
                                        <Github className="w-5 h-5" />
                                        GitHub
                                    </a>
                                    <button className="flex-1 px-4 py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-sm shadow-lg border border-white/10">
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            {isSearchOpen && (
                <SearchModal onClose={() => setIsSearchOpen(false)} />
            )}
        </>
    );
}
