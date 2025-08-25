import React, { useState } from 'react';

const LogoIcon = () => (
    <svg width="36" height="36" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
        <rect width="28" height="28" rx="6" fill="#10B981"/>
        <path d="M8 14.5L12.5 19L20 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.996 5.856 29.803 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
        <path fill="#FF3D00" d="M6.306 14.691c-1.645 3.356-2.67 7.22-2.67 11.31s1.025 7.954 2.67 11.31l7.66-5.814c-.38-1.16-.6-2.37-.6-3.64s.22-2.48.6-3.64l-7.66-5.814z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-4.873c-1.895 1.227-4.25 1.95-6.81 1.95c-4.452 0-8.288-2.63-9.77-6.32l-7.23 5.58C9.277 40.065 16.12 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083L43.595 20L42 20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 4.873C39.42 35.617 42 30.221 42 24c0-1.341-.138-2.65-.389-3.917z" />
    </svg>
);

interface LoginPageProps {
    onLogin: () => void;
}

const GoogleConsentScreen: React.FC<{ onConfirm: () => void; onCancel: () => void; }> = ({ onConfirm, onCancel }) => (
    <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-8 shadow-lg w-full max-w-md animate-fade-in">
        <div className="flex items-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H7a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
            <h2 className="text-xl font-bold text-white">Choose an account</h2>
        </div>
        <p className="text-gray-400 text-sm mb-6">to continue to NxtWin</p>

        <div
            onClick={onConfirm}
            className="flex items-center p-3 rounded-lg border border-gray-700 hover:bg-gray-800 cursor-pointer transition-colors"
        >
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold text-white mr-4">
            H
            </div>
            <div>
            <p className="font-semibold text-white">Hemanth Kumar</p>
            <p className="text-sm text-gray-400">hemanth.k@example.com</p>
            </div>
        </div>

        <div className="mt-6">
            <button onClick={onCancel} className="w-full flex items-center p-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <div>
                     <p className="font-semibold text-white text-left">Use another account</p>
                </div>
            </button>
        </div>

        <p className="text-xs text-gray-500 mt-6 text-center">
            To continue, Google will share your name, email address, and profile picture with NxtWin. Before using this app, you can review its <a href="#" className="text-purple-400 hover:underline">privacy policy</a> and <a href="#" className="text-purple-400 hover:underline">terms of service</a>.
        </p>
    </div>
);


const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [showGoogleConsent, setShowGoogleConsent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin();
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#101419] p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center items-center mb-8">
                    <LogoIcon />
                    <span className="text-white text-3xl font-bold">NxtWin</span>
                </div>

                {showGoogleConsent ? (
                    <GoogleConsentScreen onConfirm={onLogin} onCancel={() => setShowGoogleConsent(false)} />
                ) : (
                    <div className="bg-[#1a2028] border border-gray-800 rounded-2xl p-8 shadow-lg">
                        <h2 className="text-2xl font-bold text-white text-center mb-2">{isSignUp ? 'Create an account' : 'Sign In'}</h2>
                        <p className="text-center text-gray-400 text-sm mb-8">{isSignUp ? 'to start your journey.' : 'to continue to NxtWin.'}</p>
                        
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                            {isSignUp && (
                                    <div>
                                        <label htmlFor="name" className="text-sm font-medium text-gray-300 sr-only">Full Name</label>
                                        <input type="text" name="name" id="name" placeholder="Full Name" required className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-[#101419] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                    </div>
                                )}
                                <div>
                                    <label htmlFor="email" className="text-sm font-medium text-gray-300 sr-only">Email address</label>
                                    <input type="email" name="email" id="email" placeholder="Email address" required className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-[#101419] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                </div>
                                <div>
                                    <label htmlFor="password" className="text-sm font-medium text-gray-300 sr-only">Password</label>
                                    <input type="password" name="password" id="password" placeholder="Password" required className="block w-full px-4 py-3 border border-gray-700 rounded-lg bg-[#101419] text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"/>
                                </div>
                            </div>

                            <div className="mt-8">
                                <button type="submit" className="w-full py-3 px-4 text-white bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold text-sm transition-colors">
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </button>
                            </div>
                        </form>
                        
                        <div className="mt-6 flex items-center justify-center">
                            <div className="w-full border-t border-gray-700"></div>
                            <span className="px-3 text-gray-500 text-sm bg-[#1a2028]">OR</span>
                            <div className="w-full border-t border-gray-700"></div>
                        </div>

                        <div className="mt-6">
                            <button onClick={() => setShowGoogleConsent(true)} className="w-full flex items-center justify-center py-3 px-4 text-white bg-[#101419] hover:bg-gray-800 border border-gray-700 rounded-lg font-medium text-sm transition-colors">
                                <GoogleIcon />
                                Sign In with Google
                            </button>
                        </div>

                        <p className="mt-8 text-center text-sm text-gray-400">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                            <button onClick={() => setIsSignUp(!isSignUp)} className="font-medium text-purple-400 hover:text-purple-300 ml-2 focus:outline-none">
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;
