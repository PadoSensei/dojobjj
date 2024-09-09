//@ts-nocheck
"use client"
// pages/study.js

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import moves from '../../../bluebeltTest.json';

export default function MoveStepsGame() {
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [showGif, setShowGif] = useState(false);
  const [shuffledSteps, setShuffledSteps] = useState([]);
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [gameState, setGameState] = useState('playing'); // 'playing', 'won', 'lost'
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeTaken, setTimeTaken] = useState(0);
  const [beltAwarded, setBeltAwarded] = useState(null);

  const movesWithMedia = moves.filter(move => move.media === true);
  const currentMove = movesWithMedia[currentMoveIndex];

  useEffect(() => {
    resetGame();
  }, [currentMoveIndex]);

  useEffect(() => {
    if (gameState !== 'playing') return;
  
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          endGame('lost');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  
    return () => clearInterval(timer);
  }, [gameState]);

  const resetGame = () => {
    const steps = currentMove['move steps'].sort((a, b) => a.order - b.order);
    setShuffledSteps(shuffleArray([...steps]));
    setSelectedSteps([]);
    setGameState('playing');
    setTimeLeft(60);
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleStepClick = (step) => {
    if (gameState !== 'playing') return;
  
    const newSelectedSteps = [...selectedSteps, step];
    setSelectedSteps(newSelectedSteps);
  
    if (newSelectedSteps.length === shuffledSteps.length) {
      const isCorrect = newSelectedSteps.every((s, index) => s.order === index + 1);
      if (isCorrect) {
        endGame('won');
      } else {
        endGame('lost');
      }
    }
  };

  const getStepButtonClass = (step) => {
    if (!selectedSteps.includes(step)) return 'bg-dojoGold hover:bg-dojoGold-dark';
    if (gameState === 'playing') return 'bg-dojoBlue';
    return selectedSteps.indexOf(step) === step.order - 1 ? 'bg-green-500' : 'bg-red-500';
  };

  const goToNextMove = () => {
    setCurrentMoveIndex((prevIndex) => (prevIndex + 1) % movesWithMedia.length);
  };

  const goToPreviousMove = () => {
    setCurrentMoveIndex((prevIndex) => (prevIndex - 1 + movesWithMedia.length) % movesWithMedia.length);
  };

  const getBeltAward = (time) => {
    console.log('get belt')
    if (time <= 10) return 'black';
    if (time <= 20) return 'brown';
    if (time <= 30) return 'purple';
    if (time <= 40) return 'blue';
    return 'white';
  };

  const endGame = (result) => {
    setGameState(result);
    if (result === 'won') {
      const timeSpent = 60 - timeLeft;
      setTimeTaken(timeSpent);
      setBeltAwarded(getBeltAward(timeSpent));
      console.log(beltAwarded)
    } else {
      setBeltAwarded('fail');
    }
  };

  const getBeltColor = (belt) => {
    const colors = {
      black: 'bg-black',
      brown: 'bg-yellow-800',
      purple: 'bg-purple-600',
      blue: 'bg-blue-500',
      white: 'bg-white border border-gray-300',
      fail: 'bg-red-500'
    };
    return colors[belt] || 'bg-gray-300';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4 px-4 sm:px-6 lg:px-8 bg-dojoWhite">
      <main className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-dojoRed mb-6 sm:mb-8">BJJ Move Steps Game</h1>
        <div className="w-full bg-dojoGold rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="flex flex-col lg:flex-row">
            <div className="w-full lg:w-1/2 p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-dojoRed mb-4">{currentMove.title}</h2>
              <div className="relative w-full aspect-square cursor-pointer" onClick={() => setShowGif(!showGif)}>
                <Image
                  src={showGif ? `/media/gifs/${currentMove.title}.gif` : `/media/images/${currentMove.title}(1).png`}
                  alt={currentMove.title}
                  layout="fill"
                  objectFit="contain"
                  className="rounded-lg"
                />
              </div>
              <div className="mt-4 text-center">
                <div className="inline-block bg-dojoWhite rounded-full p-2">
                  <div className={`text-2xl font-bold ${timeLeft > 10 ? 'text-dojoRed' : 'text-red-600'}`}>
                    {timeLeft}s
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 bg-dojoWhite p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-dojoRed mb-4">Order the Steps:</h3>
              <div className="grid grid-cols-1 gap-2">
                {shuffledSteps.map((step) => (
                  <button
                    key={step.order}
                    onClick={() => handleStepClick(step)}
                    className={`${getStepButtonClass(step)} text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300`}
                    disabled={selectedSteps.includes(step) || gameState !== 'playing'}
                  >
                    {step.description}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <button
            className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
            onClick={goToPreviousMove}
          >
            Previous Move
          </button>
          <button
            className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
            onClick={gameState !== 'playing' ? resetGame : null}
          >
            {gameState !== 'playing' ? 'Play Again' : 'Reset'}
          </button>
          <button
            className="bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
            onClick={goToNextMove}
          >
            Next Move
          </button>
        </div>
        {gameState !== 'playing' && (
          <div className="mt-4 text-center">
            <div className={`text-2xl font-bold ${gameState === 'won' ? 'text-green-500' : 'text-red-500'}`}>
              {gameState === 'won' ? 'Correct!' : 'Incorrect or Time\'s up!'}
            </div>
            {beltAwarded && (
              <div className="mt-2">
                <div className="text-xl font-semibold">Belt Awarded:</div>
                <div className={`w-32 h-8 mx-auto mt-2 ${getBeltColor(beltAwarded)}`}></div>
                <div className="mt-2 text-lg">
                  {beltAwarded === 'fail' ? 'Try again!' : `${beltAwarded.charAt(0).toUpperCase() + beltAwarded.slice(1)} Belt`}
                </div>
                {gameState === 'won' && (
                  <div className="mt-2 text-lg">
                    Time taken: {timeTaken} seconds
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}