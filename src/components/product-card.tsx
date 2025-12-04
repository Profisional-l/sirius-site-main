'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type ProductCardProps = {
  title: string;
  description: string;
  details: string;
};

function TechPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full stroke-primary/20 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="product-pattern"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x="50%"
          y="100%"
          patternTransform="translate(0 -1)"
        >
          <path d="M0 40V.5H40" fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" stroke="none" fill="url(#product-pattern)" />
    </svg>
  );
}

export function ProductCard({ title, description, details }: ProductCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300 }}
        className="relative w-full h-[360px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="h-full rounded-2xl bg-card/50 border border-white/10 p-6 flex flex-col justify-end overflow-hidden shadow-lg backdrop-blur-sm">
          <TechPattern />
          <div className="relative z-10">
            <h3 className="text-2xl font-bold font-headline text-white">{title}</h3>
            <p className="mt-2 text-white/70">{description}</p>
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-card border-primary/50 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">{title}</DialogTitle>
            <DialogDescription className="text-white/80 pt-4">
              {details}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
             <Button onClick={() => setIsOpen(false)} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">Close</Button>
            <Button>Contact Sales</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
