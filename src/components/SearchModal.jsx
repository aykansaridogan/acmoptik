import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { Search, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, navigateTo, formatPrice } = useStore();
  const [query, setQuery] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.subname.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      p.shapeName.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.specs.material.toLowerCase().includes(q)
    );
  });

  const popularSearches = [
    'Aviator',
    'Japon Titanyumu',
    'Mazzucchelli Asetat',
    'Cat-Eye',
    'Carl Zeiss',
    'Limited Edition'
  ];

  const handleSelectProduct = (productId) => {
    setIsSearchOpen(false);
    setQuery('');
    navigateTo('pdp', productId);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSearchOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-2xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center space-x-4">
              <Search className="w-5 h-5 text-[#c5a880] shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Model adı, kategori veya malzeme arayın..."
                className="w-full bg-transparent text-lg text-white placeholder-zinc-500 focus:outline-none font-serif tracking-wide"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsSearchOpen(false)}
                className="px-2.5 py-1 text-xs font-mono text-zinc-400 border border-white/10 rounded hover:text-white"
              >
                ESC
              </button>
            </div>

            {/* Suggestions or Results */}
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {!query.trim() ? (
                <div>
                  <div className="flex items-center space-x-2 text-xs font-display uppercase tracking-widest text-zinc-400 mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Öne Çıkan Aramalar</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((term, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(term)}
                        className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-[#c5a880]/20 hover:text-[#c5a880] text-xs text-zinc-300 border border-white/5 transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-white/5 pt-6">
                    <span className="text-xs font-display uppercase tracking-widest text-zinc-400 block mb-3">
                      Hızlı Koleksiyonlar
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('shop');
                        }}
                        className="p-3 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#c5a880]/40 cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-zinc-200">Güneş Gözlükleri</span>
                        <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                      </div>
                      <div
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigateTo('shop');
                        }}
                        className="p-3 bg-white/[0.02] border border-white/5 rounded-lg hover:border-[#c5a880]/40 cursor-pointer flex items-center justify-between"
                      >
                        <span className="text-zinc-200">Japon Titanyum Serisi</span>
                        <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                      </div>
                    </div>
                  </div>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">
                  <p className="font-serif text-base text-zinc-300">
                    "{query}" ile eşleşen model bulunamadı.
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Lütfen farklı bir anahtar kelime veya model adı deneyin.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="text-xs text-zinc-400 font-mono mb-2">
                    {filteredProducts.length} adet lüks model bulundu
                  </div>
                  {filteredProducts.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProduct(p.id)}
                      className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-[#c5a880]/40 flex items-center justify-between cursor-pointer transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          className="w-14 h-14 object-cover rounded-lg bg-black/40 border border-white/10 shrink-0"
                        />
                        <div>
                          <h4 className="font-serif text-sm font-semibold text-white group-hover:text-[#c5a880] transition-colors">
                            {p.name}
                          </h4>
                          <p className="text-xs text-zinc-400">{p.subname}</p>
                          <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-wider">
                            {p.categoryName} • {p.shapeName}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="font-mono text-xs font-semibold text-white block">
                          {formatPrice(p.priceTRY, p.priceEUR, p.priceUSD)}
                        </span>
                        <span className="text-[11px] text-[#c5a880] flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span>İncele</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
