import React from 'react';

const LogoIcon = () => (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
        <rect width="28" height="28" rx="6" fill="#10B981"/>
        <path d="M8 14.5L12.5 19L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const BidsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const SimulatorIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const BellIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

interface HeaderProps {
    onGoHome: () => void;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onGoHome, onLogout }) => {
  return (
    <header className="bg-[#101419] sticky top-0 z-50 border-b border-gray-800">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={onGoHome} className="flex-shrink-0 flex items-center focus:outline-none">
              <LogoIcon />
              <span className="text-white text-2xl font-bold">NxtWin</span>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4 ml-10">
            <a href="#" onClick={(e) => { e.preventDefault(); onGoHome(); }} className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <HomeIcon /> Home
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); onGoHome(); }} className="text-green-400 px-3 py-2 rounded-md text-sm font-medium flex items-center relative">
              <BidsIcon /> Bids
              <span className="absolute top-2 right-1 block h-2 w-2 rounded-full bg-green-400"></span>
            </a>
            <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <SimulatorIcon /> Simulator
            </a>
          </div>

          <div className="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-800 rounded-md leading-5 bg-[#1a2028] text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-900 focus:border-purple-500 sm:text-sm"
                  placeholder="Search markets, assets, pairs..."
                  type="search"
                />
              </div>
            </div>
          </div>
          
          <div className="flex items-center ml-4">
            <button className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white relative">
              <span className="sr-only">View notifications</span>
              <BellIcon />
               <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-[#101419]"></span>
            </button>
            <div className="ml-4 relative">
              <div>
                <button className="bg-red-500 flex text-sm rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold">
                    H
                  </div>
                </button>
              </div>
            </div>
            <button 
              onClick={onLogout}
              className="ml-4 px-3 py-1.5 rounded-md text-sm font-medium text-gray-300 border border-gray-700 hover:bg-gray-700 hover:text-white focus:outline-none"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;