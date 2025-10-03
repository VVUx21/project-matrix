import { shlop } from "@/app/font";

type Props = {
  children: React.ReactNode;
  variant?: "xs" | "sm" | "lg" | "xl" | "default";
  style?: React.CSSProperties;
  className?: string;
};

const Heading = ({ children, variant = "default", style,className }: Props) => {
  let textSize = "";
  if (variant === "lg") {
    textSize += " text-7xl sm:text-8xl lg:text-9xl";
  } else if (variant === "sm") {
    textSize += " text-4xl sm:text-5xl lg:text-6xl";
  } else if (variant === "xs") {
    textSize += " text-3xl sm:text-4xl lg:text-5xl";
  } else if (variant === "xl") {
    textSize += " text-4xl sm:text-6xl lg:text-7xl";
  } else {
    textSize += " text-5xl sm:text-6xl lg:text-7xl";
  }

  return (
    <h1
      className={`${shlop.className} ${textSize} ${className} font-bold`}
      style={style}
    >
      {children}
    </h1>
  );
};

export default Heading;