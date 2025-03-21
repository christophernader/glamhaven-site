import { create } from 'zustand';

interface Dress {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  isAvailable: boolean;
  price: number;
}

interface GalleryState {
  dresses: Dress[];
  favorites: string[];
  filter: string;
  setFilter: (filter: string) => void;
  addToFavorites: (dressId: string) => void;
  removeFromFavorites: (dressId: string) => void;
  toggleFavorite: (dressId: string) => void;
}

export const useGalleryStore = create<GalleryState>((set) => ({
  dresses: [],
  favorites: [],
  filter: 'all',
  setFilter: (filter) => set({ filter }),
  addToFavorites: (dressId) =>
    set((state) => ({
      favorites: [...state.favorites, dressId],
    })),
  removeFromFavorites: (dressId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== dressId),
    })),
  toggleFavorite: (dressId) =>
    set((state) => ({
      favorites: state.favorites.includes(dressId)
        ? state.favorites.filter((id) => id !== dressId)
        : [...state.favorites, dressId],
    })),
})); 