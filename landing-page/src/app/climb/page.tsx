'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

export default function ClimbPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [phase, setPhase] = useState<'page2' | 'page3'>('page2');

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      setPhase('page3');
    }, 3000);
    return () => clearTimeout(redirectTimer);
  }, []);

  const exitTransition = { opacity: 0, filter: 'blur(8px)', y: -16 };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-neutral-950">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      {/* Background Paths - runs continuously, never resets */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* UI Layer */}
      <div className="fixed inset-0 z-[10000] pointer-events-none">
        <div className={`absolute top-6 left-6 lg:top-8 lg:left-8 transition-all duration-700 pointer-events-auto ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <button 
            onClick={() => router.push('/')}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 font-mono text-[10px] tracking-[0.2em] uppercase"
          >
            <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Back</span>
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence mode="wait">
            {phase === 'page2' ? (
              <motion.div
                key="page2"
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                animate={loaded ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
                exit={exitTransition}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="text-center pointer-events-auto"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-8 h-px bg-white/30"></div>
                  <span className="text-white/60 text-[10px] font-mono tracking-[0.35em] uppercase">The Journey</span>
                  <div className="w-8 h-px bg-white/30"></div>
                </div>
                <h1 
                  className="text-3xl sm:text-4xl lg:text-6xl font-light text-white mb-6 leading-none font-mono whitespace-nowrap" 
                  style={{ letterSpacing: '0.2em', textShadow: '0 0 40px rgba(255,255,255,0.2)' }}
                >
                  THE CLIMB
                </h1>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"></div>
                <p className="text-[12px] lg:text-[14px] text-white/60 leading-[1.8] font-mono max-w-sm mx-auto">
                  Every step upward is a step inward.
                  <br />
                  The mountain doesn&apos;t care about your speed — only your direction.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="page3"
                initial={{ opacity: 0, filter: 'blur(8px)', y: 16 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                exit={exitTransition}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
                className="w-full flex items-center justify-center px-8 lg:px-16 pt-8"
              >
                {/* About Me - Top Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="absolute top-8 left-8 lg:top-10 lg:left-10"
                >
                  <h2 className="text-white font-bold text-xl lg:text-2xl font-mono tracking-[0.15em] uppercase">
                    About Me
                  </h2>
                  <motion.div 
                    className="w-12 h-0.5 bg-white/40 mt-2"
                    animate={{ width: ['48px', '64px', '48px'], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.div>

                {/* Main Content */}
                <div className="flex flex-row items-center gap-16 lg:gap-24 w-full justify-center pointer-events-auto">
                  {/* Photo with Card Flip - Left side */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex-shrink-0"
                    style={{ animation: 'float 6s ease-in-out infinite' }}
                  >
                    <FlipCard />
                  </motion.div>

                  {/* Bio Text - Right side */}
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-left"
                    style={{ maxWidth: '520px' }}
                  >
                    <p className="text-[18px] lg:text-[20px] text-white/85 leading-[1.7] font-mono mb-5 font-medium">
                      I&apos;m an aspiring designer and photographer exploring the intersection of visuals, motion, and storytelling.
                    </p>
                    <p className="text-[18px] lg:text-[20px] text-white/70 leading-[1.7] font-mono mb-5">
                      Influenced by drawing and photography, I approach design through observation and precision — crafting experiences that feel intentional, atmospheric, and alive.
                    </p>
                    <p className="text-[18px] lg:text-[20px] text-white/55 leading-[1.7] font-mono mb-8">
                      Every project is an experiment in composition, emotion, and iteration.
                    </p>

                    {/* Fluent in apps */}
                    <motion.div 
                      className="flex items-center gap-4 mb-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <motion.div 
                        className="w-10 h-px bg-white/20"
                        animate={{ scaleX: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        style={{ transformOrigin: 'right center' }}
                      />
                      <span className="text-white/30 text-[11px] font-mono tracking-[0.25em] uppercase">Fluent in</span>
                      <motion.div 
                        className="w-10 h-px bg-white/20"
                        animate={{ scaleX: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                        style={{ transformOrigin: 'left center' }}
                      />
                    </motion.div>
                    
                    <div className="flex items-center gap-6 flex-wrap mt-4">
                      <AppIcon 
                        name="Antigravity"
                        color="#4285F4"
                        delay={0.9}
                        src="/antigravity.svg"
                      />
                      <AppIcon 
                        name="Lightroom"
                        color="#31A8FF"
                        delay={1.0}
                        svg={
                          <svg viewBox="0 0 64 64" className="w-8 h-8">
                            <rect width="64" height="64" rx="14" fill="#0E1D31"/>
                            <text x="32" y="46" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36" fill="#31A8FF">Lr</text>
                          </svg>
                        }
                      />
                      <AppIcon 
                        name="After Effects"
                        color="#9999FF"
                        delay={1.1}
                        svg={
                          <svg viewBox="0 0 64 64" className="w-8 h-8">
                            <rect width="64" height="64" rx="14" fill="#1F0D3D"/>
                            <text x="32" y="46" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="36" fill="#9999FF">Ae</text>
                          </svg>
                        }
                      />
                      <AppIcon 
                        name="DaVinci Resolve"
                        color="#E06B29"
                        delay={1.2}
                        src="/davinci-resolve.svg"
                      />
                      <AppIcon 
                        name="Canva"
                        color="#7D2AE8"
                        delay={1.3}
                        src="/canva.svg"
                        size="lg"
                      />
                      <AppIcon 
                        name="Anthropic"
                        color="#D4A574"
                        delay={1.4}
                        src="/anthropic.svg"
                      />
                    </div>
                  </motion.div>

                  {/* View Thinking Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      scale: 1,
                      boxShadow: [
                        '0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0)',
                        '0 0 20px rgba(255,255,255,0.12), 0 0 40px rgba(255,255,255,0.06)',
                        '0 0 0px rgba(255,255,255,0), 0 0 0px rgba(255,255,255,0)',
                      ],
                    }}
                    transition={{ 
                      opacity: { duration: 0.6, delay: 5 },
                      y: { duration: 0.6, delay: 5 },
                      scale: { duration: 0.6, delay: 5 },
                      boxShadow: { duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 5.5 },
                    }}
                    className="font-mono tracking-[0.2em] uppercase pointer-events-auto cursor-pointer"
                    style={{
                      position: 'absolute',
                      bottom: '-110px',
                      right: 'calc(24px + 110px)',
                      padding: '16px 28px',
                      borderRadius: '14px',
                      fontSize: '13px',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
                      border: '1px solid rgba(255,255,255,0.25)',
                      color: 'rgba(255,255,255,0.9)',
                      textShadow: '0 0 20px rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(12px)',
                      transition: 'all 0.35s ease-out',
                    }}
                    whileHover={{ 
                      scale: 1.1, 
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.22), rgba(255,255,255,0.1))', 
                      color: 'rgba(255,255,255,1)', 
                      boxShadow: '0 0 32px rgba(255,255,255,0.2), 0 0 64px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)',
                      borderColor: 'rgba(255,255,255,0.4)',
                      textShadow: '0 0 30px rgba(255,255,255,0.5)',
                    }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <motion.span
                      animate={{ opacity: [0.85, 1, 0.85] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      View Thinking
                    </motion.span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'page2' ? (
            <motion.div
              key="status2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className={`absolute left-0 right-0 transition-all duration-700 delay-500 pointer-events-auto`}
              style={{ bottom: '5vh' }}
            >
              <div className="mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
                  <span>ASCENDING</span>
                  <div className="flex gap-1.5">
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
                  <span>ELEVATION: ∞</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </motion.div>
          ) : (
            <motion.div
              key="status3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className={`absolute left-0 right-0 transition-all duration-700 delay-500 pointer-events-auto`}
              style={{ bottom: '5vh' }}
            >
              <div className="mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
                  <span>ARYAN SHARMA</span>
                  <div className="flex gap-1.5">
                    <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                    <div className="w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
                  <span>DESIGNER · PHOTOGRAPHER</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-white"
                viewBox="-400 -200 1100 1100"
                preserveAspectRatio="none"
                fill="none"
                shapeRendering="geometricPrecision"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.id === 0 ? 0.5 : path.id * 0.03}
                        strokeOpacity={0.08 + path.id * 0.02}
                        initial={{ pathLength: 0.3, opacity: 0.4 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.2, 0.5, 0.2],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

function FlipCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    
    if (mouseX < centerX) {
      setFlipDirection('left');
    } else {
      setFlipDirection('right');
    }
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleClick = useCallback(() => {
    setIsFlipped(prev => !prev);
    setIsHovered(false);
  }, []);

  const rotateY = isFlipped 
    ? 180 
    : (isHovered ? (flipDirection === 'left' ? -15 : 15) : 0);

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer"
      style={{ perspective: '1000px' }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative"
        style={{
          width: '300px',
          height: '380px',
          transformStyle: 'preserve-3d',
        }}
        animate={{ rotateY }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front - Photo */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-full h-full overflow-hidden rounded-sm relative group">
            <img 
              src="/photo-main.jpeg" 
              alt="Aryan Sharma"
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 border border-white/10 rounded-sm group-hover:border-white/25 transition-colors duration-500"></div>
            <div className="absolute -bottom-3 -right-3 w-full h-full border border-white/5 rounded-sm -z-10 group-hover:-bottom-4 group-hover:-right-4 transition-all duration-500"></div>
          </div>
        </div>

        {/* Back - Flipped side */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="w-full h-full bg-neutral-900 rounded-sm border border-white/10 flex items-center justify-center p-8">
            <div className="text-center">
              <div className="w-16 h-px bg-white/30 mx-auto mb-6"></div>
              <p className="text-white/60 text-[13px] font-mono leading-[1.8] mb-4">
                &ldquo;Design is not just what it looks like. Design is how it works.&rdquo;
              </p>
              <div className="w-16 h-px bg-white/30 mx-auto"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function AppIcon({ name, color, delay, svg, src, size }: { name: string; color: string; delay: number; svg?: React.ReactNode; src?: string; size?: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center cursor-pointer relative overflow-hidden"
        style={{ 
          background: hovered 
            ? `linear-gradient(135deg, ${color}15, white)` 
            : 'white',
          border: `1px solid ${hovered ? `${color}50` : 'rgba(255,255,255,0.15)'}`,
          transition: 'all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          boxShadow: hovered
            ? `0 4px 20px ${color}25, 0 0 40px ${color}10, inset 0 1px 0 ${color}15`
            : [`0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`, `0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`],
        }}
        animate={{ 
          scale: hovered ? 1.08 : 1, 
          y: hovered ? -4 : 0,
          rotate: hovered ? 2 : 0,
          boxShadow: hovered
            ? `0 4px 20px ${color}25, 0 0 40px ${color}10, inset 0 1px 0 ${color}15`
            : [`0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`, `0 2px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)`],
        }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${color}15 45%, ${color}25 50%, ${color}15 55%, transparent 60%)`,
          }}
          animate={hovered ? { x: ['-100%', '100%'] } : { x: '-100%' }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />
        
        {/* Icon */}
        <motion.div
          style={{ color }}
          animate={{ 
            scale: hovered ? 1.15 : (size === 'lg' ? 1.25 : 1),
            filter: hovered ? `drop-shadow(0 0 6px ${color}60)` : 'none',
          }}
          transition={{ duration: 0.3 }}
          className={size === 'lg' ? 'w-8 h-8 relative z-10' : 'w-6 h-6 relative z-10'}
        >
          {src ? (
            <img src={src} alt={name} className="w-full h-full object-contain" />
          ) : (
            svg
          )}
        </motion.div>
      </motion.div>
      
      {/* Tooltip */}
      <motion.div
        className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-md whitespace-nowrap"
        style={{
          background: 'rgba(0,0,0,0.8)',
          border: `1px solid ${color}30`,
          backdropFilter: 'blur(8px)',
        }}
        initial={{ opacity: 0, y: 6, scale: 0.95 }}
        animate={hovered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.95 }}
        transition={{ duration: 0.2 }}
      >
        <span className="text-[10px] font-mono tracking-wider" style={{ color }}>{name}</span>
      </motion.div>
    </motion.div>
  );
}
