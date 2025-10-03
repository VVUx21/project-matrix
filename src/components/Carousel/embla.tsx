"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { Thumb } from "./thumb-button";
import "./embla.css";

import Autoplay from "embla-carousel-autoplay";
import Typography from "../ui/Typography";
import Link from "next/link";
import Image from "next/image";
import Modal from "../Modal";

type PropType = {
  slides: {
    index: number;
    image: string;
    content: string;
    eventName: string;
    Registerurl: string;
    eventId: number;
    rules?: string[];
  }[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options, [
    Autoplay({
        delay: 5000,
        stopOnInteraction: true,
    }),
  ]);
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
    align: "start",
  });
  const [showModal, setShowModal] = useState(false);

  const [title, setTitle] = useState("");
  const [rules, setRules] = useState(["Rule 1", "Rule 2"]);

  const [error, setError] = useState("");

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;
    setSelectedIndex(emblaMainApi.selectedScrollSnap());
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex]);

  const scrollPrev = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    emblaMainApi.scrollPrev();
  }, [emblaMainApi, emblaThumbsApi]);
  const scrollNext = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return;

    emblaMainApi.scrollNext();
  }, [emblaMainApi, emblaThumbsApi]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();
    emblaMainApi.on("select", onSelect);
    emblaMainApi.on("reInit", onSelect);
  }, [emblaMainApi, onSelect]);

  return (
    <>
      <div className="embla  mx-auto text-[#FFF] font-Spirits">
        <div className="embla-thumbs w-fit mx-auto flex items-center ">
          <button
            className="embla__prev w-16 h-16 hidden sm:inline-block"
            onClick={scrollPrev}
          >
            <span className="sr-only">Prev</span>
            <img src="/events/left_arrow.png" alt="" />
          </button>
          <div className="embla-thumbs__viewport flex" ref={emblaThumbsRef}>
            <div className="embla-thumbs__container max-w-[90vw] sm:max-w-5xl ">
              {slides.map((item) => (
                <Thumb
                  onClick={() => onThumbClick(item.index)}
                  selected={item.index === selectedIndex}
                  index={item.index}
                  imgSrc={item.image}
                  key={item.index}
                />
              ))}
            </div>
          </div>
          <button
            className="embla__prev w-16 h-16 hidden sm:inline-block"
            onClick={scrollNext}
          >
            <span className="sr-only">Prev</span>
            <img src="/events/right_arrow.png" alt="" />
          </button>
        </div>
        <div
          className="embla__viewport max-w-[90vw] sm:max-w-5xl mx-auto"
          ref={emblaMainRef}
        >
          <div className="embla__container">
            {slides.map((item) => (
              <div
                className="embla__slide flex flex-col-reverse sm:flex-row justify-center w-full gap-8 sm:mt-14 mt-8 "
                key={item.index}
              >
                <div className="sm:w-2/3 max-w-[90vw]   ">
                  <div className="flex w-full flex-col gap-8">
                    <div className="lg:text-5xl text-3xl">{item.eventName}</div>
                    {/* <div className="flex">
                      <div className="h-1 w-20 bg-red-500"></div>
                      <div className="h-1 w-36 bg-white"></div>
                    </div> */}
                    <div className="text-xl md:w-full ">
                      <Typography variant="sm">{item.content}</Typography>
                    </div>
                    <div className="flex gap-2">
                      {/* {(
                        <>
                          <RegisterButton
                            available={!!item.Registerurl}
                            eventId={`${item.eventId}`}
                            setError={setError}
                          />{" "}
                          {error && (
                            <div className="text-red-500 text-xs ">{error}</div>
                          )}
                        </>
                      )} */}

                      {/* Rules Button  */}
                      {/* {item.rules && item.rules.length > 0 && (
                        <button
                          className="border-[#BA0000] bg-transparent border transition-colors ease-in-out hover:bg-[#BA0009]  text-white font-bold py-2 px-8 rounded"
                          onClick={() => {
                            setRules(item.rules || []);
                            setTitle(item.eventName);
                            setShowModal(true);
                          }}
                        >
                          Rules
                        </button>
                      )} */}
                    </div>
                  </div>
                </div>

                <div className="sm:w-1/3 rounded-lg max-w-[80vw] w-full mx-auto  ">
                  <Image
                    className="embla__slide__img w-full h-full sm:rounded-xl rounded-lg"
                    src={item.image}
                    width={400}
                    height={400}
                    alt="Your alt text"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        rules={rules}
        title={title}
      ></Modal>
    </>
  );
};

export default EmblaCarousel;

type RegisterButtonProps = {
  available: boolean;
  eventId: string;
  setError: (arg: string) => void;
};

const RegisterButton = ({
  available,
  eventId,
  setError,
}: RegisterButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const addEventToUser = async () => {
    setLoading(true);
    const res = await fetch("/api/events/register", {
      method: "POST",
      body: JSON.stringify({ eventId: eventId }),
    });

    if (res.ok) {
      setSuccess(true);
      setError("");
      setLoading(false);
    } else {
      setError("Something Went Wrong, Please Try Again Later");
      setSuccess(false);
      setLoading(false);
    }

    return;
  };

  if (!available) {
    return (
      <>
        <button className="bg-[#BA0000] hover:bg-[#BA0009] text-xs  text-white font-bold py-2 px-4 rounded">
          {" "}
          Registrations Not Available
        </button>
      </>
    );
  }

  return (
    <>
      {success ? (
        <>
          <button className="bg-[#BA0000] hover:bg-[#BA0009]  text-white font-bold py-2 px-4 rounded">
            {" "}
            Registered 🌟
          </button>
        </>
      ) : (
        <button
          disabled={loading}
          onClick={addEventToUser}
          className="bg-[#BA0000] hover:bg-[#BA0009]  text-white font-bold py-2 px-4 rounded"
        >
          {loading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-loader-2 inline animate-spin duration-200 mx-4"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          ) : (
            "Register Now 🚀"
          )}
        </button>
      )}
    </>
  );
};