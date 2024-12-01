export interface Beer {
  name: string;
  style: string;
  abv?: number;
  ibu?: number;
  description?: string;
  prices: {
    small: number;    // 190ml
    medium: number;   // 300ml
    large: number;    // 450ml
    pitcher: number;  // 1L
  };
}

export interface Product {
  name: string;
  price: number;
  description?: string;
  category: string;
  icon?: string;
}

export type CategoryTab = {
  id: string;
  label: string;
  icon: string;
};