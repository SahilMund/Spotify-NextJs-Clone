import { create } from 'zustand';

interface CreatePlaylistModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreatePlaylistModal = create<CreatePlaylistModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreatePlaylistModal;
