"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import PlayButton from "./PlayButton";
import usePlayer from "@/hooks/usePlayer";
import { MdDelete } from "react-icons/md";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useUser } from '@/hooks/useUser';
import { useRouter } from "next/navigation";

interface MediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  page?: string | undefined;
}

const MediaItem: React.FC<MediaItemProps> = ({ data, onClick, page }) => {
    const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const router = useRouter();
  const { user : loggedInUser } = useUser();
  const { supabaseClient } = useSessionContext();

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }

    return player.setId(data.id);
  };

  const handleDeleteSong = async (songId: string) => {
    const { data, error } = await supabaseClient
      .from("songs")
      .delete()
      .eq("id", songId);

    if (error) {
      return toast.error(error.message);
    }
    // Data is null if the deletion was successful
    if (!data) {
      toast.success("Song deleted successfully");
    }

    router.refresh();
  };

  return (
    <div
      className="
        flex
        flex-row
        gap-y-1
        justify-between
        overflow-hidden
        
    "
    >
      <div
        onClick={handleClick}
        className="
      
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
        overflow-hidden
      "
      >
        <div
          className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
        >
          <Image
            fill
            src={imageUrl || "/images/music-placeholder.png"}
            alt="MediaItem"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-y-1 overflow-hidden">
          <p className="text-white truncate">{data.title}</p>
          <p className="text-neutral-400 text-sm truncate">By {data.author}</p>
        </div>
      </div>
      {page === "library" && loggedInUser && (
        <div className="flex flex-col gap-x-8 mt-4">
          <MdDelete
            onClick={() => handleDeleteSong(data.id)}
            size={20}
            className="text-red-600
        cursor-pointer
        hover:text-orange-700
        transition
       
        "
          />
        </div>
      )}

      {/* 
      <div 
        className="
          absolute 
          right-2 
        
        "
      >
        <PlayButton />
      </div> */}
    </div>
  );
};

export default MediaItem;
