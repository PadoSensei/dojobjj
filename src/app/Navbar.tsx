import React from 'react';
import Link from 'next/link';
// import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="bg-dojoRed py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
       
        <span className="text-dojoWhite font-bold ml-2">Dojo Game App</span>
      </div>
      <div className="flex space-x-4">
        <Link href="/memory" className="text-dojoWhite hover:text-dojoGold">
          Memory
        </Link>
        <Link href="/story" className="text-dojoWhite hover:text-dojoGold">
          Story
        </Link>
        <Link href="/study" className="text-dojoWhite hover:text-dojoGold">
          Study
        </Link>
        <Link href="/steps" className="text-dojoWhite hover:text-dojoGold">
          Steps
        </Link>
        <Link href="/styles" className="text-dojoWhite hover:text-dojoGold">
          Animal Styles
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
