// src/store/useStore.ts
//@ts-nocheck
import { create } from 'zustand';
// import { persist } from 'zustand/middleware';
import { getUserData, updateUserProfile, updateUserMove, getMoveData } from '../app/utils/firebase';
import initialMoveCards from '../../bluebeltTest.json';

interface UserProfile {
    displayName: string;
    email: string;
    totalGamesPlayed: number;
    gamesWon: number;
    gamesLost: number;
    beltAwards: Record<string, number>;
  }
  
  interface MoveCard {
    id?: string;
    name: string;
    description: string;
    difficulty: string;
    position: string;
    type: string;
  }
  
  interface UserState {
    user: UserProfile | null;
    moveCards: MoveCard[];
    loading: boolean;
    error: string | null;
    fetchUserData: (userId: string) => Promise<void>;
    updateUserProfile: (userId: string, data: Partial<UserProfile>) => Promise<void>;
    fetchMoveCards: (userId: string) => Promise<void>;
    loadInitialMoveCards: (userId: string) => Promise<void>;
    clearUserData: () => void;
  }
  
  const useStore = create<UserState>((set) => ({
    user: null,
    moveCards: [],
    loading: false,
    error: null,
  
    fetchUserData: async (userId: string) => {
        set({ loading: true, error: null });
        try {
          const userData = await getUserData(userId);
          if (userData) {
            // Ensure beltAwards is always present
            const userProfile: UserProfile = {
              ...userData,
              beltAwards: userData.beltAwards || {},
            };
            set({ user: userProfile, loading: false });
          } else {
            set({ error: 'User not found', loading: false });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          set({ error: 'Failed to fetch user data', loading: false });
        }
      },
  
    updateUserProfile: async (userId: string, data: Partial<UserProfile>) => {
      set({ loading: true, error: null });
      try {
        await updateUserProfile(userId, data);
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
          loading: false
        }));
      } catch (error) {
        console.error('Error updating user profile:', error);
        set({ error: 'Failed to update user profile', loading: false });
      }
    },
  
    fetchMoveCards: async (userId: string) => {
      set({ loading: true, error: null });
      try {
        const moveData = await getMoveData(userId);
        set({ moveCards: moveData, loading: false });
      } catch (error) {
        console.error('Error fetching move cards:', error);
        set({ error: 'Failed to fetch move cards', loading: false });
      }
    },
  
    loadInitialMoveCards: async (userId: string) => {
      set({ loading: true, error: null });
      try {
        await loadMoveCardsToFirebase(userId, initialMoveCards);
        set({ loading: false });
        console.log('Initial move cards loaded to Firebase');
      } catch (error) {
        console.error('Error loading initial move cards:', error);
        set({ error: 'Failed to load initial move cards', loading: false });
      }
    },
  
    clearUserData: () => {
      set({
        user: null,
        moveCards: [],
        error: null,
        loading: false
      });
    },
  }));
  
  export default useStore;