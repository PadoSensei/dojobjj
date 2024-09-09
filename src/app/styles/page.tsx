//@ts-nocheck
"use client"
// pages/study.js

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../../animalStyles.json'

export default function Styles() {
    const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
    const currentStyle = styles.animalStyles[currentStyleIndex];

    const goToNextStyle = () => {
        setCurrentStyleIndex((prevIndex) => (prevIndex + 1) % styles.animalStyles.length);
    };

    const goToPreviousStyle = () => {
        setCurrentStyleIndex((prevIndex) => (prevIndex - 1 + styles.animalStyles.length) % styles.animalStyles.length);
    };

    const categorizeMoves = (moves) => {
        const categories = {
            guards: [],
            submissions: [],
            sweeps: [],
            escapes: [],
            other: []
        };

        moves.forEach(move => {
            if (move.toLowerCase().includes('guard')) categories.guards.push(move);
            else if (move.toLowerCase().includes('choke') || move.toLowerCase().includes('lock') || move.toLowerCase().includes('bar')) categories.submissions.push(move);
            else if (move.toLowerCase().includes('sweep')) categories.sweeps.push(move);
            else if (move.toLowerCase().includes('escape')) categories.escapes.push(move);
            else categories.other.push(move);
        });

        return categories;
    };

    const renderMoveCategory = (category, moves) => {
        if (moves.length === 0) return null;
        return (
            <div className="mb-4">
                <h4 className="text-lg font-semibold text-dojoRed capitalize mb-2">{category}:</h4>
                <ul className="list-disc list-inside">
                    {moves.map((move, index) => (
                        <li key={index} className="text-dojoBlack">{move}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-dojoWhite py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-dojoRed text-center mb-12">BJJ Animal Styles</h1>
                <div className="bg-dojoGold rounded-lg shadow-xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row">
                        {/* Left side: Animal Image */}
                        <div className="w-full lg:w-1/2 p-6 flex items-center justify-center bg-dojoRed">
                            <div className="relative w-full h-64 lg:h-full">
                                {/* <Image
                  src={`/images/${currentStyle.name.toLowerCase()}.jpg`}
                  alt={currentStyle.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                /> */}
                            </div>
                        </div>
                        {/* Right side: Style Information */}
                        <div className="w-full lg:w-1/2 p-6 bg-dojoWhite">
                            <h2 className="text-3xl font-bold text-dojoRed mb-4">{currentStyle.name} Style</h2>
                            <p className="text-dojoBlack mb-6">{currentStyle.description}</p>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-dojoRed mb-2">Key Characteristics:</h3>
                                <ul className="list-disc list-inside">
                                    {currentStyle.characteristics.map((char, index) => (
                                        <li key={index} className="text-dojoBlack">{char}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-dojoRed mb-2">Famous {currentStyle.name} Practitioners:</h3>
                                <ul className="list-disc list-inside">
                                    {currentStyle.famousPractitioners.map(([name, link], index) => (
                                        <li key={index} >
                                            <Link href={link} className="text-dojoBlue hover:underline" target="_blank" rel="noopener noreferrer">  
                                                {name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-dojoRed mb-2">The {currentStyle.name} Curriculum:</h3>
                                {Object.entries(categorizeMoves(currentStyle.moveCurriculum)).map(([category, moves]) =>
                                    renderMoveCategory(category, moves)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        className="bg-dojoRed text-dojoWhite font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
                        onClick={goToPreviousStyle}
                    >
                        Previous Style
                    </button>
                    <button
                        className="bg-dojoRed text-dojoWhite font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-dojoGold transition duration-300"
                        onClick={goToNextStyle}
                    >
                        Next Style
                    </button>
                </div>
            </div>
        </div>
    );
}