"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";

interface Service {
  title: string;
  id: string;
  bgColor: string;
  content: ReactNode;
}

export function ServicesAccordion() {
  const CARD_REVEAL_DURATION_PX = 800;
  const SECOND_CARD_REVEAL_DURATION_PX = 500;
  const SECOND_CARD_REVEAL_END_RATIO = 0.6;
  const SECOND_CARD_PEEK_PX = 190;
  const THIRD_CARD_PEEK_PX = 95;
  const CARD_BG_TAIL_HEIGHT_VH = 320;
  const STAGE_EXIT_BUFFER_PX = 180;

  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionStartY, setSectionStartY] = useState(0);
  const [sectionHeightPx, setSectionHeightPx] = useState(3200);
  const [viewportHeightPx, setViewportHeightPx] = useState(0);
  const [cardHeightsPx, setCardHeightsPx] = useState<number[]>([0, 0, 0]);
  const [contentHeightsPx, setContentHeightsPx] = useState<number[]>([0, 0, 0]);
  const { scrollY } = useScroll();

  useEffect(() => {
    const updateLayout = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      setSectionStartY(window.scrollY + rect.top);

      const nextViewportHeight = window.innerHeight;
      setViewportHeightPx(nextViewportHeight);
      const thirdCardRevealOverlapPx = Math.max(
        24,
        Math.round(nextViewportHeight * 0.06),
      );

      const measuredCardHeights = cardRefs.current.map(
        (card) => card?.offsetHeight ?? 0,
      );
      const measuredContentHeights = contentRefs.current.map(
        (content) => content?.offsetHeight ?? 0,
      );
      setCardHeightsPx(measuredCardHeights);
      setContentHeightsPx(measuredContentHeights);

      const firstCardScrollPx = Math.max(120, measuredContentHeights[0] ?? 0);
      const secondCardScrollPx = Math.max(120, measuredContentHeights[1] ?? 0);
      const thirdCardScrollPx = Math.max(
        0,
        (measuredContentHeights[2] ?? 0) - nextViewportHeight,
      );

      const secondCardRevealEndPx = Math.max(
        120,
        firstCardScrollPx * SECOND_CARD_REVEAL_END_RATIO,
      );
      const secondCardRevealStartPx = Math.max(
        0,
        secondCardRevealEndPx - SECOND_CARD_REVEAL_DURATION_PX,
      );
      const secondCardContentEndPx = secondCardRevealEndPx + secondCardScrollPx;

      const thirdCardRevealEndPx = Math.max(
        0,
        secondCardContentEndPx - thirdCardRevealOverlapPx,
      );
      const thirdCardRevealStartPx = Math.max(
        0,
        thirdCardRevealEndPx - CARD_REVEAL_DURATION_PX,
      );
      const thirdCardContentEndPx = thirdCardRevealEndPx + thirdCardScrollPx;

      setSectionHeightPx(thirdCardContentEndPx + STAGE_EXIT_BUFFER_PX);
    };

    updateLayout();
    const raf = window.requestAnimationFrame(updateLayout);
    window.addEventListener("resize", updateLayout);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  /* ---------- DATA ---------- */

  const ipBlocks = [
    {
      title: t("services.ipBlocks.riscV.title"),
      description: t("services.ipBlocks.riscV.description"),
    },
    {
      title: t("services.ipBlocks.dma.title"),
      description: t("services.ipBlocks.dma.description"),
    },
    {
      title: t("services.ipBlocks.sram.title"),
      description: t("services.ipBlocks.sram.description"),
    },
    {
      title: t("services.ipBlocks.gpio.title"),
      description: t("services.ipBlocks.gpio.description"),
    },
    {
      title: t("services.ipBlocks.axi.title"),
      description: t("services.ipBlocks.axi.description"),
    },
    {
      title: t("services.ipBlocks.spi.title"),
      description: t("services.ipBlocks.spi.description"),
    },
    {
      title: t("services.ipBlocks.i2c.title"),
      description: t("services.ipBlocks.i2c.description"),
    },
    {
      title: t("services.ipBlocks.uart.title"),
      description: t("services.ipBlocks.uart.description"),
    },
    {
      title: t("services.ipBlocks.gpt.title"),
      description: t("services.ipBlocks.gpt.description"),
    },
    {
      title: t("services.ipBlocks.analogPll.title"),
      description: t("services.ipBlocks.analogPll.description"),
    },
    {
      title: t("services.ipBlocks.lvdsRx.title"),
      description: t("services.ipBlocks.lvdsRx.description"),
    },
  ];

  const fpgaCapabilities = t("services.icDesign.cards.fpga.capabilities", {
    returnObjects: true,
  }) as string[];
  const ipServices = t("services.icDesign.cards.ip.services", {
    returnObjects: true,
  }) as string[];

  const services: Service[] = [
    {
      title: t("services.icDesign.title"),
      id: "ic-design",
      bgColor: "bg-[#24364E]",
      content: (
        <div className="space-y-6">
          <h4 className="text-[20px] -mt-4 mb-10 text-[#B8BECF] font-[400]">
            {t("services.icDesign.cardsSectionTitle")}
          </h4>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <article className="rounded-[18px] border-[1px] border-white/[.31] bg-[#324968] p-6 text-[18px] ">
              <h4 className="md:text-[39px] font-[500] text-white">
                {t("services.icDesign.cards.asic.title")}
              </h4>
              <p className="md:text-[16px] mb-6 font-[400] text-white opacity-75 max-w-[300px]">
                {t("services.icDesign.cards.asic.intro")}
              </p>
              <hr className="-mx-6 my-6 w-[calc(100%+3rem)] border-0 border-t border-white/[.31]" />
              <p className="mt-4 text-[12px] font-[100] max-w-[315px]">
                <strong className="text-white/[.75] font-[700]">Specification Signoff.</strong>{" "}
                {t("services.icDesign.cards.asic.specification")}
              </p>
              <p className="mt-4 text-[12px] font-[100] max-w-[315px]">
                <strong className="text-white/[.75] font-[700]">RTL Signoff.</strong>{" "}
                {t("services.icDesign.cards.asic.rtl")}
              </p>
              <p className="mt-4 text-[12px] font-[100] max-w-[315px]">
                <strong className="text-white/[.75] font-[700]">Netlist Signoff.</strong>{" "}
                {t("services.icDesign.cards.asic.netlist")}
              </p>
              <hr className="-mx-6 my-6 w-[calc(100%+3rem)] border-0 border-t border-white/[.31]" />
              <p className="mt-4 text-[16px] font-[400] ">
                {t("services.icDesign.cards.asic.summary")}
              </p>
            </article>

            <article className="rounded-[18px] border-[1px] border-white/[.31] bg-[#324968] p-6 text-[18px] text-[#B8BECF]">
              <h4 className="md:text-[39px] font-[500] text-white">
                {t("services.icDesign.cards.fpga.title")}
              </h4>
              <p className="md:text-[16px] mb-6 font-[400] text-white opacity-75 max-w-[300px]" >
                {t("services.icDesign.cards.fpga.intro")}
              </p>
              <hr className="-mx-6 my-4 w-[calc(100%+3rem)] border-0 border-t border-white/[.31]" />
              <p className="mt-8 text-white/75 text-[21px] font-[400]">
                {t("services.icDesign.cards.fpga.capabilitiesTitle")}
              </p>
              <ol className="mt-3 list-decimal space-y-1 pl-4 text-[14px] font-[300]">
                {fpgaCapabilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
            </article>

            <article className="rounded-[18px] border-[1px] border-white/[.31] bg-[#324968] p-6 text-[18px] text-[#B8BECF]">
              <h4 className="md:text-[39px] font-[500] text-white">
                {t("services.icDesign.cards.ip.title")}
              </h4>
              <p className="md:text-[16px] mb-6 font-[400] text-white opacity-75 max-w-[300px]">
                {t("services.icDesign.cards.ip.intro")}
              </p>
              <hr className="-mx-6 my-4 w-[calc(100%+3rem)] border-0 border-t border-white/[.31]" />
              <p className="mt-8 text-white/75 text-[21px] font-[400]">
                {t("services.icDesign.cards.ip.servicesTitle")}
              </p>
              <ol className="mt-3 list-decimal space-y-1 pl-4 text-[14px] font-[300]">
                {ipServices.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ol>
              <br /><br /><br />
              <hr className="-mx-6 my-4 w-[calc(100%+3rem)] border-0 border-t border-white/[.31]" />
              <p className="mt-5">{t("services.icDesign.cards.ip.summary")}</p>
            </article>
          </div>
        </div>
      ),
    },
    {
      title: t("services.ipBlocks.title"),
      id: "ip-blocks",
      bgColor: "bg-[#182434]",  
      content: (
        <div className="rounded-[17px] border border-white/[.15] text-[16px] font-[100] text-[#B8BECF]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {ipBlocks.map((block, index) => (
              <div
                key={index}
                className={`p-8 px-10 min-h-[107px] flex items-center
                ${index % 2 === 0 ? "md:border-r" : ""}
                ${index < ipBlocks.length - (ipBlocks.length % 2 === 0 ? 2 : 1) ? "border-b" : ""}
                border-white/[.15]`}
              >
                <p>
                  <strong className="text-white/75 font-[700]">{block.title}</strong>{" "}
                  {block.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: t("services.software.title"),
      id: "software",
      bgColor: "bg-[#101823]",
      content: (
        <p>
          <Trans
            i18nKey="services.software.content"
            components={{ strong: <strong /> }}
          />
        </p>
      ),
    },
  ];

  const initialOffsetPx = viewportHeightPx || 1000;
  const thirdCardRevealOverlapPx = Math.max(
    24,
    Math.round((viewportHeightPx || 1000) * 0.06),
  );
  const firstCardScrollPx = Math.max(120, contentHeightsPx[0] ?? 0);
  const secondCardScrollPx = Math.max(120, contentHeightsPx[1] ?? 0);
  const thirdCardScrollPx =
    viewportHeightPx > 0
      ? Math.max(0, (contentHeightsPx[2] ?? 0) - viewportHeightPx)
      : 0;
  const secondInitialOffsetPx = Math.max(
    0,
    initialOffsetPx - SECOND_CARD_PEEK_PX,
  );
  const thirdInitialOffsetPx = Math.max(
    0,
    initialOffsetPx - THIRD_CARD_PEEK_PX,
  );

  const secondCardRevealEndPx = Math.max(
    120,
    firstCardScrollPx * SECOND_CARD_REVEAL_END_RATIO,
  );
  const secondCardRevealStartPx = Math.max(
    0,
    secondCardRevealEndPx - SECOND_CARD_REVEAL_DURATION_PX,
  );
  const secondCardContentEndPx = secondCardRevealEndPx + secondCardScrollPx;

  const thirdCardRevealEndPx = Math.max(
    0,
    secondCardContentEndPx - thirdCardRevealOverlapPx,
  );
  const thirdCardRevealStartPx = Math.max(
    0,
    thirdCardRevealEndPx - CARD_REVEAL_DURATION_PX,
  );
  const thirdCardContentEndPx = thirdCardRevealEndPx + thirdCardScrollPx;

  const firstCardY = useTransform(
    scrollY,
    [sectionStartY, sectionStartY + secondCardRevealEndPx],
    [0, -firstCardScrollPx],
    { clamp: true },
  );

  const secondCardY = useTransform(
    scrollY,
    [
      sectionStartY + secondCardRevealStartPx,
      sectionStartY + secondCardRevealEndPx,
      sectionStartY + secondCardContentEndPx,
    ],
    [secondInitialOffsetPx, 0, -secondCardScrollPx],
    { clamp: true },
  );

  const thirdCardY = useTransform(
    scrollY,
    [
      sectionStartY + thirdCardRevealStartPx,
      sectionStartY + thirdCardRevealEndPx,
      sectionStartY + thirdCardContentEndPx,
    ],
    [thirdInitialOffsetPx, 0, -thirdCardScrollPx],
    { clamp: true },
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-[#090D12]"
      style={{
        height: `${sectionHeightPx}px`,
      }}
    >
      <div className="top-0 z-40 py-6">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg uppercase text-white/60 tracking-wider">
            {t("services.title")}
          </h2>
        </div>
      </div>

      <div className="sticky top-0 h-screen overflow-visible">
        <motion.div
          ref={(element) => {
            cardRefs.current[0] = element;
          }}
          style={{ y: firstCardY, zIndex: 10 }}
          className={`${services[0].bgColor} absolute left-0 right-0 top-0 mx-auto w-full max-w-[1280px] min-h-screen flex flex-col overflow-visible rounded-t-[17px] rounded-b-none shadow-lg`}
        >
          <div
            aria-hidden="true"
            className={`${services[0].bgColor} pointer-events-none absolute inset-x-0 top-0 -z-10 rounded-t-[17px]`}
            style={{ height: `${CARD_BG_TAIL_HEIGHT_VH}vh` }}
          />
          <div
            ref={(element) => {
              contentRefs.current[0] = element;
            }}
            className="relative z-10"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
              <h3 className="text-3xl text-white mb-8">{services[0].title}</h3>
            </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-24 text-lg text-white/70 leading-relaxed break-words [&_img]:max-w-full [&_img]:h-auto [&_video]:max-w-full [&_iframe]:max-w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_table]:w-full">
              {services[0].content}
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={(element) => {
            cardRefs.current[1] = element;
          }}
          style={{ y: secondCardY, zIndex: 20 }}
          className={`${services[1].bgColor} absolute left-0 right-0 top-0 mx-auto w-full max-w-[1280px] min-h-screen flex flex-col overflow-visible rounded-t-[17px] rounded-b-none shadow-lg`}
        >
          <div
            aria-hidden="true"
            className={`${services[1].bgColor} pointer-events-none absolute inset-x-0 top-0 -z-10 rounded-t-[17px]`}
            style={{ height: `${CARD_BG_TAIL_HEIGHT_VH}vh` }}
          />
          <div
            ref={(element) => {
              contentRefs.current[1] = element;
            }}
            className="relative z-10"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
              <h3 className="text-3xl text-white mb-8">{services[1].title}</h3>
            </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-24 text-lg text-white/70 leading-relaxed break-words [&_img]:max-w-full [&_img]:h-auto [&_video]:max-w-full [&_iframe]:max-w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_table]:w-full">
              {services[1].content}
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={(element) => {
            cardRefs.current[2] = element;
          }}
          style={{ y: thirdCardY, zIndex: 30 }}
          className={`${services[2].bgColor} absolute left-0 right-0 top-0 mx-auto w-full max-w-[1280px] min-h-screen flex flex-col overflow-visible rounded-t-[17px] rounded-b-none shadow-lg`}
        >
          <div
            aria-hidden="true"
            className={`${services[2].bgColor} pointer-events-none absolute inset-x-0 top-0 -z-10 rounded-t-[17px]`}
            style={{ height: `${CARD_BG_TAIL_HEIGHT_VH}vh` }}
          />
          <div
            ref={(element) => {
              contentRefs.current[2] = element;
            }}
            className="relative z-10"
          >
            <div className="w-full px-4 sm:px-6 lg:px-8 pt-8">
              <h3 className="text-3xl text-white mb-8">{services[2].title}</h3>
            </div>
            <div className="w-full px-4 sm:px-6 lg:px-8 pb-24 text-lg text-white/70 leading-relaxed break-words [&_img]:max-w-full [&_img]:h-auto [&_video]:max-w-full [&_iframe]:max-w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words [&_table]:w-full">
              {services[2].content}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
