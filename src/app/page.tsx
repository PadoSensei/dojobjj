// pages/index.js
'use client'
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/signin');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null; // This will prevent any flash of content before redirect
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-dojoWhite">
        <h1 className="text-4xl font-bold text-dojoRed mb-8">Welcome to the Dojo Game App</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <Link href="/memory" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Memory
            </button>
          </Link>
          <Link href="/story" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Story
            </button>
          </Link>
          <Link href="/study" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Study
            </button>
          </Link>
          <Link href="/steps" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Steps
            </button>
          </Link>
          <Link href="/styles" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Animal Styles
            </button>
          </Link>
          <Link href="/profile" passHref>
            <button className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300">
              Profile
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}