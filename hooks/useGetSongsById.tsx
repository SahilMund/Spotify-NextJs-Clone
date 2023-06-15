import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useSongById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [song, setSong] = useState<Song | undefined>(undefined);
  
  
//   If we want to authenticate any particualr feature i.e. only authenticated user can see it so in that case we need to use useSessionContext.
// This protection is defined by policies created in supabase for that particular table 
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchSong = async () => {
      const { data, error } = await supabaseClient
        .from('songs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }
      
      setSong(data as Song);
      setIsLoading(false);
    }

    fetchSong();
  }, [id, supabaseClient]);


//   By using useMemo, the memoized object is cached and returned on subsequent renders as long as the dependencies (isLoading and song) remain the same. This can be beneficial in scenarios where the computation of the object is expensive or when you want to optimize performance by avoiding unnecessary recalculations.
  return useMemo(() => ({
    isLoading,
    song
  }), [isLoading, song]);
};

export default useSongById;
