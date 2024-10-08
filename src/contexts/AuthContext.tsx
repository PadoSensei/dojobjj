// src/contexts/AuthContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { getFirebaseApp, getDb, getFireAuth } from '../firebaseConfig';
import useStore from '@/store/useStore';

// When you need Firebase App
const app = getFirebaseApp();

// When you need Firestore
const db = getDb();

// When you need Auth
const auth = getFireAuth();

interface AuthContextType {
  user: any;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { clearUserData } = useStore(); // Assume you have a clearUserData action in your store

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      clearUserData(); // Clear user data from the store
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}