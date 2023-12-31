"use client";
import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";
import { CgPlayListAdd } from "react-icons/cg";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import useOnPlay from "@/hooks/useOnPlay";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";

interface LibraryProps {
  songs: Song[];
}
const Library: React.FC<LibraryProps> = ({ songs }) => {
  const { user, subscription } = useUser();
  const uploadModal = useUploadModal();
  const createPlaylistModal = useCreatePlaylistModal();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  const onPlay = useOnPlay(songs);

  const handleUploadSong = () => {
    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return uploadModal.onOpen();
  };

  const handleCreatePlaylist = () => {

    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }

    return createPlaylistModal.onOpen();

  }

  return (
    <div className="flex flex-col">
      <div
        className="
    flex
    items-center
    justify-between
    px-5
    pt-4
    "
      >
        <div className="inline-flex items-center gap-x-2">
          <CgPlayListAdd size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Create Playlist</p>
        </div>
        <IoIosAddCircleOutline
          onClick={handleCreatePlaylist}
          size={20}
          className="text-neutral-400
        cursor-pointer
        hover:text-white
        transition
       
        "
        />
      </div>
      <hr className="mt-2 bg-neutral-400"/>
      <div

        className="
    flex
    items-center
    justify-between
    px-5
    pt-4
    "
      >
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={handleUploadSong}
          size={20}
          className="text-neutral-400
        cursor-pointer
        hover:text-white
        transition
       
        "
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-5 px-3">
        {" "}
        {songs?.map((item) => (
          <MediaItem
            onClick={(id: string) => onPlay(id)}
            key={item.id}
            data={item}
            page="library"
         
          />
        ))}

        
      </div>
    </div>
  );
};

export default Library;
