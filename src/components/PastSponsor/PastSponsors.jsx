import SponsorCard from "./sponsorCard";

const sponsors = [
  {
    imageSrc: "/Sponsors/Bastian_20250205_091640_0000 2.png",
    altText: "Cuts & Creations",
  },
  {
    imageSrc: "/Sponsors/image 85.png",
    altText: "ICICI Bank",
  },
  {
    imageSrc: "/Sponsors/image 86.png",
    altText: "Bank of India",
  },
  {
    imageSrc: "/Sponsors/image 87.png",
    altText: "SBI",
  },
  { imageSrc: "/Sponsors/image 88.png", altText: "Hideaway" },
  {
    imageSrc: "/Sponsors/image 90.png",
    altText: "Nirvaana",
  },
  { imageSrc: "/Sponsors/image 93.png", altText: "Vanix" },
  { imageSrc: "/Sponsors/image 94.png", altText: "Vanix" },
  { imageSrc: "/Sponsors/image 95.png", altText: "Vanix" },
  { imageSrc: "/Sponsors/image 96.png", altText: "Vanix" },
  {
    imageSrc: "/Sponsors/Screenshot 2025-02-05 at 12.21.50 AM 1.png",
    altText: "Vanix",
  },
  {
    imageSrc: "/Sponsors/Screenshot 2025-02-05 at 12.28.50 AM 1.png",
    altText: "Vanix",
  },
  {
    imageSrc: "/Sponsors/Screenshot 2025-02-05 at 12.39.15 AM 1.png",
    altText: "Vanix",
  },
  {
    imageSrc: "/Sponsors/Screenshot 2025-02-05 at 12.44.13 AM 1.png",
    altText: "Vanix",
  },
  { imageSrc: "/Sponsors/Screenshot_20250205_101300 1.png", altText: "Vanix" },
];

const PastSponsors = () => {
  return (
    <section
      className=" text-white py-10"
      style={{
        background: "linear-gradient(0deg, #040D17 0%, #040D17 100%), #000",
      }}
      id="sponsors"
    >
      <div className="text-center mb-8">
        <h2
          className=" font-bold font-Cattedrale tracking-wide text-4xl md:text-6xl lg:text-7xl"
          style={{
            color: "#CBFFFF",
          }}
        >
          OTHER SPONSORS
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
      <div className="grid grid-cols-2 gap-4 p-4 max-w-5xl mx-auto lg:grid-cols-4">
        {sponsors.map((sponsor, index) => (
          <SponsorCard
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

export default PastSponsors;
