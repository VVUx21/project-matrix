import Image from "next/image";

const AssociateSponsorCard = ({ imageSrc, altText }) => {
  return (
    <div className="flex justify-center items-center p-2 sm:p-4">
      <Image
        src={imageSrc}
        alt={altText}
        className=" object-contain rounded-full"
        height={300}
        width={200}
      />
    </div>
  );
};

export default AssociateSponsorCard;
