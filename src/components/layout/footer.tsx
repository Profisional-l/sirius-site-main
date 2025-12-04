import Link from 'next/link';
import { SiriusLogo } from '@/components/icons/sirius-logo';

export function Footer() {
  return (
    <footer className="bg-[#020612] border-t border-white/10">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4 space-y-4 text-white/60">
            <Link href="/" className="flex items-center gap-2 mb-4" prefetch={false}>
              <SiriusLogo className="w-7 h-7 text-white" />
              <span className="text-xl font-bold uppercase text-white tracking-wider">
                Sirius
              </span>
            </Link>
            <p className="text-sm">
              1456 Nguyen Van Linh, Mg Town 14th Ward, Tan Phong Ward, District
              7, Ho Chi Minh City, Vietnam
            </p>
            <p className="text-sm">(+84) 0888 317 789</p>
            <p className="text-sm">info@rise-hitech</p>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#about" className="text-sm text-white/60 hover:text-white transition">About</Link>
                </li>
                <li>
                  <Link href="#products" className="text-sm text-white/60 hover:text-white transition">Products & Services</Link>
                </li>
                <li>
                  <Link href="#industries" className="text-sm text-white/60 hover:text-white transition">Industries</Link>
                </li>
                <li>
                  <Link href="#team" className="text-sm text-white/60 hover:text-white transition">Team</Link>
                </li>
                <li>
                  <Link href="#contact" className="text-sm text-white/60 hover:text-white transition">Careers</Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Legal
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition">Terms & Conditions</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-white/60 hover:text-white transition">Cookies</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Sirius Semiconductors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
