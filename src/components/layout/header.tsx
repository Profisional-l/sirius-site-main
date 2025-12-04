'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { SiriusLogo } from '@/components/icons/sirius-logo';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products & Services' },
  { href: '#team', label: 'Team' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-white/70 transition-colors hover:text-white"
        >
          {link.label}
        </Link>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="bg-white/10 border-white/20 hover:bg-white/20 h-auto px-3 py-1.5 text-sm"
      >
        English <ChevronDown className="w-4 h-4 ml-1" />
      </Button>
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-background/80 backdrop-blur-sm border-b border-white/10'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <SiriusLogo className="w-6 h-6 text-white" />
            <span className="text-lg font-bold uppercase text-white tracking-wider">
              Sirius
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <NavContent />
          </nav>

          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-white" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-card border-l-border w-full max-w-xs">
                <div className="flex flex-col h-full">
                   <div className="p-4 border-b border-border">
                     <Link href="/" className="flex items-center gap-2" prefetch={false}>
                        <SiriusLogo className="w-6 h-6 text-white" />
                        <span className="text-lg font-bold uppercase text-white tracking-wider">
                          Sirius
                        </span>
                      </Link>
                   </div>
                  <nav className="flex flex-col gap-6 p-4 mt-4">
                    <NavContent />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
