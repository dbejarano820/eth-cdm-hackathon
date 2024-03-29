export interface User {
  id: string;
  name: string;
  email: string;
  total_balance: number;
}

export interface Wallet {
  id: string;
  user_id: string;
  public_key: string;
  private_key: string;
  blockchain: string;
  balance: number;
}

export enum OrderStatusLabel {
  Pending = 'Pending',
  Completed = 'Completed',
  Incomplete = 'Incomplete',
  Expired = 'Expired'
}

export interface Order {
  id: string;
  user_id: string;
  amount: number;
  description: string;
  order_status: OrderStatusLabel;
  transaction_hash: string;
  blockchain: string;
  payed_amount: number;
}
