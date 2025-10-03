import Image from "next/image";
import Link from "next/link";

import Heading from "@/components/ui/Heading";
import Typography from "@/components/ui/Typography";

import WebFooter from "../Webfooter";

const extraLinks = [
    {
        name: "Privacy Policy",
        link: "/privacy-policy",
    },
    {
        name: "Terms & Conditions",
        link: "/terms-and-conditions",
    },
    {
        name: "Payment Policy",
        link: "/payment-policy",
    },
    {
        name: "Code Of Conduct",
        link: "/code-of-conduct",
    },
];

export default function Footer() {
    return (
        <div
            id="contact-us"
            className="bg-[#040D17] pt-4 sm:pt-14 relative z-40"
        >
            <div className="start grid grid-cols-1 sm:grid-cols-5  gap-4 sm:w-[90%] w-screen mx-auto border-b-2 border-[#E5E7EB] p-4">
                <div className="flex flex-col items-center sm:items-start pr-3 mb-4  gap-5">
                    <Image
                        src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1736520354/Branding_yt0agf.png"
                        alt="Top Image"
                        width={500}
                        height={500}
                        className="w-1/2 h-auto sm:hidden block lg:block"
                    />
                    <Typography
                        className="text-[#FFF] font-normal leading-5 text-[0.75rem]"
                        variant="sm"
                    >
                        NITRUTSAV, the annual Literary and Cultural festival of
                        National Institute of Technology, Rourkela aims at
                        providing students with a creative platform to
                        commemorate and introspectively explore the dimensions
                        of artistry and foster an environment of literary spree
                        and cultural diversity in the campus.
                    </Typography>
                </div>

                <div className=" sm:flex flex-1 align-sub mb-4 hidden">
                    <div className="pl-11 sm:pl-10">
                        <Heading className="text-[#CBFFFF]  font-normal text-[1rem] sm:text-[0.76rem] md:text-[0.88rem] lg:text-[1.02rem] xl:text-[1.3rem]">
                            Quick Links
                        </Heading>
                        <div className="links mt-3 text-[#FFF] flex flex-col items-start text-[0.7rem] sm:text-[0.75rem] md:text-[0.75rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]">
                            {[
                                "About us",
                                "Events",
                                "Sponsors",
                                "FAQs",
                                "Contact Us",
                            ].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item
                                        .toLowerCase()
                                        .replace(" ", "-")}`}
                                    className="text-white hover:text-[#CBFFFF] transition-colors tracking-wide duration-200 font-medium text-lg"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between w-[90%] mx-auto gap-4 sm:hidden">
                    <div className="flex-1  mb-4 max-w-[200px] ">
                        <Heading className="text-[#CBFFFF] text-[1.25rem] sm:text-[0.76rem] font-[open-sans-hebrew-condensed] font-normal md:text-[0.88rem] lg:text-[1.02rem] xl:text-[1.3rem]">
                            Contact Us:
                        </Heading>
                        <div className="mt-3 text-[0.7rem] sm:text-[0.63rem] md:text-[0.68rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]">
                            <div className="inline-flex  justify-between items-center gap-4 w-full ">
                                <h6 className="text-[#FFFCFC] text-sm ">
                                    Aditya:
                                </h6>
                                <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                    6371475323
                                </h6>
                            </div>
                            <div className="inline-flex  justify-between items-center gap-4 w-full">
                                <h6 className="text-[#FFFCFC] text-sm">
                                    Swastik:
                                </h6>
                                <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                    7205548190
                                </h6>
                            </div>
                            <div className="inline-flex  justify-between items-center w-full">
                                <Link
                                    href={"mailto:contact@nitrutsav.com"}
                                    className="inline-flex  justify-between items-center w-full"
                                >
                                    <h6 className="text-[#FFFCFC] text-sm">
                                        Mail:
                                    </h6>
                                    <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                        contact@nitrutsav.com
                                    </h6>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 mb-4  sm:pl-0 max-w-[200px]">
                        <Heading className="text-[#CBFFFF] text-[1.25rem] sm:text-[0.76rem] font-[open-sans-hebrew-condensed] font-normal md:text-[0.88rem] lg:text-[1.02rem] xl:text-[1.3rem]">
                            Opening Hours
                        </Heading>
                        <div className="mt-3  text-[0.7rem] sm:text-[0.63rem] md:text-[0.68rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]">
                            <div className="inline-flex  justify-between items-center gap-4 w-full">
                                <h6 className="text-[#FFFCFC]  text-sm ">
                                    {" "}
                                    Weekdays:
                                </h6>
                                <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                    09:00-22:00
                                </h6>
                            </div>
                            <div className="inline-flex  justify-between items-center gap-4 w-full">
                                <h6 className="text-[#FFFCFC] leading-3 text-sm ">
                                    {" "}
                                    Weekend:
                                </h6>
                                <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1  leading-loose w-fit break-before-column">
                                    {"09:00-23:00"}
                                </h6>
                            </div>
                        </div>
                    </div>
                </div>
                <Typography
                    className="text-[#FFF] font-normal mx-4 text-center mt-4 leading-5 text-[0.75rem] sm:hidden"
                    variant="sm"
                >
                    Address: SAC, National Institute of Technology, Rourkela,
                    Odisha, India, 769008
                </Typography>

                <div className="flex sm:flex-col items-start xl:items-center justify-center gap-8 ">
                    <Image
                        src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1736522339/Frame_36878_y7onca.png"
                        alt="Top Image"
                        width={106}
                        height={106}
                        sizes="(max-width: 768px)106px, 212px"
                        className=" mx-auto w-1/6 sm:w-1/2 h-auto max-w-xs  "
                    />
                    {/* <Image
            width={422}
            height={96}
            sizes="(max-width: 768px)211px, 422px"
            src="/nitrlogo.svg"
            alt="Bottom Image"
            className=" w-1/2 sm:w-full h-auto mx-auto sm:mt-0 mt-4"
          /> */}
                </div>

                <div className="flex-col mb-4 pl-12 sm:pl-0 hidden sm:flex">
                    <Heading className="text-[#CBFFFF] text-[1rem] sm:text-[0.76rem] font-[open-sans-hebrew-condensed] font-normal md:text-[0.88rem] lg:text-[1.02rem] xl:text-[1.3rem]">
                        Opening Hours
                    </Heading>
                    <div className="mt-3  text-[0.7rem] sm:text-[0.63rem] md:text-[0.68rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]">
                        <div className="div sm:inline-flex block pl-0 justify-end items-center sm:gap-4 gap-1">
                            <h6 className="text-[#FFF]  "> Weekdays:</h6>
                            <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                09:00-22:00
                            </h6>
                        </div>
                        <div className="div sm:inline-flex block pl-0 justify-end items-center sm:mt-1 sm:gap-4 mt-3 gap-1">
                            <h6 className="text-[#FFF] "> Weekend:</h6>
                            <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                09:00-23:00
                            </h6>
                        </div>
                    </div>
                </div>

                <div
                    id="contact"
                    className="flex-col pl-12 sm:pl-6 mb-4 hidden sm:flex"
                >
                    <Heading className="text-[#CBFFFF] text-[1rem] sm:text-[0.76rem] font-[open-sans-hebrew-condensed] font-normal md:text-[0.88rem] lg:text-[1.02rem] xl:text-[1.3rem]">
                        Contact Us:
                    </Heading>
                    <div className="mt-3 text-[0.7rem] sm:text-[0.63rem] md:text-[0.68rem] lg:text-[0.7rem] xl:text-[1rem] md:leading-[1rem] sm:leading-[0.7rem] leading-[0.54rem]">
                        <div className="div sm:inline-flex block pl-0 justify-end items-center sm:gap-4 gap-1">
                            <h6 className="text-[#FFF] "> Aditya:</h6>
                            <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                6371475323
                            </h6>
                        </div>
                        <div className="div sm:inline-flex block pl-0 sm:mt-1 mt-3 justify-end items-center  sm:gap-4 gap-1">
                            <h6 className="text-[#FFF]">Swastik:</h6>
                            <h6 className="text-[#FFFCFC] sm:blur-[0.35px] blur-[0.15px] sm:mt-0 mt-1">
                                7205548190
                            </h6>
                        </div>
                        <div className="div sm:inline-flex block pl-0 sm:mt-1 mt-3 justify-end items-center  sm:gap-4 gap-1">
                            <Link href={"mailto:contact@nitrutsav.com"}>
                                <h6 className="text-[#FFF]">
                                    contact@nitrutsav.com
                                </h6>
                            </Link>
                        </div>
                        <Typography
                            className="text-[#FFF] font-normal mt-4 leading-5 text-[0.75rem]"
                            variant="sm"
                        >
                            Address: SAC, National Institute of Technology,
                            Rourkela, Odisha, India, 769008
                        </Typography>
                    </div>
                </div>
                <div className="sm:hidden w-full col-span-full flex px-2 text-xs  mt-4  sm:justify-end pt-2 ">
                    <div className="sm:w-1/2 flex flex-wrap gap-2 justify-between ">
                        {extraLinks.map((item) => (
                            <Link
                                href={item.link}
                                className="hover:underline underline-offset-2  opacity-80 hover:opacity-100 text-white"
                                key={item.name}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <WebFooter className=" sm:w-[90%] w-screen px-4 sm:px-0 mx-auto py-4"></WebFooter>
        </div>
    );
}
