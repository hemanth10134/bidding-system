import React from 'react';
import type { Market } from '../types';

interface MarketCardProps {
  market: Market;
  onSelectMarket: (market: Market) => void;
}

const MarketCard: React.FC<MarketCardProps> = ({ market, onSelectMarket }) => {
  const categoryColor = {
    General: 'bg-purple-600',
    Tech: 'bg-orange-600',
    Finance: 'bg-blue-600',
    Crypto: 'bg-yellow-500',
  }[market.category] || 'bg-gray-600';

  return (
    <div onClick={() => onSelectMarket(market)} className="bg-[#1a2028] rounded-2xl overflow-hidden border border-gray-800 flex flex-col h-full hover:border-purple-500 transition-colors duration-300 cursor-pointer">
      <div className="relative">
        <img className="w-full h-40 object-cover" src={market.image} alt={market.title} />
        <div className={`absolute top-3 left-3 text-white text-xs font-semibold px-2 py-1 rounded-md ${categoryColor}`}>
          {market.category}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white font-semibold mb-2 flex-grow">{market.title}</h3>
        <p className="text-gray-400 text-sm mb-4">Vol: ₹{market.volume}</p>
        <div className="flex items-center justify-between gap-3">
          <button className="flex-1 text-center py-2 rounded-lg border border-green-500 text-green-500 hover:bg-green-500/10 transition-colors duration-300 font-semibold">
            Yes <span className="ml-2">₹{market.yesPrice.toFixed(2)}</span>
          </button>
          <button className="flex-1 text-center py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500/10 transition-colors duration-300 font-semibold">
            No <span className="ml-2">₹{market.noPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;
