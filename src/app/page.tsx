// pages/index.js
import Link from 'next/link';
import Navbar from './Navbar';

export default function Home() {
  return (
    <>
    <Navbar /> 
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
     
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-dojoRed mb-8">Welcome to the Dojo Game App</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </div>
    </div>
    </>
  );
}
