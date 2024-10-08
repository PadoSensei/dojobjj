import React from 'react';
import Image from 'next/image';

interface CardProps {
  card: {
    title: string;
  };
  isFlipped: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, isFlipped, onClick }) => {
  const imagePath = `/media/images/${card.title}.png`;

  return (
    <div
      className="group relative w-full aspect-[3/4] rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-102 active:scale-98"
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 ${
          isFlipped ? 'rotate-y-180' : ''
        } preserve-3d`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 backface-hidden bg-blue-300">
          <div className="w-full h-full flex items-center justify-center text-white text-2xl sm:text-4xl font-bold">
            ?
          </div>
        </div>
        {/* Back of card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white">
          <div className="relative w-full h-4/5">
            <Image
              src={imagePath}
              alt={card.title}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = "/images/blue.svg";
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300" />
          </div>
          <div className="absolute bottom-0 w-full h-1/5 p-1 sm:p-2 bg-blue-500">
            <h3 className="text-white text-xs sm:text-sm font-semibold line-clamp-2 leading-tight">
              {card.title}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;