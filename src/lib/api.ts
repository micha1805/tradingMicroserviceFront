import axios from 'axios';
import { config } from '@/config';
import {
  mockAuth,
  mockUser,
  mockTrade,
  mockWire,
  mockProfile,
} from './mockApi';
import type {
  AuthenticationResponse,
  LoginRequest,
  SignupRequest,
  UserUpdateRequest,
  WirePost,
  TradePost,
  CurrentBalanceResponse,
  TradeShowResponse,
  OpenPNLResponse,
  ClosedPNLResponse,
  TradeIndexResponse,
  OpenTradesResponse,
  FullProfileResponse,
  User,
} from '@/types/api';

const api = axios.create({
  baseURL: config.api.baseURL,
  withCredentials: true,  // Required for CORS with credentials
  headers: {
    'Content-Type': 'application/json',
    'Accept': '*/*'
  }
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

// Real API implementations
const realAuth = {
  login: async (data: LoginRequest) => {
    try {
      const response = await api({
        method: 'POST',
        url: '/auth/login',
        data: {
          email: data.email,
          password: data.password
        },
        withCredentials: true
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  signup: async (data: SignupRequest) => {
    const response = await api.post<AuthenticationResponse>('/auth/signup', data);
    return response.data;
  },
};

const realUser = {
  getUsers: async () => {
    const response = await api.get<User[]>('/user');
    return response.data;
  },
  getUserById: async (userId: number) => {
    const response = await api.get<User>(`/user/${userId}`);
    return response.data;
  },
  updateUser: async (data: UserUpdateRequest) => {
    const response = await api.put('/user', data);
    return response.data;
  },
  getCurrentBalance: async () => {
    const response = await api.get<CurrentBalanceResponse>('/user/currentBalance');
    return response.data;
  },
};

const realTrade = {
  createTrade: async (data: TradePost) => {
    const response = await api.post<string>('/trade/openTrade', data);
    return response.data;
  },
  closeTrade: async (tradeId: string) => {
    const response = await api.patch<string>(`/trade/closeTrade/${tradeId}`);
    return response.data;
  },
  getTrade: async (tradeId: string) => {
    const response = await api.get<TradeShowResponse>(`/trade/${tradeId}`);
    return response.data;
  },
  getOpenPNL: async () => {
    const response = await api.get<OpenPNLResponse>('/trade/openPNL');
    return response.data;
  },
  getClosedPNL: async () => {
    const response = await api.get<ClosedPNLResponse>('/trade/closedPNL');
    return response.data;
  },
  getAllTrades: async () => {
    const response = await api.get<TradeIndexResponse>('/trades/index');
    return response.data;
  },
  getOpenTrades: async () => {
    const response = await api.get<OpenTradesResponse>('/trade/index/open');
    return response.data;
  },
  getClosedTrades: async () => {
    const response = await api.get<OpenTradesResponse>('/trade/index/closed');
    return response.data;
  },
};

const realWire = {
  createWire: async (data: WirePost) => {
    const response = await api.post<string>('/wire', data);
    return response.data;
  },
};

const realProfile = {
  getProfile: async () => {
    const response = await api.get<FullProfileResponse>('/profile');
    return response.data;
  },
};

// Export either mock or real implementations based on configuration
export const auth = config.api.mockEnabled ? mockAuth : realAuth;
export const user = config.api.mockEnabled ? mockUser : realUser;
export const trade = config.api.mockEnabled ? mockTrade : realTrade;
export const wire = config.api.mockEnabled ? mockWire : realWire;
export const profile = config.api.mockEnabled ? mockProfile : realProfile; 