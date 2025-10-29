import { neue, spaceGrotesk } from "@/fonts";

const Semicon = () => {
  return (
    <div id="semicon" className="p-6 sm:p-10 md:p-16">
      <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-7xl leading-tight tracking-tight drop-shadow text-white text-center mb-10 sm:mb-12 lg:mb-16 ${neue.className}`}>
            NITR at Semicon India 2025
          </h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 ${spaceGrotesk.className}`}>
        <div>
          <p className="md:mt-16 lg:text-xl font-medium text-white text-center tracking-wide md:text-left">
            NIT Rourkela proudly contributed to India's growing semiconductor ecosystem as its two integrated circuit (IC) designs were featured at the prestigious{" "}
            <strong>#SemiconIndia2025</strong> event. The ICs were included in the commemorative memento of India's first fully indigenous 32-bit microprocessor,{" "}
            <strong>#Vikram32</strong>, presented by Shri Ashwini Vaishnaw to Prime Minister Shri Narendra Modi.
          </p>

          <p className="lg:text-xl font-medium text-center text-white tracking-wide md:text-left mb-4 sm:mb-6 lg:mb-16">
            The Present Encryption Core IC (C2S0017) is a lightweight block cipher designed for resource-constrained environments such as IoT, RFID, e-payments, healthcare, and sensor networks. It was developed by{" "}
            <strong>Dr. Ruby Mishra, Mr. Bharat Patidar, Prof. Manish Okade, Prof. K. K. Mahapatra, and Prof. Ayas Kanta Swain.</strong>
          </p>

          <p className="lg:text-xl font-medium text-center text-white tracking-wide md:text-left">
            The VGA Amplifier Sensor Circuit IC (C2S0018), aimed at biomedical and IoT applications, integrates a capacitive interface with accelerator connectivity, OTA components, and energy harvesting mechanisms. It was designed by{" "}
            <strong>Ms. Ipsita Dadh, Ms. Samiksha Das, Mr. PM, Prof. Sauagat Kumar Kar, and Prof. Sudip Kundu.</strong>
          </p>

          <p className="lg:text-xl font-medium text-center text-white tracking-wide md:text-left lg:mb-16">
            Both ICs were developed under NIT Rourkela's participation in the{" "}
            <strong>Chip-to-Startup (C2S) Programme</strong> sanctioned by MeitY in 2023, with Prof. K. K. Mahapatra as Principal Investigator and Prof. A. K. Swain as Co-Principal Investigator.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 lg:mt-20 md:mt-24">
          <img
            src="https://res.cloudinary.com/dhkfjehat/image/upload/v1760044177/f8c79c8fa74c05116f758c60e44d6fd3b3c3a8b1_g8iglv.png"
            alt="NITR Semicon 2025 Poster"
            className="rounded-lg shadow-lg w-full sm:h-auto lg:h-auto object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Semicon;