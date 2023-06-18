"use client";

import { useEffect, useState } from "react";

import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice, PlayList } from "@/types";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import CreatePlaylistModal from "@/components/CreatePlaylistModal";
import AddSongToPlaylistModal from "@/components/AddSongToPlaylistModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
  playlist : PlayList[]
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products, playlist }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   To prevent our modal to mount in server side to avoid hydration error

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AuthModal />
      <CreatePlaylistModal />
      <AddSongToPlaylistModal playlist={playlist}/>
      <UploadModal />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModalProvider;
