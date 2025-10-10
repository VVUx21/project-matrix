export const Wrapper = ({ children, className = "" }) => (
  <div className={`w-full h-auto flex flex-col ${className}`}>
    {children}
  </div>
);

export const ScreenViewContainer = ({ children, className = "" }) => (
  <div className={`relative flex justify-center items-center h-auto ${className}`}>
    {children}
  </div>
);

export const SliderContainer = ({ children, className = "" }) => (
  <div className={`overflow-x-hidden h-auto relative ${className}`}>
    {children}
  </div>
);

export const SwiperContainer = ({ children, className = "" }) => (
  <div className={`flex flex-col gap-10 ${className}`}>
    {children}
  </div>
);