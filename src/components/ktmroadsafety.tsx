'use client';
import { neue, spaceGrotesk } from "@/fonts";
const KtmRoadSafety = () => {
  return (
    <div id="semicon" className="p-6 sm:p-10 md:p-16">
        <h1 className={`text-2xl sm:text-3xl lg:text-4xl xl:text-7xl leading-tight tracking-tight drop-shadow text-white text-center mb-10 sm:mb-12 lg:mb-16 ${neue.className}`}>
            Innovision in collaboration with KTM Academy
        </h1>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 ${spaceGrotesk.className}`}>
        <div>
          <p className="md:mt-16 lg:text-xl font-medium text-white/90 text-center tracking-wide md:text-left">
             <strong>Ride the thrill, master the skill!</strong>
          </p>

        <p className="lg:text-xl font-medium text-center text-white/90 tracking-wide md:text-left mb-4 sm:mb-6">
            Join <strong>Highway Harmony by KTM Academy of Safe Riding</strong> at InnoVision 25 to learn from KTM Motorsport experts and sharpen your riding skills on the KTM 160 Duke — 📅 <strong>November 9</strong> • 🕕 <strong>9 AM – 6 PM</strong> • 📍 <strong>Basketball Court</strong>.
        </p>
        <p className="lg:text-lg font-medium text-white/90 tracking-wide md:text-left mb-4 sm:mb-6">
            What to expect: a short safety briefing followed by structured, hands-on drills , live demonstrations by KTM coaches, and a Q&A session to help you take your riding to the next level.
        </p>
        <p className="lg:text-lg font-medium text-white/90 tracking-wide md:text-left mb-4 sm:mb-6">
            Who should attend: riders of all levels are welcome — from beginners wanting fundamentals to experienced riders polishing technique.
        </p>
          <p className="lg:text-xl font-medium text-center tracking-wide text-white/90 md:text-left mb-4 sm:mb-6">
            ⚡ <strong>Limited seats — only 300 participants!</strong><br />
            Registrations will close once the limit is reached.
          </p>

          <p className="lg:text-xl font-medium text-center tracking-wide text-white/90 md:text-left lg:mb-16">
            Sharpen your riding skills with the new <strong>KTM 160 Duke!</strong>
          </p>
            <button
                className="relative overflow-hidden bg-[linear-gradient(135deg,rgba(125,249,255,0.35)_0%,rgba(98,42,227,0.35)_60%,rgba(125,249,255,0.35)_100%)] hover:bg-[linear-gradient(135deg,rgba(125,249,255,0.45)_0%,rgba(98,42,227,0.45)_60%,rgba(125,249,255,0.45)_100%)] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 mx-auto flex items-center gap-2 group before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(125,249,255,0.4)_0%,rgba(98,42,227,0.4)_60%,rgba(125,249,255,0.4)_100%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent after:-skew-x-12 after:-translate-x-full hover:after:translate-x-[200%] after:transition-transform after:duration-600 after:ease-in-out shadow-lg hover:shadow-cyan-400/50 hover:shadow-xl border border-transparent hover:border-cyan-400/30 backdrop-blur-sm"
                onClick={() => window.open("https://forms.gle/L6g31bruxfvY588n6", "_blank")}
            >
                Register Now
            </button>
        </div>

        <div className="flex flex-col items-center gap-4 lg:mt-20 md:mt-24">
            <img
              src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1761759835/_NAN0059_drjzxz.jpg"
              alt="Conference Venue 1"
              className="rounded-lg shadow-lg w-full sm:h-56 lg:h-64 object-cover"
            />
            <img
              src="https://res.cloudinary.com/dgtdkqfsx/image/upload/v1761759795/_NAN0002_pzixds.jpg"
              alt="Conference Venue 2"
              className="rounded-lg shadow-lg w-full sm:h-56 lg:h-64 object-cover"
            />
          </div>
      </div>
    </div>
  );
};

export default KtmRoadSafety;