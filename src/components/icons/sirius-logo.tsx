import type { SVGProps } from "react";
import Image from 'next/image';

export function SiriusLogo(props: SVGProps<SVGSVGElement> & {width?: number; height?: number}) {
  return (
    <Image src="/siriuslogo.svg" alt="Sirius Logo" width={props.width || 24} height={props.height || 24} {...props} />
  );
}
