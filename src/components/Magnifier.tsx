import * as React from "react";

function IconBasic_magnifier(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="currentColor"
      height="100%"
      width="100%"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      >
        <path d="M41 21 A20 20 0 0 1 21 41 A20 20 0 0 1 1 21 A20 20 0 0 1 41 21 z" />
        <path d="M35 35l6 6" />
        <path strokeWidth={1.99998} d="M63 57l-5.999 6-19-19 6-6z" />
      </g>
    </svg>
  );
}

export default IconBasic_magnifier;
