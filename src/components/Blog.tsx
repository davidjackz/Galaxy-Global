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
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-12 gap-10 md:gap-8 px-2 md:px-0">
        <div>
          <span className="meta-label text-[12px] uppercase tracking-[0.4em] font-black opacity-40 block mb-4 md:mb-4 text-foreground transition-colors">Insights & Strategy</span>
          <h2 className="text-3xl md:text-7xl font-black uppercase leading-tight text-foreground transition-colors">Expert Knowledge</h2>
        </div>
        <button className="text-[12px] uppercase tracking-widest font-black border-b-2 border-border pb-1 md:pb-2 hover:opacity-100 opacity-60 transition-all text-foreground self-start">
          View All Insights
        </button>
      </div>

      <div className="space-y-0 divide-y divide-border border-t border-b border-border transition-colors relative overflow-hidden">
        {POSTS.map((post, index) => (
          <motion.div 
            key={post.title} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="blog-card group py-8 md:py-16 hover:bg-foreground/[0.03] transition-all px-4 -mx-4 md:px-6 md:-mx-6 cursor-pointer flex flex-col md:flex-row justify-between gap-6 md:gap-8 md:items-center relative"
            whileHover={{ x: 10 }}
          >
            {/* Hover Left Bar */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-1 bg-foreground transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
            />

            <div className="max-w-2xl text-foreground">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="flex items-center gap-2">
                   <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-foreground group-hover:bg-muted transition-colors" />
                   <span className="text-[12px] md:text-[10px] uppercase tracking-[0.3em] font-black text-foreground">
                    {post.category}
                  </span>
                </div>
                <div className="h-3 md:h-4 w-px bg-border" />
                <span className="text-[12px] md:text-[10px] uppercase tracking-widest font-bold text-muted transition-all duration-500 opacity-30 group-hover:opacity-80 group-hover:text-foreground/80">
                  {post.date}
                </span>
              </div>
              
              <h3 className="text-xl md:text-5xl font-bold uppercase leading-[1.1] md:leading-[1.05] tracking-tighter">
                {post.title}
              </h3>
              
              <p className="mt-4 md:mt-6 text-xs md:text-base text-muted leading-relaxed max-w-xl transition-colors opacity-70 group-hover:opacity-100 line-clamp-2 md:line-clamp-none">
                {post.excerpt}
              </p>
            </div>
            
            <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full border border-border flex items-center justify-center transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:bg-foreground group-hover:border-foreground group-hover:rotate-[360deg] self-end md:self-center">
              <ArrowUpRight className="w-4 h-4 md:w-6 md:h-6 text-foreground group-hover:text-background transition-transform group-hover:scale-125" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
