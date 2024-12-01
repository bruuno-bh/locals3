import React from 'react';
import { Beer } from '../types/Beer';
import { BeerCard } from './BeerCard';

interface BeerListProps {
  beers: Beer[];
}

export const BeerList: React.FC<BeerListProps> = ({ beers }) => {
  // Ordenar a lista de cervejas com base no ABV (valores nulos vão para o final)
  const sortedBeers = [...beers].sort(
    (a, b) => (a.abv ?? Infinity) - (b.abv ?? Infinity)
  );

  return (
    <div className="flex flex-wrap gap-4 p-4 justify-center">
      {sortedBeers.map((beer, index) => (
        <BeerCard key={index} beer={beer} />
      ))}
    </div>
  );
};
