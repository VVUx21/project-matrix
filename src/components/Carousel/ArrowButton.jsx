export const LeftArrowButton = ({
  position = "left",
  onClick,
  className = "",
}) => {
  const positionClass = position === "left" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 
        w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 
        backdrop-blur-md border border-white/30
        flex items-center justify-center shadow-lg transition-all duration-300
        hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 
        hover:bg-white/25 active:scale-95 z-20 group
        ${positionClass} ${className}`}
      aria-label={position === "left" ? "Previous slide" : "Next slide"}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        className="transition-transform duration-300 group-hover:-translate-x-0.5"
      >
        <path 
          d="M15 18L9 12L15 6" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export const RightArrowButton = ({
  position = "right",
  onClick,
  className = "",
}) => {
  const positionClass = position === "left" ? "left-4" : "right-4";

  return (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 
        w-12 h-12 rounded-full bg-gradient-to-br from-white/20 to-white/5 
        backdrop-blur-md border border-white/30
        flex items-center justify-center shadow-lg transition-all duration-300
        hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:scale-110 
        hover:bg-white/25 active:scale-95 z-20 group
        ${positionClass} ${className}`}
      aria-label={position === "left" ? "Previous slide" : "Next slide"}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none"
        className="transition-transform duration-300 group-hover:translate-x-0.5"
      >
        <path 
          d="M9 18L15 12L9 6" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};