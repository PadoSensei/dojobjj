// src/components/Navbar.tsx
'use client';
import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/signin');
  };

  return (
    <nav className="bg-dojoRed p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-dojoWhite text-2xl font-bold">
          BJJ Dojo
        </Link>
        <div>
          {user ? (
            <>
              <Link href="/profile" className="text-dojoWhite mr-4">
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-dojoWhite text-dojoRed px-4 py-2 rounded hover:bg-dojoGold transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/signin"
              className="bg-dojoWhite text-dojoRed px-4 py-2 rounded hover:bg-dojoGold transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;