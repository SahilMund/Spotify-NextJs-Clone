import Header from "@/components/Header";

import PlayListContent from "./components/PlayListContent";
import HeaderContent from "./components/HeaderContent";
import Thumbnail from "./components/Thumbnail";
import getSongsByPlaylist from "@/actions/getSongsByPlaylist";
import getPlaylistByTitle from "@/actions/getPlaylistByTitle";


const PlayList = async ({ params }: { params: { playListName: string } }) => {

  // console.log(params);
  const data = await getSongsByPlaylist(params.playListName);

  const playList = await getPlaylistByTitle(params.playListName);



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
            <Thumbnail playlist={playList}/>
          
             <HeaderContent title={params.playListName as string}/>
          </div>
        </div>
      </Header>
      <PlayListContent data={data} />
    </div>
  )
}

export default PlayList;
