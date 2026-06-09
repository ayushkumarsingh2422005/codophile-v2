"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Code, Palette, Rocket, Users, Zap, Trophy, History, Target, Github, Linkedin, Globe } from "lucide-react";

type TeamMember = {
    name: string;
    role: string;
    gradient: string;
    roleColor: string;
    github?: string;
    linkedin?: string;
    website?: string;
};

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Ayush Kumar Singh",
        role: "Lead Developer & Founder",
        gradient: "from-violet-500 to-fuchsia-500",
        roleColor: "text-violet-400",
        github: "https://github.com/ayushkumarsingh2422005",
        linkedin: "https://www.linkedin.com/in/its-ayushkrsingh/",
    },
    {
        name: "Roshni Kumari",
        role: "Team Member",
        gradient: "from-cyan-500 to-blue-500",
        roleColor: "text-cyan-400",
        github: "https://github.com/roshnikumari-21",
        linkedin: "https://www.linkedin.com/in/roshni-kumari-2aa61928a/",
    },
    {
        name: "Aprajita Kumari",
        role: "Team Member",
        gradient: "from-pink-500 to-rose-500",
        roleColor: "text-pink-400",
        github: "https://github.com/aprajita-99",
        linkedin: "https://www.linkedin.com/in/aprajita-thakur-1317a1223/",
    },
    {
        name: "Sakshi Kumari",
        role: "Team Member",
        gradient: "from-amber-500 to-orange-500",
        roleColor: "text-amber-400",
        github: "https://github.com/walkingshadow911",
        linkedin: "https://www.linkedin.com/in/sakshi911/",
    },
    {
        name: "DigiCraft Innovation",
        role: "Parent Company",
        gradient: "from-emerald-500 to-teal-500",
        roleColor: "text-emerald-400",
        website: "https://digicraft.one",
    },
];

function SocialLinks({
    github,
    linkedin,
    website,
}: {
    github?: string;
    linkedin?: string;
    website?: string;
}) {
    if (github === undefined && linkedin === undefined && website === undefined) return null;

    const linkClass =
        "p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors";
    const disabledClass = "p-2 rounded-lg text-gray-600 cursor-default";

    return (
        <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-white/5">
            {github !== undefined &&
                (github ? (
                    <a
                        href={github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className={linkClass}
                    >
                        <Github size={18} />
                    </a>
                ) : (
                    <span className={disabledClass} title="GitHub link coming soon" aria-hidden>
                        <Github size={18} />
                    </span>
                ))}
            {linkedin !== undefined &&
                (linkedin ? (
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn profile"
                        className={linkClass}
                    >
                        <Linkedin size={18} />
                    </a>
                ) : (
                    <span className={disabledClass} title="LinkedIn link coming soon" aria-hidden>
                        <Linkedin size={18} />
                    </span>
                ))}
            {website !== undefined &&
                (website ? (
                    <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Company website"
                        className={linkClass}
                    >
                        <Globe size={18} />
                    </a>
                ) : (
                    <span className={disabledClass} title="Website link coming soon" aria-hidden>
                        <Globe size={18} />
                    </span>
                ))}
        </div>
    );
}
import { HeroIllustration, MissionIllustration, CommunityIllustration } from "@/components/Illustrations";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 overflow-hidden">
            <Header />

            <div className="relative pt-below-header pb-20 px-6 max-w-7xl mx-auto">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

                {/* Hero Section */}
                <section className="mb-24 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div
                        className="flex-1 text-center lg:text-left"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                            Reimagining Web Design
                        </motion.div>
                        <motion.h1 variants={fadeIn} className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            We are <br />
                            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-indigo-200 to-violet-400">
                                Codophile
                            </span>
                        </motion.h1>
                        <motion.p variants={fadeIn} className="text-lg text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Transforming how developers design and build. We bridge the gap between creative vision and production code with our advanced visual playground.
                        </motion.p>
                        <motion.div variants={fadeIn} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            <button className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                                Join Our Journey
                            </button>
                            <button className="px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                                View Career
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full max-w-lg lg:max-w-none"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <HeroIllustration className="w-full h-auto drop-shadow-2xl" />
                    </motion.div>
                </section>

                {/* Stats Section */}
                <section className="mb-32">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/5 py-12"
                    >
                        {[
                            { label: "Designers", value: "4", icon: Users },
                            { label: "Components", value: "100+", icon: Code },
                            { label: "Effects", value: "50+", icon: Zap },
                            { label: "Community", value: "10K+", icon: Trophy },
                        ].map((stat, idx) => (
                            <motion.div key={idx} variants={fadeIn} className="text-center">
                                <div className="flex justify-center mb-4 text-indigo-400">
                                    <stat.icon size={24} />
                                </div>
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Mission & Vision Split */}
                <section className="mb-32 space-y-24">
                    {/* Mission */}
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="flex-1 w-full max-w-md lg:max-w-none order-2 lg:order-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <MissionIllustration className="w-full h-auto" />
                        </motion.div>
                        <motion.div
                            className="flex-1 order-1 lg:order-2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center text-orange-400 mb-6">
                                <Target size={24} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Our Mission</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                To democratize high-quality web design. We believe everyone should have the power to create stunning interfaces without getting bogged down by the complexities of CSS syntax.
                            </p>
                            <ul className="space-y-4">
                                {["Simplify CSS mastery", "Accelerate development workflows", "Foster a global design community"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    {/* Vision/Community */}
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <motion.div
                            className="flex-1"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6">
                                <Users size={24} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Visualizing the Future</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                We envision a world where the barrier between a design idea and a live product is non-existent. Our community is at the heart of this revolution, constantly sharing, iterating, and improving.
                            </p>
                            <button className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 group">
                                Join the Community <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </motion.div>
                        <motion.div
                            className="flex-1 w-full max-w-md lg:max-w-none"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <CommunityIllustration className="w-full h-auto" />
                        </motion.div>
                    </div>
                </section>

                {/* Our Journey Timeline (Unstop Style) */}
                <section className="mb-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Our Journey</h2>
                        <p className="text-gray-400">From a simple idea to a global platform.</p>
                    </div>

                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 -translate-x-1/2 h-full w-px bg-white/10" />

                        {[
                            { year: "2023", title: "The Inception", desc: "It started as a first-year project—just a raw idea and a blank editor. We built a pure website from scratch, driven by curiosity and the thrill of creation." },
                            { year: "2024 - 2025", title: "The Hiatus", desc: "The project was shelved and forgotten for two years as life took over. The repository sat dormant in the digital void, waiting for its second chance." },
                            { year: "Early 2026", title: "The Resurrection", desc: "A solo return to the codebase. We dusted off the old repo, refactoring the core with modern tech and a renewed vision to build something real." },
                            { year: "Late 2026", title: "The Assembly", desc: "Like-minded developers joined the mission. Together, we transformed the prototype into a scalable, production-ready platform for the world." },
                            { year: "Future", title: "The Horizon", desc: "Expanding capabilities with advanced generators and community features. We are just getting started on making Codophile the ultimate dev tool." },
                        ].map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                                className={`relative flex items-center justify-between mb-12 last:mb-0 ${idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                            >
                                <div className={`w-[45%] ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                    <div className="text-2xl font-bold text-indigo-400 mb-1">{item.year}</div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.desc}</p>
                                </div>
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-indigo-500 border-4 border-[#030014] z-10 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                                <div className="w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section className="mb-24">
                    <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white flex items-center justify-center gap-3">
                        <Users className="text-indigo-400" /> Meet the Creators
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6">
                        {TEAM_MEMBERS.map((member, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/5 border border-white/10 rounded-xl px-8 py-6 text-center hover:bg-white/10 transition-all group relative overflow-hidden min-w-[200px] flex-1 max-w-[250px]"
                            >
                                <div className={`absolute top-0 left-0 w-full h-0.5 bg-linear-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`} />

                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white/90 transition-colors">
                                    {member.name}
                                </h3>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${member.roleColor}`}>
                                    {member.role}
                                </p>
                                <SocialLinks github={member.github} linkedin={member.linkedin} website={member.website} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Upcoming Features Section */}
                <section>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative bg-linear-to-br from-violet-900/20 to-indigo-900/20 border border-violet-500/20 rounded-2xl p-10 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(#ffffff05_1px,transparent_1px),linear-gradient(to_right,#ffffff05_1px,transparent_1px)] -z-10" style={{ backgroundSize: "20px 20px" }} />

                        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white flex items-center gap-3">
                            <Rocket className="text-pink-500" /> What's Coming Next?
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-pink-500/10 rounded-lg text-pink-400 mt-1">
                                        <Palette size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">Cool CSS Library</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            We are about to release a massive library of cool CSS components based on particular themes.
                                            You'll be able to easily copy and integrate these stunning designs directly into your websites.
                                            Expect glassmorphism, neomorphism, and futuristic themes!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 mt-1">
                                        <Code size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white mb-2">More Generators</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            Expanding our playground to include advanced animations, grid layouts, and interactive components.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>

            <Footer />
        </main>
    );
}
