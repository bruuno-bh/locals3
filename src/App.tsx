import React, { useState } from 'react';
import { BeerCard } from './components/BeerCard';
import { ProductsTab } from './components/ProductsTab';
import { beers } from './data/beers';
import { products } from './data/products';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('chopes');
  const [activeProductCategory, setActiveProductCategory] = useState<
    string | null
  >(null);
  const beerContainerRef = React.useRef<HTMLDivElement>(null);
  const categoryContainerRef = React.useRef<HTMLDivElement>(null);

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
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-2">Chopes da Casa</h2>
            <p className="text-gray-400 mb-6">
              Cervejas de produção própria e de cervejarias convidadas, buscando
              oferecer o melhor em cada gole para o cliente.
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
        )}

        {activeTab === 'produtos' && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-2 text-center">
              Outros Produtos
            </h2>
            <p className="text-gray-400 text-center mb-6">
              Petiscos pensados para acompanhar aquela breja gelada e souvenirs
              para o dia a dia.
            </p>

            {/* Category Carousel */}
            <div className="relative mb-6">
              <button
                onClick={() => scroll(categoryContainerRef, 'left')}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div
                ref={categoryContainerRef}
                className="flex overflow-x-auto gap-4 pb-1 scrollbar-hide snap-x snap-mandatory"
              >
                <button
                  className={`snap-center px-4 py-2 rounded-lg transition-colors ${
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
                    className={`snap-center px-4 py-2 rounded-lg transition-colors ${
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
              <button
                onClick={() => scroll(categoryContainerRef, 'right')}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-zinc-800 p-2 rounded-full shadow-lg hover:bg-zinc-700"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Products Grid */}
            <ProductsTab products={filteredProducts} />
          </section>
        )}
      </main>

      <footer className="bg-zinc-900 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>© 2024 Locals Only Brewing Co. Beba com moderação.</p>
          <div className="flex justify-center items-center space-x-4 mt-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/localsbeerspot/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.206.056 2.03.248 2.497.415a4.92 4.92 0 011.675 1.095 4.924 4.924 0 011.096 1.675c.167.467.358 1.291.415 2.497.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.056 1.206-.248 2.03-.415 2.497a4.94 4.94 0 01-1.095 1.675 4.94 4.94 0 01-1.675 1.095c-.467.167-1.291.358-2.497.415-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.206-.056-2.03-.248-2.497-.415a4.94 4.94 0 01-1.675-1.095 4.94 4.94 0 01-1.095-1.675c-.167-.467-.358-1.291-.415-2.497-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.056-1.206.248-2.03.415-2.497a4.92 4.92 0 011.095-1.675A4.922 4.922 0 015.653 2.648c.467-.167 1.291-.358 2.497-.415 1.266-.058 1.646-.07 4.85-.07zM12 0C8.741 0 8.332.013 7.052.072 5.772.131 4.722.335 3.868.634a7.926 7.926 0 00-2.593 1.653A7.926 7.926 0 00.634 3.868C.335 4.722.131 5.772.072 7.052.013 8.332 0 8.741 0 12s.013 3.668.072 4.948c.059 1.28.263 2.33.562 3.184a7.924 7.924 0 001.653 2.593 7.924 7.924 0 002.593 1.653c.854.299 1.904.503 3.184.562 1.28.059 1.689.072 4.948.072s3.668-.013 4.948-.072c1.28-.059 2.33-.263 3.184-.562a7.926 7.926 0 002.593-1.653 7.926 7.926 0 001.653-2.593c.299-.854.503-1.904.562-3.184.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.28-.263-2.33-.562-3.184a7.926 7.926 0 00-1.653-2.593 7.926 7.926 0 00-2.593-1.653C16.33.335 15.28.131 14 .072 12.72.013 12.31 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a3.838 3.838 0 110-7.676 3.838 3.838 0 010 7.676zm5.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
              </svg>
            </a>

            {/* Site */}
            <a
              href="https://localsonlybrewingco.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white"
              aria-label="Website"
            >
              <span className="text-lg font-semibold">Site</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=5512996012427&text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Beer%20Spot"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="text-gray-400 hover:text-[#25D366]"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
