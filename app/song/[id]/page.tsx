import Header from "@/components/Header";

import SingleSongItemContent from "./components/SingleSongItemContent";
import { useRouter } from "next/navigation";
import getSongById from "@/actions/getSongsById";
import HeaderContent from "./components/HeaderContent";
import Thumbnail from "./components/Thumbnail";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import getPlaylistByTitle from "@/actions/getPlaylistByTitle";



const SongLyrics = async ({ params }: { params: { id: number } }) => {


  const id = params.id.toString() as string;
  const song = await getSongById(id);


  return (
    <div
      className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
    >
     <Header>
        <div className="mt-20">
          <div 
            className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
          >
            <Thumbnail song={song}/>
          
             <HeaderContent song={song}/>
          </div>
        </div>
      </Header>
      <SingleSongItemContent song={song}  />
    </div>
  );
};

export default SongLyrics;
