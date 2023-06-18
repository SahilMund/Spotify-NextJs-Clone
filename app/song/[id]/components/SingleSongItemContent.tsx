"use client";

import { Song } from "@/types";
import useLoadLyrics from "@/hooks/useLoadLyrics";
import { useEffect, useState } from "react";

interface SingleSongItemContentProps {
  song: Song;
}

const SingleSongItemContent: React.FC<SingleSongItemContentProps> = ({
  song,
}) => {
  const [lyrics, setLyrics] = useState<any>(null);

  //eslint-disable-next-line
  const lyricsURL = !song.lyrics
    ? "No Lyrics available for this song"
    : useLoadLyrics(song);


  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        // eslint-disable-next-line
        if(!song.lyrics) {
          setLyrics("No Lyrics available for this song")
          return;
        }
        const response = await fetch(lyricsURL as string);
        const data = await response.text();
        setLyrics(data);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, [song]);



  return (
    <div className="mb-7 px-6">
      <div
        className="
            text-neutral-350 
            text-md
            pb-2 
            w-full 
           
          "
      >
        <pre>{lyrics}</pre>
      </div>
    </div>
  );
};

export default SingleSongItemContent;
