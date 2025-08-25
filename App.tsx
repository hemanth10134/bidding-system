import React, { useState, useEffect } from 'react';
import Background from './components/Background';
import Header from './components/Header';
import PredictionForm from './components/PredictionForm';
import BidPage from './components/BidPage';
import LoginPage from './components/LoginPage';
import { getPrediction } from './services/geminiService';
import * as dbService from './services/dbService';
import type { Market, Order, UserData } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoadingBid, setIsLoadingBid] = useState(false);

  useEffect(() => {
    if (userData) {
      dbService.saveUserData(userData);
    }
  }, [userData]);

  const handleGoHome = () => {
    setSelectedMarket(null);
  };

  const handleLogin = () => {
    setUserData(dbService.getUserData());
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setSelectedMarket(null);
    setUserData(null);
  };

  const handleClaimReward = () => {
    if (userData && !userData.hasClaimedReward) {
        setUserData(prev => prev ? { ...prev, balance: 1000, hasClaimedReward: true } : prev);
    }
  };

  const handlePlaceBid = async (bidType: 'YES' | 'NO', price: number, quantity: number) => {
    if (!userData || !selectedMarket) return;

    const cost = price * quantity;
    if (userData.balance < cost) {
      console.error("Insufficient balance");
      return;
    }

    setIsLoadingBid(true);
    
    const newOrder: Order = {
        id: Date.now(),
        marketTitle: selectedMarket.title,
        type: bidType,
        price,
        quantity,
        cost,
        status: 'Pending',
    };
    
    setUserData(prev => {
        if (!prev) return null;
        return {
            ...prev,
            balance: prev.balance - cost,
            orders: [newOrder, ...prev.orders],
        }
    });

    try {
        const predictionResponse = await getPrediction(selectedMarket.title);
        const resultMatch = predictionResponse.match(/^Prediction: (YES|NO)\./);
        const aiPrediction = resultMatch ? resultMatch[1] as 'YES' | 'NO' : null;
        const justification = predictionResponse.replace(/^Prediction: (YES|NO)\.\s*/, '');

        if (!aiPrediction) {
            throw new Error("Could not parse AI prediction.");
        }

        const isWin = aiPrediction === bidType;
        
        setUserData(prev => {
            if (!prev) return null;
            const updatedBalance = isWin ? prev.balance + (10 * quantity) : prev.balance;
            const updatedOrders = prev.orders.map((order): Order => 
                order.id === newOrder.id 
                ? { ...order, status: isWin ? 'Win' : 'Loss', resultReason: justification } 
                : order
            );
            return { ...prev, orders: updatedOrders, balance: updatedBalance };
        });

    } catch (error) {
        console.error("Failed to get prediction or process bid:", error);
        
        setUserData(prev => {
            if (!prev) return null;
            // Refund on error
            const updatedBalance = prev.balance + cost;
            const updatedOrders = prev.orders.map((order): Order =>
                order.id === newOrder.id 
                ? { ...order, status: 'Error', resultReason: 'Error processing prediction.' }
                : order
            );
            return { ...prev, orders: updatedOrders, balance: updatedBalance };
        });
    } finally {
        setIsLoadingBid(false);
    }
  };
  
  if (!isLoggedIn || !userData) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="bg-[#101419] text-gray-200 min-h-screen">
      <Background />
      <Header onGoHome={handleGoHome} onLogout={handleLogout} />
      <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-screen-2xl mx-auto">
        {selectedMarket ? (
          <BidPage 
            market={selectedMarket}
            balance={userData.balance}
            orders={userData.orders}
            isLoading={isLoadingBid}
            onClaimReward={handleClaimReward}
            onPlaceBid={handlePlaceBid}
            hasClaimedReward={userData.hasClaimedReward}
          />
        ) : (
          <PredictionForm onSelectMarket={setSelectedMarket} />
        )}
      </main>
    </div>
  );
};

export default App;