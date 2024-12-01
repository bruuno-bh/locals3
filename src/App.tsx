import React, { useState } from 'react';
import { BeerCard } from './components/BeerCard';
import { ProductsTab } from './components/ProductsTab';
import { beers } from './data/beers';
import { products } from './data/products';
import { categoryTabs } from './data/categories';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chopes');
  const [activeProductCategory, setActiveProductCategory] = useState<
    string | null
  >(null);
  const beerContainerRef = React.useRef<HTMLDivElement>(null);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right'
  ) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const filteredProducts = activeProductCategory
    ? products.filter((product) => product.category === activeProductCategory)
    : products;

  // Ordenar beers por ABV (menor para maior)
  const sortedBeers = [...beers].sort((a, b) => (a.abv || 0) - (b.abv || 0));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/95 backdrop-blur-sm shadow-lg">
        <div className="py-4 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <img
              src="https://localsonlybrewingco.com.br/wp-content/uploads/2024/11/LocalsOnly_White_Slogan-2.png"
              alt="Locals Only"
              className="h-12"
            />
            <nav className="flex gap-4">
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'chopes'
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
                onClick={() => setActiveTab('chopes')}
              >
                Chopes da Casa
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'produtos'
                    ? 'bg-amber-600 text-white'
                    : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                }`}
                onClick={() => setActiveTab('produtos')}
              >
                Outros Produtos
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-28">
        {activeTab === 'chopes' && (
          <>
            {/* Beer Carousel */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-2">Chopes da Casa</h2>
              <p className="text-gray-400 mb-6">
                Cervejas de produção própria e de cervejarias convidadas,
                buscando oferecer o melhor em cada gole para o cliente.
              </p>
              <div className="relative">
                <button
                  onClick={() => scroll(beerContainerRef, 'left')}
                  className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div
                  ref={beerContainerRef}
                  className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide relative px-2"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <div className="flex gap-4">
                    {sortedBeers.map((beer) => (
                      <BeerCard key={beer.name} beer={beer} />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => scroll(beerContainerRef, 'right')}
                  className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </section>
          </>
        )}

        {activeTab === 'produtos' && (
          <>
            {/* Divider for Products */}
            <section className="mb-6">
              <h2 className="text-2xl font-bold mb-2 text-center">
                Outros Produtos
              </h2>
              <p className="text-gray-400 text-center mb-6">
                Petiscos pensados para acompanhar aquela breja gelada e
                souvenirs para o dia a dia.
              </p>

              {/* Category Filter Menu */}
              <div className="flex justify-center gap-4 mb-6">
                <button
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    activeProductCategory === null
                      ? 'bg-amber-600 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                  onClick={() => setActiveProductCategory(null)}
                >
                  Todos
                </button>
                {Array.from(
                  new Set(products.map((product) => product.category))
                ).map((category) => (
                  <button
                    key={category}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeProductCategory === category
                        ? 'bg-amber-600 text-white'
                        : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                    }`}
                    onClick={() => setActiveProductCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Products Grid */}
              <ProductsTab products={filteredProducts} />
            </section>
          </>
        )}
      </main>

      <footer className="bg-zinc-900 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Locals Only Brewing Co. Beba com moderação.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
