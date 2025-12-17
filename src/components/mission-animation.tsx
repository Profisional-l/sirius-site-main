'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export function MissionAnimation() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const opacity1 = useTransform(
    scrollYProgress,
    // Fade out as scroll reaches 40-50%
    [0.4, 0.5],
    [1, 0],
  );

  const opacity2 = useTransform(
    scrollYProgress,
    // Fade in at 40-50% and stay visible
    [0.4, 0.5],
    [0, 1],
  );

  return (
    // Add margin to the bottom to create space before the next section
    <div ref={container} className="relative h-[200vh] pb-40">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.p
          style={{ opacity: opacity1 }}
          className="absolute font-headline font-medium text-[28px] md:text-[56px] max-w-[330px] md:max-w-4xl mx-auto leading-[1.26] tracking-tight text-center"
        >
          Sirius Semiconductors was established{' '}
          <span className="text-primary">
            to <br className="md:hidden" />
            reach an ambitious target
          </span>{' '}
          to turn Vietnam into a technological powerhouse.
        </motion.p>
        <motion.p
          style={{ opacity: opacity2 }}
          className="absolute font-headline font-medium text-[28px] md:text-[56px] max-w-[330px] md:max-w-[60rem] mx-auto leading-[1.26] tracking-tight text-center"
        >
          We are here to provide{' '}
          <span className="text-primary">
            expertise,
            <br />
            technologies, service and products
          </span>
          <br />
          in microelectronics for partners in a<br />
          Vietnamese market and way beyond
        </motion.p>
      </div>
    </div>
  );
}
