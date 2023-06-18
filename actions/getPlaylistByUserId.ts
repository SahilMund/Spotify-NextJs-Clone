import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { PlayList } from "@/types";
import { useEffect } from "react";

const getPlaylistByUserId = async (): Promise<PlayList[]> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError) {
    console.log(sessionError.message);
    return [];
  }


  const { data, error: supaBaseError } = await supabase
    .from("playlist")
    .select("*")
    .eq("user_id", sessionData.session?.user.id)
    .order("created_at", { ascending: false });

  if (supaBaseError) {
    console.log(supaBaseError.message);
  }


  const { data: userPlayLists, error } = await supabase
    .from("playlist_user_access")
    .select("playlist_id(*)")
    .eq("user_id", sessionData.session?.user.id);

  if (error) {
    console.log(error.message);
  }

  console.log("userPlayLists", userPlayLists);

  const userplaylistObjects = userPlayLists?.map((item) => item.playlist_id);

  const combinedArray = data?.concat(userplaylistObjects);

  return (combinedArray as any) || [];
};

export default getPlaylistByUserId;
