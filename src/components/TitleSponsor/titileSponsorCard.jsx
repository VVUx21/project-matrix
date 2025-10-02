import Image from "next/image";

const TitleSponsorCard = ({ imageSrc, altText }) => {
  return (
    <div className="flex justify-center items-center p-2 sm:p-4">
      <Image
        src={imageSrc}
        alt={altText}
        className=" object-contain"
        height={400}
        width={300}
      />
    </div>
  );
};

export default TitleSponsorCard;
