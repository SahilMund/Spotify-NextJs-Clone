import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { PlayList } from "@/types";

const useLoadThumbnail = (list: PlayList | any) => {
  const supabaseClient = useSupabaseClient();

  if (!list) {
    return null;
  }

  const { data: imageData } = supabaseClient.storage
    .from("playlist_thumbnail")
    .getPublicUrl(list.thumbnail_path);

  return imageData.publicUrl;
};

export default useLoadThumbnail;
