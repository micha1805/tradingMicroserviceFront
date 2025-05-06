export interface User {
  id: number;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  profile: Profile;
  wires: Wire[];
  trades: Trade[];
  authorities: GrantedAuthority[];
  username: string;
  accountNonLocked: boolean;
  accountNonExpired: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface Profile {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  user: User;
}

export interface Trade {
  id: number;
  symbol: string;
  quantity: number;
  openPriceInCent: number;
  closePriceInCent: number;
  openDateTime: string;
  closeDateTime: string;
  open: boolean;
}

export interface Wire {
  id: number;
  amount: number;
  user: User;
}

export interface GrantedAuthority {
  authority: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  address: string;
  phone_number: string;
}

export interface AuthenticationResponse {
  token: string;
}

export interface UserUpdateRequest {
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  address?: string;
  phone?: string;
}

export interface WirePost {
  amount_in_cent: number;
}

export interface TradePost {
  quantity: number;
  symbol: string;
}

export interface CurrentBalanceResponse {
  currentBalanceInCent: number;
}

export interface TradeShowResponse {
  trade: Trade;
}

export interface OpenPNLResponse {
  openPnlInCent: number;
}

export interface ClosedPNLResponse {
  closedPnlInCent: number;
}

export interface TradeIndexResponse {
  trades: Trade[];
}

export interface OpenTradesResponse {
  trades: Trade[];
}

export interface FullProfileResponse {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
} 