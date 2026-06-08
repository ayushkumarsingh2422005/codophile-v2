"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { FileText, Shield, Scale, BookOpen, ArrowRight } from "lucide-react";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

export default function LegalPage() {
    return (
        <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 overflow-hidden">
            <Header />

            <div className="relative pt-below-header-lg pb-20 px-6 max-w-5xl mx-auto relative z-10">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="text-center mb-16"
                >
                    <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-emerald-300 mb-6">
                        <Scale size={14} />
                        Legal Center
                    </motion.div>
                    
                    <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6">
                        Legal Information
                    </motion.h1>
                    
                    <motion.p variants={fadeIn} className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Transparency and trust are fundamental to what we build at Codophile. 
                        Below you'll find all the legal agreements, policies, and terms that govern your use of our platform.
                    </motion.p>
                </motion.div>

                <motion.div 
                    initial="hidden" 
                    animate="visible" 
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Terms of Service Card */}
                    <motion.div variants={fadeIn}>
                        <Link href="/terms" className="block h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-indigo-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-between">
                                Terms of Service
                                <ArrowRight size={20} className="text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                The rules, guidelines, and agreements that dictate how you can use Codophile, including your rights regarding generated code and CSS components.
                            </p>
                        </Link>
                    </motion.div>

                    {/* Privacy Policy Card */}
                    <motion.div variants={fadeIn}>
                        <Link href="/privacy" className="block h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 group">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                                <Shield size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3 flex items-center justify-between">
                                Privacy Policy
                                <ArrowRight size={20} className="text-gray-500 group-hover:text-white transition-colors group-hover:translate-x-1 duration-300" />
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-sm">
                                Details on what information we collect, how we use it, your rights regarding your personal data, and how we protect your information.
                            </p>
                        </Link>
                    </motion.div>

                    {/* Acceptable Use Card */}
                    <motion.div variants={fadeIn}>
                        <div className="block h-full bg-white/5 border border-white/10 rounded-2xl p-8 opacity-80 cursor-default">
                            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 mb-6">
                                <Scale size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Acceptable Use Policy
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-sm mb-4">
                                Guidelines on what constitutes acceptable behavior on our platform and community spaces. Included within our Terms of Service.
                            </p>
                            <Link href="/terms" className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors uppercase font-bold tracking-wider">
                                View Within Terms →
                            </Link>
                        </div>
                    </motion.div>

                    {/* Open Source Card */}
                    <motion.div variants={fadeIn}>
                        <div className="block h-full bg-white/5 border border-white/10 rounded-2xl p-8 opacity-80 cursor-default">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                                <BookOpen size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Open Source Acknowledgements
                            </h2>
                            <p className="text-gray-400 leading-relaxed text-sm mb-4">
                                Acknowledging and crediting the incredible open source software, libraries, and frameworks that make Codophile possible.
                            </p>
                            <span className="text-sm text-gray-500 uppercase font-bold tracking-wider">
                                Coming Soon
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-20 text-center"
                >
                    <p className="text-gray-400 text-sm">
                        Have legal questions? Contact our team at <a href="mailto:hello@codophile.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">hello@codophile.in</a>
                    </p>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
