import React, { useState } from 'react';
import { BeerCard } from './components/BeerCard';
import { ProductsTab } from './components/ProductsTab';
import { beers } from './data/beers';
import { products } from './data/products';
import { Instagram, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [activeProductCategory, setActiveProductCategory] = useState<string | null>(null);
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

  const sortedBeers = [...beers].sort((a, b) => (a.abv || 0) - (b.abv || 0));

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-white/10 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center gap-4">
            <img
              src="https://localsonlybrewingco.com.br/wp-content/uploads/2024/11/LocalsOnly_White_Slogan-2.png"
              alt="Locals Only Beer Spot"
              className="h-24 md:h-32 w-auto"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Chopes da Casa */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Chopes da Casa</h2>
          <p className="text-gray-400 text-center mb-6">
            Cervejas de produção própria e cervejarias convidadas. Buscamos sempre trazer a melhor qualidade de matéria prima junto com os melhores processos para ter um produto único para te agradar. Se precisar de ajuda consulte nossa equipe.
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

        {/* Outros Produtos */}
        <section className="py-8">
          <h2 className="text-2xl font-bold mb-2 text-center">Outros Produtos</h2>
          <p className="text-gray-400 text-center mb-6">
            Petiscos escolhidos especialmente para harmonizar com nossas cervejas, afinal não tem combinação melhor. Boa cerveja e um snack rápido. Souvenirs feitos para que você possa usar em qualquer lugar e levar um pouco da Locals Only com você.
          </p>

          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
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
            {Array.from(new Set(products.map((product) => product.category))).map((category) => (
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
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-6">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>© 2024 Locals Only Beer Spot - Todos os direitos reservados</p>
          <div className="flex justify-center items-center space-x-8 mt-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/localsbeerspot/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white space-x-2"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
              <span>Instagram</span>
            </a>

            {/* Site */}
            <a
              href="https://localsonlybrewingco.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-white space-x-2"
              aria-label="Website"
            >
              <Globe className="w-6 h-6" />
              <span>Site</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=5512996012427&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Beer%20Spot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center text-gray-400 hover:text-[#25D366] space-x-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
