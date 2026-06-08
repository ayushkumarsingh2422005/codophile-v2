"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 overflow-hidden">
            <Header />

            <div className="relative pt-below-header-lg pb-20 px-6 max-w-4xl mx-auto relative z-10">
                {/* Background Gradients */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] -z-10" />

                <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        Last Updated: March 2026
                    </div>
                    
                    <h1 className="text-4xl md:text-5xl font-bold mb-8">
                        Terms of Service
                    </h1>
                    
                    <p className="text-lg text-gray-400 mb-12 leading-relaxed">
                        Welcome to Codophile, a product of DigiCraft Innovation Pvt. Ltd. Please read these Terms of Service carefully before using our platform. By accessing or using our services, you agree to be bound by these terms.
                    </p>

                    <div className="space-y-12">
                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                            <p className="text-gray-400 leading-relaxed">
                                By using our website and services, you agree to abide by these Terms and Conditions. If you do not agree with these terms, please refrain from using our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">2. Modifications to Terms</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We reserve the right to modify or update these Terms and Conditions at any time. All changes will be effective immediately upon posting on this page. Your continued use of the website after such changes constitutes your acceptance of the revised terms.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">3. Privacy Policy</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Your privacy is important to us. Please review our Privacy Policy for details on how we collect, use, and protect your personal information.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">4. Use of the Website</h2>
                            <p className="text-gray-400 leading-relaxed">
                                You agree to use our website only for lawful purposes. You must not engage in any activities that could harm, disrupt, or interfere with the website's operations, the services provided, or the experience of other developers using the platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">5. User Responsibilities</h2>
                            <p className="text-gray-400 leading-relaxed">
                                You are responsible for maintaining the confidentiality of your account and password. You agree to notify us immediately of any unauthorized use of your account. You are also responsible for all activities that occur under your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
                            <p className="text-gray-400 leading-relaxed">
                                All content on the Codophile platform, including the editor UI, text, images, graphics, logos, and software, is the property of DigiCraft Innovation Pvt. Ltd. and is protected by intellectual property laws. 
                                <br/><br/>
                                However, you retain full rights to any CSS, design system, or component code that you generate using our editor, and you are free to use your generated code in personal, open-source, or commercial projects.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">7. Limitation of Liability</h2>
                            <p className="text-gray-400 leading-relaxed">
                                In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the website, services, or generated code, even if we have been advised of the possibility of such damages.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">8. Third-Party Links</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Our website may contain links to third-party websites. We do not control, endorse, or assume responsibility for the content, privacy practices, or activities of these third-party websites. You access such websites at your own risk.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">9. Termination of Access</h2>
                            <p className="text-gray-400 leading-relaxed">
                                We reserve the right to suspend or terminate your access to the website and services at our sole discretion, without notice, if we believe you have violated these Terms and Conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">10. Governing Law</h2>
                            <p className="text-gray-400 leading-relaxed">
                                These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law principles.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">11. Dispute Resolution</h2>
                            <p className="text-gray-400 leading-relaxed">
                                Any disputes arising from or relating to these Terms and Conditions shall be resolved through binding arbitration in India, and you agree to submit to the personal jurisdiction of the relevant courts in India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">12. Indemnification</h2>
                            <p className="text-gray-400 leading-relaxed">
                                You agree to indemnify and hold harmless DigiCraft Innovation Pvt. Ltd., its affiliates, employees, and agents from any claims, losses, or damages (including legal fees) arising from your use of the website or any violation of these Terms and Conditions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
                            <p className="text-gray-400 leading-relaxed">
                                If you have any questions about these Terms, you can contact us at <a href="mailto:hello@codophile.in" className="text-indigo-400 hover:text-indigo-300 transition-colors">hello@codophile.in</a>.
                            </p>
                        </section>
                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    );
}
