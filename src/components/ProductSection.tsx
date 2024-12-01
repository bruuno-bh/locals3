import React from 'react';
import { Product } from '../types/Beer';

interface ProductSectionProps {
  title: string;
  products: Product[];
}

export const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.name} className="bg-zinc-900 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-white">{product.name}</h3>
              <span className="text-gray-300">R$ {product.price.toFixed(2)}</span>
            </div>
            {product.description && (
              <p className="text-gray-400 mt-1">{product.description}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};