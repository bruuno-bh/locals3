import React, { useState } from 'react';
import { Beer as BeerIcon } from 'lucide-react';
import { Beer } from '../types/Beer';

interface BeerCardProps {
  beer: Beer;
}

export const BeerCard: React.FC<BeerCardProps> = ({ beer }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`transition-all duration-300 cursor-pointer
        ${
          isExpanded
            ? 'min-w-[300px] max-w-[300px] bg-zinc-800'
            : 'min-w-[250px] max-w-[250px] bg-zinc-900 hover:bg-zinc-800'
        } p-4 rounded-lg mx-2 flex-shrink-0`}
    >
      <div className="flex items-start gap-2">
        <BeerIcon className="w-5 h-5 text-amber-500 flex-shrink-0 mt-1" />
        <div className="flex-1 min-w-0">
          <h3
            className="text-lg font-bold text-white mb-0.5 truncate"
            title={beer.name}
          >
            {beer.name}
          </h3>
          <p className="text-amber-500 font-medium text-sm mb-0.5">
            {beer.style}
          </p>
          {(beer.abv || beer.ibu) && (
            <p className="text-gray-400 mb-1 text-xs">
              {beer.abv && `ABV: ${beer.abv}%`} {beer.abv && beer.ibu && '|'}{' '}
              {beer.ibu && `IBU: ${beer.ibu}`}
            </p>
          )}
          <p
            className={`text-gray-400 text-xs mb-3 transition-all duration-300 ${
              isExpanded ? 'line-clamp-none' : 'line-clamp-2'
            }`}
            title={beer.description}
          >
            {beer.description}
          </p>
          <div className="space-y-1 border-t border-zinc-700 pt-3">
            <div className="flex justify-between text-gray-300 text-sm">
              <span>190ml</span>
              <span>R$ {beer.prices.small.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm">
              <span>300ml</span>
              <span>R$ {beer.prices.medium.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm">
              <span>450ml</span>
              <span>R$ {beer.prices.large.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-300 text-sm font-medium">
              <span>1L (mesa)</span>
              <span>R$ {beer.prices.pitcher.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
