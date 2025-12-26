"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation, Trans } from 'react-i18next';

export function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className="bg-[#020612] border-t border-white/10">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 py-4 md:pt-12 pb-3 md:pb-6">
        <div className="grid grid-cols-1 mt-3 md:mt-0 md:grid-cols-12 md:gap-8">
          {/* Лого и адрес - слева */}
          <div className="md:col-span-4 space-y-4 w-[311px]">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
              prefetch={false}
            >
              <Image
                src={isMobile ? "/footerLogoMobile.svg" : "/footerLogo.svg"}
                alt="Sirius Logo"
                width={131}
                height={35}
                className="w-[112px] md:w-[131px] h-[29px] md:h-[35px] text-white"
              />
            </Link>
            <div className="text-[14px] hidden md:block md:text-[16px] text-[#B8BECF] opacity-50">
              <p className="" dangerouslySetInnerHTML={{ __html: t('footer.address')}}/>
              <p className="pt-5">{t('footer.phone')}</p>
              <p className="mt-0">{t('footer.email')}</p>
            </div>
          </div>

          {/* Пустой блок для отступа */}
          <div className="hidden md:block md:col-span-2"></div>

          {/* Навигация и Legal - справа */}
          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-20 md:justify-end md:ml-auto">
            <div>
              <h3 className="text-sm uppercase text-mono text-[#B8BECF] opacity-50 hidden md:block">
                {t('footer.navigation')}
              </h3>
              <ul className="mt-2 space-y-1 text-[18px] text-[#FFFFFF] opacity-80 md:opacity-100 md:text-[#B8BECF] transition navigateList">
                <li>
                  <Link href="#about">{t('footer.about')}</Link>
                </li>
                <li>
                  <Link href="#products">{t('footer.productsServices')}</Link>
                </li>
                <li>
                  <Link href="#industries">{t('footer.industries')}</Link>
                </li>
                <li>
                  <Link href="#team">{t('footer.team')}</Link>
                </li>
                <li>
                  <Link href="#contact">{t('footer.careers')}</Link>
                </li>
              </ul>
            </div>

            <div className="hidden md:block">
              <h3 className="text-sm uppercase text-mono text-[#B8BECF] opacity-50">
                {t('footer.legal')}
              </h3>
              <ul className="mt-2 space-y-0">
                <li>
                  <Link href="/terms" className="text-[18px] text-[#B8BECF] hover:text-white transition">
                    {t('footer.terms')}
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-[18px] text-[#B8BECF] hover:text-white transition">
                    {t('footer.privacy')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 md:mt-16 md:hidden  border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <div className="text-[14px] md:text-[16px] text-[#ffffff] opacity-50 text-start">
            <h3 className="text-[16px] font-[500] text-mono mb-2 -mt-2">{t('contact.office')}</h3>
            <p className="" dangerouslySetInnerHTML={{ __html: t('contact.address') }} />
            <h3 className="text-[16px] text-mono mb-2 mt-5 font-[500]">{t('contact.call')}</h3>
            <p className="">{t('contact.phone')}</p>
            <h3 className="text-[16px] text-mono mb-2 mt-5 font-[500]">{t('contact.email')}</h3>
            <p className="">{t('contact.emailAddress')}</p>
          </div>
        </div>
        
          <div className="mt-6 md:mt-12 border-t border-white/10 pt-8 text-center md:text-start text-sm ">
            <p className="-mt-5 md:-mt-2 text-[#B8BECF] opacity-25">
              {t('footer.copyright', { year: currentYear })}
            </p>
          </div>
      </div>
    </footer>
  );
}
