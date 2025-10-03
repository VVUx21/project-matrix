import Image from "next/image";
import Link from "next/link";

type Props = {
    className?: HTMLDivElement["className"];
};
const extraLinks = [
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Terms and Conditions",
    link: "/terms-and-conditions",
  },
  {
    name: "Refund Policy",
    link: "/refund-policy",
  },
  {
    name: "Code of Conduct",
    link: "/code-of-conduct",
  },
];
const WebFooter = (props: Props) => {
  return (
    <div
      className={
        "flex justify-between items-center text-xs sm:text-base text-white/80 gap-8 " +
        props.className
      }
    >
      <div className="flex flex-col gap-2">
        <p>
          Magically molded with 🤍 and a sprinkle of{" "}
          <a
            href="http://twitter.com/hackodisha"
            className="hover:underline underline-offset-4 hover:text-white transition-colors ease-in"
          >
            Chemical 𝕏{" "}
          </a>{" "}
          by{" "}
          <a
            href="http://teamwebwiz.dev/"
            className="hover:border-b-2 hover:text-white transition-colors ease-in "
          >
            <span className="inline-flex justify-between items-center text-white  gap-2 ">
              {" "}
              Team{" "}
              <Image
                src={"/webwiz.svg"}
                alt="</WEBWIZ"
                width={120}
                height={15}
                className="invert object-contain object-center w-[80px] h-auto sm:w-[120px] sm:h-auto"
              ></Image>
            </span>
          </a>
        </p>
        <div className="bottomlinks">
        <div className="sm:flex hidden justify-around items-center gap-36 py-4 w-[full] mx-auto">
        {extraLinks.map((item) => (
              <Link
                href={item.link}
                className="hover:underline underline-offset-2 opacity-80 hover:opacity-100 text-[#FFF] text-[0.7rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]"
                key={item.link}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </div>
      </div>
      <div className="hover:border hover:border-white p-2 rounded-3xl transition-all ease-in hover:bg-white/5">
        <Image
          src={"/nuxww.png"}
          alt="nu x webwiz"
          width={80}
          height={80}
        ></Image>
      </div>
    </div>
  );
};

export default WebFooter;
