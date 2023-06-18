"use client";

import { FaRegShareSquare } from "react-icons/fa";
import Button from '@/components/Button';
import {useEffect} from 'react';

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import useSubscribeModal from "@/hooks/useSubscribeModal";

import useAuthModal from "@/hooks/useAuthModal";


interface HeaderContentProps {
  title: string;
  playList : any;
  loggedInUserPlaylist : any;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ title, playList, loggedInUserPlaylist }) => {

  
  const supabaseClient = useSupabaseClient();
  // const { user } = useUser();
  const router = useRouter();

  const { user, subscription } = useUser();
  const authModal = useAuthModal();
  const subscribeModal = useSubscribeModal();

  useEffect(() => {

    const isUserAlreadyHaveAccess = loggedInUserPlaylist.filter((item : any) => item.id === playList?.id );

    if(isUserAlreadyHaveAccess && isUserAlreadyHaveAccess.length !== 0){
      toast.error("You are already having access to this playlist");
      router.replace('/');
    }
  },[router, loggedInUserPlaylist,playList, title])


  const handleAdd = async () => {


    if (!user) {
      return authModal.onOpen();
    }

    if (!subscription) {
      return subscribeModal.onOpen();
    }
    const { error: supabaseError } = await supabaseClient
    .from("playlist_user_access")
    .insert({
      user_id: user?.id,
      playlist_id: playList?.id
    });

  if (supabaseError) {
    return toast.error(supabaseError.message);
  }

  toast.success("Playlist Added to your account !");
  router.replace('/');
  
  }

  return (
    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
      <p className="hidden md:block font-semibold text-sm">You do not have access to this playlist, Add this to your list</p>
      <Button
        onClick={handleAdd}
        className="bg-white px-6 py-2"
      >Add to your List</Button>
      <h2
        className="
                     text-white 
                     text-4xl 
                     sm:text-5xl 
                     lg:text-7xl 
                     font-bold
                   "
      >
        {title}
      </h2>
    </div>
  );
};

export default HeaderContent;
