"use client";
import { Minus, PlusIcon } from "lucide-react";
import { Collapse } from "react-collapse";

export default function Accordion(props) {
    return (
        <div className=" ml-8 z-50 mr-8 mt-4 mb-1 text-[#CBFFFF] ">
            <div className=" flex w-full  ">
                <div className="border border-[#CBFFFF] rounded-xl bg-black/50 relative  m-auto w-full md:w-[80%] h-full">
                    <div
                        className="title bg-transparent flex justify-between items-center cursor-pointer p-4 pl-8"
                        onClick={props.toggleAccordion}
                    >
                        <div className="flex items-center w-auto">
                            <p className="text-sm sm:text-xl font-bold font-Spirits">
                                {props.question}
                            </p>
                        </div>
                        <span className="cursor-pointer flex justify-center items-center text-4xl font-bold">
                            {props.isOpen ? (
                                <Minus size={24} color="#CBFFFF" />
                            ) : (
                                <PlusIcon size={24} color="#CBFFFF" />
                            )}
                        </span>
                    </div>
                    <Collapse isOpened={props.isOpen}>
                        <div className="accordion-content overflow-hidden transition-max-height duration-300 ease-in-out text-sm sm:text-xl font-normal leading-relaxed pb-4 pr-4 pl-8 pt-0 font-Spirits">
                            {props.answer}
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}
