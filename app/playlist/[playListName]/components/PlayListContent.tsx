"use client";

import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import RemoveFromPlayListButton from "@/components/RemoveFromPlayListButton";
import useOnPlay from "@/hooks/useOnPlay";

interface PlayListContentProps {
  data: any;
}

const PlayListContent: React.FC<PlayListContentProps> = ({ data }) => {
 
  
  console.log(data[0]);
  console.log(data[1]);
  
  const songs = data[0];
  const onPlay = useOnPlay(songs);
  const playlist = data[1];
  
  if (songs.length === 0) {
    return (
      <div
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full 
          px-6 
          text-neutral-400
        "
      >
        No songs found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song: Song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem onClick={(id: string) => onPlay(id)} data={song} />
          </div>
          {/* eslint-disable-next-line */}
          <RemoveFromPlayListButton songId={song.id} playlistId={playlist?.id} />
        </div>
      ))}
    </div>
  );
};

export default PlayListContent;
