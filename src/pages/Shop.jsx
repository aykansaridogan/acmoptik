import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  X,
  RotateCcw,
} from 'lucide-react';

export default function Shop() {
  const { formatPrice } = useStore();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedShape, setSelectedShape] = useState('all');
  const [priceRange, setPriceRange] = useState(25000);
  const [sortBy, setSortBy] = useState('featured');
  const [layoutMode, setLayoutMode] = useState('grid'); // 'grid' (4-col) or 'lookbook' (2-col)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const categories = [
    { id: 'all', label: 'Tüm Koleksiyonlar' },
    { id: 'sunglasses', label: 'Güneş Gözlüğü' },
    { id: 'optical', label: 'Optik / Numaralı' },
    { id: 'titanium', label: 'Japon Titanyum' },
    { id: 'limited', label: 'Limited Edition' }
  ];

  const genders = [
    { id: 'all', label: 'Tümü' },
    { id: 'unisex', label: 'Unisex' },
    { id: 'men', label: 'Erkek' },
    { id: 'women', label: 'Kadın' }
  ];

  const shapes = [
    { id: 'all', label: 'Tüm Formlar' },
    { id: 'aviator', label: 'Aviator' },
    { id: 'geometric', label: 'Geometrik' },
    { id: 'round', label: 'Yuvarlak' },
    { id: 'square', label: 'Kare' },
    { id: 'cat-eye', label: 'Cat-Eye' }
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (selectedGender !== 'all' && p.gender !== selectedGender && p.gender !== 'unisex') return false;
      if (selectedShape !== 'all' && p.shape !== selectedShape) return false;
      if (p.priceTRY > priceRange) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceTRY - b.priceTRY;
      if (sortBy === 'price-desc') return b.priceTRY - a.priceTRY;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedGender, selectedShape, priceRange, sortBy]);

  const hasActiveFilters = 
    selectedCategory !== 'all' || 
    selectedGender !== 'all' || 
    selectedShape !== 'all' || 
    priceRange < 25000;

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGender('all');
    setSelectedShape('all');
    setPriceRange(25000);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-[#e9eeec] pb-24 pt-28 text-[#151a18]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-8 border-b border-[#151a18]/20 pb-8 sm:grid-cols-[1fr_auto] sm:items-end sm:pb-10">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#e45b44]">ACM OPTİK / FRAME INDEX / 2026</span>
            <h1 className="mt-4 font-serif text-5xl leading-[0.9] sm:text-7xl lg:text-8xl">
              Çerçeve<br /><span className="italic text-[#49685a]">arşivi.</span>
            </h1>
          </div>
          <div className="flex items-end justify-between gap-8 sm:flex-col sm:items-end sm:gap-1 sm:text-right">
            <p className="max-w-xs text-xs leading-relaxed text-[#64716a]">Sabae titanyumu, İtalyan asetatı ve Carl Zeiss optiğinden seçilmiş formlar.</p>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#e45b44]">{String(filteredProducts.length).padStart(2, '0')} / {String(PRODUCTS.length).padStart(2, '0')} TASARIM</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Filter Controls Bar */}
        <div className="mb-7 flex flex-col gap-4 border-b border-[#151a18]/15 py-4 md:flex-row md:items-center md:justify-between">
          {/* Category Tabs (Desktop) */}
          <div className="hidden lg:flex items-center space-x-1 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap border-b-2 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-all ${
                  selectedCategory === cat.id
                    ? 'border-[#e45b44] text-[#151a18] font-semibold'
                    : 'border-transparent text-[#77817b] hover:text-[#151a18]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Mobile Filter Trigger Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 border border-[#151a18]/20 px-4 py-2 text-[10px] font-mono uppercase tracking-[0.1em] text-[#151a18]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#e45b44]" />
            <span>Filtreler {hasActiveFilters && '(Aktif)'}</span>
          </button>

          {/* Right Tools: Sort, View Switcher, Reset */}
          <div className="flex items-center justify-between gap-3 text-xs md:justify-end">
            {/* Sorting Dropdown */}
            <div className="flex items-center space-x-2">
              <span className="hidden font-mono text-[9px] uppercase tracking-[0.1em] text-[#77817b] sm:inline">Sırala</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-0 border-b border-[#151a18]/30 bg-transparent px-2 py-2 font-mono text-[10px] text-[#151a18] focus:outline-none focus:border-[#e45b44]"
              >
                <option value="featured">Öne Çıkanlar</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating">En Yüksek Puan</option>
              </select>
            </div>

            {/* Layout View Switcher */}
            <div className="flex items-center border border-[#151a18]/20 p-1">
              <button
                onClick={() => setLayoutMode('grid')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'grid' ? 'bg-[#d8ef70] text-[#151a18]' : 'text-[#77817b] hover:text-[#151a18]'
                }`}
                title="Katalog Izgarası"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayoutMode('lookbook')}
                className={`p-1.5 rounded-lg transition-colors ${
                  layoutMode === 'lookbook' ? 'bg-[#d8ef70] text-[#151a18]' : 'text-[#77817b] hover:text-[#151a18]'
                }`}
                title="Editoryal Lookbook"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

            {/* Reset Button */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="p-2 text-[#77817b] hover:text-[#e45b44] transition-colors"
                title="Filtreleri Sıfırla"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Filter Sub-bar (Shape, Gender & Price) */}
        <div className="mb-8 hidden grid-cols-4 gap-5 border-b border-[#151a18]/15 pb-5 text-xs lg:grid">
          {/* Gender Filter */}
          <div>
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#77817b]">
              Cinsiyet
            </label>
            <div className="flex space-x-1.5">
              {genders.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGender(g.id)}
                  className={`px-2.5 py-1.5 font-mono text-[10px] transition-all ${
                    selectedGender === g.id
                      ? 'bg-[#151a18] text-white font-semibold'
                      : 'text-[#77817b] hover:text-[#151a18]'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          {/* Shape Filter */}
          <div className="col-span-2">
            <label className="mb-2 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#77817b]">
              Çerçeve Formu
            </label>
            <div className="flex flex-wrap gap-1.5">
              {shapes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedShape(s.id)}
                  className={`px-2.5 py-1.5 font-mono text-[10px] transition-all ${
                    selectedShape === s.id
                      ? 'bg-[#151a18] text-white font-semibold'
                      : 'text-[#77817b] hover:text-[#151a18]'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#77817b]">
                Maks. Fiyat:
              </label>
              <span className="font-mono text-[10px] text-[#e45b44] font-semibold">
                {formatPrice(priceRange)}
              </span>
            </div>
            <input
              type="range"
              min="13000"
              max="25000"
              step="500"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#e45b44] cursor-pointer"
            />
          </div>
        </div>

        {/* Active Filter Tags & Count */}
        <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.12em] text-[#77817b]">
          <span>Sonuçlar / {filteredProducts.length} model</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-[#e45b44] hover:underline"
            >
              <span>Tüm filtreleri kaldır</span>
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mx-auto max-w-lg border-y border-[#151a18]/20 py-20 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center bg-[#d8ef70] text-[#151a18]">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-[#151a18]">Eşleşen model yok.</h3>
            <p className="mt-2 text-xs text-[#77817b]">
              Seçtiğiniz filtreleme kriterlerine uygun gözlük bulunamadı. Lütfen filtrelerinizi genişletiniz.
            </p>
            <button onClick={resetFilters} className="mt-4 border-b border-[#151a18] pb-1 text-xs font-semibold uppercase tracking-[0.12em]">
              Filtreleri Temizle
            </button>
          </div>
        ) : (
          <div
            className={
              layoutMode === 'lookbook'
                ? 'grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2'
                : 'grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                layout={layoutMode}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Slide Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="absolute inset-0 bg-[#151a18]/65 backdrop-blur-sm"
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="flex w-screen max-w-xs flex-col justify-between border-l border-[#151a18]/15 bg-[#e9eeec] p-6">
              <div>
                <div className="flex items-center justify-between border-b border-[#151a18]/20 pb-4">
                  <h3 className="font-serif text-2xl text-[#151a18]">Filtrele</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)} aria-label="Filtreleri kapat">
                    <X className="h-5 w-5 text-[#77817b]" />
                  </button>
                </div>

                <div className="mt-6 space-y-6">
                  {/* Category */}
                  <div>
                    <h4 className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#e45b44]">Kategori</h4>
                    <div className="space-y-1">
                      {categories.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => setSelectedCategory(c.id)}
                          className={`w-full border-b border-[#151a18]/10 px-3 py-2 text-left font-mono text-[10px] ${
                            selectedCategory === c.id ? 'bg-[#d8ef70] text-[#151a18] font-semibold' : 'text-[#53615a]'
                          }`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <h4 className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#e45b44]">Cinsiyet</h4>
                    <div className="flex flex-wrap gap-2">
                      {genders.map((g) => (
                        <button
                          key={g.id}
                          onClick={() => setSelectedGender(g.id)}
                          className={`border px-3 py-1.5 font-mono text-[10px] ${
                            selectedGender === g.id ? 'border-[#151a18] bg-[#151a18] text-white' : 'border-[#151a18]/20 text-[#53615a]'
                          }`}
                        >
                          {g.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Shape */}
                  <div>
                    <h4 className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#e45b44]">Çerçeve Formu</h4>
                    <div className="flex flex-wrap gap-2">
                      {shapes.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSelectedShape(s.id)}
                          className={`border px-3 py-1.5 font-mono text-[10px] ${
                            selectedShape === s.id ? 'border-[#151a18] bg-[#151a18] text-white' : 'border-[#151a18]/20 text-[#53615a]'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-[#151a18]/20 pt-6">
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="min-h-12 w-full bg-[#151a18] py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white"
                >
                  Sonuçları Göster ({filteredProducts.length})
                </button>
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-center text-xs text-[#77817b] hover:text-[#151a18]"
                >
                  Filtreleri Temizle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
