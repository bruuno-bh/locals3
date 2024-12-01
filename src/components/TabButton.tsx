import React from 'react';
import * as LucideIcons from 'lucide-react';
import { CategoryTab } from '../types/Beer';

interface TabButtonProps {
  tab: CategoryTab;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({ tab, isActive, onClick }) => {
  const Icon = LucideIcons[tab.icon as keyof typeof LucideIcons];

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
        isActive 
          ? 'bg-amber-600 text-white' 
          : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
      }`}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{tab.label}</span>
    </button>
  );
};