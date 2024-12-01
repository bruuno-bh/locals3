import React from 'react';
import { Product } from '../types/Beer';
import { ProductCard } from './ProductCard';

interface ProductsTabProps {
  products: Product[];
  category: string;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({ products, category }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
};