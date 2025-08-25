import React, { useState } from 'react';
import MarketCard from './PredictionDisplay';
import type { Market } from '../types';

const marketsData: Market[] = [
  {
    id: 1,
    category: 'General',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1974&auto=format&fit=crop',
    title: 'Will the temperature in Delhi be above 36°C before 28 Aug 3:00PM?',
    volume: 70.5,
    yesPrice: 5.00,
    noPrice: 5.00,
  },
  {
    id: 2,
    category: 'Tech',
    image: 'https://nxt-winn.vercel.app/_next/image?url=%2Fclaude.webp&w=640&q=75',
    title: 'Will OpenAI release GPT-5 before 2025?',
    volume: 150.2,
    yesPrice: 6.50,
    noPrice: 3.50,
  },
  {
    id: 3,
    category: 'Finance',
    image: 'https://i.guim.co.uk/img/media/ef573276855d9e04aaed3dae615757a8725e52d9/297_329_2974_1784/master/2974.jpg?width=620&dpr=1&s=none&crop=none',
    title: 'Jeff Bezos to become richest man again?',
    volume: 81,
    yesPrice: 5.00,
    noPrice: 5.00,
  },
  {
    id: 4,
    category: 'Crypto',
    image: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?q=80&w=2070&auto=format&fit=crop',
    title: 'Ethereum above $3950 on August 29?',
    volume: 0,
    yesPrice: 5.00,
    noPrice: 5.00,
  },
];

const categories = ['All', 'General', 'Tech', 'Finance', 'Crypto'];

interface PredictionFormProps {
    onSelectMarket: (market: Market) => void;
}

const PredictionForm: React.FC<PredictionFormProps> = ({ onSelectMarket }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div>
      <div className="flex items-center space-x-2 sm:space-x-4 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${
              activeCategory === category
                ? 'bg-gray-700 text-white'
                : 'bg-transparent border border-gray-700 text-gray-400 hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mb-6">
        <p className="text-gray-400">{marketsData.length} markets</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marketsData.map((market) => (
          <MarketCard key={market.id} market={market} onSelectMarket={onSelectMarket} />
        ))}
      </div>
    </div>
  );
};

export default PredictionForm;
