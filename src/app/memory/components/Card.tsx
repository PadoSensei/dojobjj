//@ts-nocheck
// src/components/Card.js

import React from 'react';
import Image from 'next/image';
import publicImage from '../../../../public/media/images/Front Headlock Go Behind.png'

export default function Card({ card, isFlipped, onClick }) {

  // Function to get the correct image path
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    // If the path starts with 'http' or 'https', it's an external URL
    if (imagePath.startsWith('http')) return imagePath;
    // Otherwise, assume it's in the public folder
    return `/${imagePath.replace(/^\//, '')}`;
  };

  return (
    <div
      className="group relative w-full aspect-[3/4] rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 ${isFlipped ? 'rotate-y-180' : ''
          } preserve-3d`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-blue-300">
          <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
            ?
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white">
          {publicImage ? (
            <>
              <div className="relative w-full h-3/4">
                <Image
                  src={`/media/images/${card.title}.png`}
                  alt={card.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/blue.svg";
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
              </div>
              <div className="absolute bottom-0 w-full h-1/4 p-2 bg-blue-500">
                <h3 className="text-white text-sm font-semibold line-clamp-2">{card.title}</h3>
              </div>
            </>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400 text-lg font-semibold">
              Image not available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}