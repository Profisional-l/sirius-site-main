import type { SVGProps } from "react";

export function SiriusLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      <path d="M12 2v19.77" />
      <path d="M22 9.27h-7.23" />
      <path d="M2 9.27h7.23" />
      <path d="m7 14.14 3.5-1.83" />
      <path d="m17 14.14-3.5-1.83" />
    </svg>
  );
}
