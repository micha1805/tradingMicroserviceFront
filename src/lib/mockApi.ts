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
  Trade,
} from '@/types/api';

// Mock data
const mockUserData: User = {
  id: 1,
  email: 'test@example.com',
  password: 'hashed_password',
  role: 'USER',
  profile: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    address: '123 Main St',
    phoneNumber: '555-0123',
    user: {} as User, // Circular reference handled
  },
  wires: [],
  trades: [],
  authorities: [{ authority: 'ROLE_USER' }],
  username: 'test@example.com',
  accountNonLocked: true,
  accountNonExpired: true,
  credentialsNonExpired: true,
  enabled: true,
};

// Mock trades data
const mockTrades: Trade[] = [
  // Open trades
  {
    id: 1,
    symbol: 'AAPL',
    quantity: 100,
    openPriceInCent: 18750, // $187.50
    closePriceInCent: 0,
    openDateTime: new Date('2024-03-15T10:30:00Z').toISOString(),
    closeDateTime: '',
    open: true,
  },
  {
    id: 2,
    symbol: 'GOOGL',
    quantity: 50,
    openPriceInCent: 141200, // $1,412.00
    closePriceInCent: 0,
    openDateTime: new Date('2024-03-16T14:45:00Z').toISOString(),
    closeDateTime: '',
    open: true,
  },
  {
    id: 3,
    symbol: 'MSFT',
    quantity: 75,
    openPriceInCent: 41050, // $410.50
    closePriceInCent: 0,
    openDateTime: new Date('2024-03-17T09:15:00Z').toISOString(),
    closeDateTime: '',
    open: true,
  },
  // Closed trades with profits
  {
    id: 4,
    symbol: 'TSLA',
    quantity: 30,
    openPriceInCent: 17500, // $175.00
    closePriceInCent: 19000, // $190.00
    openDateTime: new Date('2024-03-10T11:30:00Z').toISOString(),
    closeDateTime: new Date('2024-03-14T15:45:00Z').toISOString(),
    open: false,
  },
  {
    id: 5,
    symbol: 'NVDA',
    quantity: 25,
    openPriceInCent: 78500, // $785.00
    closePriceInCent: 89500, // $895.00
    openDateTime: new Date('2024-03-12T13:20:00Z').toISOString(),
    closeDateTime: new Date('2024-03-15T16:30:00Z').toISOString(),
    open: false,
  },
  // Closed trades with losses
  {
    id: 6,
    symbol: 'META',
    quantity: 40,
    openPriceInCent: 49500, // $495.00
    closePriceInCent: 47500, // $475.00
    openDateTime: new Date('2024-03-08T10:00:00Z').toISOString(),
    closeDateTime: new Date('2024-03-13T14:20:00Z').toISOString(),
    open: false,
  }
];

export const mockAuth = {
  login: async (data: LoginRequest): Promise<AuthenticationResponse> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (data.email === 'test@example.com' && data.password === 'password') {
      return { token: 'mock_jwt_token' };
    }
    throw new Error('Invalid credentials');
  },

  signup: async (data: SignupRequest): Promise<AuthenticationResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { token: 'mock_jwt_token' };
  },
};

export const mockUser = {
  getUsers: async (): Promise<User[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [mockUserData];
  },

  getUserById: async (userId: number): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockUserData;
  },

  updateUser: async (data: UserUpdateRequest): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
  },

  getCurrentBalance: async (): Promise<CurrentBalanceResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { currentBalanceInCent: 100000 }; // $1,000.00
  },
};

export const mockTrade = {
  createTrade: async (data: TradePost): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'mock_trade_id';
  },

  closeTrade: async (tradeId: string): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return tradeId;
  },

  getTrade: async (tradeId: string): Promise<TradeShowResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const trade = mockTrades.find(t => t.id.toString() === tradeId);
    return { trade: trade || mockTrades[0] };
  },

  getOpenPNL: async (): Promise<OpenPNLResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Calculate open P&L from mock trades
    const openPnl = mockTrades
      .filter(t => t.open)
      .reduce((total, trade) => {
        // Simulate current price as 5% higher than open price
        const currentPrice = Math.floor(trade.openPriceInCent * 1.05);
        return total + (currentPrice - trade.openPriceInCent) * trade.quantity;
      }, 0);
    return { openPnlInCent: openPnl };
  },

  getClosedPNL: async (): Promise<ClosedPNLResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // Calculate closed P&L from mock trades
    const closedPnl = mockTrades
      .filter(t => !t.open)
      .reduce((total, trade) => {
        return total + (trade.closePriceInCent - trade.openPriceInCent) * trade.quantity;
      }, 0);
    return { closedPnlInCent: closedPnl };
  },

  getAllTrades: async (): Promise<TradeIndexResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { trades: mockTrades };
  },

  getOpenTrades: async (): Promise<OpenTradesResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const openTrades = mockTrades.filter(t => t.open);
    return { trades: openTrades };
  },

  getClosedTrades: async (): Promise<OpenTradesResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const closedTrades = mockTrades.filter(t => !t.open);
    return { trades: closedTrades };
  },
};

export const mockWire = {
  createWire: async (data: WirePost): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return 'mock_wire_id';
  },
};

export const mockProfile = {
  getProfile: async (): Promise<FullProfileResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      email: mockUserData.email,
      firstName: mockUserData.profile.firstName,
      lastName: mockUserData.profile.lastName,
      address: mockUserData.profile.address,
      phoneNumber: mockUserData.profile.phoneNumber,
    };
  },
}; 