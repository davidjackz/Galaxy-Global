import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Quote } from 'lucide-react';
import LottieLoader from './ui/LottieLoader';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  videoUrl: string;
  vimeoUrl?: string;
  description: string;
  tech: string[];
  testimonial?: {
    text: string;
    author: string;
  };
}

const PROJECTS: Project[] = [
  { 
    id: 1, 
    title: 'Galaxy Navatra', 
    category: 'Galaxy Navatra', 
    image: 'https://i.postimg.cc/ZqNN5mww/galaxy-navatra-logo.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-searching-for-the-right-answer-4122-large.mp4',
    vimeoUrl: 'https://player.vimeo.com/video/1189630834?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    description: 'Premier audio engineering and production for the galactic music scene. We define the sound of a generation.',
    tech: ['Dolby Atmos', 'Studio Session', 'Mastering'],
    testimonial: {
      text: "The sonic depth provided by Galaxy Navatra is unparalleled in the region.",
      author: "VannDa, Artist"
    }
  },
  { 
    id: 2, 
    title: 'Competition Event', 
    category: 'Competition Event', 
    image: 'https://i.postimg.cc/ZqNN5mww/galaxy-navatra-logo.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-urban-street-view-at-night-42289-large.mp4',
    vimeoUrl: 'https://player.vimeo.com/video/1189630868?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    description: 'High-stakes production for competitive events and Cam Pop showcases. Capturing every beat of the competition.',
    tech: ['Live Broadcast', 'Stage Visuals', 'Multi-cam Edit']
  },
  { 
    id: 3, 
    title: 'Editorial Content', 
    category: 'Editorial Content', 
    image: 'https://i.postimg.cc/ZqNN5mww/galaxy-navatra-logo.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-close-up-of-a-man-using-a-camera-34444-large.mp4',
    vimeoUrl: 'https://player.vimeo.com/video/1189630836?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    tech: ['Copywriting', 'Layout Design', 'Photography']
  },
  { 
    id: 4, 
    title: 'Galaxy News', 
    category: 'Galaxy News', 
    image: 'https://i.postimg.cc/ZqNN5mww/galaxy-navatra-logo.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4045-large.mp4',
    vimeoUrl: 'https://player.vimeo.com/video/1189630869?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    description: 'Human-centric storytelling capturing the spirit of global innovation. A deep dive into the journalistic heartbeat of the galaxy.',
    tech: ['Cinematic Color', 'Modular Editing', 'Live Capture']
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))];

/**
 * LazyVideo component to optimize performance by only loading videos when they are in view,
 * now with an added subtle parallax effect on hover.
 */
function LazyVideo({ src, poster, isHovered }: { src: string; poster: string; isHovered: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset mouse position when not hovered
  useEffect(() => {
    if (!isHovered) {
      setMousePos({ x: 0, y: 0 });
    }
  }, [isHovered]);

  useEffect(() => {
    if (videoRef.current) {
      if (isHovered && isInView) {
        videoRef.current.play().catch(() => {});
      } else {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [isHovered, isInView]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || !isHovered) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize mouse position from -1 to 1 for more natural parallax center
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleMouseMove}
      className="absolute inset-0 z-0 overflow-hidden"
    >
      <motion.img 
        src={poster} 
        alt="" 
        aria-hidden="true"
        loading="lazy"
        animate={{
          x: mousePos.x * -10, // Subtle movement
          y: mousePos.y * -10,
          scale: isHovered ? 1.15 : 1.1,
          filter: isHovered ? 'blur(4px) grayscale(0.5)' : 'blur(0px) grayscale(1)'
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 75, 
          damping: 20, 
          mass: 0.8 
        }}
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-40'}`}
      />
      {isInView && (
        <motion.video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          animate={{
            x: mousePos.x * -25, // More pronounced video movement for depth
            y: mousePos.y * -25,
            scale: isHovered ? 1.15 : 1.05
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 75, 
            damping: 20, 
            mass: 0.8 
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isHovered ? 'opacity-40 grayscale-0' : 'opacity-0'}`}
        />
      )}
      <div className="hover-overlay absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 pointer-events-none" />
    </div>
  );
}

export default function Portfolio() {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <div ref={containerRef} className="flex flex-col py-16 md:py-24 bg-background px-4 md:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 px-2 md:px-0">
        <div className="max-w-2xl">
          <span className="text-[10px] md:text-[12px] uppercase tracking-[0.5em] font-black text-muted block mb-3 md:mb-4">Latest Works</span>
          <h2 className="text-3xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">
            Cinematic <br className="hidden md:block"/> <span className="text-muted italic font-light">Architecture</span>.
          </h2>
        </div>
        
        {/* Filter Navigation */}
        <nav 
          aria-label="Portfolio category filter"
          className="flex flex-wrap items-center gap-2 md:gap-4 no-scrollbar"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[8px] md:text-[10px] uppercase tracking-widest font-black rounded-full border transition-all duration-500 ${
                filter === cat 
                  ? 'bg-foreground text-background border-foreground' 
                  : 'bg-transparent text-muted border-border hover:border-foreground/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>
      </div>

      {/* Projects Grid */}
      <div 
        ref={gridRef}
        id="portfolio-grid"
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-6 min-h-[400px]"
      >
        {loading ? (
          <div className="col-span-full py-24 flex flex-col items-center justify-center">
            <LottieLoader size={120} />
            <p className="text-[10px] uppercase tracking-[0.5em] text-muted font-bold mt-8">Developing Scene</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div 
              layout
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col cursor-pointer overflow-hidden rounded-2xl bg-surface border border-border"
            >
              <div className="aspect-[4/5] md:aspect-[3/4] lg:aspect-square overflow-hidden relative">
                <motion.img 
                  src={project.image} 
                  alt={project.title}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                />
                
                {/* Floating Category Label */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 px-2 md:px-3 py-1 bg-background/60 backdrop-blur-md rounded-full text-[6px] md:text-[7px] uppercase font-black tracking-widest text-foreground opacity-60">
                   {project.category}
                </div>
              </div>

              <div className="p-4 md:p-5 lg:p-6 flex items-center justify-between gap-2">
                <div className="min-w-0">
                   <h3 className="text-xs md:text-sm lg:text-base font-black uppercase tracking-tighter leading-tight mb-0.5 md:mb-1 truncate">
                    {project.title}
                  </h3>
                  <div className="text-[7px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-muted font-bold truncate">
                    View Case Study
                  </div>
                </div>
                <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                   <ExternalLink size={10} className="lg:w-3.5 lg:h-3.5" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
          >
             <div onClick={() => setSelectedProject(null)} className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
             
             <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="relative w-full max-w-6xl h-full max-h-[85vh] bg-surface border border-border rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl"
             >
                <div className="w-full lg:w-2/3 bg-black relative flex items-center justify-center overflow-hidden aspect-video lg:aspect-auto">
                   {selectedProject.vimeoUrl ? (
                      <iframe 
                        src={`${selectedProject.vimeoUrl.includes('?') ? selectedProject.vimeoUrl : selectedProject.vimeoUrl + '?'}autoplay=1&muted=0&background=0&controls=1`} 
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0" 
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      />
                   ) : (
                      <video 
                        src={selectedProject.videoUrl} 
                        controls 
                        autoPlay 
                        className="w-full h-full object-contain" 
                      />
                   )}
                   <button 
                    onClick={() => setSelectedProject(null)} 
                    className="absolute top-6 right-6 p-3 bg-black/50 text-white rounded-full backdrop-blur-lg lg:hidden"
                   >
                     <X size={20} />
                   </button>
                </div>
                
                <div className="flex-grow p-6 md:p-14 overflow-y-auto lg:w-1/3">
                   <span className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-black text-muted block mb-4 md:mb-6">{selectedProject.category}</span>
                   <h2 className="text-2xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-tight md:leading-none">{selectedProject.title}</h2>
                   <p className="text-muted leading-relaxed mb-8 md:mb-10 text-xs md:text-base">{selectedProject.description}</p>
                   
                   <div className="flex flex-wrap gap-2 mb-8 md:mb-12">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="px-3 md:px-4 py-1.5 md:py-2 bg-background border border-border rounded-full text-[8px] md:text-[9px] uppercase font-black tracking-widest text-muted">{t}</span>
                      ))}
                   </div>
                   
                   <button className="w-full py-4 md:py-5 bg-foreground text-background text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full hover:scale-[1.02] transition-transform">
                      Contact for Similar Project
                   </button>
                </div>

                <button 
                    onClick={() => setSelectedProject(null)} 
                    className="absolute top-8 right-8 p-3 hover:rotate-90 transition-transform hidden lg:block"
                >
                   <X size={32} />
                </button>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

