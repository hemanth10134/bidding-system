export interface Market {
  id: number;
  category: string;
  image: string;
  title: string;
  volume: number;
  yesPrice: number;
  noPrice: number;
}

export interface Order {
  id: number;
  marketTitle: string;
  type: 'YES' | 'NO';
  price: number;
  quantity: number;
  cost: number;
  status: 'Pending' | 'Win' | 'Loss' | 'Error';
  resultReason?: string;
}

export interface UserData {
    balance: number;
    orders: Order[];
    hasClaimedReward: boolean;
}