"use client";

import React, { Suspense, useTransition } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { LivePreview } from "@/components/EffectsUI/LivePreview";
// import Mascot from "@/components/EffectsUI/Mascot";
import AdSenseDisplay from "@/components/AdSenseDisplay";

const ITEMS_PER_PAGE = 9;

export default function EffectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#030014] text-white flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <EffectsContent />
    </Suspense>
  );
}

function EffectsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition(); // Using transition fixes the double-back-click bug

  // 1. Single Source of Truth: Read directly from the URL.
  // Next.js will automatically re-render this component when the URL changes.
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [effects, setEffects] = React.useState<any[]>([]);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let active = true;
    const fetchEffects = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/effects?page=${page}&limit=${ITEMS_PER_PAGE}`,
        );
        const data = await res.json();
        if (active) {
          setEffects(data.effects || []);
          setTotalPages(data.pagination?.totalPages || 1);
        }
      } catch (err) {
        console.error("Failed to fetch effects:", err);
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchEffects();
    return () => {
      active = false;
    };
  }, [page]);

  // 2. Navigation Handler
  const handlePageChange = (newPage: number) => {
    if (newPage === page || newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    // Wrapping in startTransition prevents the Suspense boundary from creating
    // a duplicate history entry, which is what caused the double-click bug.
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });

    // Smooth scroll to top of the grid
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white selection:bg-pink-500/30 font-sans overflow-hidden">
      <Header />

      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      <main className="pt-below-header-lg pb-20 px-6 max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3 h-3" /> Visual Magic
          </motion.div>

          <motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
  className="text-3xl md:text-5xl font-bold tracking-tight mb-6 flex flex-nowrap justify-center items-center whitespace-nowrap"
>
  Advanced UI Animations &
  {/* Added ml-3 for margin-left */}
  <span className="ml-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 animate-gradient-x">
    CSS Visual Effects
  </span>
</motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Explore a collection of advanced CSS animations, interactive UI
            effects, and modern components. Preview high-quality loading
            animations, futuristic interfaces, and creative visual effects with
            clean copy-paste code.
          </motion.p>
        </div>
        <AdSenseDisplay className="w-full max-w-3xl mb-12 sm:mb-16" />
        {/* Animated Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
            >
              {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <EffectSkeletonCard />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {effects.length > 0 ? (
                effects.map((effect: any, idx) => (
                  <EffectCard
                    key={effect._id || effect.id}
                    effect={effect}
                    index={idx}
                  />
                ))
              ) : (
                <div className="col-span-full py-20 text-center text-zinc-500">
                  No effects found.
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Orbital Pagination */}
        <ConstellationPagination
          totalPages={totalPages}
          currentPage={page}
          onChange={handlePageChange}
        />
        <section className="mt-28 text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Build Your Own CSS Animations
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Use our visual CSS playground and Tailwind generator to create
            custom animations, experiment with UI effects, and generate
            production-ready code instantly.
          </p>

          <div className="flex justify-center gap-4 mt-6">
            <Link href="/playground" className="text-pink-400 hover:underline">
              Open Playground
            </Link>
            <Link href="/playground/css" className="text-pink-400 hover:underline">
              CSS Playground
            </Link>
          </div>
        </section>
      </main>
      {/* --- MASCOT COMPONENT (disabled — laggy) --- */}
      {/* <div className="relative w-full max-w-7xl mx-auto h-0 px-6">
        <div className="absolute bottom-0 right-20 md:right-30 z-10 pointer-events-none">
          <Mascot />
        </div>
      </div> */}

      <Footer />
    </div>
  );
}

function EffectSkeletonCard() {
  return (
    <div className="relative h-full bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden flex flex-col animate-pulse min-h-[400px] w-full">
      <div className="h-52 w-full bg-white/5" />
      <div className="p-6 flex-1 flex flex-col border-t border-white/5 bg-[#0a0a0a]/80 gap-4">
        <div className="h-7 bg-white/10 rounded w-3/4 mb-2" />
        <div className="space-y-3 mb-6">
          <div className="h-4 bg-white/5 rounded w-full" />
          <div className="h-4 bg-white/5 rounded w-5/6" />
        </div>
        <div className="mt-auto h-5 bg-white/10 rounded w-1/3" />
      </div>
    </div>
  );
}

function EffectCard({ effect, index }: { effect: any; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link
        href={`/effects/${effect.id}`}
        className="group relative block h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500" />

        <div className="relative h-full bg-[#0a0a0a]/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-pink-500/30 hover:-translate-y-1">
          <div className="h-52 relative w-full overflow-hidden bg-[#070707]">
            <LivePreview
              html={effect.code.html}
              css={effect.code.css}
              js={effect.code.js}
              previewImage={effect.previewImage}
            />
          </div>

          <div className="p-6 flex-1 flex flex-col border-t border-white/5 bg-[#0a0a0a]/80">
            <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
              {effect.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
              {effect.description}
            </p>
            <div className="mt-auto flex items-center text-sm font-medium text-pink-300 group-hover:gap-2 transition-all">
              View Animation <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ConstellationPagination({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number;
  currentPage: number;
  onChange: (p: number) => void;
}) {
  const getPages = () => {
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let prev: number | undefined;

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (prev !== undefined) {
        if (i - prev === 2) {
          rangeWithDots.push(prev + 1);
        } else if (i - prev !== 1) {
          rangeWithDots.push("...");
        }
      }
      rangeWithDots.push(i);
      prev = i;
    });

    return rangeWithDots;
  };

  const visiblePages = getPages();

  return (
    <div className="relative mt-32 mb-16 flex justify-center items-center gap-6 md:gap-12">
      {/* Previous Button - Removed cursor-not-allowed, added disabled:cursor-default */}
      <button
        onClick={() => onChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="group flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-pink-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors outline-none cursor-pointer disabled:cursor-default"
      >
        <ChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 group-disabled:translate-x-0" />
        <span className="hidden sm:inline tracking-widest">PREV</span>
      </button>

      {/* Constellation Nodes */}
      <div className="relative flex items-center gap-6 md:gap-10">
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-pink-500/30 to-transparent -translate-y-1/2" />

        {visiblePages.map((page, index) => {
          if (page === "...") {
            return (
              <div
                key={`dots-${index}`}
                className="text-gray-600 text-xl select-none px-1"
              >
                ⋯
              </div>
            );
          }

          const active = page === currentPage;
          const pageNum = Number(page);

          return (
            <motion.button
              key={`page-${pageNum}`}
              onClick={() => onChange(pageNum)}
              className="relative z-10 flex flex-col items-center group outline-none cursor-pointer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <div
                className={`relative w-3.5 h-3.5 rounded-full transition-all duration-500 ease-out ${active ? "bg-pink-400 shadow-[0_0_15px_#22d3ee,0_0_30px_#22d3ee]" : "bg-white/20 group-hover:bg-white/70 shadow-none"}`}
              >
                {active && (
                  <div className="absolute inset-0 rounded-full bg-white blur-[1px] opacity-50" />
                )}
              </div>

              {/* Preserved the animated glow from the original */}
              <AnimatePresence>
                {active && (
                  <>
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -inset-3 rounded-full bg-pink-500/20 blur-xl"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0.8 }}
                      animate={{ scale: 2.5, opacity: 0 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      className="absolute inset-0 rounded-full bg-pink-400/40"
                    />
                  </>
                )}
              </AnimatePresence>

              <span
                className={`absolute top-8 font-mono text-[10px] tracking-[0.3em] transition-all duration-300 ${active ? "text-cyan-400 font-bold translate-y-1" : "text-gray-500 opacity-60"}`}
              >
                {String(pageNum).padStart(2, "0")}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Next Button - Removed cursor-not-allowed, added disabled:cursor-default */}
      <button
        onClick={() => onChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="group flex items-center gap-2 text-sm font-mono text-gray-400 hover:text-pink-400 disabled:opacity-30 disabled:hover:text-gray-400 transition-colors outline-none cursor-pointer disabled:cursor-default"
      >
        <span className="hidden sm:inline tracking-widest">NEXT</span>
        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-disabled:translate-x-0" />
      </button>
    </div>
  );
}
