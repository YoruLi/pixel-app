import { JSX } from "preact";

interface SvgProps extends JSX.SVGAttributes<SVGSVGElement> {
  path: string;
  viewbox: string;
}
export function Svg({ path, viewbox, className, ...rest }: SvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox={viewbox || "0 0 24 24"}
      style="fill: rgba(0, 0, 0, 1);transform: ;msFilter:;"
      {...rest}
    >
      <path d={path}></path>
    </svg>
  );
}
