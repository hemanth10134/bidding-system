import React, { useState, useEffect } from 'react';
import type { Market, Order } from '../types';

const getCategoryStyles = (category: string) => {
    const styles = {
        General: { bg: 'bg-purple-600' },
        Tech: { bg: 'bg-orange-600' },
        Finance: { bg: 'bg-blue-600' },
        Crypto: { bg: 'bg-yellow-500' },
    };
    return (styles as any)[category] || { bg: 'bg-gray-600' };
};

const MarketHeader: React.FC<{ market: Market, balance: number, onClaimReward: () => void, hasClaimedReward: boolean }> = ({ market, balance, onClaimReward, hasClaimedReward }) => {
    const { bg } = getCategoryStyles(market.category);
    return (
        <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6">
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center space-x-4 mb-4">
                        <span className={`${bg} text-white text-xs font-semibold px-2.5 py-1 rounded-md`}>{market.category}</span>
                        <span className="text-gray-400 text-sm">Live • 1 Participants</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">{market.title}</h1>
                    <p className="text-sm text-gray-400">Ends 28/8/2025</p>
                </div>
            </div>
             <p className="text-gray-400 mt-4 text-sm">Make correct prediction and win big!</p>
            <div className="mt-6 bg-[#101419] border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                <div>
                    <p className="text-sm text-gray-400">HI, Hemanth</p>
                    <p className="text-2xl font-bold text-white">₹{balance.toFixed(2)}</p>
                    <p className="text-xs text-gray-500">is your remaining balance</p>
                </div>
                <button 
                    onClick={onClaimReward}
                    disabled={hasClaimedReward}
                    className="bg-green-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                    {hasClaimedReward ? 'Reward Claimed' : 'Claim Your Reward!'}
                </button>
            </div>
        </div>
    );
};

const OrderBook: React.FC = () => {
    const yesOrders = [
        { price: '3.00', orders: 1 }, { price: '5.50', orders: 1 },
        { price: '6.00', orders: 1 }, { price: '6.50', orders: 8 },
        { price: '7.50', orders: 1 }
    ];

    return (
        <div>
            <h2 className="text-lg font-bold text-white mb-4">Order Book</h2>
            <div className="space-y-2">
                <div className="p-2 rounded-md grid grid-cols-12 gap-2 text-sm text-gray-300">
                    <div className="col-span-4 font-semibold text-green-400">₹9.50</div>
                    <div className="col-span-8 text-gray-500 text-xs flex items-center">Place NO order at these prices to match</div>
                </div>
                <div className="h-px bg-gray-700 my-2"></div>
                {yesOrders.reverse().map((order, index) => (
                     <div key={index} className="p-2 rounded-md grid grid-cols-12 gap-2 text-sm items-center group hover:bg-gray-800/50">
                        <div className="col-span-4 text-gray-300">{order.orders}</div>
                        <div className="col-span-4 font-semibold text-red-400 text-right">₹{order.price}</div>
                        <div className="col-span-4 h-full bg-red-500/10 rounded-sm">
                            <div className="h-full bg-red-500/30 rounded-sm" style={{width: `${order.orders * 10}%`}}></div>
                        </div>
                    </div>
                ))}
                 <div className="h-px bg-gray-700 my-2"></div>
                 <div className="p-2 rounded-md grid grid-cols-12 gap-2 text-sm text-gray-300">
                    <div className="col-span-12 text-gray-500 text-xs flex items-center">Place YES order at these prices to match</div>
                </div>
            </div>
        </div>
    );
};

const YourOrders: React.FC<{ orders: Order[] }> = ({ orders }) => {
    if (orders.length === 0) {
        return (
            <div className="text-center py-16 bg-[#101419] rounded-lg">
                <p className="text-gray-400">No orders yet</p>
                <p className="text-sm text-gray-500">Your order history will appear here</p>
            </div>
        );
    }

    return (
        <div className="bg-[#101419] rounded-lg p-2 space-y-2">
            {orders.map(order => (
                <div key={order.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 items-center text-sm p-3 rounded-md bg-[#1a2028]">
                    <div className={`font-bold ${order.type === 'YES' ? 'text-green-400' : 'text-red-400'}`}>
                        {order.type} <span className="font-normal text-gray-300">{order.quantity} @ ₹{order.price.toFixed(2)}</span>
                    </div>
                    <div className="text-gray-400"><span className="md:hidden">Cost: </span>₹{order.cost.toFixed(2)}</div>
                    <div>
                        {order.status === 'Pending' && <span className="flex items-center text-yellow-400"><svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Pending...</span>}
                        {order.status === 'Win' && <span className="font-semibold text-green-400">Win (+₹{(10 * order.quantity - order.cost).toFixed(2)})</span>}
                        {order.status === 'Loss' && <span className="font-semibold text-red-400">Loss (-₹{order.cost.toFixed(2)})</span>}
                         {order.status === 'Error' && <span className="font-semibold text-red-500">Error</span>}
                    </div>
                     <div className="col-span-1 md:col-span-2 text-xs text-gray-500 truncate" title={order.resultReason}>{order.resultReason || ''}</div>
                </div>
            ))}
        </div>
    );
};


const MainContent: React.FC<{ orders: Order[] }> = ({ orders }) => {
    const [activeTab, setActiveTab] = useState('AI Analysis');
    const tabs = ['Order Book', 'Activity', 'AI Analysis', 'Discussion'];

    return (
        <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6">
            <div className="flex border-b border-gray-700 mb-6 -mx-6 px-6">
                {tabs.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 pb-3 text-sm font-medium transition-colors outline-none ${
                            activeTab === tab 
                            ? 'text-white border-b-2 border-purple-500' 
                            : 'text-gray-400 hover:text-white'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div>
                {activeTab === 'Order Book' && <OrderBook />}
                {activeTab === 'Activity' && <div className="text-center text-gray-400 py-16">No activity yet.</div>}
                {activeTab === 'AI Analysis' && <OrderBook />}
                {activeTab === 'Discussion' && <div className="text-center text-gray-400 py-16">No discussion yet.</div>}
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-white mb-4">Your Orders</h2>
                <YourOrders orders={orders} />
            </div>
        </div>
    );
};


const PlaceBid: React.FC<{ market: Market, balance: number, isLoading: boolean, onPlaceBid: (type: 'YES' | 'NO', price: number, quantity: number) => void }> = ({ market, balance, isLoading, onPlaceBid }) => {
    const [bidType, setBidType] = useState<'YES' | 'NO'>('YES');
    const [price, setPrice] = useState(market.yesPrice);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        setBidType('YES');
        setPrice(market.yesPrice);
        setQuantity(1);
    }, [market]);
    
    const handlePriceChange = (amount: number) => {
        setPrice(prev => Math.max(0.1, Math.min(9.9, parseFloat((prev + amount).toFixed(2)))));
    }
    const handleQuantityChange = (amount: number) => {
        setQuantity(prev => Math.max(1, prev + amount));
    }

    const handleBidTypeChange = (newType: 'YES' | 'NO') => {
        setBidType(newType);
        setPrice(newType === 'YES' ? market.yesPrice : market.noPrice);
    };
    
    const youPay = price * quantity;
    const maxPayout = 10 * quantity;
    const profit = maxPayout - youPay;
    const fee = profit * 0.1;
    const youGetAfterFee = youPay + (profit - fee);
    
    const canAfford = balance >= youPay;

    const handleSubmit = () => {
        if (canAfford && !isLoading) {
            onPlaceBid(bidType, price, quantity);
        }
    }
    
    return (
        <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Place Your Bid</h2>
            <p className="text-sm text-gray-400">Choose your prediction and stake amount</p>
            
            <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={() => handleBidTypeChange('YES')}
                    className={`py-3 rounded-lg font-bold transition-colors ${bidType === 'YES' ? 'bg-green-500 text-white' : 'bg-[#101419] text-green-400 hover:bg-gray-700'}`}
                >
                    YES <span className="font-normal">₹{market.yesPrice.toFixed(2)}</span>
                </button>
                 <button 
                    onClick={() => handleBidTypeChange('NO')}
                    className={`py-3 rounded-lg font-bold transition-colors ${bidType === 'NO' ? 'bg-red-500 text-white' : 'bg-[#101419] text-red-400 hover:bg-gray-700'}`}
                >
                    NO <span className="font-normal">₹{market.noPrice.toFixed(2)}</span>
                </button>
            </div>
            
            <div className="flex justify-between items-center">
                <span className="text-gray-400">Price</span>
                <div className="flex items-center space-x-2 bg-[#101419] p-1 rounded-lg">
                    <button onClick={() => handlePriceChange(-0.1)} className="px-3 py-1 rounded-md text-xl hover:bg-gray-700">-</button>
                    <input type="text" value={`₹${price.toFixed(2)}`} readOnly className="w-20 bg-transparent text-center font-semibold text-white outline-none"/>
                    <button onClick={() => handlePriceChange(0.1)} className="px-3 py-1 rounded-md text-xl hover:bg-gray-700">+</button>
                </div>
            </div>

            <div className="flex justify-between items-center">
                <span className="text-gray-400">Quantity</span>
                <div className="flex items-center space-x-2 bg-[#101419] p-1 rounded-lg">
                    <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1 rounded-md text-xl hover:bg-gray-700">-</button>
                    <input type="text" value={quantity} readOnly className="w-20 bg-transparent text-center font-semibold text-white outline-none"/>
                    <button onClick={() => handleQuantityChange(1)} className="px-3 py-1 rounded-md text-xl hover:bg-gray-700">+</button>
                </div>
            </div>

            <div className="text-sm text-yellow-400 text-right">Will be pending. {quantity} shares</div>
            
            <div className="bg-[#101419] p-4 rounded-lg space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-400">You pay:</span>
                    <span className="text-white font-semibold">₹{youPay.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span className="text-gray-400">You Get (after 10% fee):</span>
                    <span className="text-green-400 font-semibold">₹{youGetAfterFee.toFixed(2)}</span>
                </div>
            </div>

            <button 
                onClick={handleSubmit}
                disabled={!canAfford || isLoading} 
                className="w-full py-3 rounded-lg font-bold transition-colors disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 bg-purple-600 text-white hover:bg-purple-700"
            >
                {isLoading ? 'Predicting...' : (canAfford ? 'Place Bid' : 'Insufficient Balance')}
            </button>
        </div>
    );
};

const StatsCards: React.FC<{ market: Market }> = ({ market }) => {
    return (
        <div className="space-y-6">
            <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6 text-sm">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    ⚡ Quick Stats
                </h3>
                <ul className="space-y-3">
                    <li className="flex justify-between"><span className="text-gray-400">Market ID</span> <span className="text-white font-mono">80577cbb</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Yes Price</span> <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">₹{market.yesPrice.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">No Price</span> <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded">₹{market.noPrice.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Volume</span> <span className="text-white">₹{market.volume.toFixed(2)}</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Expires</span> <span className="bg-orange-500/20 text-orange-300 px-2 py-0.5 rounded">Ends 28/8/2025</span></li>
                </ul>
            </div>
            
             <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6 text-sm">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    📊 Platform Stats
                </h3>
                 <ul className="space-y-3">
                    <li className="flex justify-between"><span className="text-gray-400">Money Collected</span> <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">₹0.00</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Max Liability</span> <span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded">₹0.00</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Platform Profit</span> <span className="bg-green-500/20 text-green-300 px-2 py-0.5 rounded">₹0.00</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Status</span> <span className="bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded">At Risk</span></li>
                </ul>
            </div>

             <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-6 text-sm">
                 <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    📈 Recent Activity
                </h3>
                 <ul className="space-y-3">
                    <li className="flex justify-between"><span className="text-gray-400">Market created</span> <span className="text-white">24/8/2025</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Last updated</span> <span className="text-white">25/8/2025</span></li>
                    <li className="flex justify-between"><span className="text-gray-400">Current volume</span> <span className="bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">₹{market.volume.toFixed(2)}</span></li>
                </ul>
            </div>
        </div>
    );
};


interface BidPageProps {
  market: Market;
  balance: number;
  orders: Order[];
  isLoading: boolean;
  onClaimReward: () => void;
  onPlaceBid: (type: 'YES' | 'NO', price: number, quantity: number) => void;
  hasClaimedReward: boolean;
}

const BidPage: React.FC<BidPageProps> = ({ market, balance, orders, isLoading, onClaimReward, onPlaceBid, hasClaimedReward }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      <div className="lg:col-span-2 space-y-6">
        <MarketHeader market={market} balance={balance} onClaimReward={onClaimReward} hasClaimedReward={hasClaimedReward} />
        <MainContent orders={orders} />
      </div>

      <div className="lg:col-span-1 space-y-6">
        <PlaceBid market={market} balance={balance} isLoading={isLoading} onPlaceBid={onPlaceBid} />
        <StatsCards market={market} />
      </div>
    </div>
  );
};

export default BidPage;