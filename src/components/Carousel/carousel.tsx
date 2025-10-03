import EmblaCarousel from "./embla";
import { EmblaOptionsType } from "embla-carousel";
import Heading from "../ui/Heading";

type Props = {
  slides: {
    index: number;
    image: string;
    content: string;
    eventName: string;
    Registerurl: string;
    eventId: number;
  }[];
  heading: string;
};

const Carousel = (props: Props) => {
  const { slides, heading } = props;
  const OPTIONS: EmblaOptionsType = {
    loop: true,
  };
  return (
    <>
      <div
        className={` bg-[#040D17] pt-14  bg-blend-hard-light main overflow-hidden bg-cover   min-h-screen bg-no-repeat bg-center relative `}
      >
        <div className="flex justify-center items-center mb-7 mx-auto">
          <div className="w-32 hidden lg:block rotate-180 ">
            <img src="/events/knife.png" alt="" />
          </div>
          <div className="ml-4 mr-4">
            <Heading variant="xs" className="text-center text-[#9DFFFF]">
              {heading}
            </Heading>
          </div>
          <div className="w-32  hidden lg:block ">
            <img src="/events/knife.png" alt="" />
          </div>
        </div>
        <EmblaCarousel slides={slides} options={OPTIONS}></EmblaCarousel>
      </div>
    </>
  );
};

export default Carousel;