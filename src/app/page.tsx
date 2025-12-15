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
import { Separator } from "@/components/ui/separator";

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

const teamMembers = [
  {
    name: "ALEX DROZDOV",
    bio: "Former Executive of one of the Intel local RnD centers, ex-vice president of Soft Machines Ltd, PhD in computer science, previously launched the microelectronics technological companies in Russia",
    image: "/face1.png",
  },
  {
    name: "VAN NGUYEN",
    bio: "Famous Vietnamese tycoon with a long story of successfully built businesses such as ..",
    image: "/face2.png",
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
            <h1 className="font-mono text-[42px] md:text-[68px] tracking-tighter uppercase leading-tight text-[#F0F2F7]">
              Micro<span className="visible sm:invisible sm:hidden ">-</span>electronics
              <br />
              Technological Hub
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-[20px] md:text-[28px] text-[#F0F2F7] leading-relaxed">
              We are{" "}
              <span className="bg-gradient-to-r from-[#0075EB] to-[#35A4FF] bg-clip-text text-transparent">
                all about microelectronics.
              </span>{" "}
              <br />
              With time-2-market & price-2-quality competitive advantages for
              our customers
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="about"
        className="py-28 sm:pt-[166px] sm:pb-[192px] bg-[#090D12] text-center relative overflow-hidden h-[100vh]"
      >
        <div
          className="absolute inset-0 bg-cover bg-center missionSection"
        />
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-mono uppercase text-[#F0F2F7] opacity-40 text-[18px] leading-[1.47] tracking-normal font-[400]">
            Mission
          </h2>
          <p className="mt-8 font-headline font-medium text-[28px] md:text-[56px] max-w-[330px] md:max-w-4xl mx-auto leading-[1.26] tracking-tight">
            Sirius Semiconductors was established{" "}
            <span className="text-primary">to <br className="md:hidden" />reach an ambitious target</span> to
            turn Vietnam into a technological powerhouse.
          </p>
        </div>
      </section>

      {/* Services Accordion */}
      <section id="services" className="pt-[52px] sm:pt-[82px] bg-[#090D12]">
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
        <div className="absolute inset-0 z-0">
          {/* Removed Image component and reverted to dots-pattern div */}
          <div className="dots-pattern"></div>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="relative flex justify-center items-center h-[400px]">
            <h2 className="absolute font-mono text-5xl font-bold text-white uppercase tracking-widest">
              Industries
            </h2>

            <div className="absolute w-full h-full">
              <Badge className="absolute top-[10%] left-[35%]" variant="blue">Telecom</Badge>
              <Badge className="absolute top-[45%] left-[15%]" variant="blue">AI</Badge>
              <Badge className="absolute top-[65%] left-[10%]" variant="blue">Robotics</Badge>
              <Badge className="absolute top-[85%] left-[20%]" variant="blue">Blockchain</Badge>
              
              <Badge className="absolute top-[15%] left-[55%]" variant="blue">Cloud-service</Badge>
              
              <Badge className="absolute top-[85%] left-[58%]" variant="blue">Security systems</Badge>

              <Badge className="absolute top-[45%] right-[15%]" variant="blue">Engineering</Badge>
              <Badge className="absolute top-[65%] right-[20%]" variant="blue">IoT</Badge>
            </div>
          </div>
        </div>
      </section>


      {/* Team & Join CTA */}
      <div className="teamblock">
        {/* Team Section */}
        <section id="team" className="py-28 sm:py-26">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:max-w-md -mt-14">
              <h3 className="text-[14px] md:text-[18px] font-code uppercase  text-[#F0F2F7] opacity-40">
                Team
              </h3>
              <h2 className="mt-8 font-headline text-[28px] md:text-[45px] font-medium leading-tight">
                Lead by the ones who <span className="text-primary">got something to brag on.</span><br className="hidden md:block"/> But they don&apos;t.
              </h2>
            </div>
            <div className="space-y-12 mw-[515px] pr-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-start gap-6"
                >
                  <Avatar className="w-[88px] md:w-[110px] h-[88px] md:h-[110px] border-2 border-white/20 shrink-0">
                    <AvatarImage
                      src={member.image}
                      alt={member.name}
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-headline text-[20px] md:text-[28px] font-bold uppercase text-[#F2F2F2]">
                      {member.name}
                    </h3>
                    <p className="text-[14px] md:text-[20px] text-[#B8BECF] opacity-70">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 -mt-16">
            <Separator className="bg-[#FFFFFF12]" />
        </div>

        {/* Join CTA */}
        <section className="py-[75px] sm:py-20 text-center">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-[28px] md:text-[45px] font-medium">
              Wanna join the team?
            </h2>
            <p className="mt-6 max-w-[740px] mx-auto text-[16px] md:text-[22px] text-[#B8BECF] px-6 md:py-0">
              We are always looking for talented people who find their joy and
              inspiration in hi-tech. Feel free to reach us and tell your story.
            </p>
            <div className="mt-10">
              <Button size="lg" className="bg-[#F0F2F7] border-white/30 hover:bg-white/20 text-[#1B232F] backdrop-blur-sm text-[22px] font-bold px-0 w-[186px] h-[55px] rounded-[9px]">Contact Us</Button>
            </div>
          </div>
        </section>
      </div>


      {/* Contact Section */}
      <section id="contact" className="py-10 sm:py-16 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-[28px] md:text-[45px] text-[#0F141C] font-[500]">Contact details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="hidden md:block space-y-12 max-w-[350px] text-[#0F141C]">
              <div>
                <h3 className="font-headline text-[20px] mt-8 font-[500]">
                  Office address
                </h3>
                <p className="mt-2 text-lg font-[400] opacity-50">
                  1456 Nguyen Van Linh, <br /> Mg Town 14th Ward, Tan Phong Ward,
                  District 7, Ho Chi Minh City, Vietnam
                </p>
              </div>
              <div>
                <h3 className="font-headline text-[20px] font-[500]">Call us</h3>
                <p className="mt-2 text-lg font-[400] opacity-50">(+84) 0888 317 789</p>
              </div>
              <div>
                <h3 className="font-headline text-[20px] font-[500]">
                  Email us
                </h3>
                <p className="mt-2 text-lg font-[400] opacity-50">info@rise-hitech</p>
              </div>
            </div>
            <div className="mt-10 md:mt-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}