'use client';
import { useRef, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  HTMLMotionProps,
} from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

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
  const { t } = useTranslation();
  return (
    <section
      id="industries"
      className="py-28 sm:py-32 bg-[#101823] text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <div className="dots-pattern"></div>
      </div>
      <div className="container mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative flex justify-center items-center h-[600px] sm:h-[400px]">
          <h2 className="absolute font-mono text-[42px] md:text-[68px] font-bold text-white uppercase">
            <Trans
              i18nKey="industries.title"
              components={{
                blue: <span className="bg-gradient-to-r from-[#0075EB] to-[#35A4FF] bg-clip-text text-transparent" />,
                br: <br />,
              }}
             />
          </h2>

          <div className="absolute w-full h-full">
            {/* Telecom */}
            <ParallaxBox className="absolute top-[0%] left-[10%] sm:top-[-10%] sm:left-[35%] md:left-[25%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.telecom')}</Badge>
            </ParallaxBox>
            {/* Cloud-service */}
            <ParallaxBox className="absolute top-[14%] left-[47%] sm:top-[5%] sm:left-[55%] sm:right-auto md:left-[58%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.cloud')}</Badge>
            </ParallaxBox>
            {/* AI */}
            <ParallaxBox className="absolute top-[29%] left-[20%] sm:top-[20%] sm:left-[15%] md:left-[15%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.ai')}</Badge>
            </ParallaxBox>
            {/* Engineering */}
            <ParallaxBox className="absolute top-[34%] left-[60%] sm:top-[35%] sm:right-[15%] sm:left-auto md:right-[0%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.engineering')}</Badge>
            </ParallaxBox>
            {/* Robotics */}
            <ParallaxBox className="absolute top-[60%] left-[10%] sm:top-[50%] sm:left-[10%] md:left-[5%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.robotics')}</Badge>
            </ParallaxBox>
            {/* Blockchain */}
            <ParallaxBox className="absolute top-[75%] left-[45%] sm:top-[90%] sm:left-[20%] sm:right-auto md:left-[20%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.blockchain')}</Badge>
            </ParallaxBox>
            {/* IoT */}
            <ParallaxBox className="absolute top-[88%] left-[22%] sm:top-[65%] sm:right-[20%] sm:left-auto md:right-[0%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.iot')}</Badge>
            </ParallaxBox>
            {/* Security systems */}
            <ParallaxBox className="absolute top-[100%] left-[16%] -translate-x-1/2 sm:top-[95%] sm:left-[58%] sm:translate-x-0 md:left-[65%]">
              <Badge variant="blue" className="text-[18px] sm:text-2xl transition-all duration-300">{t('industries.security')}</Badge>
            </ParallaxBox>
          </div>
        </div>
      </div>
    </section>
  );
}
