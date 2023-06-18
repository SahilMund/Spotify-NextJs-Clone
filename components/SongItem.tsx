"use client";

import Image from "next/image";
import Link from "next/link";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";

import PlayButton from "./PlayButton";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import useAddSongToPlaylistModal from "@/hooks/useAddSongToPlaylistModal";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import { useUser } from "@/hooks/useUser";
import { useAddToPlaylist } from "@/hooks/useAddToPlaylist";

interface SongItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
  const imagePath = useLoadImage(data);
  const { user, subscription } = useUser();

  const addSongToPlaylistModal = useAddSongToPlaylistModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  const addtoPlaylistContext = useAddToPlaylist();

  const addSongstoPlaylist = (song: Song) => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    addtoPlaylistContext.updateSelectedSong(song);

    return addSongToPlaylistModal.onOpen();
  };

  return (
    <div
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-neutral-400/5 
        cursor-pointer 
        hover:bg-neutral-400/10 
        transition 
        p-3
      "
    >
      <div
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover"
          src={imagePath || "/images/music-placeholder.png"}
          //  src=""
          fill
          alt="Image"
        />
      </div>
      <div className="flex flex-col items-start w-full pt-4 gap-y-1">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p
          className="
            text-neutral-400 
            text-sm 
            pb-4 
            w-full 
            truncate
          "
        >
          By {data.author}
        </p>
        <p
          className="
            text-neutral-350 
            text-xs
            pb-2 
            w-full 
            truncate
          "
        >
          {`(${data.geners})`}
        </p>

        <Link href={`/song/${data.id}`}>
          <div
            className="
            text-neutral-350 
            text-xs
            pb-2 
            w-full 
          "
          >
            See Lyrics
          </div>
        </Link>
      </div>
      <div
        onClick={() => onClick(data.id)}
        className="
          absolute 
          bottom-24 
          right-5
        "
      >
        <PlayButton />
      </div>
      <div
        className="
          absolute 
          bottom-24 
          left-2
        "
      >
        <button
          onClick={() => addSongstoPlaylist(data)}
          className="
        transition 
        opacity-0 
        rounded-full 
        flex 
        items-center 
        justify-center 
        bg-neutral-500 
        p-4 
        drop-shadow-md 
        translate
        translate-y-1/4
        group-hover:opacity-100 
        group-hover:translate-y-0
        hover:scale-110
      "
        >
          <MdOutlinePlaylistAdd className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default SongItem;
