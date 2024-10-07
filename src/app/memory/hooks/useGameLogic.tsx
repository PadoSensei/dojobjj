import movesData from '../../../../bluebeltTest.json';

import { useState, useEffect, useCallback } from 'react'
import { shuffleArray } from '../../utils/gameUtils';

interface Move {
  title: string;
  media: boolean;
  // Add other properties as needed
}

interface Card extends Move {
  id: number;
  img: string;
}

export function useGameLogic(movesData: Move[]) {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matchedCards, setMatchedCards] = useState<Card[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchesMade, setMatchesMade] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const startNewGame = useCallback(() => {
    console.log('Starting new memory game');
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
  }, [movesData]);

  const handleCardClick = (clickedCard: Card) => {
    if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, clickedCard]);
      setMoves(prevMoves => prevMoves + 1);
      if (flippedCards[0].title === clickedCard.title) {
        setMatchedCards(prevMatched => [...prevMatched, flippedCards[0], clickedCard]);
        setFlippedCards([]);
        setMatchesMade(prevMatches => prevMatches + 1);
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
    if (movesData.length > 0) {
      startNewGame();
    }
  }, [movesData, startNewGame]);

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
