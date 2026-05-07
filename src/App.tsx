/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmoothScroll from './components/SmoothScroll';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import FeaturedVideo from './components/FeaturedVideo';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Collaboration from './components/Collaboration';
import Pricing from './components/Pricing';
import Blog from './components/Blog';
import Footer from './components/Footer';
import Analytics from './components/Analytics';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import BackgroundParallax from './components/BackgroundParallax';
import ScrollToTop from './components/ScrollToTop';
import ReelSection from './components/ReelSection';
import FAQ from './components/FAQ';
import SponsorMarquee from './components/SponsorMarquee';
import Testimonials from './components/Testimonials';
import Terms from './components/Terms';
import ScrollProgress from './components/ScrollProgress';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

/**
 * App component for Galaxy Global.
 * Follows a cinematic, monochrome aesthetic with high-end animations.
 */
export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after components mount to ensure calculations are accurate
    ScrollTrigger.refresh();
  }, []);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <Preloader />
      <BackgroundParallax />
      <Analytics />
      <ScrollToTop />
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-black text-white font-sans selection:bg-white selection:text-black border-8 border-neutral-900">
        {/* Navigation - Geometric alignment */}
        <Navigation />

        <main className="flex-grow">
          {/* Hero Section - Structural centered layout */}
          <section id="hero" className="w-full border-b border-white/10">
            <Hero />
          </section>

          {/* Featured Entry Video - User Requested Vimeo Link */}
          <FeaturedVideo />

          {/* Infinite Autoplay Marquee */}
          <SponsorMarquee />

          {/* Portfolio Section - Rigid grid structure */}
          <section id="portfolio" className="w-full border-b border-white/10">
            <Portfolio />
          </section>

          {/* Reels - Vimeo Cinematic Integration */}
          <ReelSection />

          {/* About Section - Formal typography layout */}
          <section id="about" className="w-full py-12 md:py-16 border-b border-white/10">
            <About />
          </section>

          {/* Testimonials - Client feedback carousel */}
          <Testimonials />

          {/* Collaboration - Minimalist partner showcase */}
          <Collaboration />

          {/* Pricing Section - High-contrast grid */}
          <section id="pricing" className="w-full bg-neutral-950">
            <Pricing />
          </section>

          {/* Blog Section - Information-first layout */}
          <section id="blog" className="w-full py-12 md:py-16 border-t border-white/10 bg-black">
            <Blog />
          </section>

          {/* FAQ - Knowledge Base */}
          <FAQ />

          {/* Terms - Legal Framework */}
          <Terms />
        </main>

        {/* Footer - Solid geometric bar */}
        <Footer />
      </div>
    </SmoothScroll>
  );
}
