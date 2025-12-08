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
  { href: "#contact", label: "Careers" },
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
      document.documentElement.classList.add("modal-open");
    } else {
      document.documentElement.classList.remove("modal-open");
    }
    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (isHomePage) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    }
    setIsOpen(false);
  };

  const desktopNavLinks = [
    { href: "#about", label: "About" },
    { href: "#products", label: "Products & Services" },
    { href: "#team", label: "Team" },
  ];

  const DesktopNavContent = () => (
    <>
      {desktopNavLinks.map((link) => (
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
    <div
      className={cn(
        "flex flex-col justify-between h-full w-full max-w-[1180px] mx-auto px-6 sm:px-6 lg:px-8 pt-0  transition-opacity duration-500 ease-in-out",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <nav className="flex flex-col items-start gap-4 mt-24">
        {navLinks.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleLinkClick(e, link.href)}
            className="text-[20px] text-[#ffffff] opacity-[.63] transition-colors hover:opacity-[1]"
            style={{
              animation: isOpen
                ? `fade-in-up 0.6s ease-out ${300 + i * 100}ms forwards`
                : "none",
              opacity: 0,
            }}
          >
            {link.label}
          </a>
        ))}
      </nav>
      <div className="border-t border-white/10 pt-3 pb-4 text-center">
        <Button
          variant="outline"
          size="sm"
          className="bg-transparent hover:bg-transparent hover:text-[#ffffff] text-[#F0F2F7] opacity-[.28] h-auto px-4 py-1.5 text-xl w-[100px] border-none justify-center"
        >
          English
          <Globe className="w-[20px] h-[20px] ml-auto" />
        </Button>
        <p className="text-[14px] text-[#B8BECF] opacity-25 mt-3 mb-[-7px] text-balance">
          &copy; {new Date().getFullYear()} Sirius Semiconductors.
        </p>
      </div>
    </div>
  );

  return (
    <>
      <header
        className={cn(
          "fixed top-0 py-1 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen
            ? "bg-transparent backdrop-blur-lg border-none"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[70px]">
            <Link
              href="/"
              className="relative z-50 w-[132px] h-[36px]"
              prefetch={false}
              style={{ willChange: "opacity" }}
            >
              <Image
                src="/siriuslogo.svg"
                alt="Sirius Logo"
                fill
                priority
                className={cn(
                  "transition-opacity duration-300",
                  scrolled && !isOpen ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/siriuslogo.svg"
                alt="Sirius Logo"
                fill
                priority
                className={cn(
                  "transition-opacity duration-300",
                  scrolled && !isOpen ? "opacity-100" : "opacity-0"
                )}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-10">
              <DesktopNavContent />
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent hover:bg-white/10 text-white/80 border-white/30 h-auto px-4 py-1.5 text-lg"
              >
                English
                <Globe className="w-4 h-4" />
              </Button>
            </nav>

            <div className="md:hidden z-50">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-[30px] h-6 flex flex-col justify-between items-center focus:outline-none"
              >
                <span
                  className={cn(
                    "w-full h-[3px] bg-white transform transition duration-300 ease-in-out",
                    isOpen ? "rotate-45 translate-y-[11px]" : ""
                  )}
                />
                <span
                  className={cn(
                    "w-full h-[3px] bg-white transition-opacity duration-300 ease-in-out",
                    isOpen ? "opacity-0" : ""
                  )}
                />
                <span
                  className={cn(
                    "w-full h-[3px] bg-white transform transition duration-300 ease-in-out",
                    isOpen ? "-rotate-45 -translate-y-[10px]" : ""
                  )}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-500 ease-in-out z-30",
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-[390px] bg-[#080B10] backdrop-blur-lg text-white transform transition-transform duration-500 ease-in-out z-40",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <MobileNavContent />
      </div>
    </>
  );
}
