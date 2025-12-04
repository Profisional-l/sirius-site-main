import type { SVGProps } from 'react';
import Image from 'next/image';

export function SiriusLogo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'>) {
  return (
    <Image src="/siriuslogo.svg" alt="Sirius Logo" width={24} height={24} {...props} />
  );
}
