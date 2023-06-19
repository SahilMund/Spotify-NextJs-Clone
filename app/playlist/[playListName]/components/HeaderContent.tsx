"use client";

import { useUser } from "@/hooks/useUser";
import { FaRegShareSquare } from "react-icons/fa";

interface HeaderContentProps {
  title: string;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ title }) => {
  const { user } = useUser();

  const handleLinkShare = () => {
    // const link = `http://localhost:3000/playlist/access-requested/${title}`;
    const link = `https://spotify-next-js-clone.vercel.app/playlist/access-requested/${title}`;

    navigator.clipboard.writeText(link);
    alert('Link Copied to your clipboard, share it with you friend');
  };

  return (
    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
      <p className="hidden md:block font-semibold text-sm">Playlist</p>
      <FaRegShareSquare
        onClick={handleLinkShare}
        size={25}
        className="text-neutral-500 cursor-pointer"
      />
      <h1
        className="
                     text-white 
                     text-4xl 
                     sm:text-5xl 
                     lg:text-7xl 
                     font-bold
                   "
      >
        {title}
      </h1>
    </div>
  );
};

export default HeaderContent;
