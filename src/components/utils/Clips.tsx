import { useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";

interface ClipsProps {
  clip: string;
  imgsrc: string;
}

const Clips: React.FC<ClipsProps> = ({ clip, imgsrc }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  return (
    <div>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleHoverOut}
        className="relative h-28 w-32 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 lg:w-28 md:w-24 sm:w-16 lg:h-24 md:h-20 sm:h-14"
      >
        <img
          src={imgsrc}
          alt="img/clips"
          className="inset-0 flex h-full w-full object-cover absolute top-0 left-0 right-0 rounded-xl opacity-100 z-10 transition-opacity duration-500"
        />
        <div className=" bg-white blur-effect-theme absolute top-11 left-11 lg:top-8 lg:left-9 sm:top-4 sm:left-5 right-0 opacity-100 z-[100] w-8 h-8 md:w-5 md:h-5 flex items-center justify-center rounded-full">
          <PlayIcon className="icon-style md:w-3 md:h-3  text-slate-900" />
        </div>
        {isHovered ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 right-0 flex h-full w-full object-cover opacity-100 z-20 group-hover:z-50 rounded-xl"
          >
            <source type="video/mp4" src={clip} />
          </video>
        ) : null}
      </div>
    </div>
  );
};

export default Clips;
