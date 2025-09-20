import AssociateSponsorCard from "./AssociateSponsorCard";

const sponsors = [
  {
    imageSrc: "/Images/Empreo.png",
    altText: "Gaylords",
  },
];

const AssociateSponsor = () => {
  return (
    <section
      className=" text-white py-10"
      style={{
        background: "linear-gradient(0deg, #040D17 0%, #040D17 100%), #000",
      }}
      id="sponsors"
    >
      <div className="text-center mb-5">
        <h2
          className=" font-bold font-Cattedrale tracking-wide text-4xl md:text-6xl lg:text-7xl"
          style={{
            color: "#CBFFFF",
          }}
        >
          ASSOCIATE SPONSOR
        </h2>
      </div>
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4 max-w-7xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <SponsorCard
            key={index}
            imageSrc={sponsor.imageSrc}
            altText={sponsor.altText}
          />
        ))}
      </div> */}
      <div className="grid grid-cols-1 gap-4 p-4 max-w-5xl mx-auto lg:grid-cols-1">
        {sponsors.map((sponsor, index) => (
          <AssociateSponsorCard
            key={index}
            imageSrc={sponsor.imageSrc}
            altText={sponsor.altText}
          />
        ))}
      </div>
      {/* <div className="grid grid-cols-4 gap-4 p-4 max-w-5xl mx-auto">
        {sponsors.slice(4).map((sponsor, index) => (
          <SponsorCard
            key={index + 4}
            imageSrc={sponsor.imageSrc}
            altText={sponsor.altText}
          />
        ))}
      </div> */}
    </section>
  );
};

export default AssociateSponsor;
