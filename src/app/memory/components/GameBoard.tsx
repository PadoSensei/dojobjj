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
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            isFlipped={flippedCards.includes(card) || matchedCards.includes(card)}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>
      <div className="text-center mb-4 p-4 bg-dojoWhite rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-dojoGold p-3 rounded-md">
            <p className="text-lg sm:text-xl font-bold text-dojoRed">
              Moves: <span className="text-dojoBlack">{moves}</span>
            </p>
          </div>
          <div className="bg-dojoGold p-3 rounded-md">
            <p className="text-lg sm:text-xl font-bold text-dojoRed">
              Matches: <span className="text-dojoBlack">{matchesMade}</span>
            </p>
          </div>
          <div className="bg-dojoGold p-3 rounded-md">
            <p className="text-lg sm:text-xl font-bold text-dojoRed">
              Remaining: <span className="text-dojoBlack">{cards.length / 2 - matchesMade}</span>
            </p>
          </div>
        </div>
      </div>
      <GameStatus moves={moves} gameOver={gameOver} matchesMade={matchesMade} />
      <div className="text-center">
        <NewGameButton onClick={startNewGame} />
      </div>
    </div>
  );
}
