"use client";
import React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Mail, Heart, ArrowRight } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const [status, setStatus] = React.useState<{
        type: 'idle' | 'loading' | 'success' | 'error';
        message: string;
    }>({ type: 'idle', message: 'No spam, unsubscribe at any time.' });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        const email = formData.get('email') as string;
        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;

        setStatus({ type: 'loading', message: 'Subscribing...' });

        try {
            const res = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName, lastName }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus({ type: 'success', message: 'Successfully subscribed!' });
                form.reset();
            } else {
                setStatus({ type: 'error', message: data.error || 'Something went wrong.' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'Error connecting to server.' });
        }
    };

    return (
        <footer className="relative bg-[#020010] border-t border-white/5 pt-32 pb-16 overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-indigo-600/10 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
                    {/* Brand Column - Wider (Span 5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-xl border border-white/10 group-hover:border-violet-500/50 transition-colors">
                                <img src="/logo.png" alt="Codophile Logo" className="w-6 h-6 object-contain" />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-white group-hover:text-violet-200 transition-colors">
                                Codophile
                            </span>
                        </Link>
                        <p className="text-gray-400 text-base leading-relaxed max-w-md">
                            The ultimate visual CSS editor and component generator for modern developers.
                            Design at the speed of thought.
                        </p>

                        {/* Newsletter Signup */}
                        <div className="max-w-md">
                            <h5 className="text-white font-medium mb-3">Subscribe to our newsletter</h5>
                            <form onSubmit={handleSubmit} className="space-y-3">
                                <div className="grid grid-cols-2 gap-2">
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder="First Name"
                                        required
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all w-full"
                                    />
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        required
                                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all w-full"
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        required
                                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-violet-500/50 focus:bg-white/10 transition-all"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status.type === 'loading'}
                                        className="bg-violet-600 hover:bg-violet-500 disabled:bg-violet-800 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors group"
                                    >
                                        <ArrowRight size={18} className={`${status.type === 'loading' ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform`} />
                                    </button>
                                </div>
                            </form>
                            <p className={`text-xs mt-2 transition-colors duration-300 ${status.type === 'error' ? 'text-red-400' :
                                status.type === 'success' ? 'text-green-400' :
                                    'text-gray-500'
                                }`}>
                                {status.message}
                            </p>
                        </div>
                    </div>

                    {/* Links Columns - Spaced out (Span 7) */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                        {/* Product */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8">Product</h4>
                            <ul className="space-y-6">
                                {[
                                    { label: "Features", href: "#features" },
                                    { label: "Playground", href: "/playground" },
                                    { label: "Effects", href: "/effects" },
                                    { label: "Changelog", href: "/changelog" },
                                    { label: "Roadmap", href: "/roadmap" },
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8">Resources</h4>
                            <ul className="space-y-6">
                                {[
                                    { label: "Documentation", href: "/docs" },
                                    { label: "API Reference", href: "/docs/api" },
                                    { label: "Community", href: "/community" },
                                    { label: "Blog", href: "/blog" },
                                    { label: "Help Center", href: "/help" },
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Company */}
                        <div>
                            <h4 className="text-white font-bold text-lg mb-8">Company</h4>
                            <ul className="space-y-6">
                                {[
                                    { label: "About", href: "/about" },
                                    { label: "Careers", href: "/careers" },
                                    { label: "Legal", href: "/legal" },
                                    { label: "Privacy Policy", href: "/privacy" },
                                    { label: "Terms of Service", href: "/terms" },
                                ].map((link, idx) => (
                                    <li key={idx}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-white hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        {[
                            { icon: Github, href: "https://github.com/ayushkumarsingh2422005/codophile-v2", label: "GitHub" },
                            { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                            { icon: Linkedin, href: "https://www.linkedin.com/company/digicraft-tech/", label: "LinkedIn" },
                            { icon: Mail, href: "mailto:hello@codophile.in", label: "Email" },
                        ].map((social, idx) => (
                            <a
                                key={idx}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors"
                                aria-label={social.label}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} Codophile. A product of <span className="text-white font-medium">DigiCraft Innovation Pvt. Ltd.</span>
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                            <span>Made with</span>
                            <Heart size={12} className="text-red-500 fill-red-500 animate-pulse" />
                            <span>in India</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
