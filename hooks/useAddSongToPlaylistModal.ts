import { create } from 'zustand';

interface addSongToAlbum {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddSongToPlaylistModal = create<addSongToAlbum>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddSongToPlaylistModal;
