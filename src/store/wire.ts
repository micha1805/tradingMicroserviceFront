import { create } from 'zustand';
import { wire } from '@/lib/api';
import { useUserStore } from './user';
import type { WirePost } from '@/types/api';

interface WireState {
  loading: boolean;
  error: string | null;
  createWire: (data: WirePost) => Promise<void>;
}

export const useWireStore = create<WireState>((set) => ({
  loading: false,
  error: null,

  createWire: async (data: WirePost) => {
    set({ loading: true, error: null });
    try {
      await wire.createWire(data);
      // Update the user's balance after wire transfer
      await useUserStore.getState().fetchBalance();
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to create wire transfer', loading: false });
    }
  },
})); 