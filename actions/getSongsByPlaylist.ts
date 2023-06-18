import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { Song } from "@/types";

const getSongsByPlaylist = async (name: string): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }

  /*

    SELECT *
    FROM songs
    WHERE user_id = '<user_id>'
    ORDER BY created_at DESC;

  */

  const { data: playListData, error: playListError } = await supabase
    .from("playlist")
    .select("*")
    .eq("Name", name)
    .single();

  if (playListError) {
    console.log(playListError.message);
    return [];
  }
  const { data, error } = await supabase
    .from("playlist_songs")
    .select("song_id(*)")
    // .eq('user_id', sessionData.session?.user.id)
    .eq("playlist_id", playListData?.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error.message);
  }

  const flattenedData = data?.map((item) => {
    return item.song_id
  });

  return ([flattenedData, playListData] as any) || [];
};

export default getSongsByPlaylist;
