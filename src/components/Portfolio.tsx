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
    vimeoUrl: 'https://player.vimeo.com/video/1189630834?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
    description: 'Creative storytelling and editorial precision for high-end lifestyle and culture brands.',
    tech: ['Copywriting', 'Layout Design', 'Photography']
  },
  { 
    id: 4, 
    title: 'Galaxy News', 
    category: 'Galaxy News', 
    image: 'https://i.postimg.cc/ZqNN5mww/galaxy-navatra-logo.jpg',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-night-sky-4045-large.mp4',
    vimeoUrl: 'https://player.vimeo.com/video/1189630868?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479',
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
  const [isModalReady, setIsModalReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Simulate initial data fetch
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  useEffect(() => {
    if (isModalReady && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    } else if (!isModalReady && modalVideoRef.current) {
      modalVideoRef.current.pause();
    }
  }, [isModalReady]);

  const handleClose = () => {
    setIsModalReady(false);
    setSelectedProject(null);
  };

  useEffect(() => {
    // GSAP Scroll Animation for individual cards (Focus Pool)
    const items = gridRef.current?.querySelectorAll('.portfolio-item');
    if (items) {
      items.forEach((item) => {
        gsap.set(item, { scale: 0.9, filter: 'blur(5px)', opacity: 0.4 });
        
        gsap.to(item, {
          scale: 1.05,
          filter: 'blur(0px) grayscale(0%)',
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: item,
            start: 'center 90%',
            end: 'center 50%',
            scrub: 1.5,
            invalidateOnRefresh: true,
          }
        });
      });
    }

    // Grid entrance reveal
    if (gridRef.current) {
      const itemsToReveal = gridRef.current.querySelectorAll('.portfolio-item');
      gsap.killTweensOf(itemsToReveal); 

      gsap.fromTo(itemsToReveal, 
        { 
          opacity: 0, 
          scale: 0.95, 
          y: 20,
          transformOrigin: 'center center' 
        },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0,
          duration: 1, 
          stagger: {
            amount: 0.4,
            grid: [1, 4],
            from: 'center'
          },
          ease: 'expo.out',
          clearProps: 'all'
        }
      );
    }
  }, [filter]);

  /**
   * GSAP Hover Handlers for extreme precision and smooth zoom/color transitions
   */
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    setHoveredProjectId(id);
    const card = e.currentTarget;
    const overlay = card.querySelector('.hover-overlay');
    
    gsap.to(overlay, { 
      opacity: 1, 
      duration: 0.8, 
      ease: 'power2.out' 
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    setHoveredProjectId(null);
    const card = e.currentTarget;
    const overlay = card.querySelector('.hover-overlay');

    gsap.to(overlay, { 
      opacity: 0, 
      duration: 0.6, 
      ease: 'power2.inOut' 
    });
  };

  return (
    <div ref={containerRef} className="flex flex-col border-b border-white/10">
      {/* Filter Navigation */}
      <nav 
        aria-label="Portfolio category filter"
        className="flex flex-nowrap overflow-x-auto items-center md:justify-center gap-2 md:gap-4 py-4 md:py-6 border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-[60px] md:top-[72px] z-20 px-4 md:px-0 no-scrollbar"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            aria-pressed={filter === cat}
            aria-controls="portfolio-grid"
            className={`relative flex-shrink-0 px-4 md:px-6 py-1.5 md:py-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
              filter === cat 
                ? 'bg-foreground text-background border-foreground' 
                : 'bg-transparent text-muted border-border hover:border-foreground/40 hover:text-foreground'
            }`}
          >
            {cat}
            {filter === cat && (
              <motion.div 
                layoutId="activeFilter"
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] md:h-1 bg-foreground"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Projects Grid */}
      <div 
        ref={gridRef}
        id="portfolio-grid"
        role="list"
        aria-label="Portfolio projects"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[400px] md:min-h-[600px] bg-background transition-colors duration-500"
      >
        {loading ? (
          <div className="col-span-full py-24 md:py-48 flex flex-col items-center justify-center bg-surface transition-colors duration-500">
            <LottieLoader size={150} mdSize={250} />
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-center text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.5em] text-muted font-bold mt-6 md:mt-8"
            >
              Initializing Cinematic Vault
            </motion.p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => (
            <motion.div 
              layout
              key={project.id}
              role="listitem"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedProject(project)}
              onMouseEnter={(e) => handleMouseEnter(e, project.id)}
              onMouseLeave={handleMouseLeave}
              className={`portfolio-item relative flex items-end p-6 md:p-10 aspect-[4/5] md:aspect-square group cursor-pointer overflow-hidden ${
                i % 2 === 0 ? 'bg-neutral-900 border-r border-b border-white/10' : 'bg-neutral-800 border-r border-b border-white/10 last:border-r-0'
              }`}
            >
              {/* ARIA Description */}
              <span className="sr-only">View project: {project.title} - {project.category}</span>

              {/* Background with Lazy Video and Overlay */}
              <LazyVideo 
                src={project.videoUrl} 
                poster={project.image} 
                isHovered={hoveredProjectId === project.id} 
              />


              {/* Geometric Label */}
              <div className="absolute top-8 left-8 text-[9px] text-white/40 tracking-[0.4em] font-bold uppercase transition-all duration-500 group-hover:text-white group-hover:-translate-y-1">
                0{project.id} // {project.category}
              </div>

              {/* Content */}
              <div className="z-10 w-full flex items-center justify-between pointer-events-none">
                <h3 className="text-base font-bold uppercase tracking-[0.1em] leading-none group-hover:translate-x-2 transition-transform duration-500">
                  {project.title}
                </h3>
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-4 group-hover:translate-x-0">
                  <ExternalLink size={14} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedProject && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/98 backdrop-blur-2xl"
            />
            
            <motion.div 
              layoutId={`project-${selectedProject.id}`}
              initial={{ opacity: 0, scale: 0.95, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ 
                opacity: 0, 
                scale: 0.95, 
                y: 40,
                transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } 
              }}
              transition={{ 
                duration: 0.8, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              onAnimationComplete={() => setIsModalReady(true)}
              className="relative w-full max-w-7xl bg-neutral-950 border border-white/10 overflow-hidden rounded-sm flex flex-col lg:flex-row h-full max-h-[90vh]"
            >
              <button 
                onClick={handleClose}
                aria-label="Close modal"
                className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors bg-black/20 p-2 rounded-full backdrop-blur-sm"
              >
                <X size={24} />
              </button>
 
              <div className="w-full lg:w-3/5 relative bg-black flex items-center justify-center overflow-hidden group/player">
                {selectedProject.vimeoUrl ? (
                  <div className="w-full h-full aspect-video">
                    <iframe 
                      src={selectedProject.vimeoUrl} 
                      className="w-full h-full"
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture" 
                      allowFullScreen
                      title={selectedProject.title}
                    />
                  </div>
                ) : (
                  <video 
                    ref={modalVideoRef}
                    src={selectedProject.videoUrl} 
                    poster={selectedProject.image}
                    controls
                    className="w-full h-full object-contain"
                  />
                )}
                
                {/* Cinema Letterbox Decor */}
                <div className="absolute top-0 left-0 right-0 h-4 bg-black/40 z-10 pointer-events-none transform -translate-y-full group-hover/player:translate-y-0 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/40 z-10 pointer-events-none transform translate-y-full group-hover/player:translate-y-0 transition-transform duration-700" />
              </div>

              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center overflow-y-auto bg-neutral-950">
                <div className="text-[10px] font-bold uppercase tracking-[0.5em] text-neutral-500 mb-6">
                  Case Study // {selectedProject.category}
                </div>
                <h2 id="modal-title" className="text-4xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-none">
                  {selectedProject.title}
                </h2>
                
                <p className="text-neutral-400 text-sm md:text-base leading-relaxed mb-10">
                  {selectedProject.description}
                </p>

                <div className="space-y-10">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-white mb-4 opacity-40">Architecture</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map(t => (
                        <span key={t} className="text-[9px] uppercase tracking-widest px-3 py-1.5 bg-white/5 border border-white/10 text-neutral-400">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedProject.testimonial && (
                    <div className="pt-10 border-t border-white/10">
                      <Quote size={20} className="text-white/20 mb-6" />
                      <p className="text-base italic text-neutral-300 leading-relaxed mb-6 font-light">
                        "{selectedProject.testimonial.text}"
                      </p>
                      <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-500">
                        — {selectedProject.testimonial.author}
                      </div>
                    </div>
                  )}
                </div>
                
                <button className="mt-12 px-10 py-5 bg-white text-black text-[11px] font-black uppercase tracking-[0.4em] hover:bg-neutral-200 transition-all self-start">
                  Visit Project Site
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
