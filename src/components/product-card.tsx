'use client';

import { motion } from 'framer-motion';

type ProductCardProps = {
  title: string;
  description: string;
  details: string;
  backgroundImage?: string;
};

export function ProductCard({
  title,
  description,
  details,
  backgroundImage,
}: ProductCardProps) {
  return (
    <>
      <motion.div
        className="relative w-[388px] h-[503px] cursor-pointer flex-shrink-0"
      >
        {/* Обёртка карточки */}
        <div className="relative h-full flex flex-col justify-end overflow-hidden rounded-[24px] border border-white/10 bg-[#101823] shadow-[0_10px_40px_rgba(0,0,0,0.45),0_0_25px_rgba(0,170,255,0.2),inset_0px_0px_35.5px_0px_rgba(255,255,255,0.25),inset_0px_0px_162.1px_0px_rgba(4,117,208,0.6)] backdrop-blur-[4px] transition-all duration-300">

          {/* Фон / изображение */}
          {backgroundImage && (
            <div className="inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={backgroundImage}
                alt=""
                className="w-full h-full object-cover object-center opacity-80 transition-opacity duration-500"
                fetchPriority="high"
                loading="eager"
              />
            </div>
          )}

          {/* Градиент-оверлей */}
          <div className="absolute inset-0 z-[1]" />

          {/* Контент */}
          <div className="relative z-[2] px-8 pb-[28px]">
            <h3 className="text-[28px] mt-[34px] text-center leading-[1.2] font-bold font-headline text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
              {title}
            </h3>
            <p className="mt-3 text-[22px] text-center leading-[1.5] text-white/70">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
