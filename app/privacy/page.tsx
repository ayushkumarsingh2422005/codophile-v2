"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 overflow-hidden">
            <Header />

            <div className="relative pt-below-header-lg pb-20 px-6 max-w-4xl mx-auto relative z-10">
                {/* Background Gradients */}
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] -z-10" />

                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-blue-300 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        Last Updated: March 2026
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">
                        Privacy Policy
                    </h1>
                    
                    <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                        At Codophile, created by DigiCraft Innovation Pvt. Ltd., your privacy is a top priority. This Privacy Policy outlines how we collect, use, and protect your personal information when you use our services.
                    </p>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Information we collect falls into one of two categories: “voluntarily provided” information and “automatically collected” information.
                                “Voluntarily provided” information refers to any information you knowingly and actively provide us when using or participating in any of our services and promotions.
                                “Automatically collected” information refers to any information automatically sent by your devices in the course of accessing our products and services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Log Data</h2>
                            <p className="text-gray-400 leading-relaxed">
                                When you visit our website, our servers may automatically log the standard data provided by your web browser. It may include your device’s Internet Protocol (IP) address, your browser type and version, the pages you visit, the time and date of your visit, the time spent on each page, and other details about your visit.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Device Data</h2>
                            <p className="text-gray-400 leading-relaxed">
                                When you visit our website or interact with our services, we may automatically collect data about your device, such as your Device Type, Operating System, Unique device identifiers, Device settings, and Geo-location data.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Personal Information</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We may ask for personal information — for example, when you submit content to us, subscribe to our newsletter, or when you contact us — which may include one or more of the following: Name, Email, and Social media profiles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. User-Generated Content</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We consider “user-generated content” to be materials (such as code snippets, templates, or comments) voluntarily supplied to us by our users for the purpose of publication on our website. Please be aware that any content you submit for the purpose of publication will be public after posting.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">6. Legitimate Reasons for Processing</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We only collect and use your personal information when we have a legitimate reason for doing so. In which instance, we only collect personal information that is reasonably necessary to provide and improve our services to you.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">7. Collection and Use of Information</h2>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                We may collect personal information from you when you do any of the following on our website:
                            </p>
                            <ul className="list-disc pl-5 text-gray-400 leading-relaxed space-y-2">
                                <li>Register for an account</li>
                                <li>Sign up to receive updates from us via email</li>
                                <li>Use a mobile device or web browser to access our content</li>
                                <li>Contact us via email or social media</li>
                            </ul>
                            <p className="text-gray-400 leading-relaxed mt-4">
                                We may collect, hold, use, and disclose information for the following purposes: To provide you with our platform’s core features, to contact and communicate with you, for security and fraud prevention, and to operate and improve our applications.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">8. Security of Your Personal Information</h2>
                            <p className="text-gray-400 leading-relaxed">
                                When we collect and process personal information, and while we retain this information, we will protect it within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification. Although we will do our best to protect the personal information you provide to us, we advise that no method of electronic transmission or storage is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">9. How Long We Keep Your Information</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We keep your personal information only for as long as we need to. This time period may depend on what we are using your information for, in accordance with this privacy policy. If your personal information is no longer required, we will delete it or make it anonymous.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">10. Children’s Privacy</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We do not aim any of our products or services directly at children under the age of 13, and we do not knowingly collect personal information about children under 13.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">11. Disclosure of Personal Information</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We may disclose personal information to our employees, third-party service providers (including IT service providers, hosting, and analytics providers), and courts/regulatory authorities as required by law.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                            <p className="text-gray-400 leading-relaxed">
                                If you have any questions or concerns about our privacy practices, please contact us at <a href="mailto:hello@codophile.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">hello@codophile.in</a>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
