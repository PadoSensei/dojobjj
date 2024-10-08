//@ts-nocheck
"use client"
import React from 'react';
// import Card from './components/Card';
import GameBoard from './components/GameBoard';
import movesData from '../../../bluebeltTest.json';

export default function Memory() {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">BJJ Moves Memory Game</h1>
        <GameBoard movesData={movesData}/>
      </div>
    )
  }
