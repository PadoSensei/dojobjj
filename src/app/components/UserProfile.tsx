// src/components/UserProfile.tsx
import React, { useEffect } from 'react';
import useStore from '../../store/useStore';
import { useAuth } from '../../contexts/AuthContext';

interface BeltAwards {
  [key: string]: number | undefined;
}

interface Profile {
  displayName?: string;
  email?: string;
  totalGamesPlayed?: number;
  gamesWon?: number;
  gamesLost?: number;
  beltAwards?: BeltAwards;
}

interface StoreState {
  user: Profile | null;
  fetchUserData: (uid: string) => void;
  loading: boolean;
  error: string | null;
}

export function ProfileComponent() {
  const { user } = useAuth();
  const { user: profile, fetchUserData, loading, error } = useStore() as StoreState;

  useEffect(() => {
    if (user?.uid && !profile) {
      fetchUserData(user.uid);
    }
  }, [user, profile, fetchUserData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-dojoRed"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-dojoRed text-center p-4">Error: {error}</div>;
  }

  if (!profile) {
    return <div className="text-gray-600 text-center p-4">No profile data available.</div>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="text-center p-6 bg-dojoRed text-white">
        <h2 className="text-3xl font-bold">{`${profile.displayName || 'User'}'s Profile`}</h2>
      </div>
      <div className="p-6">
        <p className="text-gray-700 mb-4"><span className="font-bold">Email:</span> {profile.email}</p>
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xl font-bold">{profile.totalGamesPlayed ?? 0}</p>
            <p className="text-sm text-gray-600">Total Games</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xl font-bold text-green-600">{profile.gamesWon ?? 0}</p>
            <p className="text-sm text-gray-600">Won</p>
          </div>
          <div className="text-center p-2 bg-gray-100 rounded">
            <p className="text-xl font-bold text-red-600">{profile.gamesLost ?? 0}</p>
            <p className="text-sm text-gray-600">Lost</p>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Belts Earned:</h3>
          {profile.beltAwards && Object.keys(profile.beltAwards).length > 0 ? (
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(profile.beltAwards).map(([belt, count]) => (
                <div key={belt} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="capitalize">{belt}</span>
                  <span className="bg-dojoRed text-white px-2 py-1 rounded">{count ?? 'N/A'}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No belts earned yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}