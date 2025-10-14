import { neue, spaceGrotesk } from "@/fonts";
import Image from "next/image";

type PositionedImageProps = {
  src: string;
  alt: string;
  className?: string;
};

const PositionedImage: React.FC<PositionedImageProps> = ({
  src,
  alt,
  className,
}) => (
  <div className={className}>
    <Image src={src} alt={alt} fill className="object-contain" />
  </div>
);

export default function AboutUs() {
  const images = {
    bubble:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759433551/bubblee_jgojlh.svg",
    bubble2:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759462227/bublee2_bqclcc.svg",
    dots: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759462232/dot_iunuhu.svg",
    dots2:
      "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759462230/dottt2_wq3igi.svg",
    fish: "https://res.cloudinary.com/dpidvvdgr/image/upload/v1759488567/fish_2_bgvurv.svg",
    robot:
      "https://res.cloudinary.com/dtis6vqc5/image/upload/v1760044376/Group_1430102941_hbrvqf.svg",
  };

  const dotsPositions = [
    {
      className:
        "absolute top-[5%] left-[10%] sm:top-[8%] sm:left-[15%] md:top-[12%] md:left-[20%] lg:top-[89px] lg:left-[231px] opacity-50",
    },
    {
      className:
        "absolute top-[2%] left-[60%] sm:top-[4%] sm:left-[65%] md:top-[6%] md:left-[70%] lg:top-[1px] lg:left-[1090px] opacity-60",
    },
    {
      className:
        "absolute top-[6%] left-[40%] sm:top-[8%] sm:left-[42%] md:top-[10%] md:left-[45%] lg:top-[34px] lg:left-[625px] opacity-50",
    },
    {
      className:
        "absolute top-[20%] left-[15%] sm:top-[22%] sm:left-[18%] md:top-[24%] md:left-[20%] lg:top-[273px] lg:left-[273px] opacity-50",
    },
    {
      className:
        "absolute top-[25%] left-[45%] sm:top-[28%] sm:left-[48%] md:top-[30%] md:left-[50%] lg:top-[313px] lg:left-[722px] opacity-50",
    },
    {
      className:
        "absolute top-[22%] left-[70%] sm:top-[24%] sm:left-[72%] md:top-[26%] md:left-[74%] lg:top-[256px] lg:left-[1156px] opacity-50",
    },
  ];

  const dots2Positions = [
    {
      className:
        "absolute top-[35%] left-[70%] sm:top-[38%] sm:left-[72%] md:top-[40%] md:left-[75%] lg:top-[537px] lg:left-[1266px] opacity-45",
    },
    {
      className:
        "absolute top-[42%] left-[75%] sm:top-[45%] sm:left-[77%] md:top-[47%] md:left-[80%] lg:top-[644px] lg:left-[1310px] opacity-45",
    },
    {
      className:
        "absolute top-[55%] left-[50%] sm:top-[57%] sm:left-[52%] md:top-[59%] md:left-[55%] lg:top-[832px] lg:left-[841px]",
    },
    {
      className:
        "absolute top-[65%] left-[45%] sm:top-[67%] sm:left-[47%] md:top-[69%] md:left-[50%] lg:top-[972px] lg:left-[791px]",
    },
    {
      className:
        "absolute top-[72%] left-[60%] sm:top-[74%] sm:left-[62%] md:top-[76%] md:left-[64%] lg:top-[952px] lg:left-[980px]",
    },
    {
      className:
        "absolute top-[80%] left-[40%] sm:top-[82%] sm:left-[42%] md:top-[84%] md:left-[44%] lg:top-[855px] lg:left-[996px]",
    },
    {
      className:
        "absolute top-[85%] left-[65%] sm:top-[87%] sm:left-[67%] md:top-[89%] md:left-[70%] lg:top-[934px] lg:left-[1136px]",
    },
    {
      className:
        "absolute top-[90%] left-[20%] sm:top-[92%] sm:left-[22%] md:top-[94%] md:left-[25%] lg:top-[941px] lg:left-[475px]",
    },
    {
      className:
        "absolute top-[50%] left-[25%] sm:top-[52%] sm:left-[27%] md:top-[54%] md:left-[30%] lg:top-[695px] lg:left-[674px] opacity-45",
    },
    {
      className:
        "absolute top-[58%] left-[15%] sm:top-[60%] sm:left-[17%] md:top-[62%] md:left-[20%] lg:top-[789px] lg:left-[580px] opacity-45",
    },
    {
      className:
        "absolute top-[62%] left-[70%] sm:top-[64%] sm:left-[72%] md:top-[66%] md:left-[74%] lg:top-[725px] lg:left-[901px] opacity-45",
    },
    {
      className:
        "absolute top-[68%] left-[10%] sm:top-[70%] sm:left-[12%] md:top-[72%] md:left-[14%] lg:top-[669px] lg:left-[197px] opacity-45",
    },
    {
      className:
        "absolute top-[75%] left-[25%] sm:top-[77%] sm:left-[27%] md:top-[79%] md:left-[29%] lg:top-[809px] lg:left-[354px] opacity-45",
    },
    {
      className:
        "absolute top-[82%] left-[5%] sm:top-[84%] sm:left-[7%] md:top-[86%] md:left-[9%] lg:top-[902px] lg:left-[152px] opacity-45",
    },
    {
      className:
        "absolute top-[70%] left-[30%] sm:top-[72%] sm:left-[32%] md:top-[74%] md:left-[34%] lg:top-[668px] lg:left-[370px] opacity-45",
    },
    {
      className:
        "absolute top-[78%] left-[8%] sm:top-[80%] sm:left-[10%] md:top-[82%] md:left-[12%] lg:top-[790px] lg:left-[170px] opacity-45",
    },
    {
      className:
        "absolute top-[85%] left-[2%] sm:top-[87%] sm:left-[4%] md:top-[89%] md:left-[6%] lg:top-[646px] lg:left-[21px] opacity-45",
    },
  ];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-black to-[#5000FF] py-[4vw] sm:py-0">
      <div
        className={`relative pt-4 z-20 ${neue.className} text-center md:text-[80px] lg:text-[90px] text-6xl font-metana font-bold text-white [text-shadow:_0_0_20px_#D9D9D9] text-shadow-md`}
        style={{
          textShadow: "0 0 30px rgba(255,255,255,0.7)",
        }}
      >
        ABOUT US
      </div>

      <div className="absolute top-44 -rotate-134.71 z-0">
        <Image src={images.bubble} alt="Bubble" width={100} height={171} />
      </div>
      <div className="absolute top-[89px] left-56 z-0">
        <Image
          src={images.bubble2}
          alt="Bubble2"
          width={172}
          height={232}
          className="z-0"
        />
      </div>

      {dotsPositions.map((pos, i) => (
        <PositionedImage
          key={`dots-${i}`}
          src={images.dots}
          alt="Dots"
          className={`${pos.className} w-96 h-40`}
        />
      ))}

      {dots2Positions.map((pos, i) => (
        <PositionedImage
          key={`dots2-${i}`}
          src={images.dots2}
          alt="Dots2"
          className={`${pos.className} w-36 h-24`}
        />
      ))}

      <div className="absolute top-[436px] left-[-31px] z-0">
        <Image
          src={images.bubble2}
          alt="Bubble3"
          width={172}
          height={232}
          className="z-0"
        />
      </div>

      <div className="absolute bottom-0 lg:left-[-175px] rotate-[3.87deg] z-0 opacity-45 left-[-299px] h-[475px] md:height-[570px]">
        <Image src={images.fish} alt="Fish" width={570} height={570} />
      </div>
      <Image
        src={images.robot}
        alt="Robot"
        width={400}
        height={400}
        priority
        className="
    hidden sm:block
    pointer-events-none select-none absolute bottom-0 z-0
    jellyfish-bounce drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]
    w-[200px] sm:w-[250px] md:w-[300px] h-auto left-[75vw] object-contain
    opacity-60
  "
      />

      <div className="flex flex-col items-center px-10 sm:px-14 md:px-20 lg:px-32">
        <div
          className={`flex flex-col ${spaceGrotesk.className} text-center w-full max-w-6xl`}
        >
          <div className=" font-space font-bold lg:text-[48px] text-3xl md:text-4xl leading-[61px] text-white pt-14 md:pt-10 text-center">
            NIT Rourkela
          </div>
          <div className="text-center flex flex-col z-40 items-center md:py-7 py-5 font-normal lg:text-lg text-sm md:text-base md:leading-[25px] lg:leading-[36px] text-white ">
            NIT Rourkela is one of the country's premier national-level
            institutions for technical education funded by the government of
            India and is known for its strong emphasis on engineering, basic
            sciences, and technology. Ranked 13th overall in engineering and 
            among the National Institutes of Technology in the 2025 NIRF
            Rankings, NITR has earned a reputation for academic excellence. The
            institute supports a robust educational environment with 390 faculty
            members and a student population 8,000, housed on the largest campus
            among all NITs. NIT Rourkela is passionately committed to making our
            country a world leader in technology and science and teaching this
            commitment to all its students. The institute's graduates have
            consistently excelled in professional fields domestically and
            internationally through inclusive initiatives and a standardised
            education policy.
          </div>
        </div>

        <div
          className={`flex flex-col ${spaceGrotesk.className} text-center w-full max-w-6xl`}
        >
          <div className="font-space font-bold lg:text-5xl text-4xl leading-16 text-center text-white z-10 pt-10 sm:pt-14 md:pt-10">
            Innovision
          </div>
          <div className="relative pb-10">
            <div className=" relative md:py-7 py-5  font-normal md:text-base lg:text-lg text-sm  lg:leading-[36px] md:leading-[25px] leading-[18px] text-center text-white z-40">
              Innovision, NIT Rourkela's annual techno-management fest and one
              of the largest fests in Eastern India, is a highly anticipated
              event scheduled from 7th to 9th November 2025, which aims to
              captivate and engage science and technology enthusiasts throughout
              India. Join Innovision as we connect with the brightest minds in
              technology and innovation and spark creativity and collaboration,
              solving critical challenges facing our society, environment, and
              world today.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
