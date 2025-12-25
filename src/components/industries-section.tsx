"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

import { Badge } from "@/components/ui/badge";

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
  // Motion values для отслеживания курсора
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring анимация для плавного движения
  const springX = useSpring(mouseX, { stiffness: 150, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 30 });

  // Трансформация координат в смещение
  const transformX = useTransform(springX, [-0.5, 0.5], ["-8px", "8px"]);
  const transformY = useTransform(springY, [-0.5, 0.5], ["-8px", "8px"]);

  // Scroll-based анимации
  const scale = useTransform(scrollYProgress, ranges[0], [0.5, 1]);
  const blur = useTransform(scrollYProgress, ranges[0], [40, 0]);
  const opacity = useTransform(scrollYProgress, ranges[0], [0, 1]);
  const y = useTransform(scrollYProgress, ranges[1], ["10%", "0%"]);

  const filter = useMotionTemplate`blur(${blur}px)`;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const { clientX, clientY } = e;

      const newX = clientX / innerWidth - 0.5;
      const newY = clientY / innerHeight - 0.5;

      mouseX.set(newX);
      mouseY.set(newY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        y,
        x: transformX,
        translateY: transformY,
        willChange: "transform, opacity, filter",
      }}
      className={className}
    >
      <Badge
        variant="blue"
        className="text-[18px] sm:text-2xl transition-all duration-300"
      >
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
    offset: ["start start", "end end"],
  });

  const badges = [
    {
      id: "telecom",
      className:
        "absolute top-[10%] left-[10%] sm:top-[25%] sm:left-[35%] md:left-[25%]",
      ranges: [
        [0.1, 0.3],
        [0.1, 0.3],
      ] as [number[], number[]],
    },
    {
      id: "cloud",
      className:
        "absolute top-[18%] left-[47%] sm:top-[30%] sm:left-[55%] sm:right-auto md:left-[58%]",
      ranges: [
        [0.15, 0.35],
        [0.15, 0.35],
      ] as [number[], number[]],
    },
    {
      id: "ai",
      className:
        "absolute top-[29%] left-[20%] sm:top-[40%] sm:left-[15%] md:left-[7%]",
      ranges: [
        [0.2, 0.4],
        [0.2, 0.4],
      ] as [number[], number[]],
    },
    {
      id: "engineering",
      className:
        "absolute top-[34%] left-[60%] sm:top-[45%] sm:right-[15%] sm:left-auto md:right-[-10%]",
      ranges: [
        [0.25, 0.45],
        [0.25, 0.45],
      ] as [number[], number[]],
    },
    {
      id: "robotics",
      className:
        "absolute top-[60%] left-[10%] sm:top-[53%] sm:left-[10%] md:left-[-5%]",
      ranges: [
        [0.3, 0.5],
        [0.3, 0.5],
      ] as [number[], number[]],
    },
    {
      id: "blockchain",
      className:
        "absolute top-[65%] left-[65%] sm:top-[70%] sm:left-[20%] sm:right-auto md:left-[20%]",
      ranges: [
        [0.35, 0.55],
        [0.35, 0.55],
      ] as [number[], number[]],
    },
    {
      id: "iot",
      className:
        "absolute top-[70%] left-[22%] sm:top-[65%] sm:right-[20%] sm:left-auto md:right-[0%]",
      ranges: [
        [0.4, 0.6],
        [0.4, 0.6],
      ] as [number[], number[]],
    },
    {
      id: "security",
      className:
        "absolute top-[80%] left-[50%] -translate-x-1/2 sm:top-[70%] sm:left-[58%] sm:translate-x-0 md:left-[55%]",
      ranges: [
        [0.45, 0.65],
        [0.45, 0.65],
      ] as [number[], number[]],
    },
  ];

  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const titleScale = useTransform(scrollYProgress, [0, 0.1], [0.9, 1]);

  return (
    <section
      id="industries"
      ref={containerRef}
      className="relative bg-[#101823] text-center h-[400vh]"
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
            <Trans
              i18nKey="industries.title"
              components={{
                blue: (
                  <span className="bg-gradient-to-r from-[#0075EB] to-[#35A4FF] bg-clip-text text-transparent" />
                ),
                br: <br />,
              }}
            />
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
