"use client"
import { useEffect, useState, createContext, useContext } from "react";

import {  Song } from "@/types";

type PlaylistContextType = {

  selectedSong: Song | null;
  updateSelectedSong: (song : Song | null) => void;

};

export const PlaylistContext = createContext<PlaylistContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const AddToPlaylistContextProvider = (props: Props) => {

  const [selectedSong, setSelectedSong] = useState<Song | null>(null);

  
    // Add a song to the playlist
    const updateSelectedSong = (song : Song | null) => {
        setSelectedSong(song);
      };

  const value  : PlaylistContextType= {
 
    selectedSong,
    updateSelectedSong  };

  return <PlaylistContext.Provider value={value} {...props} />;
};

export const useAddToPlaylist = () => {
  const context = useContext(PlaylistContext);
  //   If the context is used outside the context provider then throw error
  if (context === undefined) {
    throw new Error(`useUser must be used within a MyUserContextProvider.`);
  }
  return context;
};
