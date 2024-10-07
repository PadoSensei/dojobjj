// src/app/components/StoreInitializer.tsx
'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import useStore from '../../store/useStore';

export default function StoreInitializer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const pathname = usePathname();
  const { fetchUserData, fetchMoveCards, loading: storeLoading, error } = useStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeStore = async () => {
      if (!authLoading) {
        console.log('Auth state:', user ? 'Authenticated' : 'Not authenticated');
        if (user) {
          console.log('User ID:', user.uid);
          try {
            await Promise.all([
              fetchUserData(user.uid),
              fetchMoveCards(user.uid)
            ]);
            setIsInitialized(true);
          } catch (error) {
            console.error('Error initializing store:', error);
            // Handle error (e.g., show error message to user)
          }
        } else if (pathname !== '/signin') {
          router.push('/signin');
        }
      }
    };

    initializeStore();
  }, [user, authLoading, fetchUserData, fetchMoveCards, router, pathname]);

  if (authLoading || (user && !isInitialized)) {
    return <div>Loading...</div>; // Or your custom loading component
  }

  if (error) {
    return <div>Error: {error}</div>; // Or your custom error component
  }

  return <>{children}</>;
}