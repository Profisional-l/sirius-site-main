'use client';

import { useRef, ReactNode, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';

const ipBlocks = [
    { title: "RISC-V core.", description: "Open standard instruction set architecture with full dev toolkit and debug printed circuit" },
    { title: "DMA-controller.", description: "AMBA APB interface for control/ status register access and 2 AXI4 master interfaces: for data transfers and for scatter gather tasks access" },
    { title: "SRAM.", description: "AXI4 to memory bridge with SECDEC and exclusive access support" },
    { title: "GPIO with APB/AXI interface.", description: "GPIO controller with AXI4/ APB interfaces" },
    { title: "AXI interconnect.", description: "System Interconnect with support of AXI3/ AXI4/ AHB/ APB interfaces" },
    { title: "SPI master interface.", description: "SPI master controller with AXI4 interface" },
    { title: "I2C master interface.", description: "I2C master controller with AXI4 interface" },
    { title: "UART interface.", description: "UART controller with AXI4/APB interfaces" },
    { title: "GPT.", description: "General purpose timer with AXI4/ APB interfaces" },
    { title: "Analog PLL.", description: "PLL with frequency up to 5 GHz (TSMC 28 HPC+)" },
    { title: "LVDS RX.", description: "LVDS RX up to 600MT/s (TSMC 28 HPC+)" }
];

interface Service {
    title: string;
    id: string;
    bgColor: string;
    content: ReactNode;
}

const services: Service[] = [
    {
        title: "IC Design",
        id: "ic-design",
        bgColor: "bg-[#24364E]",
        content: <p>We provide a full stack of Semiconductors Design & Programming <br /> services for FPGAs, ASIC. Structures ASIC solutions for Digital, <br /> Analogue, Radio Frequency (RF) & Photonic applications.</p>,
    },
    {
        title: "IP-Blocks",
        id: "ip-blocks",
        bgColor: "bg-[#182434]",
        content: (
            <div className='rounded-[17px] border border-white/[.15] text-[20px] text-[#B8BECF]'>
                <div className='grid grid-cols-1 md:grid-cols-2'>
                    {ipBlocks.map((block, index) => (
                        <div key={index} className={`p-4 flex items-center min-h-[117px] ${index % 2 === 0 ? 'md:border-r' : ''} ${index < ipBlocks.length - (ipBlocks.length % 2 === 0 ? 2 : 1) ? 'border-b' : ''} border-white/[.15]`}>
                            <p><strong className='text-[#FBFBFB]'>{block.title}</strong> {block.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
    {
        title: "Software & Technologies",
        id: "software",
        bgColor: "bg-[#101823]",
        content: <p>Sirius also develops a stack of Microelectronics design<br />technologies, including <strong>Electronics Design Automation (EDA)</strong><br />software which secures time-2-market & price-2-quality<br />competitive advantages for its customers.</p>,
    }
];

const ServiceContent = ({ service }: { service: Service }) => {
    const isIpBlocks = service.id === 'ip-blocks';
    return (
        <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
            className={`w-full ${service.bgColor} overflow-hidden`}
        >
             <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 mb-[45px]">
                <div
                    className={`py-6 text-left text-lg text-white/70 ${isIpBlocks ? 'overflow-y-auto max-h-[45vh]' : ''}`}
                >
                    {service.content}
                </div>
            </div>
        </motion.div>
    );
};


export function ServicesAccordion() {
    const scrollRef = useRef(null);
    const [activeService, setActiveService] = useState(services[0].id);
    const { scrollYProgress } = useScroll({
        target: scrollRef,
        offset: ['start start', 'end end'],
    });

    const serviceScroll = useTransform(scrollYProgress, [0, 1], [0, services.length]);

    useMotionValueEvent(serviceScroll, "change", (latest) => {
        const activeIndex = Math.floor(latest);
        if (services[activeIndex] && services[activeIndex].id !== activeService) {
            setActiveService(services[activeIndex].id);
        }
    });

    return (
        <section id="services" ref={scrollRef} className='h-[300vh] relative bg-[#090D12]'>
            <div className='sticky top-0 h-screen flex flex-col justify-start pt-16 xl:pt-24 overflow-hidden'>
                <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-lg uppercase text-white/60 mb-8">
                        Products & Services
                    </h2>
                </div>
                <div className="w-full">
                    {services.map((service, index) => {
                        const isActive = activeService === service.id;
                        return (
                            <motion.div
                                key={service.id}
                                className='overflow-hidden'
                                style={{
                                    marginTop: index > 0 ? "-15px" : 0,
                                    zIndex: index,
                                }}
                            >
                                <motion.div
                                    className={`w-full ${service.bgColor} cursor-pointer rounded-t-[15px]`}
                                    onClick={() => setActiveService(service.id)}
                                >
                                    <div className='max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8'>
                                        <div className='py-5 text-xl h-[95px] flex items-center'>
                                            <h3 className='text-left text-white'>{service.title}</h3>
                                        </div>
                                    </div>
                                </motion.div>
                                
                                <AnimatePresence initial={false}>
                                    {isActive && <ServiceContent service={service} />}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 