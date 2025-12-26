"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useMotionTemplate } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

export function MissionAnimation() {
  const { t } = useTranslation();
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Более широкие и плавные диапазоны для opacity с перекрытием
  const opacity1 = useTransform(
    scrollYProgress,
    [0.2, 0.3, 0.5, 0.6], // Более широкий диапазон
    [1, 1, 0, 0]           // Плавнее исчезает
  );

  const opacity2 = useTransform(
    scrollYProgress,
    [0.4, 0.5, 0.7, 0.8], // Более широкий диапазон
    [0, 0, 1, 1]           // Плавнее появляется
  );

  // Размытие с более плавным переходом
  const blur1 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.55], // Более широкий диапазон
    [0, 0, 8, 20]              // Сначала небольшое, потом сильное размытие
  );

  const blur2 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.65, 0.75], // Более широкий диапазон
    [20, 8, 0, 0]              // Сначала сильное, потом исчезает размытие
  );

  // Эффект уменьшения/увеличения для глубины
  const scale1 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.55],
    [1, 1, 0.98, 0.95] // Легкое уменьшение
  );

  const scale2 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.65, 0.75],
    [0.95, 0.98, 1, 1] // Легкое увеличение
  );

  // Параллакс эффект для плавного смещения
  const y1 = useTransform(
    scrollYProgress,
    [0.25, 0.35, 0.45, 0.55],
    [0, 0, -15, -30] // Плавное поднятие вверх
  );

  const y2 = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.65, 0.75],
    [30, 15, 0, 0] // Плавное опускание вниз
  );

  // Создаем строки CSS filter
  const filter1 = useMotionTemplate`blur(${blur1}px)`;
  const filter2 = useMotionTemplate`blur(${blur2}px)`;

  return (
    <div ref={container} className="relative h-[400vh] pb-40"> {/* Увеличенная высота для более плавного скролла */}
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <h2 className="space-mono-regular uppercase text-[#F0F2F7] opacity-40 text-[18px] leading-[1.47] tracking-normal mb-[340px] md:mb-[430px]">
          {t('mission.title')}
        </h2>
        
        {/* Первый текст */}
        <motion.div
          style={{
            opacity: opacity1,
            filter: filter1,
            scale: scale1,
            y: y1,
            willChange: "opacity, filter, transform",
          }}
          className="absolute font-headline font-medium text-[28px] lg:text-[56px] max-w-[330px] md:max-w-4xl mx-auto leading-[1.26] tracking-tight text-center transform-gpu"
        >
          <Trans
            i18nKey="mission.text1"
            components={{
              blue: <span className="text-primary" />,
              br: <br className="md:hidden" />,
            }}
          />
        </motion.div>
        
        {/* Второй текст */}
        <motion.div
          style={{
            opacity: opacity2,
            filter: filter2,
            scale: scale2,
            y: y2,
            willChange: "opacity, filter, transform",
          }}
          className="absolute font-headline font-medium text-[28px] lg:text-[56px] max-w-[330px] md:max-w-[60rem] mx-auto leading-[1.26] tracking-tight text-center transform-gpu"
        >
          <Trans
            i18nKey="mission.text2"
            components={{
              blue: <span className="text-primary" />,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}

    