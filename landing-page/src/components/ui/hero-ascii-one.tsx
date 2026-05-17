'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NavHeader from './nav-header';

export default function AnimationPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const embedScript = document.createElement('script');
    embedScript.type = 'text/javascript';
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement('style');
    style.textContent = `
      [data-us-project] {
        position: relative !important;
        overflow: hidden !important;
      }
      
      [data-us-project] canvas {
        clip-path: inset(0 0 10% 0) !important;
      }
      
      [data-us-project] * {
        pointer-events: none !important;
      }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const selectors = [
        '[data-us-project]',
        '[data-us-project="OMzqyUv6M3kSnv0JeAtC"]',
        '.unicorn-studio-container',
        'canvas[aria-label*="Unicorn"]'
      ];
      
      selectors.forEach(selector => {
        const containers = document.querySelectorAll(selector);
        containers.forEach(container => {
          const allElements = container.querySelectorAll('*');
          allElements.forEach(el => {
            const htmlEl = el as HTMLElement;
            const text = (htmlEl.textContent || '').toLowerCase();
            const title = (htmlEl.getAttribute('title') || '').toLowerCase();
            const href = (htmlEl.getAttribute('href') || '').toLowerCase();
            
            if (
              text.includes('made with') || 
              text.includes('unicorn') ||
              title.includes('made with') ||
              title.includes('unicorn') ||
              href.includes('unicorn.studio')
            ) {
              htmlEl.style.display = 'none';
              htmlEl.style.visibility = 'hidden';
              htmlEl.style.opacity = '0';
              htmlEl.style.pointerEvents = 'none';
              htmlEl.style.position = 'absolute';
              htmlEl.style.left = '-9999px';
              htmlEl.style.top = '-9999px';
              try { htmlEl.remove(); } catch(e) {}
            }
          });
        });
      });
    };

    hideBranding();
    const interval = setInterval(hideBranding, 50);
    
    setTimeout(hideBranding, 500);
    setTimeout(hideBranding, 1000);
    setTimeout(hideBranding, 2000);
    setTimeout(hideBranding, 5000);
    setTimeout(hideBranding, 10000);

    // Force re-init on client-side nav
    const initTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.UnicornStudio) {
        window.UnicornStudio.isInitialized = false;
        if (typeof UnicornStudio !== 'undefined' && UnicornStudio.init) {
          UnicornStudio.init();
        }
        window.UnicornStudio.isInitialized = true;
      }
    }, 200);

    return () => {
      clearInterval(interval);
      clearTimeout(initTimer);
      document.head.removeChild(embedScript);
      document.head.removeChild(style);
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-black">
      <div className="absolute inset-0 w-full h-full hidden lg:block">
        <div 
          data-us-project="OMzqyUv6M3kSnv0JeAtC" 
          style={{ width: '100vw', height: '100vh' }}
        />
      </div>

      <div className="absolute inset-0 w-full h-full lg:hidden stars-bg"></div>

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none z-[5]"></div>
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-[5]"></div>

      <div className={`absolute top-6 left-0 right-0 z-20 px-6 lg:px-10 flex items-center justify-between transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="flex flex-col gap-1.5 pointer-events-auto">
          <div className="font-mono text-white text-lg lg:text-xl font-medium tracking-[0.25em] uppercase">
            Aryan Sharma
          </div>
          <span className="text-white/40 text-[10px] lg:text-[11px] font-mono tracking-[0.2em] uppercase">Student · Photographer</span>
        </div>

        <div className="hidden lg:flex flex-col items-end gap-1 text-[9px] font-mono text-white/40 pointer-events-auto tracking-wider">
          <span>27.0360° N</span>
          <span>88.2627° E</span>
        </div>
      </div>

      <div className={`absolute top-6 left-0 right-0 z-20 flex justify-center pointer-events-none transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
        <div className="pointer-events-auto">
          <NavHeader />
        </div>
      </div>

      <div className={`absolute top-3 left-3 lg:top-5 lg:left-5 w-6 h-6 lg:w-8 lg:h-8 z-20 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="absolute top-0 left-0 w-3 h-px bg-white/40"></div>
        <div className="absolute top-0 left-0 w-px h-3 bg-white/40"></div>
      </div>
      <div className={`absolute top-3 right-3 lg:top-5 lg:right-5 w-6 h-6 lg:w-8 lg:h-8 z-20 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="absolute top-0 right-0 w-3 h-px bg-white/40"></div>
        <div className="absolute top-0 right-0 w-px h-3 bg-white/40"></div>
      </div>
      <div className={`absolute left-3 lg:left-5 z-20 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ bottom: 'calc(5vh + 12px)' }}>
        <div className="absolute bottom-0 left-0 w-3 h-px bg-white/40"></div>
        <div className="absolute bottom-0 left-0 w-px h-3 bg-white/40"></div>
      </div>
      <div className={`absolute right-3 lg:right-5 z-20 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ bottom: 'calc(5vh + 12px)' }}>
        <div className="absolute bottom-0 right-0 w-3 h-px bg-white/40"></div>
        <div className="absolute bottom-0 right-0 w-px h-3 bg-white/40"></div>
      </div>

      <div className="relative z-10 flex h-screen items-center justify-end pt-16 lg:pt-0">
        <div className="w-full lg:w-1/2 px-6 lg:px-16 lg:pr-[12%]">
          <div className="max-w-lg relative lg:ml-auto">
            <div className={`transition-all duration-700 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-px bg-white/40"></div>
                <span className="text-white/60 text-[10px] font-mono tracking-[0.3em] uppercase">Est. 2007</span>
              </div>
            </div>

            <div className={`relative transition-all duration-700 delay-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 
                className="text-2xl sm:text-3xl lg:text-5xl font-light text-white mb-4 leading-[1.1] font-mono whitespace-nowrap" 
                style={{ 
                  letterSpacing: '0.2em',
                }}
              >
                PORTFOLIO
              </h1>
              <div className="w-16 h-px bg-gradient-to-r from-white/40 to-transparent mb-8"></div>
            </div>

            <div className={`relative transition-all duration-700 delay-[900ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <p className="text-[11px] lg:text-[13px] text-white/50 mb-12 leading-[1.8] font-mono max-w-sm">
                Not chasing perfection — chasing evolution.
                <br />
                Every project is a reflection of the process: deliberate, relentless, unfinished.
              </p>
            </div>

            <div className={`flex flex-row gap-3 lg:gap-4 transition-all duration-700 delay-[1100ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button onClick={() => router.push('/climb')} className="relative overflow-hidden px-5 lg:px-6 py-2.5 bg-white text-black font-mono text-[10px] lg:text-xs tracking-[0.15em] uppercase hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_24px_rgba(255,255,255,0.15)] transition-all duration-300 ease-out group idle-pulse">
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-glow"></span>
                <span className="relative flex items-center gap-2">
                  <span className="inline-block">Begin the climb</span>
                  <span className="inline-block translate-x-0 opacity-70 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-out arrow-slide">→</span>
                </span>
              </button>
              
              <button onClick={() => window.open('https://aryansharmaportolio.my.canva.site/', '_blank')} className="relative px-5 lg:px-6 py-2.5 bg-transparent border border-white/30 text-white font-mono text-[10px] lg:text-xs tracking-[0.15em] uppercase hover:border-white/60 hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(255,255,255,0.06)] transition-all duration-300 ease-out group">
                <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border-travel"></span>
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/0 group-hover:border-white/40 transition-all duration-300 ease-out -translate-x-0.5 -translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/0 group-hover:border-white/40 transition-all duration-300 ease-out translate-x-0.5 -translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/0 group-hover:border-white/40 transition-all duration-300 ease-out -translate-x-0.5 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/0 group-hover:border-white/40 transition-all duration-300 ease-out translate-x-0.5 translate-y-0.5 group-hover:translate-x-0 group-hover:translate-y-0"></span>
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-black text-[9px] font-mono whitespace-nowrap opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none tracking-normal normal-case">
                  visit old site
                </span>
                <span className="relative flex items-center gap-2">
                  <span className="inline-block group-hover:glitch-text">Enter archive</span>
                  <span className="inline-block translate-x-0 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all duration-300 ease-out arrow-slide">↗</span>
                </span>
              </button>
            </div>

            <div className={`hidden lg:flex items-center gap-3 mt-12 transition-all duration-700 delay-[1300ms] ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-white/20 text-[8px] font-mono tracking-[0.3em]">SISYPHUS</span>
              <div className="w-px h-3 bg-white/20"></div>
              <span className="text-white/20 text-[8px] font-mono tracking-[0.3em]">PROTOCOL</span>
            </div>
          </div>
        </div>
      </div>

      <div className={`absolute left-0 right-0 z-20 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ bottom: '5vh' }}>
        <div className="mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-6 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS</span>
            <div className="hidden lg:flex gap-1 items-end">
              {Array.from({ length: 8 }).map((_, i) => (
                <div 
                  key={i} 
                  className="w-0.5 bg-white/30 eq-bar"
                  style={{ 
                    animationDelay: `${i * 0.12}s`,
                    animationDuration: `${0.5 + (i * 0.07) % 0.6}s`,
                  }}
                ></div>
              ))}
            </div>
            <span className="text-white/40">V2.0.0</span>
          </div>
          
          <div className="flex items-center gap-3 lg:gap-4 text-[8px] lg:text-[9px] font-mono text-white/30 tracking-wider">
            <span className="hidden lg:inline">RENDERING</span>
            <div className="flex gap-1.5">
              <div className="w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              <div className="w-1 h-1 bg-white/15 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
            </div>
            <span className="hidden lg:inline">FRAME: ∞</span>
          </div>
        </div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      <style jsx>{`
        .stars-bg {
          background-image: 
            radial-gradient(1px 1px at 20% 30%, white, transparent),
            radial-gradient(1px 1px at 60% 70%, white, transparent),
            radial-gradient(1px 1px at 50% 50%, white, transparent),
            radial-gradient(1px 1px at 80% 10%, white, transparent),
            radial-gradient(1px 1px at 90% 60%, white, transparent),
            radial-gradient(1px 1px at 33% 80%, white, transparent),
            radial-gradient(1px 1px at 15% 60%, white, transparent),
            radial-gradient(1px 1px at 70% 40%, white, transparent);
          background-size: 200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%;
          background-position: 0% 0%, 40% 40%, 60% 60%, 20% 20%, 80% 80%, 30% 30%, 70% 70%, 50% 50%;
          opacity: 0.3;
        }

        @keyframes eq-bar {
          0%, 100% { height: 3px; }
          50% { height: 12px; }
        }
        .eq-bar {
          animation: eq-bar 0.8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes idle-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
          50% { box-shadow: 0 0 8px 1px rgba(255,255,255,0.08); }
        }
        .idle-pulse {
          animation: idle-pulse 3s ease-in-out infinite;
        }
        .group:hover .idle-pulse {
          animation: none;
        }

        @keyframes border-glow {
          0%, 100% { box-shadow: inset 0 0 8px rgba(255,255,255,0); }
          50% { box-shadow: inset 0 0 12px rgba(255,255,255,0.1); }
        }
        .border-glow {
          animation: border-glow 2s ease-in-out infinite;
        }

        @keyframes arrow-slide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(2px); }
        }
        .group:hover .arrow-slide {
          animation: arrow-slide 0.8s ease-in-out infinite;
        }

        @keyframes border-travel {
          0% { clip-path: inset(0 100% 100% 0); }
          25% { clip-path: inset(0 0 100% 0); }
          50% { clip-path: inset(0 0 0 0); }
          75% { clip-path: inset(0 0 0 100%); }
          100% { clip-path: inset(0 100% 100% 0); }
        }
        .border-travel::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: border-travel 2s linear infinite;
        }

        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); text-shadow: none; }
          20% { transform: translate(-1px, 1px); text-shadow: 1px -1px rgba(255,255,255,0.1); }
          40% { transform: translate(1px, -1px); text-shadow: -1px 1px rgba(255,255,255,0.05); }
          60% { transform: translate(-1px, -1px); text-shadow: 1px 1px rgba(255,255,255,0.1); }
          80% { transform: translate(1px, 1px); text-shadow: -1px -1px rgba(255,255,255,0.05); }
        }
        .group:hover .glitch-text {
          animation: glitch-1 0.4s ease infinite;
        }
      `}</style>
    </main>
  );
}
