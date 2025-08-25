import type { UserData } from '../types';

const DB_KEY = 'nxtwin_userdata';

const DEFAULT_USER_DATA: UserData = {
  balance: 0,
  orders: [],
  hasClaimedReward: false,
};

export function getUserData(): UserData {
  try {
    const rawData = localStorage.getItem(DB_KEY);
    if (!rawData) {
      return DEFAULT_USER_DATA;
    }
    const parsedData = JSON.parse(rawData);
    // Basic validation to ensure the loaded data has the expected shape
    if (typeof parsedData.balance === 'number' && Array.isArray(parsedData.orders)) {
        // Merge with defaults to handle old data structures without `hasClaimedReward`
        return { ...DEFAULT_USER_DATA, ...parsedData };
    }
    return DEFAULT_USER_DATA;
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
    return DEFAULT_USER_DATA;
  }
}

export function saveUserData(data: UserData): void {
  try {
    const stringifiedData = JSON.stringify(data);
    localStorage.setItem(DB_KEY, stringifiedData);
  } catch (error) {
    console.error("Failed to save user data to localStorage", error);
  }
}