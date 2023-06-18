"use client";

import { useEffect, useState } from "react";
import { CgPlayListRemove } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

interface RemoveFromPlayListButtonProps {
  songId: string;
  playlistId: string;
}

const RemoveFromPlayListButton: React.FC<RemoveFromPlayListButtonProps> = ({
  songId, playlistId
}) => {
  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  useEffect(() => {
    if (!user?.id) {
      return;
    }

   
  }, [songId,playlistId, supabaseClient, user?.id]);

  // const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleRemove = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    const { error } = await supabaseClient
      .from("playlist_songs")
      .delete()
      .eq("user_id", user.id)
      .eq("song_id", songId)
      .eq("playlist_id", playlistId);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Song removed from the playlist");
    router.refresh();
  };

  return (
    <button
      className="
        cursor-pointer 
        hover:opacity-75 
        transition
      "
      onClick={handleRemove}
    >
      <CgPlayListRemove color={"22c55e"} size={25} />
    </button>
  );
};

export default RemoveFromPlayListButton;
