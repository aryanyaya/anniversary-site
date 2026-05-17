"use client"; 

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <nav className="relative">
      <ul
        className="relative mx-auto flex w-fit items-center rounded-full px-[3px] py-[3px]"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 100%),
            linear-gradient(0deg, rgba(255,255,255,0.06) 0%, transparent 50%)
          `,
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.35),
            0 2px 8px rgba(0,0,0,0.2),
            inset 0 1px 0 rgba(255,255,255,0.15),
            inset 0 -1px 0 rgba(255,255,255,0.05)
          `,
        }}
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
        <div
          className="flex items-center rounded-full px-1 py-0.5"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderRadius: "inherit",
          }}
        >
          <Tab setPosition={setPosition} index={0} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>About me</Tab>
          <Tab setPosition={setPosition} index={1} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>My philosophy</Tab>
          <Tab setPosition={setPosition} index={2} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>Work</Tab>
          <Tab setPosition={setPosition} index={3} activeIndex={activeIndex} setActiveIndex={setActiveIndex}>Contact</Tab>

          <Cursor position={position} />
        </div>
      </ul>
    </nav>
  );
}

const Tab = ({
  children,
  setPosition,
  index,
  activeIndex,
  setActiveIndex,
}: {
  children: React.ReactNode;
  setPosition: any;
  index: number;
  activeIndex: number | null;
  setActiveIndex: (i: number | null) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);
  
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      onClick={() => setActiveIndex(activeIndex === index ? null : index)}
      className={`
        relative z-10 block cursor-pointer px-4 py-2 text-[11px] font-mono uppercase tracking-[0.12em]
        transition-colors duration-300 ease-out
        md:px-5 md:py-2.5 md:text-xs
      `}
      style={{
        color: activeIndex === index ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.65)",
      }}
    >
      <span className="relative">
        {children}
        <AnimatePresence>
          {activeIndex === index && (
            <motion.span
              layoutId="active-dot"
              className="absolute -bottom-1 left-1/2 h-px w-3 -translate-x-1/2"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)",
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>
      </span>
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      transition={{ 
        type: "spring", 
        stiffness: 350, 
        damping: 35, 
        mass: 0.6,
        restDelta: 0.001
      }}
      className="absolute z-0 top-1 h-7 rounded-full md:h-8"
      style={{
        background: `
          linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 100%)
        `,
        backdropFilter: "blur(20px) saturate(150%)",
        WebkitBackdropFilter: "blur(20px) saturate(150%)",
        boxShadow: `
          0 2px 8px rgba(0,0,0,0.15),
          inset 0 1px 0 rgba(255,255,255,0.2),
          inset 0 -1px 0 rgba(255,255,255,0.05)
        `,
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    />
  );
};

export default NavHeader;
