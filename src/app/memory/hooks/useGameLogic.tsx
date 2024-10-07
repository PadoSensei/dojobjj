//@ts-nocheck
import { useState, useEffect } from 'react';
import movesData from '../../../../bluebeltTest.json';
import { shuffleArray, flattenMoves } from '../../utils/gameUtils'

export function useGameLogic(movesData) {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matchesMade, setMatchesMade] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startNewGame = () => {
    console.log('Starting new memory game');
    // const allMoves = flattenMoves(movesData);

    // Filter moves where media is true
    const movesWithMedia = movesData.filter(move => move.media === true);
    console.log('Moves with media:', movesWithMedia.length);

    const gameMoves = shuffleArray(movesWithMedia).slice(0, 5);
    console.log('Game moves:', gameMoves);
    const gameCards = shuffleArray([...gameMoves, ...gameMoves]).map((move, index) => ({
      ...move,
      id: index,
      img: `/images/${move.title.toLowerCase().replace(/\s+/g, '-')}.jpg`
    }));
    console.log('Game cards:', gameCards);
    setCards(gameCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setMatchesMade(0);
    setGameOver(false);
  };

  const handleCardClick = (clickedCard) => {
    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, clickedCard]);
      setMoves(moves + 1);
      
      if (flippedCards[0].title === clickedCard.title) {
        setMatchedCards([...matchedCards, flippedCards[0], clickedCard]);
        setFlippedCards([]);
        setMatchesMade(matchesMade + 1);
        if (matchedCards.length + 2 === cards.length) {
          setGameOver(true);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    } else {
      setFlippedCards([clickedCard]);
    }
  };

  useEffect(() => {
    if (movesData) {
      startNewGame();
    }
  }, [movesData]);

  return {
    cards,
    flippedCards,
    matchedCards,
    moves,
    matchesMade,
    gameOver,
    startNewGame,
    handleCardClick
  };
}
