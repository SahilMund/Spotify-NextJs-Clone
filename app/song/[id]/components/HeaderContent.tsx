"use client";

import { useUser } from "@/hooks/useUser";
import { FaRegShareSquare } from "react-icons/fa";
import { Song } from "@/types";

interface HeaderContentProps {
  song: Song;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ song }) => {
  const { user } = useUser();

  return (
    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
     
      <h3
        className="
                     text-white 
                     text-2xl 
                     sm:text-3xl 
                     lg:text-4xl 
                     font-bold

                   "
      >{song.title} 
       
      </h3>
      <p
        className="  text-white 
        text-1xl 
        sm:text-1xl 
        lg:text-1xl 
        font-bold
                   "
      > Genre - {song.geners}
       
      </p>
      <p
        className="  text-white 
        text-1xl 
        sm:text-1xl 
        lg:text-1xl 
        font-bold
                   "
      > Author - {song.author}
       
      </p>
    </div>
  );
};

export default HeaderContent;
