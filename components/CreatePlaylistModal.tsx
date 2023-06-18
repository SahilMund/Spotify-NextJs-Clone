"use client";

import uniqid from "uniqid";
import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from "@/hooks/useUploadModal";
import useCreatePlaylistModal from "@/hooks/useCreatePlaylistModal";
import { useUser } from "@/hooks/useUser";
import Select from "./Select";

import Modal from "./Modal";
import Input from "./Input";
import Button from "./Button";

const CreatePlaylistModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const createPlaylistModal = useCreatePlaylistModal();

  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      Name: "",
      Description: "",
      Public: "Public",
      songLists: null,
      user_id: null,
      thumbnail_path: "",
    },
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      // uploadModal.onClose();
      createPlaylistModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);

      
      // const imageFile = values.image?.[0];
      // const songFile = values.song?.[0];
      const thumbnailFile = values.thumbnail_path?.[0];
      console.log(values, thumbnailFile);

      // if (!imageFile || !songFile || !user) {
      //   toast.error("Missing fields");
      //   return;
      // }

      const uniqueID = uniqid();

      // Upload thumbnail
      const { data: thumbnailData, error: thumbnailError } = await supabaseClient.storage
        .from("playlist_thumbnail")
        .upload(`thumbnail-${values.title}-${uniqueID}`, thumbnailFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (thumbnailError) {
        setIsLoading(false);
        return toast.error("Failed thumbnail upload");
      }

    

      // Create record
      const { error: supabaseError } = await supabaseClient
        .from("playlist")
        .insert({
          user_id: user?.id,
          Name: values.Name,
          Description: values.Description,
          Public: values.Public.toLowerCase() === 'public' ? true : false,
          thumbnail_path: thumbnailData.path,
          
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }

      router.refresh();
      setIsLoading(false);
      toast.success("Playlist Created !");
      reset();
      createPlaylistModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create a Playlist"
      description=""
      isOpen={createPlaylistModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="Name"
          disabled={isLoading}
          {...register("Name", { required: true })}
          placeholder="Playlist Name"
        />
        <Input
          id="Description"
          disabled={isLoading}
          {...register("Description", { required: true })}
          placeholder="Playlist Description"
        />
        {/* <Input
          id="Public"
          disabled={isLoading}
          {...register("Public", { required: true })}
          placeholder="Public"
        /> */}

<Select
          id="Public"
          disabled={isLoading}
          {...register("Public", { required: true })}
          defaultValue="Public" // Set the default value to "Public"
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </Select>

        <div>
          <div className="pb-1">Select the thumbnail for your Playlist</div>
          <Input
            placeholder="test"
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="thumbnail_path"
            {...register("thumbnail_path", { required: true })}
          />
        </div>

        <Button disabled={isLoading} type="submit">
          Create Playlist
        </Button>
      </form>
    </Modal>
  );
};

export default CreatePlaylistModal;
