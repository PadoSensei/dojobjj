//@ts-nocheck
"use client"
// pages/study.js

import { useState } from 'react';
import Image from 'next/image';
import moves from '../../../bluebeltTest.json'
import { shuffleArray, flattenMoves } from '../utils/gameUtils'

export default function Study() {

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [showGif, setShowGif] = useState(false);

  const movesWithMedia = moves.filter(move => move.media === true);
  console.log("move cards loaded into the study section:", movesWithMedia);
  const currentMove = movesWithMedia[currentMoveIndex];

  const goToNextMove = () => {
    setCurrentMoveIndex((prevIndex) => (prevIndex + 1) % movesWithMedia.length);
  };

  const goToPreviousMove = () => {
    setCurrentMoveIndex((prevIndex) => (prevIndex - 1 + movesWithMedia.length) % movesWithMedia.length);
  };

  const toggleGif = () => {
    setShowGif(!showGif);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-dojoWhite">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-dojoRed mb-6 sm:mb-8">Study BJJ Moves</h1>
        <div className="w-full bg-dojoGold rounded-lg shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left side: Title and Image */}
            <div className="w-full lg:w-1/2 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-dojoRed mb-4">{currentMove.title}</h2>
              <div className="relative w-full aspect-square cursor-pointer" onClick={toggleGif}>
                <Image
                  src={showGif
                    ? `/media/gifs/${currentMove.title}.gif`
                    : `/media/images/${currentMove.title}.png`
                  }
                  alt={currentMove.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 hover:opacity-100 transition-opacity duration-300">
                  {showGif ? "Click to see static image" : "Click to see animation"}
                </div>
              </div>
            </div>
            {/* Right side: Step Instructions */}
            <div className="w-full lg:w-1/2 bg-dojoWhite p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-dojoRed mb-4">Steps:</h3>
              {/* Uncomment and adjust when you have the steps data */}
              <ol className="list-none p-0">
                {currentMove['move steps'].sort((a, b) => a.order - b.order).map((step) => (
                  <li key={step.order} className="mb-4 pl-8 relative">
                    <span className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-dojoRed text-dojoWhite font-bold text-sm">
                      {step.order}
                    </span>
                    <p className="text-dojoBlack">{step.description}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        {/* Navigation buttons */}
        <div className="flex justify-between w-full mt-6">
          <button
            className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
            onClick={goToPreviousMove}
          >
            Previous Move
          </button>
          <button
            className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
            onClick={goToNextMove}
          >
            Next Move
          </button>
        </div>
      </main>
    </div>
  );
}
