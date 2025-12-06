"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#products", label: "Products & Services" },
  { href: "#team", label: "Team" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // const handleScroll = () => {
    //   setScrolled(window.scrollY > 0);
    // };
    // window.addEventListener("scroll", handleScroll);
    // return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const NavContent = () => (
    <>
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className=" text-[18px]  transition-colors hover:text-white/70"
        >
          {link.label}
        </Link>
      ))}
      <Button
        variant="outline"
        size="sm"
        className="bg-transparent hover:bg-[#ffffff00] hover:text-white/70 border-[#F0F2F787] h-auto px-4 py-1.5 text-[18px]"
      >
         English<Globe className="w-4 h-4" />
      </Button>
    </>
  );

  return (
    <header
      className={cn(
        "absolute top-0 py-3 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-white/10"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[70px]">
          <Link href="/" className="flex items-center gap-2" prefetch={false}>
            <Image
              src="/siriuslogo.svg"
              alt="Sirius Logo"
              width={132}
              height={36}
              className="text-white"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-10 ">
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
              <SheetContent
                side="right"
                className="bg-card border-l-border w-full max-w-xs"
              >
                <div className="flex flex-col h-full">
                  <div className="p-4 border-b border-border">
                    <Link
                      href="/"
                      className="flex items-center gap-2"
                      prefetch={false}
                    >
                      <Image
                        src="/siriuslogo.svg"
                        alt="Sirius Logo"
                        width={24}
                        height={24}
                        className="w-6 h-6 text-white"
                      />
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
