import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { X, Star, ShieldCheck, ArrowRight, ShoppingBag, Eye } from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, navigateTo, formatPrice } = useStore();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const activeColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleQuickAdd = () => {
    // Add with standard default lens
    addToCart(product, activeColor, null, null, null, 1);
    setQuickViewProduct(null);
  };

  const handleGoToPDP = () => {
    setQuickViewProduct(null);
    navigateTo('pdp', product.id);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-[#121216] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left: Product Media Gallery */}
          <div className="p-6 bg-gradient-to-b from-black/60 to-black/20 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/5">
            <div className="aspect-square rounded-xl overflow-hidden bg-black/40 border border-white/5 relative group">
              <img
                src={product.images[selectedImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-black/70 border border-white/10 text-[10px] font-mono text-[#c5a880] uppercase tracking-wider backdrop-blur-md">
                {product.badge}
              </span>
            </div>

            {/* Thumbnail selector */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`aspect-square rounded-lg overflow-hidden border transition-all ${selectedImageIdx === idx
                      ? 'border-[#c5a880] ring-1 ring-[#c5a880]'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                    }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info & Quick Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-mono text-[#c5a880] uppercase tracking-wider">
                <span>{product.categoryName}</span>
                <span>•</span>
                <span>{product.shapeName}</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-white mt-1">
                {product.name}
              </h3>
              <p className="text-xs text-zinc-400 mt-1">{product.subname}</p>

              <div className="flex items-center space-x-3 mt-3">
                <span className="font-mono text-xl font-bold text-white">
                  {formatPrice(product.priceTRY, product.priceEUR, product.priceUSD)}
                </span>
                <div className="flex items-center space-x-1 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono text-white">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount})</span>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed mt-4 line-clamp-3">
                {product.description}
              </p>

              {/* Color swatches */}
              <div className="mt-5">
                <label className="text-[11px] font-display uppercase tracking-widest text-zinc-400 block mb-2">
                  Renk Seçeneği: <span className="text-white font-medium">{activeColor.name}</span>
                </label>
                <div className="flex space-x-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColorIdx(idx)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform ${selectedColorIdx === idx
                          ? 'border-[#c5a880] scale-110 ring-2 ring-[#c5a880]/30'
                          : 'border-white/20 hover:scale-105'
                        }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Specs snapshot */}
              <div className="grid grid-cols-2 gap-2 mt-5 text-[11px] text-zinc-400 bg-white/[0.02] p-3 rounded-lg border border-white/5 font-mono">
                <div>Ekartman: {product.specs.lensWidth} / {product.specs.bridge}</div>
                <div>Ağırlık: {product.specs.weight}</div>
                <div>Malzeme: {product.specs.material.split('&')[0]}</div>
                <div>Menşei: {product.specs.origin}</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleQuickAdd}
                className="w-full btn-luxury flex items-center justify-center space-x-2 py-3"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Hızlı Sepete Ekle</span>
              </button>

              <button
                onClick={handleGoToPDP}
                className="w-full btn-outline-luxury flex items-center justify-center space-x-2 py-2.5 text-xs"
              >
                <Eye className="w-4 h-4" />
                <span>Reçeteli Cam & Tüm Detaylar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
