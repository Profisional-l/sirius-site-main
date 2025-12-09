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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ContactForm } from "@/components/contact-form";
import { ProductCard } from "@/components/product-card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { CheckCircle } from "lucide-react";
import { MotionDiv } from "@/components/motion-div";
import { Separator } from "@/components/ui/separator";

const products = [
  {
    title: "TURNKEY SOLUTIONS",
    description: "Ready-made IP blocks and IC blueprints",
    details:
      "Leverage our portfolio of pre-verified, silicon-proven IP cores to accelerate your design cycle. Our turnkey solutions reduce risk and time-to-market for complex SoCs.",
  },
  {
    title: "CUSTOMIZATION",
    description: "Proven remedies adjusted to your application",
    details:
      "We adapt our robust, field-tested semiconductor solutions to meet your unique application requirements, ensuring optimal performance and seamless integration.",
  },
  {
    title: "R&D",
    description: "Unique keys based on years of experience",
    details:
      "Partner with us for cutting-edge Research and Development. Our experienced team pioneers novel solutions in digital, analog, and RF design to solve tomorrow's challenges.",
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
      <section className="relative h-[100vh] flex items-center justify-center text-center text-white overflow-hidden ">
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
      <section id="products" className="py-28 sm:py-32 bg-background">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section
        id="about"
        className="py-28 sm:py-32 bg-background text-center relative overflow-hidden"
      >
        <div className="tech-pattern opacity-50"></div>
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-sm font-code uppercase tracking-[0.25em] text-primary">
            Mission
          </h2>
          <p className="mt-8 font-headline text-3xl md:text-5xl max-w-4xl mx-auto leading-tight">
            Sirius Semiconductors was established to{" "}
            <span className="text-primary">reach an ambitious target</span> to
            turn Vietnam into a technological powerhouse.
          </p>
        </div>
      </section>

      {/* Services Accordion */}
      <section id="services" className="py-28 sm:py-32 bg-card">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <Accordion
            type="single"
            defaultValue="item-1"
            collapsible
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-[#0E1A2E] px-6 py-5 text-xl h-[70px] hover:no-underline hover:bg-white/5 transition-colors">
                IC Design
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6 text-lg text-white/70 bg-[#0c1729]">
                We provide a full stack of Semiconductors Design & Programming
                services for FPGAs, ASIC. Structures ASIC solutions for Digital,
                Analogue, Radio Frequency (RF) & Photonic applications.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="bg-[#0E1A2E] px-6 py-5 text-xl h-[70px] hover:no-underline hover:bg-white/5 transition-colors">
                IP-Blocks
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6 text-lg text-white/70 bg-[#0c1729]">
                Our extensive library of silicon-proven IP-Blocks helps you
                reduce development time and costs. From standard interfaces to
                complex subsystems, we provide reliable and customizable IP
                solutions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="bg-[#0E1A2E] px-6 py-5 text-xl h-[70px] hover:no-underline hover:bg-white/5 transition-colors">
                Software & Technologies
              </AccordionTrigger>
              <AccordionContent className="px-6 py-6 text-lg text-white/70 bg-[#0c1729]">
                Beyond hardware, we deliver complete software stacks, firmware, and development tools to unlock the full potential of your silicon. Our expertise spans embedded systems, drivers, and application-level software.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      
      {/* Industries Section */}
      <section
        id="industries"
        className="py-28 sm:py-32 bg-background text-center relative overflow-hidden"
      >
        <div className="dots-pattern"></div>
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 relative">
          <h2 className="font-headline text-4xl md:text-5xl font-bold">
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

      {/* Team & Join CTA */}
      <div className="bg-[#182434]">
        {/* Team Section */}
        <section id="team" className="py-28 sm:py-32">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="lg:max-w-md">
              <h3 className="text-sm font-code uppercase tracking-[0.25em] text-primary/70">
                Team
              </h3>
              <h2 className="mt-4 font-headline text-4xl md:text-5xl font-medium leading-tight">
                Lead by the ones who <span className="text-primary">got something to brag on.</span> But they don&apos;t.
              </h2>
            </div>
            <div className="space-y-12">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-start gap-6"
                >
                  <Avatar className="w-16 h-16 border-2 border-white/20 shrink-0">
                    <AvatarImage
                      src={member.image}
                      alt={member.name}
                      data-ai-hint="person portrait"
                    />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-headline text-xl font-bold uppercase">
                      {member.name}
                    </h3>
                    <p className="text-white/70">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <Separator className="bg-black/50" />
        </div>

        {/* Join CTA */}
        <section className="py-28 sm:py-32 text-center">
          <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
            <h2 className="font-headline text-4xl md:text-5xl font-medium">
              Wanna join the team?
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-lg text-white/70">
              We are always looking for talented people who find their joy and
              inspiration in hi-tech. Feel free to reach us and tell your story.
            </p>
            <div className="mt-10">
              <Button size="lg">Contact Us</Button>
            </div>
          </div>
        </section>
      </div>


      {/* Contact Section */}
      <section id="contact" className="py-28 sm:py-16 bg-[#FFFFFF]">
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <h1 className="text-[45px] text-[#0F141C] font-[500]">Contact details</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12 max-w-[350px] text-[#0F141C]">
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
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
