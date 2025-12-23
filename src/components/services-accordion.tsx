'use client';

import React, { ReactNode, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import { useTranslation, Trans } from 'react-i18next';

// --- Данные ---

export function ServicesAccordion() {
  const { t } = useTranslation();

  const ipBlocks = [
    {
      title: t('services.ipBlocks.riscV.title'),
      description: t('services.ipBlocks.riscV.description'),
    },
    {
      title: t('services.ipBlocks.dma.title'),
      description: t('services.ipBlocks.dma.description'),
    },
    {
      title: t('services.ipBlocks.sram.title'),
      description: t('services.ipBlocks.sram.description'),
    },
    {
      title: t('services.ipBlocks.gpio.title'),
      description: t('services.ipBlocks.gpio.description'),
    },
    {
      title: t('services.ipBlocks.axi.title'),
      description: t('services.ipBlocks.axi.description'),
    },
    {
      title: t('services.ipBlocks.spi.title'),
      description: t('services.ipBlocks.spi.description'),
    },
    {
      title: t('services.ipBlocks.i2c.title'),
      description: t('services.ipBlocks.i2c.description'),
    },
    {
      title: t('services.ipBlocks.uart.title'),
      description: t('services.ipBlocks.uart.description'),
    },
    {
      title: t('services.ipBlocks.gpt.title'),
      description: t('services.ipBlocks.gpt.description'),
    },
    {
      title: t('services.ipBlocks.analogPll.title'),
      description: t('services.ipBlocks.analogPll.description'),
    },
    { 
      title: t('services.ipBlocks.lvdsRx.title'), 
      description: t('services.ipBlocks.lvdsRx.description') 
    },
  ];
  
  interface Service {
    title: string;
    id: string;
    bgColor: string;
    content: ReactNode;
  }
  
  const services: Service[] = [
    {
      title: t('services.icDesign.title'),
      id: 'ic-design',
      bgColor: 'bg-[#24364E]',
      content: (
        <p dangerouslySetInnerHTML={{ __html: t('services.icDesign.content')}} />
      ),
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
                  index < ipBlocks.length - (ipBlocks.length % 2 === 0 ? 2 : 1)
                    ? 'border-b'
                    : ''
                } border-white/[.15]`}
              >
                <p>
                  <strong className="text-[#FBFBFB]">{block.title}</strong>{' '}
                  {block.description}
                </p>
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
      content: (
        <p>
            <Trans i18nKey="services.software.content" components={{ strong: <strong /> }} />
        </p>
      ),
    },
  ];

  const [openedServices, setOpenedServices] = useState<string[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  const TOP_OFFSET = 130; // цель — на 100px ниже верхнего края

  useMotionValueEvent(scrollY, 'change', () => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    const wrappers = sectionRef.current.querySelectorAll('.tab-wrapper');

    if (sectionRect.top > window.innerHeight) {
      if (openedServices.length > 0) setOpenedServices([]);
      return;
    }

    wrappers.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const serviceId = services[idx].id;
      const triggerPoint = isMobile
        ? window.innerHeight * 0.6
        : window.innerHeight * 0.75;

      // открываем, когда карточка появляется в области просмотра
      if (
        rect.top < triggerPoint &&
        rect.bottom > 0 &&
        !openedServices.includes(serviceId)
      ) {
        setOpenedServices((prev) => [...prev, serviceId]);
      }
    });
  });

  const ContentPanel = ({ service }: { service: Service }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // Начальная позиция ниже для эффекта подплывания
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="pt-2 text-left text-lg text-white/70 leading-relaxed">
          {service.content}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#090D12] py-24 pb-0 overflow-hidden"
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-lg uppercase text-white/60 tracking-wider">
          {t('services.title')}
        </h2>
      </div>

      <div className="w-full flex flex-col">
        {services.map((service, index) => {
          const isOpen = openedServices.includes(service.id);

          return (
            <div
              key={service.id}
              ref={(el) => {
                wrapperRefs.current[index] = el;
              }}
              className="tab-wrapper w-full relative"
              style={{
                zIndex: index + 1,
                marginTop: index > 0 ? '-15px' : '0px',
                scrollMarginTop: TOP_OFFSET,
              }}
            >
              <div className="w-full">
                <button
                  type="button"
                  className={`w-full ${service.bgColor} cursor-pointer rounded-t-[15px] text-left border-none outline-none relative z-20`}
                  onClick={() => {
                    const el = wrapperRefs.current[index];
                    if (!el) return;
                    window.scrollTo({
                      top: el.offsetTop - TOP_OFFSET,
                      behavior: 'smooth',
                    });
                    if (!openedServices.includes(service.id)) {
                      setOpenedServices((prev) => [...prev, service.id]);
                    }
                  }}
                >
                  <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-5 text-xl h-[95px] flex items-center">
                      <h3
                        className={`transition-all duration-500 ${
                          isOpen ? 'text-white' : 'text-white/30'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>
                  </div>
                </button>
              </div>

              <div className={`${service.bgColor} relative z-10`}>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${service.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      style={{
                        marginBottom:
                          index < services.length - 1 ? '-15px' : '0px',
                      }}
                    >
                      <ContentPanel service={service} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
