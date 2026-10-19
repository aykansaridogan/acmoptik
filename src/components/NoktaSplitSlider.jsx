import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight, Check } from 'lucide-react';

export default function NoktaSplitSlider() {
  const { navigateTo } = useStore();
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeModelIdx, setActiveModelIdx] = useState(0);

  const models = [
    {
      id: 'prada-opr',
      brand: 'PRADA',
      title: 'Prada OPR B15S',
      subname: 'Kaplumbağa Kabuğu Asetat & Degrade Bal Rengi',
      category: 'Cat-Eye Güneş',
      tag: 'Kadın Koleksiyonu',
      productId: 'acm-solaris-03',
      bareFaceImg: '/model-bare-face.jpg',
      sunglassesImg: '/model-with-sunglasses.jpg',
      reveal: { x: 51.5, y: 39, width: 23, height: 17 },
    },
    {
      id: 'elysian-aviator',
      brand: 'ACM ATELIER',
      title: 'Elysian Grand Aviator',
      subname: '24K Fırçalanmış Altın & Siyah Polarize Zeiss',
      category: 'Titanium Aviator',
      tag: 'Erkek Koleksiyonu',
      productId: 'acm-elysian-01',
      bareFaceImg: '/male-bare-face.jpg',
      sunglassesImg: '/male-with-sunglasses.jpg',
      reveal: { x: 55, y: 39, width: 27, height: 18 },
    }
  ];

  const currentModel = models[activeModelIdx];

  useEffect(() => {
    let animationFrame = 0;

    const updateProgress = () => {
      if (animationFrame) return;
      animationFrame = requestAnimationFrame(() => {
        animationFrame = 0;
        if (!sectionRef.current) return;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setScrollProgress(1);
          return;
        }

        const rect = sectionRef.current.getBoundingClientRect();
        const stickyOffset = 64;
        const travelDistance = Math.max(1, rect.height - window.innerHeight + stickyOffset);
        const progress = Math.min(1, Math.max(0, (stickyOffset - rect.top) / travelDistance));
        setScrollProgress(progress);
      });
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[150svh] lg:min-h-[180svh] px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto border-b border-white/5">
      <div className="sticky top-16 min-h-[calc(100svh-4rem)] flex flex-col justify-center py-8 sm:py-10">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-[11px] font-mono tracking-[0.35em] uppercase text-[#c5a880] block font-semibold">
            {currentModel.brand}
          </span>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-wide">
            Bir çerçeve, <span className="italic text-[#c5a880]">farklı bir ifade</span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed pt-1">
            Yüz çizgilerine göre şekillenen çerçeveler, her bakışta kendine özgü bir denge sunar.
          </p>

          <div className="pt-3 flex items-center justify-center gap-3 flex-wrap">
            {models.map((model, idx) => (
              <button
                key={model.id}
                onClick={() => setActiveModelIdx(idx)}
                aria-pressed={activeModelIdx === idx}
                className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all flex items-center space-x-2 ${activeModelIdx === idx
                    ? 'bg-white/15 border border-[#c5a880] text-[#c5a880] font-semibold'
                    : 'bg-white/5 border border-white/10 text-zinc-400 hover:text-white'
                  }`}
              >
                {activeModelIdx === idx && <Check className="w-3.5 h-3.5 text-[#c5a880]" />}
                <span>{model.title}</span>
                <span className="text-[10px] text-zinc-500">({model.tag})</span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-[16/9] rounded-3xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-white/15 select-none bg-black">
          <img
            src={currentModel.bareFaceImg}
            alt={`${currentModel.title}, doğal yüz görünümü`}
            className="absolute inset-0 w-full h-full object-cover object-center brightness-95"
          />

          <img
            src={currentModel.sunglassesImg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center brightness-95 pointer-events-none"
            style={{
              clipPath: `ellipse(${currentModel.reveal.width * scrollProgress}% ${currentModel.reveal.height * scrollProgress}% at ${currentModel.reveal.x}% ${currentModel.reveal.y}%)`,
              opacity: scrollProgress,
              filter: `blur(${(1 - scrollProgress) * 5}px)`,
            }}
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 z-[15] flex items-center justify-center overflow-hidden pointer-events-none">
            <span
              className="whitespace-nowrap font-serif font-medium uppercase text-white"
              style={{
                fontSize: 'clamp(3.5rem, 12vw, 11rem)',
                opacity: Math.min(0.88, Math.max(0, (scrollProgress - 0.2) * 1.5)),
                transform: `translateY(${(1 - scrollProgress) * 32}px) scale(${0.86 + scrollProgress * 0.18})`,
                clipPath: `inset(0 ${(1 - scrollProgress) * 100}% 0 0)`,
              }}
            >
              ÖZGÜVEN
            </span>
          </div>
          <div className="absolute top-0 left-0 right-0 h-[2px] z-20 bg-white/10">
            <div
              className="h-full bg-[#c5a880] origin-left"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </div>

          <div className="absolute bottom-5 left-5 sm:bottom-7 sm:left-7 z-20">
            <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block mb-1">
              {scrollProgress > 0.92 ? 'YÜZÜNLE TAM UYUMLU' : 'OPTİK UYUM'}
            </span>
            <h3 className="font-serif text-xl sm:text-3xl text-white">
              {scrollProgress > 0.92 ? 'Yerine oturdu' : currentModel.title}
            </h3>
          </div>

          <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 z-20 text-right">
            <span className="text-[10px] font-mono text-[#c5a880] uppercase tracking-widest block mb-1">
              {currentModel.brand} ATELIER
            </span>
            <p className="hidden sm:block text-xs text-zinc-300 mb-3">{currentModel.subname}</p>
            <button
              onClick={() => navigateTo('pdp', currentModel.productId)}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#c5a880] hover:text-black border border-white/20 text-white text-xs font-display uppercase tracking-wider transition-all backdrop-blur-md shadow-lg"
            >
              <span>Keşfet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
