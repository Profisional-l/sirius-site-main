'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { Badge } from '@/components/ui/badge';

interface AnimatedBadgeProps {
  scrollYProgress: any;
  ranges: [number[], number[]];
  children: React.ReactNode;
  className?: string;
}

function AnimatedBadge({
  scrollYProgress,
  ranges,
  children,
  className,
}: AnimatedBadgeProps) {
  const opacity = useTransform(scrollYProgress, ranges[0], [0, 1]);
  const blur = useTransform(scrollYProgress, ranges[0], [20, 0]);
  const scale = useTransform(scrollYProgress, ranges[1], [0.8, 1]);
  const y = useTransform(scrollYProgress, ranges[1], ['10%', '0%']);


  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        y,
        willChange: 'transform, opacity, filter',
      }}
      className={className}
    >
      <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">
        {children}
      </Badge>
    </motion.div>
  );
}

export function IndustriesSection() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });
  
  const badges = [
    { id: 'telecom', className: 'absolute top-[20%] left-[15%]', ranges: [[0.05, 0.15], [0.05, 0.15]] as [number[], number[]] },
    { id: 'cloud', className: 'absolute top-[10%] right-[20%]', ranges: [[0.15, 0.25], [0.15, 0.25]] as [number[], number[]] },
    { id: 'ai', className: 'absolute top-[40%] right-[10%]', ranges: [[0.25, 0.35], [0.25, 0.35]] as [number[], number[]] },
    { id: 'engineering', className: 'absolute top-[55%] left-[25%]', ranges: [[0.35, 0.45], [0.35, 0.45]] as [number[], number[]] },
    { id: 'robotics', className: 'absolute top-[70%] left-[10%]', ranges: [[0.45, 0.55], [0.45, 0.55]] as [number[], number[]] },
    { id: 'blockchain', className: 'absolute top-[80%] right-[25%]', ranges: [[0.55, 0.65], [0.55, 0.65]] as [number[], number[]] },
    { id: 'iot', className: 'absolute top-[35%] left-[45%]', ranges: [[0.65, 0.75], [0.65, 0.75]] as [number[], number[]] },
    { id: 'security', className: 'absolute top-[65%] right-[40%]', ranges: [[0.75, 0.85], [0.75, 0.85]] as [number[], number[]] },
  ];

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1.0], [0, 1, 1, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);


  return (
    <section
      id="industries"
      ref={containerRef}
      className="relative bg-[#101823] text-center h-[300vh]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="dots-pattern"></div>
        </div>

        <div className="relative z-10 h-full flex justify-center items-center">
            <motion.h2
              style={{ opacity: titleOpacity, scale: titleScale }}
              className="absolute font-mono text-[42px] md:text-[68px] font-bold text-white uppercase"
            >
              <span className="bg-gradient-to-r from-[#0075EB] to-[#35A4FF] bg-clip-text text-transparent">
                {t('industries.title')}
              </span>
            </motion.h2>

            <div className="w-full max-w-4xl h-full relative">
                 {badges.map((badge) => (
                    <AnimatedBadge
                        key={badge.id}
                        scrollYProgress={scrollYProgress}
                        ranges={badge.ranges}
                        className={badge.className}
                    >
                        {t(`industries.${badge.id}`)}
                    </AnimatedBadge>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
}
