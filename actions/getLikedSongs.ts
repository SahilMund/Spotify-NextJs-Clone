import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getLikedSongs = async (): Promise<Song[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();


  /*

    SELECT liked_songs.*, songs.*
    FROM liked_songs
    JOIN songs ON liked_songs.song_id = songs.id
    WHERE liked_songs.user_id = '<user_id>'
    ORDER BY liked_songs.created_At DESC;


  */
  const { data } = await supabase 
    .from('liked_songs')
    .select('*, songs(*)')
    .eq('user_id', session?.user?.id)
    .order('created_At', { ascending: false })

    console.log(data, session?.user?.id);

  if (!data) return [];

  return data.map((item) => ({
    ...item.songs
  }))
};

export default getLikedSongs;
