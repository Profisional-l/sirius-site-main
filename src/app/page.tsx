import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";
import { MotionDiv } from "@/components/motion-div";
import { Separator } from "@/components/ui/separator";
import { MissionAnimation } from "@/components/mission-animation";
import { IndustriesSection } from "@/components/industries-section";
import { ServicesAccordion } from "@/components/services-accordion";

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
            <h1 className="space-mono-bold text-[42px] md:text-[68px] tracking-tighter uppercase leading-[1.05] text-[#F0F2F7]">
              Micro<span className="visible sm:invisible sm:hidden">-</span>electronics
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
                className="bg-[#F0F2F7] border-white/30 hover:opacity-50 hover:bg-[#F0F2F7] text-[#1B232F] backdrop-blur-sm text-[22px] font-bold px-0 w-[186px] h-[55px] rounded-[9px] transition-opacity"
              >
                Contact Sales
              </Button>
            </div>
          </MotionDiv>
        </div>
      </section>

      {/* Products & Services */}
      <section id="products" className="py-12 sm:py-[98px] bg-[#090D12]">
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8">
          <div className="flex overflow-x-auto gap-2 lg:gap-5 px-4 md:px-0 md:justify-center">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="about"
        className="bg-[#090D12] text-center relative"
      >
        {/* Фон на весь экран с абсолютным позиционированием */}
        <div
          className="absolute inset-0 bg-cover bg-center missionSection"
        ></div>
        
        {/* Контент поверх фона */}
        <div className="relative z-10 h-[550vh]"> {/* Такая же высота как у MissionAnimation */}
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-full">
            <MissionAnimation />
          </div>
        </div>
      </section>
      {/* Services Accordion */}
      <ServicesAccordion />

      {/* Industries Section */}
      <IndustriesSection />

      {/* Team & Join CTA */}
      <div className="teamblock">
        {/* Team Section */}
        <section id="team" className="py-28 sm:py-26">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
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

        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 -mt-16">
            <Separator className="bg-[#FFFFFF12]"/>
        </div>

        {/* Join CTA */}
        <section className="py-[75px] sm:py-20 text-center">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
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
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
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
