//@ts-nocheck
import { useGameLogic } from '../hooks/useGameLogic'
import Card from './Card'
import GameStatus from './GameStatus'
import NewGameButton from './NewGameButton'

export default function GameBoard({ movesData }) {
    const {
      cards,
      flippedCards,
      matchedCards,
      moves,
      matchesMade,
      gameOver,
      startNewGame,
      handleCardClick
    } = useGameLogic(movesData);
  
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {cards.map(card => (
            <Card
              key={card.id}
              card={card}
              isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
              onClick={() => handleCardClick(card)}
            />
          ))}
        </div>
        <div className="text-center mb-4">
          <p className="text-xl font-bold">Moves: {moves}</p>
          <p className="text-xl font-bold">Matches Made: {matchesMade}</p>
          <p className="text-xl font-bold">Pairs Remaining: {cards.length / 2 - matchesMade}</p>
        </div>
        <GameStatus moves={moves} gameOver={gameOver} matchesMade={matchesMade} />
        <div className="text-center">
          <NewGameButton onClick={startNewGame} />
        </div>
      </div>
    );
  }
  