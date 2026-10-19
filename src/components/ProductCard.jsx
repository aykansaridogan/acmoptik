import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowUpRight, Eye, Glasses, Heart, ShoppingBag } from 'lucide-react';
import EyewearPreview from './EyewearPreview';

export default function ProductCard({ product, layout = 'grid' }) {
  const { navigateTo, toggleWishlist, wishlist, setQuickViewProduct, addToCart, formatPrice } = useStore();
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  const isFavorite = wishlist.includes(product.id);
  const currentColor = product.colors[selectedColorIdx] || product.colors[0];

  const handleCardClick = () => {
    navigateTo('pdp', product.id);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addToCart(product, currentColor, null, null, null, 1);
  };

  const handleTryOn = (e) => {
    e.stopPropagation();
    navigateTo('try-on', product.id);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewProduct(product);
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const isLookbook = layout === 'lookbook';

  return (
    <article
      onClick={handleCardClick}
      className={`group cursor-pointer flex flex-col ${isLookbook ? 'gap-5' : 'gap-3'}`}
    >
      <div className={`relative w-full overflow-hidden border border-[#151a18]/10 bg-[#e6ebe7] ${isLookbook ? 'aspect-[4/3]' : 'aspect-[5/4]'}`}>
        <div className="absolute inset-0 opacity-50" style={{ background: `radial-gradient(ellipse at 50% 48%, ${currentColor.hex}35, transparent 62%)` }} />
        <EyewearPreview product={product} frameColor={currentColor.hex} className="absolute inset-0 z-[1] h-full w-full" />

        <div className="absolute left-4 top-4 z-10 flex flex-col items-start gap-1.5">
          <span className="bg-[#151a18] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] text-white">{product.categoryName}</span>
          {product.isLimited && <span className="bg-[#e45b44] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.12em] text-white">{product.edition}</span>}
        </div>

        <button
          onClick={handleWishlistToggle}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center border border-[#151a18]/15 bg-[#e6ebe7]/85 text-[#151a18] transition-colors hover:bg-[#d8ef70]"
          aria-label="Favorilere ekle"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-[#e45b44] text-[#e45b44]' : ''}`} />
        </button>

        <span className="absolute bottom-3 left-4 z-10 font-mono text-[8px] uppercase tracking-[0.16em] text-[#151a18]/55">Sürükle · 360°</span>
        <button onClick={handleTryOn} className="absolute bottom-3 right-3 z-10 inline-flex min-h-9 items-center gap-2 bg-[#d8ef70] px-3 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#151a18] transition-colors hover:bg-[#e45b44] hover:text-white">
          <Glasses className="h-3.5 w-3.5" /> Yüzünde dene
        </button>
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-[#69736d]">
            <span>{product.shapeName}</span>
            <span>{product.genderName}</span>
          </div>

          <h3 className="mt-1 font-serif text-lg font-medium leading-snug text-[#151a18] transition-colors group-hover:text-[#e45b44] sm:text-xl">
            {product.name}
          </h3>

          <p className="mt-0.5 line-clamp-1 text-[11px] text-[#69736d]">
            {product.subname}
          </p>

          {isLookbook && (
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#69736d]">
              {product.description}
            </p>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-[#151a18]/15 pt-3">
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColorIdx(idx)}
                className={`h-4 w-4 rounded-full border transition-all ${
                  selectedColorIdx === idx
                    ? 'scale-110 border-[#151a18] ring-2 ring-[#d8ef70]'
                    : 'border-[#151a18]/20 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <span className="font-mono text-sm font-semibold text-[#151a18]">{formatPrice(product.priceTRY, product.priceEUR, product.priceUSD)}</span>
        </div>

        <div className="mt-3 flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 focus-within:opacity-100">
          <button onClick={handleQuickView} className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.08em] text-[#69736d] transition-colors hover:text-[#151a18]">
            <Eye className="h-3.5 w-3.5" /> Hızlı bakış
          </button>
          <button onClick={handleQuickAdd} className="ml-auto inline-flex h-8 w-8 items-center justify-center border border-[#151a18]/20 text-[#151a18] transition-colors hover:border-[#d8ef70] hover:bg-[#d8ef70]" title="Sepete ekle" aria-label="Sepete ekle">
            <ShoppingBag className="h-4 w-4" />
          </button>
          <ArrowUpRight className="h-4 w-4 text-[#e45b44]" />
        </div>
      </div>
    </article>
  );
}
