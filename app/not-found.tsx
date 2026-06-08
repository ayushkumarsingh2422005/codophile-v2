
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowRight, Ghost, Terminal } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#030014] text-white overflow-hidden relative font-sans selection:bg-cyan-500/30">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-[500px] bg-purple-900/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-0 right-0 w-full h-[500px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
            </div>

            <Header />

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">

                {/* Animated 404 Visual */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="relative mb-8"
                >
                    <div className="text-[150px] md:text-[200px] font-black leading-none bg-clip-text text-transparent bg-gradient-to-r from-violet-500 via-purple-500 to-cyan-500 select-none animate-pulse">
                        404
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-10 -right-10 text-cyan-400 opacity-60"
                    >
                        <Ghost className="w-16 h-16" />
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute -bottom-4 -left-8 text-purple-400 opacity-60"
                    >
                        <Terminal className="w-12 h-12" />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="max-w-xl mx-auto space-y-4 mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Page Not Found
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Oops! It seems you've wandered into the void. The page you're looking for doesn't exist or has been moved.
                    </p>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md"
                >
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all group"
                    >
                        <Home className="w-4 h-4 text-gray-400 group-hover:text-white" />
                        <span className="text-sm font-medium">Back Home</span>
                    </Link>

                    <Link
                        href="/playground"
                        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg shadow-lg hover:shadow-violet-500/25 transition-all hover:scale-105 group"
                    >
                        <span className="text-sm font-medium">Go to Playground</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                {/* Quick Links Suggestions */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-500"
                >
                    <Link href="/playground" className="hover:text-cyan-400 transition-colors">CSS Playground</Link>
                    <span className="w-1 h-1 bg-gray-700 rounded-full my-auto" />
                    <Link href="/playground/css/flexbox" className="hover:text-cyan-400 transition-colors">Flexbox Playground</Link>
                    <span className="w-1 h-1 bg-gray-700 rounded-full my-auto" />
                    <Link href="/playground/tailwind/grid" className="hover:text-cyan-400 transition-colors">Tailwind Grid</Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
