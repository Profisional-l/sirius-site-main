'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products & Services' },
  { href: '#team', label: 'Team' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add('modal-open');
    } else {
      document.documentElement.classList.remove('modal-open');
    }
    return () => {
      document.documentElement.classList.remove('modal-open');
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
    setIsOpen(false);
  };

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
         <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleLinkClick(e, link.href)}
          className="text-white/70 transition-colors hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  return (
    <>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm transition-opacity duration-500 z-30 pointer-events-none ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={cn(
          'fixed top-0 left-0 w-full bg-card/95 backdrop-blur-lg text-white flex flex-col items-center justify-center text-2xl font-medium transform transition-transform duration-500 ease-in-out z-40',
          isOpen ? 'translate-y-0' : '-translate-y-full',
          'h-auto py-8'
        )}
        style={{ willChange: 'transform' }}
      >
        <nav className="flex flex-col items-center gap-6">
          {navLinks.map((link, i) =>
            isHomePage ? (
              <a
                key={link.href}
                className={cn('animate-fade-in-up', `delay-${i * 100}`)}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={`/${link.href}`}
                className={cn('animate-fade-in-up', `delay-${i * 100}`)}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
           <div className={cn('animate-fade-in-up', `delay-${navLinks.length * 100}`)}>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 bg-white/10 border-white/20 hover:bg-white/20 h-auto px-3 py-1.5 text-sm"
            >
              English <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </nav>
      </div>
    
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled && !isOpen
            ? 'bg-background/80 backdrop-blur-sm border-b border-white/10'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
              <Image src="/siriuslogo.svg" alt="Sirius Logo" width={132} height={36} className={cn('transition-all', isOpen ? 'invert' : '')} />
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <NavContent />
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/20 hover:bg-white/20 h-auto px-3 py-1.5 text-sm"
              >
                English <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </nav>

            <div className="md:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-[30px] h-6 flex flex-col justify-between items-center focus:outline-none"
              >
                <span
                  className={cn(
                    'w-full h-[3px] transform transition duration-300 ease-in-out',
                    isOpen ? 'rotate-45 translate-y-[9.5px] bg-white' : 'bg-white'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-[3px] transition-opacity duration-300 ease-in-out',
                    isOpen ? 'opacity-0' : 'opacity-100 bg-white'
                  )}
                />
                <span
                  className={cn(
                    'w-full h-[3px] transform transition duration-300 ease-in-out',
                    isOpen ? '-rotate-45 -translate-y-[9.5px] bg-white' : 'bg-white'
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
