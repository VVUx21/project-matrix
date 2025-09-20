import React, { useEffect, useRef } from "react";

type Props = {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
  title: string;
  rules: string[];
};

export default function Modal({
  setShowModal,
  showModal,
  title,
  rules,
}: Props) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showModal &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden backdrop-blur-[1px] overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div
              className="relative w-[80vw] sm:w-[50vw] my-6 mx-auto max-w-4xl border-[#D70000] border rounded-md"
              ref={modalRef}
            >
              <button
                className="absolute top-2 right-4 w-10 h-10 z-20 grid place-items-center"
                onClick={() => setShowModal(false)}
              >
                <svg
                  className={``}
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m11.25 4.75l-6.5 6.5m0-6.5l6.5 6.5"
                  />
                </svg>
              </button>
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col sm:flex-row w-full bg-black outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b sm:border-r sm:border-b-0 px-4 sm:px-0 sm:my-4 border-solid border-white w-full sm:w-1/3">
                  <h3 className="px-2 text-3xl font-semibold">{title}</h3>
                </div>
                {/*body*/}
                <div className="relative p-6  max-h-[80vh] overflow-y-auto my-2 ">
                  <ul className="flex flex-col gap-2">
                    {rules.map((rule,index) => (
                      <li
                      key={index}
                      className="flex gap-2 items-start  ">
                        <span className=" min-w-2 min-h-2 mt-3 mr-1  bg-white rounded-full"></span>
                        <p>{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                {/*footer*/}
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}