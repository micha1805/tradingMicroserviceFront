import { create } from 'zustand';
import { user, profile } from '@/lib/api';
import type { FullProfileResponse, CurrentBalanceResponse, UserUpdateRequest } from '@/types/api';

interface UserState {
  profile: FullProfileResponse | null;
  balance: number | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  fetchBalance: () => Promise<void>;
  updateProfile: (data: UserUpdateRequest) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  balance: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profileData = await profile.getProfile();
      set({ profile: profileData, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch profile', loading: false });
      console.error('Error fetching profile:', error);
    }
  },

  fetchBalance: async () => {
    set({ loading: true, error: null });
    try {
      const balanceData = await user.getCurrentBalance();
      set({ balance: balanceData.currentBalanceInCent, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch balance', loading: false });
      console.error('Error fetching balance:', error);
    }
  },

  updateProfile: async (data: UserUpdateRequest) => {
    set({ loading: true, error: null });
    try {
      await user.updateUser(data);
      const profileData = await profile.getProfile();
      set({ profile: profileData, loading: false });
    } catch (error) {
      set({ error: 'Failed to update profile', loading: false });
      console.error('Error updating profile:', error);
    }
  },
})); 