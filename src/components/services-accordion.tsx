'use client';

import { useState, useRef, useEffect } from 'react';
import { useScroll } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ipBlocks = [
  {
    title: "RISC-V core.",
    description: "Open standard instruction set architecture with full dev toolkit and debug printed circuit"
  },
  {
    title: "DMA-controller.",
    description: "AMBA APB interface for control/ status register access and 2 AXI4 master interfaces: for data transfers and for scatter gather tasks access"
  },
  {
    title: "SRAM.",
    description: "AXI4 to memory bridge with SECDEC and exclusive access support"
  },
  {
    title: "GPIO with APB/AXI interface.",
    description: "GPIO controller with AXI4/ APB interfaces"
  },
  {
    title: "AXI interconnect.",
    description: "System Interconnect with support of AXI3/ AXI4/ AHB/ APB interfaces"
  },
  {
    title: "SPI master interface.",
    description: "SPI master controller with AXI4 interface"
  },
  {
    title: "I2C master interface.",
    description: "I2C master controller with AXI4 interface"
  },
  {
    title: "UART interface.",
    description: "UART controller with AXI4/APB interfaces"
  },
  {
    title: "GPT.",
    description: "General purpose timer with AXI4/ APB interfaces"
  },
  {
    title: "Analog PLL.",
    description: "PLL with frequency up to 5 GHz (TSMC 28 HPC+)"
  },
  {
    title: "LVDS RX.",
    description: "LVDS RX up to 600MT/s (TSMC 28 HPC+)"
  }
];

export function ServicesAccordion() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['start start', 'end end'] });

  const [activeItem, setActiveItem] = useState('item-1');
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange(progress => {
      if (isLocked) return;

      let currentItem = activeItem;
      if (progress < 0.33) {
        currentItem = 'item-1';
      } else if (progress >= 0.33 && progress < 0.66) {
        currentItem = 'item-2';
      } else {
        currentItem = 'item-3';
      }

      if (currentItem !== activeItem) {
        setIsLocked(true);
        setActiveItem(currentItem);
        setTimeout(() => setIsLocked(false), 500); // Lock duration matches animation
      }
    });
    
    return () => unsubscribe();
  }, [scrollYProgress, activeItem, isLocked]);

  return (
    <section id="services" ref={scrollRef} className='h-[300vh] relative bg-[#090D12]'>
        <div className='sticky top-0 h-screen flex flex-col justify-center'>
          <div className="max-w-[1280px] ml-[8rem] px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg uppercase text-white/60 mb-8">
              Products & Services
            </h2>
          </div>
            <div className='flex-grow flex justify-center'>
                <Accordion type='single' value={activeItem} onValueChange={setActiveItem} className='w-full' collapsible>
                    <AccordionItem value='item-1' className='border-none'>
                        <AccordionTrigger className='py-5 text-xl h-[95px] hover:no-underline text-white bg-[#24364E] rounded-t-[15px]'>
                            <div className='mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 text-left'>IC Design</div>
                        </AccordionTrigger>
                        <AccordionContent className='text-lg text-white/70 bg-[#24364E]'>
                            <div className='mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 text-left'>We provide a full stack of Semiconductors Design & Programming services for FPGAs, ASIC. Structures ASIC solutions for Digital, Analogue, Radio Frequency (RF) & Photonic applications.</div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2' className='border-none mt-[-20px]'>
                        <AccordionTrigger className='py-5 text-xl h-[95px] hover:no-underline text-white bg-[#182434] rounded-t-[15px]'>
                            <div className='mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 text-left'>IP-Blocks</div>
                        </AccordionTrigger>
                        <AccordionContent className='text-lg bg-[#182434]'>
                            <div className='mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 text-left'>
                                <div className='rounded-[17px] border border-white/[.15] text-[20px] text-[#B8BECF]'>
                                    <div className='grid grid-cols-1 md:grid-cols-2'>
                                        {ipBlocks.map((block, index) => (
                                            <div key={index} className={`p-4 flex items-center min-h-[117px] ${index % 2 === 0 ? 'md:border-r' : ''} ${index < ipBlocks.length - (ipBlocks.length % 2 === 0 ? 2:1) ? 'border-b' : ''} border-white/[.15]`}>
                                                <p><strong className='text-[#FBFBFB]'>{block.title}</strong> {block.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3' className='border-none mt-[-20px]'>
                        <AccordionTrigger className='py-5 text-xl h-[95px] hover:no-underline text-white bg-[#101823] rounded-t-[15px]'>
                            <div className='mx-auto max-w-[1280px] w-full px-4 sm:px-6 lg:px-8 text-left'>Software & Technologies</div>
                        </AccordionTrigger>
                        <AccordionContent className='text-lg text-white/70 bg-[#101823]'>
                            <div className='mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-6 text-left'>Sirius also develops a stack of Microelectronics design<br />technologies, including <strong>Electronics Design Automation (EDA)</strong><br />software which secures time-2-market & price-2-quality<br />competitive advantages for its customers.</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </section>
  );
}