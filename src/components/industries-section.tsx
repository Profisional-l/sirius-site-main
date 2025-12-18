'use client';
import { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from 'framer-motion';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

function ParallaxBox({
  children,
  className,
  ...rest
}: HTMLMotionProps<"div">) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x, { stiffness: 150, damping: 30 });
  const ySpring = useSpring(y, { stiffness: 150, damping: 30 });

  const transformX = useTransform(xSpring, [-0.5, 0.5], ['-10px', '10px']);
  const transformY = useTransform(ySpring, [-0.5, 0.5], ['-10px', '10px']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = e;

      const newX = clientX / innerWidth - 0.5;
      const newY = clientY / innerHeight - 0.5;

      x.set(newX);
      y.set(newY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [x, y]);

  return (
    <motion.div
      style={{
        transform: 'perspective(1000px)',
        x: transformX,
        y: transformY,
      }}
      className={cn('transition-transform', className)}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="py-28 sm:py-32 bg-[#101823] text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="dots-pattern"></div>
      </div>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative flex justify-center items-center h-[500px] sm:h-[400px]">
          <h2 className="absolute font-mono text-[42px] md:text-[68px] font-bold text-white uppercase">
            Industries
          </h2>

          <div className="absolute w-full h-full">
            {/* Telecom */}
            <ParallaxBox className="absolute top-[18%] left-[18%] sm:top-[10%] sm:left-[35%]">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Telecom</Badge>
            </ParallaxBox>
            {/* Cloud-service */}
            <ParallaxBox className="absolute top-[28%] right-[25%] sm:top-[15%] sm:left-[55%] sm:right-auto">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Cloud-service</Badge>
            </ParallaxBox>
            {/* AI */}
            <ParallaxBox className="absolute top-[38%] left-[10%] sm:top-[45%] sm:left-[15%]">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">AI</Badge>
            </ParallaxBox>
            {/* Engineering */}
            <ParallaxBox className="absolute top-[48%] right-[15%] sm:top-[45%] sm:right-[15%] sm:left-auto">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Engineering</Badge>
            </ParallaxBox>
            {/* Robotics */}
            <ParallaxBox className="absolute top-[58%] left-[18%] sm:top-[65%] sm:left-[10%]">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Robotics</Badge>
            </ParallaxBox>
            {/* Blockchain */}
            <ParallaxBox className="absolute top-[68%] right-[25%] sm:top-[85%] sm:left-[20%] sm:right-auto">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Blockchain</Badge>
            </ParallaxBox>
            {/* IoT */}
            <ParallaxBox className="absolute top-[78%] left-[28%] sm:top-[65%] sm:right-[20%] sm:left-auto">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">IoT</Badge>
            </ParallaxBox>
            {/* Security systems */}
            <ParallaxBox className="absolute top-[88%] left-1/2 -translate-x-1/2 sm:top-[85%] sm:left-[58%] sm:translate-x-0">
              <Badge variant="blue" className="text-lg sm:text-base transition-all duration-300">Security systems</Badge>
            </ParallaxBox>
          </div>
        </div>
      </div>
    </section>
  );
}
