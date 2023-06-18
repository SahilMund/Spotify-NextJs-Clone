import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { PlayList } from "@/types";

const getPlaylistByTitle = async (title: string): Promise<PlayList | any> => {
  const supabase = createServerComponentClient({
    cookies: cookies,
  });

  if (!title) {
    return null;
  }
  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .ilike("Name", `%${title}%`)
    .single();

  if (error) {
    console.log(error.message);
  }

  return (data as any) || {};
};

export default getPlaylistByTitle;
