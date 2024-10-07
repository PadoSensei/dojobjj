//@ts-nocheck
import React from "react";

export default function GameStatus({ moves, gameOver }) {
    return (
      <div className="text-center">
        <p className="text-xl mb-4">Moves: {moves}</p>
        {gameOver && (
          <p className="text-2xl font-bold text-green-600 mb-4">
            Congratulations! You won in {moves} moves!
          </p>
        )}
      </div>
    );
  }