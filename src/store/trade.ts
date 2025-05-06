import { create } from 'zustand';
import { trade } from '@/lib/api';
import type { Trade, TradePost } from '@/types/api';

interface TradeState {
  trades: Trade[];
  openTrades: Trade[];
  closedTrades: Trade[];
  openPnl: number | null;
  closedPnl: number | null;
  loading: boolean;
  error: string | null;
  fetchAllTrades: () => Promise<void>;
  fetchOpenTrades: () => Promise<void>;
  fetchClosedTrades: () => Promise<void>;
  fetchPnl: () => Promise<void>;
  createTrade: (data: TradePost) => Promise<void>;
  closeTrade: (tradeId: string) => Promise<void>;
}

export const useTradeStore = create<TradeState>((set, get) => ({
  trades: [],
  openTrades: [],
  closedTrades: [],
  openPnl: null,
  closedPnl: null,
  loading: false,
  error: null,

  fetchAllTrades: async () => {
    set({ loading: true, error: null });
    try {
      const response = await trade.getAllTrades();
      set({ trades: response.trades, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch trades', loading: false });
    }
  },

  fetchOpenTrades: async () => {
    set({ loading: true, error: null });
    try {
      const response = await trade.getOpenTrades();
      set({ openTrades: response.trades, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch open trades', loading: false });
    }
  },

  fetchClosedTrades: async () => {
    set({ loading: true, error: null });
    try {
      const response = await trade.getClosedTrades();
      set({ closedTrades: response.trades, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch closed trades', loading: false });
    }
  },

  fetchPnl: async () => {
    set({ loading: true, error: null });
    try {
      const [openPnl, closedPnl] = await Promise.all([
        trade.getOpenPNL(),
        trade.getClosedPNL(),
      ]);
      set({
        openPnl: openPnl.openPnlInCent,
        closedPnl: closedPnl.closedPnlInCent,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to fetch PNL', loading: false });
    }
  },

  createTrade: async (data: TradePost) => {
    set({ loading: true, error: null });
    try {
      await trade.createTrade(data);
      await get().fetchOpenTrades();
      await get().fetchPnl();
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to create trade', loading: false });
    }
  },

  closeTrade: async (tradeId: string) => {
    set({ loading: true, error: null });
    try {
      await trade.closeTrade(tradeId);
      await Promise.all([
        get().fetchOpenTrades(),
        get().fetchClosedTrades(),
        get().fetchPnl(),
      ]);
      set({ loading: false });
    } catch (error) {
      set({ error: 'Failed to close trade', loading: false });
    }
  },
})); 