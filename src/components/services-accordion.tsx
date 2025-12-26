'use client';

import React, { ReactNode, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';

const ContentPanel = ({ service }: { service: Service }) => (
    <div className="w-full">
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="pt-2 text-left text-lg text-white/70 leading-relaxed">
          {service.content}
        </div>
      </div>
    </div>
  );

// --- Data ---
interface Service {
    title: string;
    id: string;
    bgColor: string;
    content: ReactNode;
}

// --- Animation Configuration ---
const accordionAnimationConfig = {
    // These ranges define when each tab's animation (height and opacity) occurs 
    // within the total scroll progress (0.0 to 1.0).
    ranges: [
        { // Service 1: IC Design
            // The title becomes fully opaque very early in its animation.
            opacity: [0.0, 0.1], 
            // The content panel expands during the first 20% of the scroll.
            maxHeight: [0.0, 0.2], 
        },
        { // Service 2: IP Blocks (the large one)
            // Starts opening after a delay for scrolling through the first tab.
            opacity: [0.4, 0.5],
            maxHeight: [0.4, 0.7], // Has a longer duration to account for its size.
        },
        { // Service 3: Software
            // Starts opening after a long delay for scrolling through the second tab.
            opacity: [0.9, 0.95],
            maxHeight: [0.9, 1.0],
        }
    ]
};

export function ServicesAccordion() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const ipBlocks = [
    { title: t('services.ipBlocks.riscV.title'), description: t('services.ipBlocks.riscV.description') },
    { title: t('services.ipBlocks.dma.title'), description: t('services.ipBlocks.dma.description') },
    { title: t('services.ipBlocks.sram.title'), description: t('services.ipBlocks.sram.description') },
    { title: t('services.ipBlocks.gpio.title'), description: t('services.ipBlocks.gpio.description') },
    { title: t('services.ipBlocks.axi.title'), description: t('services.ipBlocks.axi.description') },
    { title: t('services.ipBlocks.spi.title'), description: t('services.ipBlocks.spi.description') },
    { title: t('services.ipBlocks.i2c.title'), description: t('services.ipBlocks.i2c.description') },
    { title: t('services.ipBlocks.uart.title'), description: t('services.ipBlocks.uart.description') },
    { title: t('services.ipBlocks.gpt.title'), description: t('services.ipBlocks.gpt.description') },
    { title: t('services.ipBlocks.analogPll.title'), description: t('services.ipBlocks.analogPll.description') },
    { title: t('services.ipBlocks.lvdsRx.title'), description: t('services.ipBlocks.lvdsRx.description') },
  ];

  const services: Service[] = [
    {
      title: t('services.icDesign.title'),
      id: 'ic-design',
      bgColor: 'bg-[#24364E]',
      content: <p dangerouslySetInnerHTML={{ __html: t('services.icDesign.content') }} />,
    },
    {
      title: t('services.ipBlocks.title'),
      id: 'ip-blocks',
      bgColor: 'bg-[#182434]',
      content: (
        <div className="rounded-[17px] border border-white/[.15] text-[20px] text-[#B8BECF]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {ipBlocks.map((block, index) => (
              <div
                key={index}
                className={`p-4 flex items-center min-h-[117px] ${
                  index % 2 === 0 ? 'md:border-r' : ''
                } ${
                  index < ipBlocks.length - (ipBlocks.length % 2 === 0 ? 2 : 1) ? 'border-b' : ''
                } border-white/[.15]`}
              >
                <p><strong className="text-[#FBFBFB]">{block.title}</strong> {block.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t('services.software.title'),
      id: 'software',
      bgColor: 'bg-[#101823]',
      content: <p><Trans i18nKey="services.software.content" components={{ strong: <strong /> }} /></p>,
    },
  ];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const containerHeight = isMobile ? 'h-[500vh]' : 'h-[300vh]';
  const animRanges = accordionAnimationConfig.ranges;

  return (
    <section
      ref={containerRef}
      id="products"
      className={`relative bg-[#090D12] ${containerHeight}`}
    >
      <div className="sticky top-0 overflow-hidden py-24 pb-0">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-lg uppercase text-white/60 tracking-wider">
                {t('services.title')}
            </h2>
        </div>

        <div className="w-full flex flex-col">
          {services.map((service, index) => {
            const { opacity: opacityRange, maxHeight: maxHeightRange } = animRanges[index];

            const opacity = useTransform(scrollYProgress, opacityRange, [0.3, 1]);

            let maxHeightValue;
            if (isMobile) {
                maxHeightValue = service.id === 'ip-blocks' ? 2200 : 500;
            } else {
                maxHeightValue = 800;
            }
            
            const maxHeight = useTransform(scrollYProgress, maxHeightRange, [0, maxHeightValue]);

            return (
              <div
                key={service.id}
                className="tab-wrapper w-full relative"
                style={{
                  zIndex: index + 1,
                  marginTop: index > 0 ? '-15px' : '0px',
                }}
              >
                <div className={`w-full ${service.bgColor} rounded-t-[15px] relative z-20`}>
                  <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-5 text-xl h-[95px] flex items-center">
                        <motion.h3
                            style={{ opacity }}
                            className="transition-colors duration-500 text-white"
                        >
                            {service.title}
                        </motion.h3>
                    </div>
                  </div>
                </div>

                <motion.div
                    style={{ maxHeight }}
                    className={`relative z-10 overflow-hidden ${service.bgColor}`}>
                    <div style={{ marginBottom: index < services.length - 1 ? '-15px' : '0px' }}>
                        <ContentPanel service={service} />
                    </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
