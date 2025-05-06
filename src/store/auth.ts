import { create } from 'zustand';
import { auth } from '@/lib/api';
import type { LoginRequest, SignupRequest } from '@/types/api';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  signup: (data: SignupRequest) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  
  login: async (data) => {
    try {
      const response = await auth.login(data);
      localStorage.setItem('token', response.token);
      set({ token: response.token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  signup: async (data) => {
    try {
      const response = await auth.signup(data);
      localStorage.setItem('token', response.token);
      set({ token: response.token, isAuthenticated: true });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, isAuthenticated: false });
  },
})); 