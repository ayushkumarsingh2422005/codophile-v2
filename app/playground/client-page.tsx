"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Palette, Wind, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AdSenseDisplay from "@/components/AdSenseDisplay";

export default function PlaygroundClientPage() {
  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 relative overflow-hidden">
      <Header />

      {/* Background */}
      <div className="absolute inset-0 bg-[#030014] -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-purple-500 rounded-full" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-3xl opacity-20 w-96 h-96 bg-indigo-500 rounded-full" />
      </div>

      <main className="pt-below-header-lg pb-20 px-6 max-w-7xl mx-auto min-h-[calc(100vh-var(--site-header-height)-5rem)] flex flex-col items-center justify-center relative z-10">
        {/* Hero */}
        <div className="text-center mb-16 space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            CSS & Tailwind Playground <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 via-fuchsia-400 to-white animate-gradient-x">
              Design live. Copy code.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Experiment with CSS and Tailwind in real time. Use visual controls
            to design layouts, test styles, and generate clean production-ready
            code instantly.
          </motion.p>
        </div>

        <AdSenseDisplay className="w-full max-w-3xl mb-12 sm:mb-16" />

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* CSS */}
          <Link href="/playground/css" className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <div className="relative h-full bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6 hover:border-violet-500/30 transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-violet-500/20 transition-colors">
                <Palette className="w-10 h-10 text-violet-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3 group-hover:text-violet-400 transition-colors">
                  CSS Playground Online
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  Live CSS editor with real-time preview. Experiment with
                  layouts, animations, and styles visually.
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-violet-300">
                  Launch CSS Editor <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>

          {/* Tailwind */}
          <Link href="/playground/tailwind" className="group relative">
            <div className="absolute inset-0 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
            <div className="relative h-full bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6 hover:border-cyan-500/30 transition-all duration-300 group-hover:-translate-y-1">
              <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                <Wind className="w-10 h-10 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                  Tailwind CSS Generator
                </h2>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
                  Generate Tailwind CSS classes visually. Build responsive UI
                  and export clean code instantly.
                </p>
                <span className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-300">
                  Launch Tailwind Editor <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </Link>
        </div>

        <section className="mt-24 text-center space-y-6">
          <h2 className="text-2xl font-semibold">Explore More</h2>

          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/effects" className="text-violet-400 hover:underline">
              CSS Animations & Effects
            </Link>
            <Link href="/playground/tailwind" className="text-violet-400 hover:underline">
              Tailwind Playground
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
