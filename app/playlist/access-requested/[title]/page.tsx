import Header from "@/components/Header";

import HeaderContent from "./components/HeaderContent";
import Thumbnail from "./components/Thumbnail";
import getPlaylistByUserId from "@/actions/getPlaylistByUserId";
import getPlaylistByTitle from "@/actions/getPlaylistByTitle";


const PlayListAccess = async ({ params }: { params: { title: string } }) => {

  // console.log(params);
  const {title} = params;

  const playList = await getPlaylistByTitle(title);
  const loggedInUserPlaylist = await getPlaylistByUserId();


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
          
             <HeaderContent title={title as string} playList={playList} loggedInUserPlaylist={loggedInUserPlaylist}/>
          </div>
        </div>
      </Header>
    </div>
  )
}

export default PlayListAccess;
