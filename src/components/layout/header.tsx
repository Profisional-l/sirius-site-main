"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header({ showNav = true }: { showNav?: boolean }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navLinks = [
    { href: "#about", label: "header.about" },
    { href: "#products", label: "header.productsServices" },
    { href: "#team", label: "header.team" },
    { href: "#contact", label: "header.careers" },
  ];

  const desktopNavLinks = [
    { href: "#about", label: "header.about" },
    { href: "#products", label: "header.productsServices" },
    { href: "#team", label: "header.team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.documentElement.classList.toggle("modal-open", isOpen);
    return () => {
      document.documentElement.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHomePage) {
      e.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  const LanguageSwitcher = ({ isMobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {isMobile ? (
          <Button className="langBut bg-transparent hover:bg-transparent hover:text-[#ffffff] text-[#ffffff] opacity-[.28] hover:opacity-70 transition-opacity-[0.33s] h-auto px-4 py-1.5 text-xl w-[150px] border-none justify-center">
            {i18n.language === 'en' ? 'English' : 'Vietnamese'}
            <Globe className="w-[20px] h-[20px]" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="bg-transparent hover:bg-white text-white/80 hover:text-black border-white/30 h-auto px-4 py-1.5 text-lg"
          >
            {hasMounted && (i18n.language === 'en' ? t('header.english') : t('header.vietnamese'))}
            <Globe className="w-4 h-4" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black/40 backdrop-blur-lg border-none">
        <DropdownMenuItem onClick={() => changeLanguage("en")}>
          {hasMounted && t('header.english')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => changeLanguage("vi")}>
          {hasMounted && t('header.vietnamese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  if (!hasMounted) {
    return null;
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 py-1 left-0 right-0 z-50 transition-all duration-300",
          scrolled || isOpen ? "backdrop-blur-lg border-none" : "bg-transparent",
          !isVisible && !isOpen ? "-translate-y-full" : "translate-y-0"
        )}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
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

            {showNav && (
              <Fragment>
                <nav className="hidden md:flex items-center gap-10">
                  {desktopNavLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-lg text-white/80 transition-colors hover:text-white"
                    >
                      {t(link.label)}
                    </a>
                  ))}
                  <LanguageSwitcher />
                </nav>

                <div className="md:hidden z-50">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative w-[30px] h-6 flex flex-col justify-between items-center focus:outline-none"
                  >
                    <span className={cn( "w-full h-[3px] bg-white transform transition duration-300 ease-in-out", isOpen ? "rotate-45 translate-y-[11px]" : "" )}/>
                    <span className={cn( "w-full h-[3px] bg-white transition-opacity duration-300 ease-in-out", isOpen ? "opacity-0" : "" )}/>
                    <span className={cn( "w-full h-[3px] bg-white transform transition duration-300 ease-in-out", isOpen ? "-rotate-45 -translate-y-[10px]" : "" )}/>
                  </button>
                </div>
              </Fragment>
            )}
          </div>
        </div>
      </header>

      {/* Overlay */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-500 ease-in-out z-30",
          isOpen ? "opacity-60" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 w-full h-[420px] bg-[#080B10] backdrop-blur-lg text-white transform transition-transform duration-500 ease-in-out z-40",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className={cn( "flex flex-col justify-between h-full w-full max-w-[1280px] mx-auto px-6 sm:px-6 lg:px-8 pt-0 transition-opacity duration-500", isOpen ? "opacity-100" : "opacity-0" )}>
          <nav className="flex flex-col items-start gap-4 mt-24">
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[20px] text-[#A4A5A7] transition-colors hover:text-[#FFFFFF]"
                style={{
                  animation: isOpen ? `fade-in-up 0.6s ease-out ${350 + i * 120}ms forwards` : "none",
                  opacity: 0,
                }}
              >
                {t(link.label)}
              </a>
            ))}
          </nav>
          <div className="border-t border-white/10 pt-3 pb-4 text-center">
            <LanguageSwitcher isMobile={true} />
            <p className="text-[14px] text-[#B8BECF] opacity-25 mt-3 mb-[-7px] px-4">
              {t('copyright', { year: new Date().getFullYear() })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
