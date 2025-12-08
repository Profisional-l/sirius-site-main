"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products & Services" },
  { href: "#team", label: "Team" },
];

export function Header({ showNav = true }: { showNav?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
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
          className="text-lg text-white/80 transition-colors hover:text-white"
        >
          {link.label}
        </a>
      ))}
    </>
  );

  const MobileNavContent = () => (
    <>
      {navLinks.map((link, i) => (
         <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className={`h-[75px] text-5xl animate-fade-in-up delay-[${i * 100}ms]`}
          >
            {link.label}
          </a>
      ))}
       <Button
        variant="outline"
        size="sm"
        className={`bg-transparent hover:bg-white/10 text-white/80 border-white/30 h-auto px-4 py-1.5 text-xl animate-fade-in-up delay-[${navLinks.length * 100}ms]`}
      >
         English<Globe className="w-4 h-4" />
      </Button>
    </>
  );


  return (
    <>
      {showNav && (
        <>
          <div
            className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-500 z-30 pointer-events-none ${isOpen ? "opacity-50" : "opacity-0"
              }`}
          />
          <div
            className={`fixed top-0 left-0 w-full bg-background/95 backdrop-blur-lg text-white uppercase flex flex-col items-center justify-center gap-4 text-center transform transition-transform duration-500 ease-in-out z-40 ${isOpen ? "translate-y-0 h-full" : "-translate-y-full h-0"
              }`}
            style={{ willChange: "transform" }}
          >
            <MobileNavContent />
          </div>
        </>
      )}

      <header
        className={cn(
          "absolute top-0 py-3 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen
            ? "bg-background/80 backdrop-blur-lg border-b border-white/10"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <Link href="/" className="flex items-center gap-2 z-50" prefetch={false}>
              <Image
                src="/siriuslogo.svg"
                alt="Sirius Logo"
                width={132}
                height={36}
                className={cn("transition-all", isOpen ? "filter-brightness-200" : "")}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <NavContent />
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-white/10 text-white/80 border-white/30 h-auto px-4 py-1.5 text-lg"
              >
                English<Globe className="w-4 h-4" />
              </Button>
            </nav>

            <div className="md:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-[30px] h-6 flex flex-col justify-between items-center focus:outline-none"
              >
                <span
                  className={`w-full h-[3px] transform transition duration-300 ease-in-out ${isOpen ? "rotate-45 translate-y-[9.5px] bg-white" : "bg-white"
                    }`}
                />
                <span
                  className={`w-full h-[3px] transition-opacity duration-300 ease-in-out ${isOpen ? "opacity-0" : "opacity-100 bg-white"
                    }`}
                />
                <span
                  className={`w-full h-[3px] transform transition duration-300 ease-in-out ${isOpen ? "-rotate-45 -translate-y-[9.5px] bg-white" : "bg-white"
                    }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>
       <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out forwards;
          opacity: 0;
        }

        .delay-\\[0ms\\] {
          animation-delay: 100ms;
        }
        .delay-\\[100ms\\] {
          animation-delay: 200ms;
        }
        .delay-\\[200ms\\] {
          animation-delay: 300ms;
        }
        .delay-\\[300ms\\] {
          animation-delay: 400ms;
        }
      `}</style>
    </>
  );
}