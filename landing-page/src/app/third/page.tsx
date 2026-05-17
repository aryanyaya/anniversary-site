'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ThirdPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-neutral-950">
      {/* Background Paths */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* UI Layer */}
      <div className="fixed inset-0 z-[10000] pointer-events-none">
        <div className={`absolute top-6 left-6 lg:top-8 lg:left-8 transition-all duration-700 pointer-events-auto ${loaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <button 
            onClick={() => router.push('/climb')}
            className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors duration-300 font-mono text-[10px] tracking-[0.2em] uppercase"
          >
            <span className="inline-block group-hover:-translate-x-1 transition-transform duration-300">←</span>
            <span>Back</span>
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-center pointer-events-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-8 h-px bg-white/30"></div>
              <span className="text-white/60 text-[10px] font-mono tracking-[0.35em] uppercase">Page Three</span>
              <div className="w-8 h-px bg-white/30"></div>
            </div>
            <h1 
              className="text-3xl sm:text-4xl lg:text-6xl font-light text-white mb-6 leading-none font-mono whitespace-nowrap" 
              style={{ letterSpacing: '0.2em', textShadow: '0 0 40px rgba(255,255,255,0.2)' }}
            >
              PAGE THREE
            </h1>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mb-8"></div>
            <p className="text-[12px] lg:text-[14px] text-white/60 leading-[1.8] font-mono max-w-sm mx-auto">
              Same background, new content.
              <br />
              The paths continue upward.
            </p>
          </motion.div>
        </div>

        <div className={`absolute left-0 right-0 transition-all duration-700 delay-500 pointer-events-auto ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ bottom: '5vh' }}>
          <div className="mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
              <span>CONTINUING</span>
              <div className="flex gap-1.5">
                <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                <div className="w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
              <span>DEPTH: 3</span>
            </div>
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
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
