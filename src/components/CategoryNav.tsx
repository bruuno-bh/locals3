import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryTab } from '../types/Beer';

interface CategoryNavProps {
  categories: CategoryTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({ categories, activeTab, onTabChange }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative flex items-center">
      <button 
        onClick={() => scroll('left')}
        className="absolute -left-4 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div 
        ref={scrollContainerRef}
        className="flex overflow-x-auto gap-2 scrollbar-hide px-4"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onTabChange(category.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg transition-colors ${
              activeTab === category.id 
                ? 'bg-amber-600 text-white' 
                : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute -right-4 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};