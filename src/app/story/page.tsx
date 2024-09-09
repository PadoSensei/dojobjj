//@ts-nocheck
'use client'
// pages/story.js
import React, { useState } from 'react';
import TestMove from './TestMove';
import storyData from './story.json';
import movesData from '../../../moves.json';

const Story = () => {
  const [currentPart, setCurrentPart] = useState(storyData.start);
  const [showTest, setShowTest] = useState(false);
  const [testMove, setTestMove] = useState(null);
  const [testFailed, setTestFailed] = useState(false);

  const handleChoiceClick = (nextPart, technique) => {
    if (nextPart === 'test') {
      const move = findMove(technique);
      setTestMove(move);
      setShowTest(true);
    } else {
      setCurrentPart(storyData[nextPart]);
    }
  };

  const handleTestResult = (passed) => {
    setShowTest(false);
    if (passed) {
      setCurrentPart(storyData[currentPart.nextPartAfterTest]);
    } else {
      setTestFailed(true);
    }
  };

  const findMove = (technique) => {
    for (const category in movesData.bjjTechniques) {
      for (const subCategory in movesData.bjjTechniques[category]) {
        const move = movesData.bjjTechniques[category][subCategory].find(m => m.name === technique);
        if (move) {
          return move;
        }
      }
    }
    return null;
  };

  if (testFailed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold text-dojoRed mb-8">Test Failed</h1>
        <p className="mb-4">You failed the move test. The story ends here.</p>
      </div>
    );
  }

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold text-dojoRed mb-8">{currentPart.title}</h1>
      <p className="mb-4">{currentPart.text}</p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {currentPart.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => handleChoiceClick(choice.nextPart, choice.technique)}
            className="py-2 px-4 rounded-lg shadow-md font-semibold transition duration-300 bg-dojoRed text-dojoWhite hover:bg-dojoGold"
          >
            {choice.text}
          </button>
        ))}
      </div>
      {showTest && testMove && <TestMove move={testMove} onTestResult={handleTestResult} />}
    </div>
  );
};

export default Story;
