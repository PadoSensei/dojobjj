//@ts-nocheck
'use client'
// components/TestMove.js
import React, { useState, useEffect } from 'react';

// Shuffle the steps to display them out of sequence
const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const TestMove = ({ move, onTestResult }) => {
  const [shuffledSteps, setShuffledSteps] = useState(shuffleArray([...move.steps]));
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [message, setMessage] = useState("");
  const [selectedStep, setSelectedStep] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60000); // 60 seconds in milliseconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 10) {
          clearInterval(timer);
          onTestResult(false); // Test failed due to timeout
          return 0;
        }
        return prevTime - 10;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [onTestResult]);

  // Handle button click
  const handleStepClick = (step, index) => {
    setSelectedStep(index);
    if (step === move.steps[currentStepIndex]) {
      setCurrentStepIndex(currentStepIndex + 1);
      setMessage("Correct step!");
      if (currentStepIndex + 1 === move.steps.length) {
        setMessage("Congratulations! You completed the move.");
        onTestResult(true); // Test passed
      }
    } else {
      setMessage("Incorrect step. Try again.");
    }
  };

  const formatTime = (time) => {
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${seconds}.${milliseconds.toString().padStart(3, '0')}`;
  };

  return (
    <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold text-dojoRed mb-4">{move.name}</h2>
        <div className="text-xl font-bold mb-4">Time Left: {formatTime(timeLeft)}s</div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {shuffledSteps.map((step, index) => (
            <button
              key={index}
              onClick={() => handleStepClick(step, index)}
              className={`py-2 px-4 rounded-lg shadow-md font-semibold transition duration-300 ${
                selectedStep === index
                  ? step === move.steps[currentStepIndex]
                    ? 'bg-correctGreen text-white'
                    : 'bg-incorrectRed text-white'
                  : 'bg-dojoRed text-dojoWhite hover:bg-dojoGold'
              }`}
            >
              {step}
            </button>
          ))}
        </div>
        <p className="mt-4 text-lg">{message}</p>
        <button
          className="mt-4 bg-dojoRed text-dojoWhite font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
          onClick={() => onTestResult(false)}
        >
          Close
        </button>
      </div>
    </dialog>
  );
};

export default TestMove;
