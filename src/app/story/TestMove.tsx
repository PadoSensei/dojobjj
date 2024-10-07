'use client'

import React, { useState, useEffect, useCallback } from 'react';

interface Move {
  name: string;
  steps: string[];
}

interface TestMoveProps {
  move: Move;
  onTestResult: (result: boolean) => void;
}

const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const TestMove: React.FC<TestMoveProps> = ({ move, onTestResult }) => {
  const [shuffledSteps, setShuffledSteps] = useState<string[]>(() => shuffleArray(move.steps));
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(60000); // 60 seconds in milliseconds

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

  const handleStepClick = useCallback((step: string, index: number) => {
    setSelectedStep(index);
    if (step === move.steps[currentStepIndex]) {
      setCurrentStepIndex((prevIndex) => {
        const newIndex = prevIndex + 1;
        if (newIndex === move.steps.length) {
          setMessage("Congratulations! You completed the move.");
          onTestResult(true); // Test passed
        } else {
          setMessage("Correct step!");
        }
        return newIndex;
      });
    } else {
      setMessage("Incorrect step. Try again.");
    }
  }, [currentStepIndex, move.steps, onTestResult]);

  const formatTime = (time: number): string => {
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