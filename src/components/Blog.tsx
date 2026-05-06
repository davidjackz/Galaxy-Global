import { useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

const POSTS = [
  {
    title: 'How to Optimize Video for YouTube SEO in 2024',
    category: 'Strategy',
    date: 'May 04, 2026',
    excerpt: 'Deep dive into the latest algorithmic changes and how our video editing agency prepares content for global visibility.'
  },
  {
    title: 'The Psychology of Pacing: Keeping Viewers Hooked',
    category: 'Editing',
    date: 'April 28, 2026',
    excerpt: 'Why the first 3 seconds are crucial and how to engineer retention using cinematic transition techniques.'
  },
  {
    title: 'Color Grading for High-End Cinematic Brands',
    category: 'Production',
    date: 'April 15, 2026',
    excerpt: 'Mastering the monochrome aesthetic and high-contrast visuals to establish brand dominance.'
  }
];

/**
 * Blog component designed for SEO-driven organic traffic capture.
 */
export default function Blog() {
  const blogContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={blogContainerRef} className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
        <div>
          <span className="meta-label text-[10px] uppercase tracking-[0.4em] font-bold opacity-40 block mb-4 text-foreground transition-colors">Insights & Strategy</span>
          <h2 className="text-4xl md:text-7xl font-black uppercase leading-tight text-foreground transition-colors">Expert <br/> Knowledge</h2>
        </div>
        <button className="text-[10px] uppercase tracking-widest font-bold border-b border-border pb-2 hover:opacity-100 opacity-60 transition-all text-foreground">
          View All Insights
        </button>
      </div>

      <div className="space-y-0 divide-y divide-border border-t border-b border-border transition-colors relative overflow-hidden">
        {POSTS.map((post, index) => (
          <motion.div 
            key={post.title} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="blog-card group py-12 md:py-16 hover:bg-foreground/[0.03] transition-all px-6 -mx-6 cursor-pointer flex flex-col md:flex-row justify-between gap-8 md:items-center relative"
            whileHover={{ x: 10 }}
          >
            {/* Hover Left Bar */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-foreground transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
            />

            <div className="max-w-2xl text-foreground">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-foreground group-hover:bg-muted transition-colors" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="h-4 w-px bg-border" />
                <span className="text-[10px] uppercase tracking-widest font-bold text-muted transition-all duration-500 opacity-30 group-hover:opacity-80 group-hover:text-foreground/80">
                  {post.date}
                </span>
              </div>
              
              <h3 className="text-2xl md:text-5xl font-bold uppercase leading-[1.05] tracking-tighter">
                {post.title}
              </h3>
              
              <p className="mt-6 text-sm md:text-base text-muted leading-relaxed max-w-xl transition-colors opacity-70 group-hover:opacity-100">
                {post.excerpt}
              </p>
            </div>
            
            <div className="relative w-16 h-16 rounded-full border border-border flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:bg-foreground group-hover:border-foreground group-hover:rotate-[360deg]">
              <ArrowUpRight className="w-6 h-6 text-foreground group-hover:text-background transition-transform group-hover:scale-125" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
