import Image from "next/image";
import Sukuna from "../../../public/Images/Sukuna.png";
import BgScrollImg from "../../../public/Images/Frame 896.png";
import Elipse from "../../../public/Images/Ellipse 503.png";
import Heading from "../ui/Heading";
import Link from "next/link";

const EventHero = () => {
    return (
        <>
            <main
                className={`w-full min-h-screen relative z-0 px-10 pt-10 lg:p-16 bg-[#040D17]`}
            >
                <div className={`w-full flex justify-center`}>
                    <div
                        className={`w-full max-w-[410px] sm:max-w-[50%] sm:w-[60%] md:w-[50%] xl:w-[40%] absolute bottom-0 flex flex-col-reverse`}
                    >
                        <Image
                            src={`/cup.png`}
                            alt="sajh"
                            width={395}
                            height={400}
                            className="opacity-30"
                        />
                    </div>
                </div>

                <div
                    className={`absolute hidden lg:block pt-10 right-0 sm:w-[50%] md:w-[40%] lg:w-[40%] overflow-hidden -z-10`}
                >
                    <Image
                        src={BgScrollImg.src}
                        alt="BgScrollImg"
                        width={1920}
                        height={1080}
                        className={`relative left-[50%] md:left-[10%] `}
                    />
                </div>

                <div
                    className={`absolute left-0 top-0 w-[300px] h-[500px] lg:w-[500px] lg:h-[700px] -z-10`}
                >
                    <div className="relative z-10 ">
                        <div
                            className="left-[-66%] sm:left-[-56%] md:left-[-55%] lg:left-[-56%] xl:left-[-51%] top-[-4rem] bottom-[20%]  md:bottom-10 h-[20rem]"
                            style={{
                                position: "absolute",
                                backgroundColor: "#9DFFFF",
                                width: "50%",
                                boxShadow: "0 0 90px 90px #9DFFFF",
                                borderRadius: "0 80% 80% 0",
                            }}
                        />
                    </div>
                </div>

                <div
                    className={`w-[70%] lg:w-[50%] h-[500px] md:h-[600px] lg:h-[600px] pt-12 sm:pt-10 md:px-12 z-20`}
                >
                    <div>
                        <Heading
                            className={`z-20 tracking-wider text-[#9DFFFF]`}
                            variant="xl"
                        >
                            Events
                        </Heading>
                    </div>

                    <div
                        className={`py-4 relative z-20 text-[#FFF] font-Spirits`}
                    >
                        All in all, NITRUTSAV 2025 is back to embark on a
                        journey that aims to unravel the matrix of imagination,
                        rewrite the code of storytelling, and rediscover the
                        magic within
                    </div>

                    {/* <div className={`pt-4 relative z-20`}>
            <Link
              href={
                // id ? 
                "/events#flagship"
                //  : "/login"
                }
              className=" "
            >
             <button className="flex items-center justify-between bg-[#9DFFFF] font-Cattedrale border-[2px] border-black text-black font-semibold lg:px-4 lg:py-2 px-4 rounded-full shadow-md hover:shadow-lg transform transition-transform duration-200 hover:scale-105">
                Events Concluded
              </button>
            </Link>
          </div> */}
                </div>
            </main>
        </>
    );
};

export default EventHero;
