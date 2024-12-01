import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Product } from '../types/Beer';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const Icon = product.icon ? LucideIcons[product.icon as keyof typeof LucideIcons] : null;

  return (
    <div className="bg-zinc-900 p-6 rounded-lg hover:bg-zinc-800 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-5 h-5 text-amber-500" />}
            <h3 className="text-lg font-medium text-white">{product.name}</h3>
          </div>
          {product.description && (
            <p className="text-gray-400 mt-2 text-sm">{product.description}</p>
          )}
        </div>
        <span className="text-amber-500 font-semibold">
          R$ {product.price.toFixed(2)}
        </span>
      </div>
    </div>
  );
};