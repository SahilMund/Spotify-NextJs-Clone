"use client";

import { useEffect, useState } from "react";

// import AuthModal from "@/components/AuthModal";
// import SubscribeModal from "@/components/SubscribeModal";
// import UploadModal from "@/components/UploadModal";
import { ProductWithPrice } from "@/types";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

const ModalProvider: React.FC<ModalProviderProps> = ({ products }) => {
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
    <UploadModal />
      {/* <AuthModal />
      <SubscribeModal products={products} />
       */}
      
    </>
  );
};

export default ModalProvider;
