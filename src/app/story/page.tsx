//@ts-nocheck
'use client'
// pages/story.js
import React, { useState, useEffect } from 'react';
import storyData from '../../../adventures/dummyStory.json';
import animalStyles from './../../../animalStyles.json';
// import blueBeltMoves from '../../../bluebeltTest.json';

const BJJAdventureStory = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [currentStage, setCurrentStage] = useState('introduction');
  const [gameState, setGameState] = useState({
    animalStyle: null,
    movesLearned: []
  });
  const [moveTest, setMoveTest] = useState(null);

  useEffect(() => {
    if (selectedStyle) {
      setGameState({
        animalStyle: selectedStyle,
        movesLearned: []
      });
      setCurrentStage('introduction');
    }
  }, [selectedStyle]);

  const getCurrentStageData = () => {
    let stageData;
    if (currentStage === 'introduction') {
      stageData = { 
        description: storyData.introduction,
        isIntroduction: true
      };
    } else {
      stageData = storyData.stages.find(stage => stage.stageName === currentStage);
    }

    // Replace all instances of {animalStyle} with the selected style
    if (stageData) {
      stageData = {
        ...stageData,
        description: stageData.description.replace(/{animalStyle}/g, selectedStyle)
      };
      if (stageData.choices) {
        stageData.choices = stageData.choices.map(choice => ({
          ...choice,
          text: choice.text.replace(/{animalStyle}/g, selectedStyle)
        }));
      }
    }

    return stageData;
  };

  const startAdventure = () => {
    // Set the current stage to the first stage in the stages array
    setCurrentStage(storyData.stages[0].stageName);
  };

  const handleChoice = (choice) => {
    if (choice.requiredMove) {
      setMoveTest(choice.requiredMove);
    } else {
      setCurrentStage(choice.nextStage);
    }
  };

  const handleMoveTest = (success) => {
    if (success) {
      setGameState(prevState => ({
        ...prevState,
        movesLearned: [...prevState.movesLearned, moveTest]
      }));
      const currentStageData = getCurrentStageData();
      const choice = currentStageData.choices.find(c => c.requiredMove === moveTest);
      setCurrentStage(choice.nextStage);
    }
    setMoveTest(null);
  };

  const renderMoveTest = () => (
    <div className="bg-dojoGold p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-2">Technique Check: {moveTest}</h3>
      <p className="mb-4">Demonstrate your knowledge of this technique!</p>
      <div className="flex justify-center space-x-4">
        <button 
          className="bg-dojoRed text-white px-4 py-2 rounded hover:bg-dojoRed-dark"
          onClick={() => handleMoveTest(true)}
        >
          Success
        </button>
        <button 
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={() => handleMoveTest(false)}
        >
          Fail
        </button>
      </div>
    </div>
  );

  const renderStyleSelection = () => (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-dojoRed">Choose Your BJJ Animal Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {animalStyles.animalStyles.map((style, index) => (
          <button
            key={index}
            className="bg-dojoRed text-white p-4 rounded-lg hover:bg-dojoRed-dark transition duration-300"
            onClick={() => setSelectedStyle(style.name)}
          >
            <h3 className="text-xl font-bold mb-2">{style.name}</h3>
            <p className="text-sm">{style.description.substring(0, 100)}...</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStory = () => {
    const stageData = getCurrentStageData();
    if (!stageData) return <div>Loading...</div>;

    return (
      <div className="max-w-2xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4 text-dojoRed">{storyData.storyTitle}</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
          <p className="mb-4">{stageData.description}</p>
          {stageData.isIntroduction ? (
            <button
              className="w-full bg-dojoRed text-white p-2 rounded hover:bg-dojoRed-dark"
              onClick={startAdventure}
            >
              Start Adventure
            </button>
          ) : (
            !moveTest && stageData.choices && (
              <div className="space-y-2">
                {stageData.choices.map((choice, index) => (
                  <button
                    key={index}
                    className="w-full bg-dojoRed text-white p-2 rounded hover:bg-dojoRed-dark"
                    onClick={() => handleChoice(choice)}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )
          )}
        </div>
        {moveTest && renderMoveTest()}
        <div className="mt-4">
          <h3 className="font-bold mb-2">Moves Learned:</h3>
          <ul className="list-disc list-inside">
            {gameState.movesLearned.map((move, index) => (
              <li key={index}>{move}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      {!selectedStyle ? renderStyleSelection() : renderStory()}
    </div>
  );
};

export default BJJAdventureStory;