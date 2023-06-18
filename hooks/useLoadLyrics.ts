import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";

// const fetchData = async (url: string) => {
//   try {
//     const response = await fetch(url);
//     const data = await response.text();
//     return data;
//   } catch (error: Error | any) {
//     console.error(error);
//     // Handle any error that occurred during the fetch
//     throw new Error(error.message);
//   }
// };

const useLoadLyrics =  (song: Song) => {
  const supabaseClient = useSupabaseClient();

  if (!song || !song.lyrics) {
    return null;
  }

  try {
    const { data: lyricsPath } =  supabaseClient.storage
      .from("lyrics")
      .getPublicUrl(song.lyrics);

    const url = lyricsPath.publicUrl as string;

    // const data = await fetchData(url);
    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default useLoadLyrics;
