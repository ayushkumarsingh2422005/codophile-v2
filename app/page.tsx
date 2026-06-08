import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CoreCssSection from "@/components/CoreCssSection";
import TailwindSection from "@/components/TailwindSection";
import AdSenseDisplay from "@/components/AdSenseDisplay";
import FeaturesBento from "@/components/FeaturesBento";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030014] text-white selection:bg-indigo-500/30 relative">
      {/* Global Dynamic Background */}
       <section className="sr-only">
  <h1 className="text-sm">Visual CSS Playground, Tailwind CSS Generator & CSS Effects Library</h1>
  <p>
    Codophile is a visual CSS playground that allows developers to design UI in real-time,
    generate Tailwind CSS classes, and explore cool CSS effects with code. Build responsive
    layouts, experiment with styles, and export production-ready code instantly.
  </p>
</section>
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[length:24px_24px]" />
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 blur-[120px] opacity-20 w-96 h-96 bg-purple-500 rounded-full" />
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 blur-[120px] opacity-20 w-96 h-96 bg-indigo-500 rounded-full" />
          {/* subtle mask to fade out the grid radially at the very edges so it doesnt look too harsh */}
          <div className="absolute inset-0 shadow-[inset_0_0_150px_100px_#030014]" />
      </div>

      <div className="relative z-10 w-full overflow-x-hidden">
        <Header />
     
      <Hero />
      <CoreCssSection />
      <TailwindSection />
      <AdSenseDisplay className="w-full max-w-3xl px-4 py-6 sm:py-10" />
      <FeaturesBento />
      <ReviewsSection />
      <Footer />

      <div id="playground" />
      </div>
    </main>
  );
}
