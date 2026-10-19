import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  Sparkles,
  ArrowRight,
  Sliders,
  RotateCcw,
  Eye,
  ShieldCheck,
  CheckCircle2,
  Check
} from 'lucide-react';

export default function InteractiveFaceTransformation() {
  const { navigateTo, formatPrice } = useStore();
  const containerRef = useRef(null);

  // Split slider position (0 to 100%)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // Active Look / Model preset: 0 = Prada OPR B15S (Kadın), 1 = Elysian Grand Aviator (Erkek)
  const [activeModelIdx, setActiveModelIdx] = useState(0);

  // Experience Mode: 'split' (Nokta Optik Stili) vs 'dressing' (Beta Optik Stili)
  const [experienceMode, setExperienceMode] = useState('split');
  const [isDressed, setIsDressed] = useState(true);

  const models = [
    {
      id: 'prada-opr',
      title: 'Prada OPR B15S',
      subname: 'Kaplumbağa Kabuğu Asetat & Degrade Bal Rengi',
      category: 'Cat-Eye Güneş',
      tag: 'Kadın Koleksiyonu',
      brand: 'PRADA',
      productId: 'acm-solaris-03',
      bareFaceImg: '/model-bare-face.jpg',
      sunglassesImg: '/model-with-sunglasses.jpg',
      metrics: { pd: '62.0 mm', tilt: '11°', bridge: '19 mm', uv: 'Carl Zeiss UV400' }
    },
    {
      id: 'elysian-aviator',
      title: 'Elysian Grand Aviator',
      subname: '24K Fırçalanmış Altın & Siyah Polarize Zeiss',
      category: 'Titanium Aviator',
      tag: 'Erkek Koleksiyonu',
      brand: 'ACM ATELIER',
      productId: 'acm-elysian-01',
      bareFaceImg: '/male-bare-face.jpg',
      sunglassesImg: '/male-with-sunglasses.jpg',
      metrics: { pd: '64.5 mm', tilt: '9°', bridge: '18 mm', uv: 'Zeiss Polarized Skylet®' }
    }
  ];

  const currentModel = models[activeModelIdx];

  // Drag interaction logic for split slider
  const handleDrag = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.min(100, Math.max(0, (x / rect.width) * 100));
    setSliderPos(percent);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleDrag(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleDrag(e.clientX);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length > 0) {
      setIsDragging(true);
      handleDrag(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && e.touches.length > 0) {
      handleDrag(e.touches[0].clientX);
    }
  };

  // Scroll effect for Beta Optik frame dressing
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
        const progress = Math.min(1, Math.max(0, (windowHeight * 0.85 - rect.top) / (rect.height * 0.7)));
        if (experienceMode === 'dressing') {
          setIsDressed(progress > 0.45);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [experienceMode]);

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block font-semibold">
          {currentModel.brand}
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white tracking-wide">
          Bir çerçeve, <span className="italic text-[#c5a880]">farklı bir ifade</span>
        </h2>

        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
          Doğal bakışınız ile yüksek optik tasarımın sunduğu sofistike duruş arasındaki farkı ortadaki çubuğu sağa sola kaydırarak anında keşfedin.
        </p>

        {/* Experience Mode Toggle */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setExperienceMode('split')}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${experienceMode === 'split'
                ? 'bg-[#c5a880] text-black font-semibold shadow-lg'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
              }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Bölünmüş Karşılaştırma Çubuğu (Nokta Optik Stili)</span>
          </button>

          <button
            onClick={() => {
              setExperienceMode('dressing');
              setIsDressed(!isDressed);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${experienceMode === 'dressing'
                ? 'bg-[#c5a880] text-black font-semibold shadow-lg'
                : 'bg-white/5 text-zinc-400 hover:text-white border border-white/5'
              }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Kaydırdıkça Yüze Oturan Gözlük (Beta Optik Stili)</span>
          </button>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        {models.map((m, idx) => (
          <button
            key={m.id}
            onClick={() => setActiveModelIdx(idx)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${activeModelIdx === idx
                ? 'bg-white/15 border border-[#c5a880] text-[#c5a880] font-semibold ring-1 ring-[#c5a880]/40'
                : 'bg-white/[0.03] border border-white/10 text-zinc-400 hover:text-white'
              }`}
          >
            {activeModelIdx === idx && <Check className="w-3.5 h-3.5 text-[#c5a880]" />}
            <span>{m.title}</span>
            <span className="text-[10px] text-zinc-500">({m.tag})</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/15 select-none bg-black cursor-ew-resize"
      >
        {experienceMode === 'split' ? (
          /* ========================================================
             MODE A: NOKTA OPTIK PIXEL-PERFECT SPLIT COMPARISON SLIDER
             ======================================================== */
          <>
            {/* Background Layer: Model Wearing Sunglasses (Right Side) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentModel.sunglassesImg}
                alt={`${currentModel.title} wearing sunglasses`}
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Right Label: Model Info & "Keşfet →" Button (Exact Nokta Optik Style) */}
              <div className="absolute bottom-6 right-6 z-20 text-right pointer-events-auto">
                <span className="text-[11px] font-mono text-[#c5a880] uppercase tracking-widest block mb-0.5">
                  {currentModel.brand} ATELIER
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  {currentModel.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5 mb-3">{currentModel.subname}</p>
                <button
                  onClick={() => navigateTo('pdp', currentModel.productId)}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#c5a880] hover:text-black border border-white/20 text-white text-xs font-display uppercase tracking-wider transition-all backdrop-blur-md shadow-lg"
                >
                  <span>Keşfet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Foreground Clipped Layer: Model's Bare Face (Left Side) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
              }}
            >
              <img
                src={currentModel.bareFaceImg}
                alt={`${currentModel.title} natural face`}
                className="w-full h-full object-cover object-center filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Left Label: "İlk Bakış" (Exact Nokta Optik Style) */}
              <div className="absolute bottom-6 left-6 z-20 text-left pointer-events-auto">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block mb-0.5">
                  Doğal İfade
                </span>
                <h4 className="font-serif text-2xl sm:text-3xl font-medium text-white">
                  İlk Bakış
                </h4>
                <p className="text-xs text-zinc-400 mt-0.5 mb-3">Çerçevesiz saf silüet</p>
                <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
                  <span>← Çubuğu Sağa Çekin</span>
                </div>
              </div>
            </div>

            {/* Draggable Divider Line & Knob (< >) */}
            <div
              className="absolute top-0 bottom-0 z-30 flex items-center justify-center pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Vertical Glowing Line */}
              <div className="w-[2px] h-full bg-gradient-to-b from-white/30 via-white to-white/30 shadow-[0_0_20px_rgba(255,255,255,0.9)]" />

              {/* Center Handle Knob (< >) */}
              <div
                className="absolute w-12 h-12 rounded-full bg-white text-black border-2 border-[#09090b] shadow-[0_10px_35px_rgba(0,0,0,0.8)] flex items-center justify-center font-bold text-sm tracking-tighter pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
              >
                <span className="text-zinc-700 mr-0.5 text-base font-bold">‹</span>
                <span className="text-zinc-700 ml-0.5 text-base font-bold">›</span>
              </div>
            </div>
          </>
        ) : (
          /* ========================================================
             MODE B: BETA OPTIK SCROLL-DRIVEN FRAME DRESSING ANIMATION
             ======================================================== */
          <div className="relative w-full h-full overflow-hidden">
            {/* Base Image: Smoothly transitions between bare face and wearing glasses */}
            <img
              src={isDressed ? currentModel.sunglassesImg : currentModel.bareFaceImg}
              alt="Model Virtual Try-On"
              className="w-full h-full object-cover object-center filter brightness-95 transition-opacity duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

            {/* Real-time Optician Fitting HUD (Beta Optik Stili) */}
            <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-xs font-mono space-y-1.5 shadow-2xl">
              <div className="flex items-center space-x-2 text-[#c5a880] font-semibold text-[11px] uppercase">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{isDressed ? 'Gözlük Yüze Yerleştirildi' : 'Doğal Yüz Analizi Yapılıyor...'}</span>
              </div>
              <div className="text-zinc-400 text-[11px] pt-1 space-y-1 border-t border-white/5">
                <div className="flex justify-between space-x-6">
                  <span>Pupil Mesafesi (PD):</span>
                  <span className="text-white font-medium">{currentModel.metrics.pd}</span>
                </div>
                <div className="flex justify-between space-x-6">
                  <span>Pantoskopik Eğim:</span>
                  <span className="text-white font-medium">{currentModel.metrics.tilt}</span>
                </div>
                <div className="flex justify-between space-x-6">
                  <span>Köprü Mesafesi:</span>
                  <span className="text-white font-medium">{currentModel.metrics.bridge}</span>
                </div>
                <div className="flex justify-between space-x-6">
                  <span>Filtreleme:</span>
                  <span className="text-[#c5a880] font-medium">{currentModel.metrics.uv}</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-6 inset-x-6 z-20 flex items-center justify-between">
              <button
                onClick={() => setIsDressed(!isDressed)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#c5a880] hover:text-black border border-white/20 text-xs font-mono text-white transition-all backdrop-blur-md flex items-center space-x-2 shadow-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{isDressed ? 'Gözlüğü Çıkar (Doğal İfade)' : 'Gözlüğü Yüze Tak (Stil Dönüşümü)'}</span>
              </button>

              <button
                onClick={() => navigateTo('pdp', currentModel.productId)}
                className="btn-luxury py-2.5 px-6 text-xs"
              >
                <span>{currentModel.title} Satın Al</span>
                <ArrowRight className="w-3.5 h-3.5 ml-2" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Subtitle Footer Note */}
      <div className="mt-8 text-center text-xs text-zinc-500 font-mono">
        ACM OPTİK ATELIER • TÜM ÇERÇEVELER YÜZ MORFOLOJİSİ VE BURUN KÖPRÜSÜNE TAM UYUMLU OLARAK KALİBRE EDİLİR
      </div>
    </section>
  );
}
