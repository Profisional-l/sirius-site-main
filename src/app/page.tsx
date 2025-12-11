
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { MotionDiv } from "@/components/motion-div";

// Добавляем ссылки на фоновые изображения
const products = [
  {
    title: "TURNKEY SOLUTIONS",
    description: "Ready-made IP blocks and IC blueprints",
    details:
      "Leverage our portfolio of pre-verified, silicon-proven IP cores to accelerate your design cycle. Our turnkey solutions reduce risk and time-to-market for complex SoCs.",
    backgroundImage: "/icons/tripple-1.svg",
  },
  {
    title: "CUSTOMIZATION",
    description: "Proven remedies adjusted to your application",
    details:
      "We adapt our robust, field-tested semiconductor solutions to meet your unique application requirements, ensuring optimal performance and seamless integration.",
    backgroundImage: "/icons/tripple-2.svg",
  },
  {
    title: "R&D",
    description: "Unique keys based on years of experience",
    details:
      "Partner with us for cutting-edge Research and Development. Our experienced team pioneers novel solutions in digital, analog, and RF design to solve tomorrow's challenges.",
    backgroundImage: "/icons/tripple-3.svg",
  },
];

const industries = [
  "Telecom",
  "Cloud-service",
  "Engineering",
  "IoT",
  "Security systems",
  "Blockchain",
  "Robotics",
  "AI",
];

const teamMembers = [
  {
    name: "ALEX DROZDOV",
    bio: "Former Executive of one of the Intel local RnD centers, ex-vice president of Saft Batteries Ltd, PhD in computer science, previously launched the microelectronics technological companies in Russia",
    image: PlaceHolderImages.find((img) => img.id === "team-alex-drozdov")
      ?.imageUrl,
  },
  {
    name: "VAN NGUYEN",
    bio: "Famous Vietnamese tycoon with a long story of successfully built businesses in technology, manufacturing, and real estate, bringing strategic investment and local market expertise.",
    image: PlaceHolderImages.find((img) => img.id === "team-van-nguyen")
      ?.imageUrl,
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[100vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 mainsection z-10"></div>
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="relative z-10 px-4 mt-12">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-mono text-5xl md:text-6xl tracking-tighter uppercase leading-tight">
              Microelectronics
              <br />
              Technological Hub
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-lg md:text-[28px] text-[#F0F2F7] leading-relaxed">
              We are{" "}
              <span className="bg-gradient-to-r from-[#0075EB] to-[#35A4FF] bg-clip-text text-transparent">
                all about microelectronics.
              </span>{" "}
              <br />
              With time-2-market & price-2-quality competitive advantages for
              our customers.
            </p>
            <div className="mt-10">
              <Button
                size="lg"
                variant="outline"
                className="bg-[#F0F2F7] border-white/30 hover:bg-white/20 text-[#1B232F] backdrop-blur-sm text-[22px] font-bold px-0 w-[186px] h-[55px] rounded-[9px]"
              >
                Contact Sales
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Products & Services */}
      <section id="products" className="py-28 sm:py-[98px] bg-[#090D12]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Остальные секции без изменений */}
      {/* Mission Section */}
      <section
        id="about"
        className="py-28 sm:pt-[166px] sm:pb-[192px] bg-[#090D12] text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/icons/mission-background.svg')",
          }}
        />
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-mono uppercase text-[#F0F2F7] opacity-40 text-[18px] leading-[1.47] tracking-normal font-normal">
            Mission
          </h2>
          <p className="mt-8 font-headline font-medium text-[56px] max-w-4xl mx-auto leading-[1.26] tracking-tight">
            Sirius Semiconductors was established to{" "}
            <span className="text-primary">reach an ambitious target</span> to
            turn Vietnam into a technological powerhouse.
          </p>
        </div>
      </section>

      {/* Services Accordion */}
      <section className="pt-[52px] sm:pt-[82px] bg-[#090D12]"> 
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg uppercase text-white/60 mb-8">
            Products & Services
          </h2>
        </div>
        <Accordion
          type="multiple"
          defaultValue={["item-1"]}
          className="w-full"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="py-5 text-xl h-[95px] hover:no-underline text-white bg-[#24364E] rounded-t-[15px]">
              <div className="mx-auto max-w-[1180px] w-full px-4 sm:px-6 lg:px-8 text-left">
                IC Design
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/70 bg-[#24364E]">
              <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 py-6 text-left">
                We provide a full stack of Semiconductors Design & Programming
                services for FPGAs, ASIC. Structures ASIC solutions for Digital,
                Analogue, Radio Frequency (RF) & Photonic applications.
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border-none mt-[-20px]">
            <AccordionTrigger className="py-5 text-xl h-[95px] hover:no-underline text-white bg-[#182434] rounded-t-[15px]">
              <div className="mx-auto max-w-[1180px] w-full px-4 sm:px-6 lg:px-8 text-left">
                IP-Blocks
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-lg bg-[#182434]">
              <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 py-6 text-left">
                <div className="rounded-[17px] border border-white/[.15] text-[20px] text-[#B8BECF]">
                  <div className="grid grid-cols-2">
                    <div className="p-4 border-r border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">RISC-V core.</strong> Open standard instruction set architecture with full dev toolkit and debug printed circuit</p>
                    </div>
                    <div className="p-4 border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">I2C master interface.</strong> I2C master controller with AXI4 interface</p>
                    </div>
                    <div className="p-4 border-r border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">DMA-controller</strong></p>
                    </div>
                    <div className="p-4 border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">UART interface.</strong> UART controller with AXI4/APB interfaces</p>
                    </div>
                    <div className="p-4 border-r border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">SRAM.</strong> AXI4 to memory bridge with SECDEC and exclusive access support</p>
                    </div>
                    <div className="p-4 border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">GPT.</strong> General purpose timer with AXI4/APB interfaces</p>
                    </div>
                    <div className="p-4 border-r border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">GPIO with APB/AXI interface.</strong> GPIO controller with AXI4/APB interfaces</p>
                    </div>
                    <div className="p-4 border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">Analog PLL.</strong> PLL with frequency up to 5 GHz (TSMC 28 HPC+)</p>
                    </div>
                    <div className="p-4 border-r border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">AXI interconnect.</strong> System Interconnect with support of AXI3/AXI4/AHB/APB interfaces</p>
                    </div>
                    <div className="p-4 border-b border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">LVDS RX.</strong> LVDS RX up to 600MT/s (TSMC 28 HPC+)</p>
                    </div>
                    <div className="p-4 border-r border-white/[.15] flex items-center min-h-[117px]">
                      <p><strong className="text-[#FBFBFB]">SPI master interface.</strong> SPI master controller with AXI4 interface</p>
                    </div>
                    <div className="p-4 flex items-center min-h-[117px]">
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border-none mt-[-20px]">
            <AccordionTrigger className="py-5 text-xl h-[95px] hover:no-underline text-white bg-[#101823] rounded-t-[15px]">
              <div className="mx-auto max-w-[1180px] w-full px-4 sm:px-6 lg:px-8 text-left">
                Software & Technologies
              </div>
            </AccordionTrigger>
            <AccordionContent className="text-lg text-white/70 bg-[#101823]">
               <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 py-6 text-left">
                Sirius also develops a stack of Microelectronics design<br />
                technologies, including <strong>Electronics Design Automation (EDA)</strong><br />
                software which secures time-2-market & price-2-quality<br />
                competitive advantages for its customers.
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* Industries Section */}
      <section
        id="industries"
        className="py-28 sm:py-32 bg-[#090D12] text-center relative overflow-hidden"
      >
        <div className="dots-pattern"></div>
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-white">
            Industries
          </h2>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <Badge
                key={industry}
                variant="outline"
                className="px-6 py-2 text-base border-primary text-primary rounded-lg cursor-pointer hover:bg-primary/10 transition-colors"
              >
                {industry}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section и далее — без изменений */}
      {/* ... */}
    </>
  );
}
