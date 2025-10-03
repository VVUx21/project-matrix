import Image from "next/image";

const SponsorCard = ({ imageSrc, altText }) => {
  return (
    <div className="flex justify-center items-center p-2 sm:p-4">
      <Image
        src={imageSrc}
        alt={altText}
        className=" object-contain rounded-full"
        height={400}
        width={300}
      />
    </div>
  );
};

export default SponsorCard;
