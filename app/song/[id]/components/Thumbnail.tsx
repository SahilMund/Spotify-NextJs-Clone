"use client";
import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";

import { Song } from "@/types";

interface PlayListProps {
  song: Song;
}

const Thumbnail: React.FC<PlayListProps> = ({ song }) => {
  const imagePath = useLoadImage(song);

  return (
    <div className="relative h-32 w-32 lg:h-44 lg:w-44">

      <Image className="object-cover" fill 
      src={imagePath as string} alt="Playlist" />
    </div>
  );
};

export default Thumbnail;
