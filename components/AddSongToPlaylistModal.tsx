"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { useUser } from "@/hooks/useUser";
import Select from "./Select";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";
import useAddSongToPlaylistModal from "@/hooks/useAddSongToPlaylistModal";
import { PlayList } from "./../types";
import { useAddToPlaylist } from "@/hooks/useAddToPlaylist";

interface AddSongToPlaylistModalProps {
  playlist: PlayList[] | null;
}

const AddSongToPlaylistModal: React.FC<AddSongToPlaylistModalProps> = ({
  playlist,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const addSongToPlaylistModal = useAddSongToPlaylistModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const addtoPlaylistContext = useAddToPlaylist();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      PlayList: "0",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      addtoPlaylistContext.updateSelectedSong(null);

      addSongToPlaylistModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      const song = addtoPlaylistContext?.selectedSong;

      // const thumbnailFile = values.thumbnail_path?.[0];
      // console.log("****Values*****", values);
      // console.log("****song*****", song);

      if (values.PlayList === "0") {
        toast.error("Select a playlist to add the song");
        return;
      }

      const { data : isAlreadyPresent , error } = await supabaseClient
        .from("playlist_songs")
        .select('*')
        .eq('user_id',user?.id)
        .eq('song_id',song?.id)
        .eq('playlist_id',values?.PlayList);

        if (error) {
          return toast.error(error.message);
        }
      

        console.log(isAlreadyPresent)
        if (isAlreadyPresent && isAlreadyPresent.length !== 0) {
          return toast.error('This Song is already added to the selected playlist');
        }
      

      // Create record
      const { error: supabaseError } = await supabaseClient
        .from("playlist_songs")
        .insert({
          user_id: user?.id,
          song_id: song?.id,
          playlist_id: values?.PlayList,
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success(`Song added to the playlist`);
      reset();
      addSongToPlaylistModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add To Playlist"
      description="Add Selected music to the Playlist"
      isOpen={addSongToPlaylistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="Song"
          disabled={true}
          value={addtoPlaylistContext?.selectedSong?.title}
        />
        

        {playlist ? (
          <Select
            id="PlayList"
            disabled={isLoading}
            {...register("PlayList", { required: true })}
            defaultValue="0" // Set the default value to "Public"
          >
            <option value="0">Select the playlist</option>
            {/* eslint-disable-next-line */}
            {playlist &&
              playlist.map((item: any) => (
                <option key={item.id} value={item.id}>
                  {item.Name}
                </option>
              ))}
          </Select>
        ) : (
          <Input
            disabled={true}
            placeholder="You have not created any playlist yet!"
          />
        )}

        <Button disabled={isLoading} type="submit">
          Add to Playlist
        </Button>
      </form>
    </Modal>
  );
};

export default AddSongToPlaylistModal;
