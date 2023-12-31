"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {FaPlay} from 'react-icons/fa';
import useLoadThumbnail from "@/hooks/useLoadThumbnail";
import {useUser} from "@/hooks/useUser";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
  data: any
}

const ListItem: React.FC<ListItemProps> = ({ image, href, name , data}) => {
  const router = useRouter();
  const { user } = useUser();


 // eslint-disable-next-line
  const imagePath = image !== 'N/A' ? image :  useLoadThumbnail(data) as string;
  const handleOnClick = () => {
    if(!user) return;
    router.push(href);
  };

  return (
    <button
    onClick={handleOnClick}
      className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-neutral-100/10
        hover:bg-neutral-100/20
        transition
        pr-4"
    >
      <div
        className="
        relative
        min-h-[64px]
        min-w-[64px]
        "
      >
         {/* eslint-disable-next-line */}
        <Image className="object-cover" fill src={imagePath} alt="Image" />
      </div>

      <p 
        className="
            font-medium
            truncate
            py-5 mr-4"
        >
        {name}
      </p>

      <div className="
            absolute
            transition
            opacity-0
            rounded-full
            flex
            items-center
            justify-center
            bg-green-500
            p-4
            drop-shadow-md
            right-5
            group-hover:opacity-100
            hover:scale-110
      " >

        <FaPlay className="text-green-200"/>
      </div>
    </button>
  );
};

export default ListItem;
