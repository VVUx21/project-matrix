import { spirits } from "@/app/font";

type Props = {
  children: React.ReactNode;
  variant?: "default" | "sm" | "lg" | "faq" |"eventMob";
  className?: string;
  style?: React.CSSProperties;
};

const Typography = ({ children, variant, className, style }: Props) => {
  let textStyles = "";

  if (variant === "sm") {
    textStyles = "";
  } else if (variant == "lg") {
    textStyles = "text-sm sm:text-sm lg:text-sm font-bold";
  } else if (variant == "faq") {
    textStyles = "text-sm lg:text-base font-semibold sm:font-medium";
  } else if(variant == "eventMob"){
    textStyles = "text-sm sm:text-[20px] font-bold";
  }
  else {
    textStyles = "text-xl sm:text-2xl lg:text-3xl font-thin";
  }

  return (
    <p
      className={`${spirits.className} ${textStyles} ${className} text-md sm:text-sm lg:text-md`}
      style={style}
    >
      {children}
    </p>
  );
};

export default Typography;