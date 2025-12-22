'use client';

import React, { ReactNode, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

// --- Данные ---
const ipBlocks = [
  {
    title: 'RISC-V core.',
    description:
      'Open standard instruction set architecture with full dev toolkit and debug printed circuit',
  },
  {
    title: 'DMA-controller.',
    description:
      'AMBA APB interface for control/ status register access and 2 AXI4 master interfaces',
  },
  {
    title: 'SRAM.',
    description:
      'AXI4 to memory bridge with SECDEC and exclusive access support',
  },
  {
    title: 'GPIO with APB/AXI interface.',
    description: 'GPIO controller with AXI4/ APB interfaces',
  },
  {
    title: 'AXI interconnect.',
    description:
      'System Interconnect with support of AXI3/ AXI4/ AHB/ APB interfaces',
  },
  {
    title: 'SPI master interface.',
    description: 'SPI master controller with AXI4 interface',
  },
  {
    title: 'I2C master interface.',
    description: 'I2C master controller with AXI4 interface',
  },
  {
    title: 'UART interface.',
    description: 'UART controller with AXI4/APB interfaces',
  },
  {
    title: 'GPT.',
    description: 'General purpose timer with AXI4/ APB interfaces',
  },
  {
    title: 'Analog PLL.',
    description: 'PLL with frequency up to 5 GHz (TSMC 28 HPC+)',
  },
  { title: 'LVDS RX.', description: 'LVDS RX up to 600MT/s (TSMC 28 HPC+)' },
];

interface Service {
  title: string;
  id: string;
  bgColor: string;
  content: ReactNode;
}

const services: Service[] = [
  {
    title: 'IC Design',
    id: 'ic-design',
    bgColor: 'bg-[#24364E]',
    content: (
      <p>
        We provide a full stack of Semiconductors Design & Programming <br />
        services for FPGAs, ASIC. Structures ASIC solutions for Digital, <br />
        Analogue, Radio Frequency (RF) & Photonic applications.
      </p>
    ),
  },
  {
    title: 'IP-Blocks',
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
    title: 'Software & Technologies',
    id: 'software',
    bgColor: 'bg-[#101823]',
    content: (
      <p>
        Sirius also develops a stack of Microelectronics design <br />
        technologies, including{' '}
        <strong>Electronics Design Automation (EDA)</strong> <br />
        software which secures time-2-market & price-2-quality competitive
        advantages.
      </p>
    ),
  },
];

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

export function ServicesAccordion() {
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

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#090D12] py-24 pb-0 overflow-hidden"
    >
      <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-lg uppercase text-white/60 tracking-wider">
          Products & Services
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
