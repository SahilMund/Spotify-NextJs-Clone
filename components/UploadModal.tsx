"use client";

import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
      lyrics : null
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      
      console.log(values);
      
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      const lyricsFile = values.lyrics?.[0];

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields')
        return;
      }

      const uniqueID = uniqid();

      // Upload song
      const { 
        data: songData, 
        error: songError 
      } = await supabaseClient
        .storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueID}`, songFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (songError) {
        setIsLoading(false);
        return toast.error('Failed song upload');
      }

      // Upload image
      const { 
        data: imageData, 
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }


      // Upload Lyrics file
      const { 
        data: lyricsData, 
        error: lyricsError
      } = await supabaseClient
        .storage
        .from('lyrics')
        .upload(`lyric-${values.title}-${uniqueID}`, lyricsFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (lyricsError) {
        console.log(lyricsError);
        
        setIsLoading(false);
        return toast.error('Failed lyrics upload');
      }

      
      // Create record 
      const { error: supabaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
          geners : values.geners,
          lyrics : lyricsData.path
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }
      
      router.refresh();
      setIsLoading(false);
      toast.success('Song Uploaded !');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add a song"
      description=""
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song author"
        />
        <Input
          id="geners"
          disabled={isLoading}
          {...register('geners', { required: true })}
          placeholder="Geners"
        />
        <div>
          <div className="pb-1">
            Select a song file
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="song"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select lyrics for the music (optional)
          </div>
          <Input
            placeholder="Lyrics" 
            disabled={isLoading}
            type="file"
            id="lyrics"
            {...register('lyrics')}
          />
        </div>
        <Button  disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;