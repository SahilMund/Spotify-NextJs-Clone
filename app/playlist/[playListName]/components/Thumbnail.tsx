"use client";
import Image from "next/image";

import useLoadThumbnail from "@/hooks/useLoadThumbnail";

import { PlayList } from "@/types";

interface PlayListProps {
  playlist: PlayList;
}

const Thumbnail: React.FC<PlayListProps> = ({ playlist }) => {
  const imagePath = useLoadThumbnail(playlist);
  console.log("imagePath", imagePath);

  return (
    <div className="relative h-32 w-32 lg:h-44 lg:w-44">

      {/*  eslint-disable-next-line */}
      <Image className="object-cover" fill 
      src={imagePath as string} alt="Playlist" />
    </div>
  );
};

export default Thumbnail;
