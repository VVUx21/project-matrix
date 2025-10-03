import React from 'react'
import Image from 'next/image'

type PropType = {
  selected: boolean
  imgSrc: string
  index: number
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, index, onClick } = props

  return (
    <div
      className={' embla-thumbs__slide rounded-md embla-thumbs__slide--selected '.concat(
        selected ? '' : ' grayscale')}
    >
      <button
        onClick={onClick}
        className="embla-thumbs__slide__button relative"
        type="button"
      >
        {/* <div className="absolute top-0 right-0  bg-gray-100/50 p-1 text-xs  rounded-full shadow-md">  
          <span>{'some text'}</span>
        </div> */}
        <Image
          className="embla-thumbs__slide__img rounded-xl"
          src={imgSrc}
          alt="Your alt text"
          width={150}
          height={150}
        />
      </button>
    </div>
  )
}