import './globals.css';
import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Source_Code_Pro } from 'next/font/google';
import { Suspense } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { I18nProvider } from '@/components/i18n-provider';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

const fontCode = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: 'Sirius Semiconductors',
  description: 'A Microelectronics Technological Hub',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-body text-foreground antialiased',
          fontBody.variable,
          fontHeadline.variable,
          fontCode.variable
        )}
      >
        <I18nProvider>
          <Suspense fallback={<div>Loading...</div>}>
            <Header />
            <main>{children}</main>
            <Footer />
            <Toaster />
          </Suspense>
        </I18nProvider>
      </body>
    </html>
  );
}
