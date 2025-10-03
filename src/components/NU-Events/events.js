"use client";

import Image from "next/image";
import Heading from "@/components/ui/Heading";
import Typography from "../ui/Typography";
import bg from "../../../public/images/NU24-Events-BG.png";
import cardImg from "../../../public/images/NU24-Event-Card-Image.jpg";
import Button from "../ui/Button";
import { useRef, useState } from "react";
import data from "./event-data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

import {
  mainEvents,
  flagships,
  workshops,
  funevents,
} from "@/app/events/constants";

function prevBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      className={`flex absolute top-1/2 w-4 bg-[green]`}
    >
      Prev
      <button className="absolute z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          className="w-10 sm:w-full"
        >
          <path
            d="M8.75358 35.4286L59.7885 34.5961"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M41.1657 55.3193L61.2466 34.5723L40.4996 14.4913"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

function nextBtn({ onClick }) {
  return (
    <div
      onClick={onClick}
      onKeyDown={onClick}
      role="button"
      tabIndex={0}
      className={`flex absolute top-1/2 w-4 bg-[green]`}
    >
      Next
      <button className="absolute z-20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="70"
          height="70"
          viewBox="0 0 70 70"
          fill="none"
          className="w-10 sm:w-full"
        >
          <path
            d="M8.75358 35.4286L59.7885 34.5961"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M41.1657 55.3193L61.2466 34.5723L40.4996 14.4913"
            stroke="white"
            stroke-width="8"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

const totalEvents =
  mainEvents.length + flagships.length + workshops.length + funevents.length;

export default function Events() {
  const [slideIndex, setSlideIndex] = useState(0);
  var settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    pauseOnHover: false,
    cssEase: "linear",
    prevArrow: <prevBtn />,
    nextArrow: <nextBtn />,
    beforeChange: (current, next) => setSlideIndex(next),
    responsive: [
      {
        breakpoint: 680,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const card_film = useRef([]);
  const image_filter = useRef([]);
  const cards = useRef([]);
  const cliped_card = useRef([]);

  return (
    <>
      <style>
        {`
        .slick-prev:before,.slick-next:before{
          display: block;
        }
      `}
      </style>
      <div className={`w-full events-container`}>
        <Image
          src={bg.src}
          alt="bg"
          width={1920}
          height={1080}
          className="w-full h-[850px] absolute left-0 object-cover "
        />
        <div
          id="event-header"
          className={`w-full flex justify-center pt-10 z-10`}
        >
          <Heading className="z-10 font-thin">EVENTS</Heading>
        </div>

        <div id="separator-katana" className={`flex justify-center`}>
          <Image
            src={"/images/NU24-Events-Katana.png"}
            width={320}
            height={80}
            className={`absolute mix-blend-color-dodge`}
            alt="Separator Katana"
          />
        </div>

        <div className="flex relative justify-center items-center pt-20">
          <div className="w-[95%] max-w-6xl px-6 hover:cursor-grab overflow-hidden">
            <Slider {...settings}>
              {data.map((item, i) => {
                return (
                  <Link href={`${item.url}`}
                    key={i}
                    ref={(el) => (cards.current[i] = el)}
                    className={`max-w-[25%] min-w-[230px] sm:h-[570px] relative mx-10`}
                  >
                    <div
                      className="rotate-90 origin-left text-transparent font-bold whitespace-nowrap text-[48px] z-20 absolute cursor-default"
                      style={{
                        WebkitTextStroke: "2px white",
                      }}
                      onMouseOver={() => {
                        data.forEach((element) => {
                          if (element.id >= item.id) {
                            card_film.current[
                              item.id - 1
                            ].style.backgroundColor = "transparent";
                            image_filter.current[item.id - 1].style.filter =
                              "grayscale(0%)";

                            cards.current[element.id - 1].style.transform =
                              "translate(50px,0px)";
                            cards.current[element.id - 1].style.transition =
                              "transform 500ms";
                            cliped_card.current[item.id - 1].style.border =
                              "2px solid white";
                          }
                        });
                      }}
                      onMouseOut={() => {
                        data.forEach((element) => {
                          if (element.id >= item.id) {
                            card_film.current[
                              item.id - 1
                            ].style.backgroundColor = "#1f2326c3";
                            image_filter.current[item.id - 1].style.filter =
                              "grayscale(100%)";
                            cards.current[element.id - 1].style.transform =
                              "translate(0px,0px)";
                            cliped_card.current[item.id - 1].style.border =
                              "0px solid white";
                          }
                        });
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      ref={(el) => (cliped_card.current[i] = el)}
                      className=" w-full h-[90%] bg-black  border-white border-2 rounded-tl-3xl"
                      style={{
                        clipPath:
                          "polygon(6% 0, 100% 0, 100% 100%, 0 100%, 0 3%)",
                        overflow: "visible",
                      }}
                    >
                      <Image
                        ref={(el) => (image_filter.current[i] = el)}
                        src={cardImg.src}
                        width={1920}
                        height={1080}
                        className={`relative top-8 h-[420px] grayscale-[100%]`}
                      />
                      <div
                        ref={(el) => (card_film.current[i] = el)}
                        onMouseOver={() => {
                          data.forEach((element) => {
                            if (element.id >= item.id) {
                              card_film.current[
                                item.id - 1
                              ].style.backgroundColor = "transparent";
                              image_filter.current[item.id - 1].style.filter =
                                "grayscale(0%)";

                              cards.current[element.id - 1].style.transform =
                                "translate(50px,0px)";
                              cards.current[element.id - 1].style.transition =
                                "transform 500ms";
                              cliped_card.current[item.id - 1].style.border =
                                "2px solid white";
                            }
                          });
                        }}
                        onMouseOut={() => {
                          data.forEach((element) => {
                            if (element.id >= item.id) {
                              card_film.current[
                                item.id - 1
                              ].style.backgroundColor = "#1f2326c3";
                              image_filter.current[item.id - 1].style.filter =
                                "grayscale(100%)";
                              cards.current[element.id - 1].style.transform =
                                "translate(0px,0px)";
                              cliped_card.current[item.id - 1].style.border =
                                "0px solid white";
                            }
                          });
                        }}
                        className="w-full h-full bg-[#1f2326c3] z-10 absolute top-0"
                      ></div>
                    </div>
                    <Button
                      variant="sharp"
                      className="w-[100%] relative right-[-5%]  top-[-30px] flex justify-center items-center"
                      style={{
                        fontSize: "14px",
                        padding: "0px",
                      }}
                    >
                      Total Events-{item.total}
                    </Button>
                  </Link>
                );
              })}
            </Slider>
          </div>
        </div>

        <div className="flex flex-col items-center sm:px-4 sm:flex sm:flex-row w-full">
          <div
            className=" flex w-72 h-24 max-w-[60%] max-h-min p-4 bg-[#F8F8F8]"
            style={{
              clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%, 0 10%)",
            }}
          >
            <div className="">
              <Typography
                className={``}
                style={{
                  color: "#C4C4C4",
                }}
                variant="eventMob"
              >
                TOTAL EVENTS
              </Typography>

              <Typography
                className={`mt-1 ml-4`}
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
                variant="lg"
              >
                {totalEvents}
              </Typography>
            </div>

            <div className="w-16 h-16 bg-[#8A0909] relative top-8 left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                viewBox="0 0 104 100"
                fill="none"
                className=" relative top-[-21px] left-[21px]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M95.3635 49.666C95.3635 72.6997 75.9952 91.3721 52.1032 91.3721C28.2111 91.3721 8.84298 72.6997 8.84298 49.666C8.84298 26.6324 28.2111 7.96009 52.1032 7.96009C75.9952 7.96009 95.3635 26.6324 95.3635 49.666ZM103.526 49.666C103.526 77.0454 80.5029 99.241 52.1032 99.241C23.7034 99.241 0.680695 77.0454 0.680695 49.666C0.680695 22.2866 23.7034 0.0910549 52.1032 0.0910549C80.5029 0.0910549 103.526 22.2866 103.526 49.666ZM45.5731 25.2718L36.5482 17.2963C30.0909 20.1017 24.6484 24.6935 20.8986 30.4185L25.1672 38.6494L17.9898 35.8814C16.3026 39.8948 15.3732 44.2825 15.3732 48.8794C15.3732 51.0436 15.5792 53.1616 15.9732 55.2159L28.4323 52.8135L39.8595 33.9279L37.4106 52.8135L21.7448 68.5734C23.4486 70.9444 25.4518 73.1004 27.7012 74.9906L27.6161 74.8468L36.5944 67.7647L31.9281 78.0474C37.5146 81.5009 44.1584 83.5031 51.2873 83.5031C60.1356 83.5031 68.2367 80.4185 74.4962 75.3032L69.2437 68.5516L49.6543 66.191L67.6113 60.6827L68.4275 50.4529L59.4489 30.7802L74.1411 49.666V59.8955L82.9629 65.2114C85.6675 60.3461 87.2013 54.7855 87.2013 48.8794C87.2013 40.9838 84.4602 33.7056 79.845 27.8808L72.5088 37.0754L76.2735 24.0088C69.8091 17.9714 60.9984 14.2557 51.2873 14.2557C51.0142 14.2557 50.7419 14.2588 50.4705 14.2645V21.3372L52.9191 25.2718L48.8378 41.01L45.5731 25.2718Z"
                  fill="#1F2326"
                />
              </svg>
            </div>
          </div>

          <div
            className="flex w-72 h-24 max-w-[60%] max-h-min m-3 p-4 bg-[#F8F8F8]"
            style={{
              clipPath: "polygon(4% 0, 100% 0, 100% 100%, 0 100%, 0 10%)",
            }}
          >
            <div className="">
              <Typography
                className={``}
                style={{
                  color: "#C4C4C4",
                }}
                variant="eventMob"
              >
                TOTAL DAYS
              </Typography>

              <Typography
                className={`mt-1 ml-4`}
                style={{
                  color: "black",
                  fontSize: "20px",
                }}
                variant="lg"
              >
                3
              </Typography>
            </div>

            <div className="w-16 h-16 bg-[#8A0909] relative top-8 left-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72"
                height="72"
                viewBox="0 0 105 106"
                fill="none"
                className="relative top-[-21px] left-[21px]"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M55.7974 4.80398C55.7974 7.15436 53.8888 9.05973 51.5344 9.05973C49.1802 9.05973 47.2716 7.15436 47.2716 4.80398C47.2716 2.45356 49.1802 0.548195 51.5344 0.548195C53.8888 0.548195 55.7974 2.45356 55.7974 4.80398ZM67.732 20.9757C67.732 23.7962 65.4419 26.0825 62.6166 26.0825C59.7917 26.0825 57.5012 23.7962 57.5012 20.9757C57.5012 18.1551 59.7917 15.8688 62.6166 15.8688C65.4419 15.8688 67.732 18.1551 67.732 20.9757ZM42.1551 24.3803C44.0387 24.3803 45.5654 22.8561 45.5654 20.9757C45.5654 19.0955 44.0387 17.571 42.1551 17.571C40.2718 17.571 38.745 19.0955 38.745 20.9757C38.745 22.8561 40.2718 24.3803 42.1551 24.3803ZM73.9816 35.1829C77.4091 39.7091 79.4421 45.3464 79.4421 51.4578C79.4421 66.3761 67.3284 78.4697 52.3853 78.4697C37.4419 78.4697 25.3281 66.3761 25.3281 51.4578C25.3281 45.3461 27.3615 39.7082 30.7896 35.182L0.380004 10.7627C-0.756752 14.1675 0.891485 24.7218 6.34794 29.4881C8.89301 31.7114 11.2279 33.7124 13.2833 35.4738C15.6342 37.4887 17.6201 39.1906 19.1364 40.5531V46.5112L2.4202 33.7437C2.98853 37.9997 5.3161 47.5657 10.4315 51.8213C13.6212 54.4752 16.4365 56.4881 18.0613 57.6503C18.5211 57.9789 18.8857 58.2396 19.1364 58.4272V65.2366L8.05294 55.8737C7.48457 61.5482 11.9763 72.8196 17.9441 77.1525C21.7235 79.8967 28.1272 85.2753 34.7147 90.8087C41.2047 96.2602 47.8733 101.862 52.3867 105.241C56.8998 101.862 63.5679 96.2599 70.0579 90.8087C76.6454 85.2756 83.0494 79.8961 86.8288 77.1522C92.7965 72.8191 97.2884 61.5479 96.7199 55.8735L85.6364 65.2363V58.4269C86.7732 57.5757 90.0699 55.0222 94.1622 51.6178C99.1589 47.4606 100.359 38.4308 100.942 34.0477L100.983 33.7434L85.6364 46.5106V40.5528C87.1527 39.1903 89.1381 37.4887 91.4893 35.4738L91.4931 35.4706C93.5474 33.7098 95.8815 31.7097 98.4249 29.4878C103.881 24.7212 105.53 14.1669 104.393 10.7624L73.9816 35.1829ZM52.3859 72.0453C63.6865 72.0453 72.8474 62.8994 72.8474 51.6175C72.8474 40.3356 63.6865 31.19 52.3859 31.19C41.0852 31.19 31.924 40.3356 31.924 51.6175C31.924 62.8994 41.0852 72.0453 52.3859 72.0453Z"
                  fill="#1F2326"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// axis="horizontal"
//             id={`event-cards`}
//             className={`w-[70%] min-w-[330px] h-[490px] sm:h-[590px]`}
//             showStatus={false}
//             showIndicators={false}
//             showArrows={true}
//             // centerMode
//             // centerSlidePercentage={30}
//             swipeable