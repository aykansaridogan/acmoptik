import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import {
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Eye,
  ShieldCheck,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

export default function BetaVirtualDressing() {
  const { navigateTo } = useStore();
  const sectionRef = useRef(null);

  // Is frame placed on face
  const [isDressed, setIsDressed] = useState(true);
  const [activeModelIdx, setActiveModelIdx] = useState(1); // Default to the handsome Milanese gentleman
  const [hasScrolledIn, setHasScrolledIn] = useState(false);

  const models = [
    {
      id: 'prada-opr',
      title: 'Prada OPR B15S',
      subname: 'Kaplumbağa Kabuğu Asetat & Degrade Bal Rengi',
      tag: 'Kadın Koleksiyonu',
      productId: 'acm-solaris-03',
      bareFaceImg: '/model-bare-face.jpg',
      sunglassesImg: '/model-with-sunglasses.jpg',
      metrics: { pd: '62.0 mm', tilt: '11°', bridge: '19 mm', uv: 'Carl Zeiss UV400' }
    },
    {
      id: 'elysian-aviator',
      title: 'Elysian Grand Aviator',
      subname: '24K Fırçalanmış Altın & Siyah Polarize Zeiss',
      tag: 'Erkek Koleksiyonu',
      productId: 'acm-elysian-01',
      bareFaceImg: '/male-bare-face.jpg',
      sunglassesImg: '/male-with-sunglasses.jpg',
      metrics: { pd: '64.5 mm', tilt: '9°', bridge: '18 mm', uv: 'Zeiss Polarized Skylet®' }
    }
  ];

  const currentModel = models[activeModelIdx];

  // Scroll driven animation: As user scrolls into this section, dress the glasses on face
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When the section is in the middle of viewport
      if (rect.top < windowHeight * 0.75 && rect.bottom > windowHeight * 0.25) {
        if (!hasScrolledIn) {
          setHasScrolledIn(true);
          setIsDressed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolledIn]);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880] mb-3">
            <Compass className="w-4 h-4" />
            <span>Beta Optik Tarzı Akıllı Sanal Deneyim</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white tracking-wide">
            Yüz Anatomisine <span className="italic text-[#c5a880]">Kusursuz Oturum</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl font-light leading-relaxed">
            Aşağı kaydırdıkça gözlük doğrudan yüzün morfolojisine, gözbebeği mesafesine (PD) ve burun köprüsüne mikron hassasiyetiyle yerleşir.
          </p>
        </div>

        {/* Model Switcher */}
        <div className="flex items-center space-x-2 bg-black/60 p-1.5 rounded-2xl border border-white/10 shrink-0">
          {models.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                setActiveModelIdx(idx);
                setIsDressed(true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${activeModelIdx === idx
                  ? 'bg-[#c5a880] text-black font-semibold shadow-md'
                  : 'text-zinc-400 hover:text-white'
                }`}
            >
              <span>{m.title.split(' ')[0]} ({m.tag.split(' ')[0]})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cinematic Virtual Dressing Stage */}
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.95)] border border-white/10 select-none bg-black">
        {/* The Photorealistic Base: Smoothly transitions between bare face and wearing sunglasses */}
        <img
          src={isDressed ? currentModel.sunglassesImg : currentModel.bareFaceImg}
          alt={`${currentModel.title} virtual try-on fitting`}
          className="w-full h-full object-cover object-center filter brightness-95 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

        {/* Live Optician HUD Calibration Overlay (Beta Optik Hallmark) */}
        <div className="absolute top-6 left-6 z-20 bg-black/80 backdrop-blur-xl border border-white/15 rounded-2xl p-4 sm:p-5 text-xs font-mono space-y-2 shadow-2xl max-w-xs animate-fadeIn">
          <div className="flex items-center space-x-2 text-[#c5a880] font-semibold text-[11px] uppercase tracking-wider">
            <CheckCircle2 className={`w-4 h-4 ${isDressed ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span>{isDressed ? 'Gözlük Yüze Yerleştirildi' : 'Doğal Yüz Analizi Yapılıyor...'}</span>
          </div>

          <div className="text-zinc-400 text-[11px] pt-1.5 space-y-1.5 border-t border-white/10">
            <div className="flex justify-between space-x-6">
              <span>Pupil Mesafesi (PD):</span>
              <span className="text-white font-medium">{currentModel.metrics.pd}</span>
            </div>
            <div className="flex justify-between space-x-6">
              <span>Pantoskopik Eğim:</span>
              <span className="text-white font-medium">{currentModel.metrics.tilt}</span>
            </div>
            <div className="flex justify-between space-x-6">
              <span>Burun Köprüsü:</span>
              <span className="text-white font-medium">{currentModel.metrics.bridge}</span>
            </div>
            <div className="flex justify-between space-x-6">
              <span>Filtreleme Kaplaması:</span>
              <span className="text-[#c5a880] font-medium">{currentModel.metrics.uv}</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions Bar */}
        <div className="absolute bottom-6 inset-x-6 z-20 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Interactive Toggle Button */}
          <button
            onClick={() => setIsDressed(!isDressed)}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-[#c5a880] hover:text-black border border-white/20 text-xs font-mono text-white transition-all backdrop-blur-md flex items-center justify-center space-x-2 shadow-lg"
          >
            <RotateCcw className="w-4 h-4" />
            <span>
              {isDressed ? 'Gözlüğü Çıkar (Doğal İfadeyi Gör)' : 'Gözlüğü Yüze Tak (Stil Dönüşümü)'}
            </span>
          </button>

          {/* Direct Buy / Configure Button */}
          <button
            onClick={() => navigateTo('pdp', currentModel.productId)}
            className="w-full sm:w-auto btn-luxury py-3 px-6 text-xs font-bold"
          >
            <span>{currentModel.title} Modeline Git</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      {/* Craftsmanship Assurance Note */}
      <div className="mt-6 text-center text-xs text-zinc-500 font-mono">
        ACM OPTİK ATELIER • TÜM ÇERÇEVELER MİKRON HASSASİYETİNDE YÜZ KALİBRASYONUYLA ÜRETİLİR
      </div>
    </section>
  );
}
