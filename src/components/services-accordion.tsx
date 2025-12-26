'use client';

import React, { ReactNode, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useTranslation, Trans } from 'react-i18next';

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

export function ServicesAccordion() {
  const { t } = useTranslation();

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


  return (
    <section
      ref={containerRef}
      id="products"
      className="relative bg-[#090D12] h-[300vh]"
    >
      <div className="sticky top-0 overflow-hidden py-24 pb-0">
        <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12">
            <h2 className="text-lg uppercase text-white/60 tracking-wider">
                {t('services.title')}
            </h2>
        </div>

        <div className="w-full flex flex-col">
          {services.map((service, index) => {
            const numServices = services.length;
            const rangeStart = index / numServices;
            const rangeEnd = (index + 1) / numServices;
            
            const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0.3, 1]);
            const maxHeight = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 800]);

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
