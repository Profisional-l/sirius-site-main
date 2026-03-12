"use client";

import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function HistorySection() {
  const { t } = useTranslation();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.8], [0.4, 0.4, 0]);

  const history = [
    { suffix: "04", text: t("history.2004") },
    { suffix: "07", text: t("history.2007") },
    { suffix: "10", text: t("history.2010") },
    { suffix: "17", text: t("history.2017") },
    { suffix: "18", text: t("history.2018") },
    { suffix: "25", text: t("history.2025") },
  ];

  return (
    <section id="history" className="relative bg-[#090D12] text-white">
      <div ref={targetRef} className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 ">
        <div className="pt-0 pb-12 sm:pb-16 relative">
          <motion.h2
            style={{ opacity }}
            className="space-mono-regular uppercase text-[#F0F2F7] opacity-40
                       text-[clamp(14px,3vw,18px)] leading-[1.47] tracking-normal
                       md:sticky top-24 sm:top-28 md:top-32 md:translate-y-[72px] z-20"
          >
            HISTORY
          </motion.h2>

          <div className="grid grid-cols-[auto_1fr] gap-x-0 sm:gap-x-0 md:gap-y-6 mx-auto w-full md:w-fit max-w-full">
            <div className="sticky top-24 sm:top-28 md:top-32 self-start pr-0 sm:pr-4 md:pr-0">
              <span className="font-headline text-[clamp(80px,20vw,200px)] md:leading-[1.3] tracking-[-0.25rem]">
                20
              </span>
            </div>

            <div className="space-y-20 sm:space-y-24 md:space-y-32 min-w-0">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`relative z-10 flex flex-row md:items-end gap-3 sm:gap-16 max-w-[660px] min-w-0 ${index !== history.length - 1 ? "border-b border-gray-600/40" : ""}`}
                >
                  <span className="font-headline text-[clamp(80px,20vw,200px)] md:leading-[1.3] tracking-[-0.25rem] shrink-0">
                    {item.suffix}
                  </span>
                  <p
                    className="self-end pb-8 sm:pb-[50px] text-[10px] md:text-[clamp(16px,4vw,22px)] text-[#F0F2F7] w-full md:max-w-[369px] leading-[1.3] min-w-0 font-medium tracking-[-0.02em] opacity-75"
                    dangerouslySetInnerHTML={{ __html: item.text }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
