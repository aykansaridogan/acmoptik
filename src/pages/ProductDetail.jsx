import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS, LENS_OPTIONS, LENS_COATINGS } from '../data/products';
import ProductCard from '../components/ProductCard';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  ShoppingBag, 
  Heart, 
  Sparkles, 
  Sliders, 
  HelpCircle, 
  FileText, 
  MessageSquare,
  Package,
  Wrench,
  ChevronDown
} from 'lucide-react';

export default function ProductDetail() {
  const { 
    selectedProductId, 
    addToCart, 
    toggleWishlist, 
    wishlist, 
    formatPrice, 
    navigateTo 
  } = useStore();

  const product = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];
  const isFavorite = wishlist.includes(product.id);

  // States
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [selectedLens, setSelectedLens] = useState(LENS_OPTIONS[0]);
  const [selectedCoating, setSelectedCoating] = useState(LENS_COATINGS[0]);
  
  // Prescription State
  const [uploadLater, setUploadLater] = useState(true);
  const [prescriptionValues, setPrescriptionValues] = useState({
    rightSph: '0.00',
    rightCyl: '0.00',
    rightAxis: '0',
    leftSph: '0.00',
    leftCyl: '0.00',
    leftAxis: '0',
    pd: '63'
  });

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState('specs'); // 'specs', 'box', 'warranty'

  const activeColor = product.colors[selectedColorIdx] || product.colors[0];

  // Price calculation
  const totalItemPriceTRY = product.priceTRY + selectedLens.priceTRY + selectedCoating.priceTRY;
  const totalItemPriceEUR = product.priceEUR + selectedLens.priceEUR + selectedCoating.priceEUR;
  const totalItemPriceUSD = product.priceUSD + selectedLens.priceUSD + selectedCoating.priceUSD;

  const handleAddToCart = () => {
    addToCart(
      product,
      activeColor,
      selectedLens,
      selectedCoating,
      selectedLens.requiresPrescription
        ? { ...prescriptionValues, uploadLater }
        : null,
      1
    );
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f2ec] pt-28 pb-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
        <div className="flex items-center space-x-2 text-xs font-mono text-zinc-500">
          <button onClick={() => navigateTo('home')} className="hover:text-white">Ana Sayfa</button>
          <span>/</span>
          <button onClick={() => navigateTo('shop')} className="hover:text-white">Koleksiyon</button>
          <span>/</span>
          <span className="text-[#c5a880] truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Multi-Angle Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Image with Smooth Zoom */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-black/50 border border-white/10 group cursor-crosshair">
              <img
                src={product.images[activeImageIdx]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-125"
              />

              <div className="absolute top-4 left-4 z-10 flex gap-2">
                <span className="px-3 py-1 rounded bg-black/75 backdrop-blur-md border border-white/10 text-xs font-mono text-[#c5a880] uppercase tracking-wider">
                  {product.badge}
                </span>
                {product.isLimited && (
                  <span className="px-3 py-1 rounded bg-[#c5a880] text-black text-xs font-bold uppercase tracking-wider">
                    {product.edition}
                  </span>
                )}
              </div>

              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-4 right-4 z-10 p-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white hover:text-[#c5a880] transition-transform hover:scale-110 active:scale-95"
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#c5a880] text-[#c5a880]' : ''}`} />
              </button>

              <div className="absolute bottom-4 left-4 z-10 text-[11px] font-mono text-zinc-400 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                Açı {activeImageIdx + 1} / 4 • Yakınlaştırmak için üzerine gelin
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-3 sm:gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`aspect-[4/3] rounded-xl overflow-hidden border transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#c5a880] ring-2 ring-[#c5a880]/30 scale-[1.02]'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Luxury Craftsmanship Box */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#c5a880] uppercase tracking-widest">
                <Sparkles className="w-4 h-4" />
                <span>Atelier Standartları</span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                {product.description}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/5 text-[11px] font-mono text-zinc-400">
                <div>
                  <span className="text-zinc-500 block">Ekartman</span>
                  <span className="text-white font-medium">{product.specs.lensWidth} / {product.specs.bridge}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Sap Uzunluğu</span>
                  <span className="text-white font-medium">{product.specs.temple}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Ağırlık</span>
                  <span className="text-[#c5a880] font-medium">{product.specs.weight}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block">Menşei</span>
                  <span className="text-white font-medium">{product.specs.origin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#c5a880] uppercase tracking-widest mb-1.5">
                <span>{product.categoryName} • {product.genderName}</span>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono text-white">{product.rating}</span>
                  <span className="text-zinc-500">({product.reviewsCount} Değerlendirme)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-white tracking-wide">
                {product.name}
              </h1>
              <p className="text-sm text-zinc-400 mt-1">{product.subname}</p>

              {/* Dynamic Price Calculation */}
              <div className="mt-4 flex items-baseline space-x-4">
                <span className="font-mono text-3xl font-bold text-white">
                  {formatPrice(totalItemPriceTRY, totalItemPriceEUR, totalItemPriceUSD)}
                </span>
                {(selectedLens.priceTRY > 0 || selectedCoating.priceTRY > 0) && (
                  <span className="text-xs font-mono text-[#c5a880]">
                    (Özel cam & kaplama dahil)
                  </span>
                )}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-display uppercase tracking-widest text-zinc-400">
                  Çerçeve Rengi:
                </span>
                <span className="font-medium text-white">{activeColor.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${
                      selectedColorIdx === idx
                        ? 'border-[#c5a880] scale-110 ring-2 ring-[#c5a880]/40'
                        : 'border-white/20 hover:scale-105'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Interactive Prescription Lens Configurator */}
            <div className="p-5 rounded-2xl glass-panel border border-[#c5a880]/30 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#c5a880] uppercase tracking-wider font-semibold">
                  <Sliders className="w-4 h-4" />
                  <span>Reçeteli Cam & Mercek Yapılandırıcı</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
                  Carl Zeiss
                </span>
              </div>

              {/* Step 1: Cam Tipi Seçimi */}
              <div className="space-y-2">
                <label className="text-[11px] font-display uppercase tracking-wider text-zinc-400 block">
                  1. Cam Tipi Seçimi
                </label>
                <div className="space-y-2">
                  {LENS_OPTIONS.map((lens) => (
                    <div
                      key={lens.id}
                      onClick={() => setSelectedLens(lens)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedLens.id === lens.id
                          ? 'bg-[#c5a880]/15 border-[#c5a880] text-white'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white">{lens.title}</span>
                        <span className="font-mono text-[#c5a880] font-semibold">
                          {lens.priceTRY === 0 ? 'Fiyata Dahil' : `+ ${formatPrice(lens.priceTRY, lens.priceEUR, lens.priceUSD)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                        {lens.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Cam Kaplama Teknolojisi */}
              <div className="space-y-2">
                <label className="text-[11px] font-display uppercase tracking-wider text-zinc-400 block">
                  2. Zeiss Kaplama & Koruma
                </label>
                <div className="space-y-2">
                  {LENS_COATINGS.map((coating) => (
                    <div
                      key={coating.id}
                      onClick={() => setSelectedCoating(coating)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedCoating.id === coating.id
                          ? 'bg-[#c5a880]/15 border-[#c5a880] text-white'
                          : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white">{coating.title}</span>
                        <span className="font-mono text-[#c5a880] font-semibold">
                          {coating.priceTRY === 0 ? 'Dahil' : `+ ${formatPrice(coating.priceTRY, coating.priceEUR, coating.priceUSD)}`}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 mt-0.5 leading-relaxed">
                        {coating.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Reçete Girişi (Eğer numaralı seçildiyse) */}
              {selectedLens.requiresPrescription && (
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-display uppercase tracking-wider text-white">
                      3. Reçete Bilgileri
                    </span>
                    <button
                      type="button"
                      onClick={() => setUploadLater(!uploadLater)}
                      className="text-[#c5a880] hover:underline font-mono text-[11px]"
                    >
                      {uploadLater ? 'Reçeteyi Şimdi Gireceğim' : 'Sonradan WhatsApp ile Gönder'}
                    </button>
                  </div>

                  {uploadLater ? (
                    <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start space-x-3 text-xs">
                      <MessageSquare className="w-5 h-5 text-[#c5a880] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-white block">
                          Reçetenizi Sipariş Sonrası İletin
                        </span>
                        <p className="text-zinc-400 text-[11px] mt-0.5 leading-relaxed">
                          Siparişinizi tamamladıktan sonra reçetenizin fotoğrafını WhatsApp hattımıza (+90 212 840 20 26) veya e-postayla gönderebilirsiniz. Optisyenlerimiz cam montajını teyit ettikten sonra üretime başlayacaktır.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3 bg-black/40 p-3.5 rounded-xl border border-white/10 text-xs">
                      <div className="grid grid-cols-4 gap-2 font-mono text-[10px] text-zinc-500 uppercase">
                        <div>Göz</div>
                        <div>SPH (Diyoptri)</div>
                        <div>CYL (Silindirik)</div>
                        <div>AXIS (Aks)</div>
                      </div>

                      {/* Right Eye */}
                      <div className="grid grid-cols-4 gap-2 items-center">
                        <span className="font-mono text-zinc-300 text-xs font-semibold">Sağ (OD)</span>
                        <input
                          type="text"
                          value={prescriptionValues.rightSph}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, rightSph: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="-1.50"
                        />
                        <input
                          type="text"
                          value={prescriptionValues.rightCyl}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, rightCyl: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="-0.50"
                        />
                        <input
                          type="text"
                          value={prescriptionValues.rightAxis}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, rightAxis: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="180"
                        />
                      </div>

                      {/* Left Eye */}
                      <div className="grid grid-cols-4 gap-2 items-center">
                        <span className="font-mono text-zinc-300 text-xs font-semibold">Sol (OS)</span>
                        <input
                          type="text"
                          value={prescriptionValues.leftSph}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, leftSph: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="-1.75"
                        />
                        <input
                          type="text"
                          value={prescriptionValues.leftCyl}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, leftCyl: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="-0.75"
                        />
                        <input
                          type="text"
                          value={prescriptionValues.leftAxis}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, leftAxis: e.target.value })}
                          className="bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono focus:outline-none focus:border-[#c5a880]"
                          placeholder="90"
                        />
                      </div>

                      {/* PD */}
                      <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                        <span className="text-zinc-400 text-[11px]">Pupil Mesafesi (PD mm):</span>
                        <input
                          type="text"
                          value={prescriptionValues.pd}
                          onChange={(e) => setPrescriptionValues({ ...prescriptionValues, pd: e.target.value })}
                          className="w-20 bg-white/5 border border-white/10 rounded px-2 py-1 text-xs text-white font-mono text-center focus:outline-none focus:border-[#c5a880]"
                          placeholder="63"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Add To Cart & Express Checkout */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full btn-luxury flex items-center justify-center space-x-2 py-4 text-xs font-bold"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Çantaya Ekle • {formatPrice(totalItemPriceTRY, totalItemPriceEUR, totalItemPriceUSD)}</span>
              </button>

              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-400 pt-2">
                <div className="flex items-center space-x-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <Truck className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>Aynı Gün VIP Kurye</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
                  <RotateCcw className="w-4 h-4 text-[#c5a880] shrink-0" />
                  <span>14 Gün İade & Uyum Garantisi</span>
                </div>
              </div>
            </div>

            {/* Accordion Specs & Box Contents */}
            <div className="space-y-3 border-t border-white/10 pt-6">
              {/* Specs */}
              <div className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'specs' ? null : 'specs')}
                  className="w-full p-4 flex items-center justify-between text-xs font-display uppercase tracking-widest text-white"
                >
                  <span className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-[#c5a880]" />
                    <span>Detaylı Teknik Özellikler</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'specs' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'specs' && (
                  <div className="p-4 pt-0 text-xs font-mono space-y-2 border-t border-white/5 text-zinc-400">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Gövde Materyali:</span>
                      <span className="text-white">{product.specs.material}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Menteşe Teknolojisi:</span>
                      <span className="text-white">{product.specs.hinges}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span>Cam Teknolojisi:</span>
                      <span className="text-white">{product.specs.lensTech}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Üretim & Montaj:</span>
                      <span className="text-[#c5a880]">{product.specs.origin}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Box Contents */}
              <div className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'box' ? null : 'box')}
                  className="w-full p-4 flex items-center justify-between text-xs font-display uppercase tracking-widest text-white"
                >
                  <span className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-[#c5a880]" />
                    <span>Özel Kutu İçeriği</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'box' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'box' && (
                  <div className="p-4 pt-0 text-xs space-y-2 border-t border-white/5 text-zinc-300">
                    <p>• İtalyan el yapımı manyetik kilitli lüks deri koruma kılıfı</p>
                    <p>• Carl Zeiss mikrofiber optik temizleme bezi</p>
                    <p>• Elmas uçla kazınmış seri numaralı Orijinallik ve Garanti Sertifikası</p>
                    <p>• Hassas vida ayarı için pirinç mini tornavida kiti</p>
                  </div>
                )}
              </div>

              {/* Warranty */}
              <div className="border border-white/5 rounded-xl overflow-hidden bg-white/[0.02]">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'warranty' ? null : 'warranty')}
                  className="w-full p-4 flex items-center justify-between text-xs font-display uppercase tracking-widest text-white"
                >
                  <span className="flex items-center space-x-2">
                    <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                    <span>Garanti & Atölye Bakımı</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openAccordion === 'warranty' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'warranty' && (
                  <div className="p-4 pt-0 text-xs space-y-2 border-t border-white/5 text-zinc-300">
                    <p>• 2 Yıl ACM OPTİK Resmi Uluslararası Garantisi</p>
                    <p>• Ömür boyu Nişantaşı atölyemizde ücretsiz ultrasonik banyo ve burun pedi yenileme</p>
                    <p>• Reçeteli camlarda 30 gün alışma ve net görüş garantisi</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-28 border-t border-white/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880] block mb-1">
                Küratör Seçkisi
              </span>
              <h2 className="font-serif text-3xl font-medium text-white">
                Tamamlayıcı Parçalar
              </h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs font-display uppercase tracking-wider text-zinc-400 hover:text-white"
            >
              Tüm Kataloğu Gör →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} layout="grid" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
