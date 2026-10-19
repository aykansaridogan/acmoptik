import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { RotateCw, Sparkles, Compass, ShieldCheck, ArrowRight } from 'lucide-react';

export default function FrameViewer360() {
  const { navigateTo, formatPrice } = useStore();
  const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(null);

  const angles = [
    {
      angle: '0° Ön Görünüm',
      img: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1400&q=90',
      caption: 'Kusursuz simetri ve aerodinamik çift köprü hattı'
    },
    {
      angle: '45° Dinamik Perspektif',
      img: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1400&q=90',
      caption: 'Işığın altın kaplama titanyum kavislerindeki kırılımı'
    },
    {
      angle: '90° Profil & Menteşe',
      img: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=1400&q=90',
      caption: 'Özel 5 dişli vidalanmış Japon titanyum mafsal mekanizması'
    },
    {
      angle: 'Editoryal Portre',
      img: 'https://images.unsplash.com/photo-1492288991661-058aa541af89?auto=format&fit=crop&w=1400&q=90',
      caption: 'Yüz ergonomisi ve dengeli ağırlık dağılımı'
    }
  ];

  const hotspots = [
    {
      id: 'lens',
      top: '40%',
      left: '32%',
      title: 'Carl Zeiss Polarized UV400',
      description: 'Zararlı ultraviyole ışınlarını %100 bloke ederken kristal netliğinde kontrast sunan Zeiss Precision optik camı.'
    },
    {
      id: 'bridge',
      top: '36%',
      left: '50%',
      title: '24K Altın Kaplama Titanyum Köprü',
      description: 'Sabae atölyelerinde elle perdahlanan Beta-Titanyum alaşımı ile ultra esneklik ve sıfır paslanma.'
    },
    {
      id: 'hinge',
      top: '44%',
      left: '74%',
      title: 'Mekanik Vidasız Menteşe',
      description: 'Yüz binlerce açma-kapama döngüsüne dayanıklı tescilli monoblok sürtünme kilit sistemi.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
      <div className="rounded-3xl glass-panel p-6 sm:p-12 lg:p-16 border border-white/10 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#c5a880]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#dfc8a5]/10 rounded-full blur-[120px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.25em] text-[#c5a880] mb-3">
              <Compass className="w-4 h-4" />
              <span>İnteraktif Atölye Vitrini</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium text-white tracking-wide">
              Elysian Grand Aviator <span className="italic text-[#c5a880]">360°</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-2 max-w-xl">
              Fukui’deki Sabae zanaatkârlarının mikron hassasiyetindeki titanyum işçiliğini farklı perspektiflerden keşfedin.
            </p>
          </div>

          <button
            onClick={() => navigateTo('pdp', 'acm-elysian-01')}
            className="btn-luxury shrink-0 text-xs"
          >
            <span>Modeli Yapılandır</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </button>
        </div>

        {/* Interactive Viewer Canvas */}
        <div className="relative rounded-2xl bg-black/60 border border-white/10 overflow-hidden aspect-[16/10] sm:aspect-[21/9] flex items-center justify-center">
          <img
            src={angles[currentAngleIndex].img}
            alt="360 view"
            className="w-full h-full object-cover transition-opacity duration-500 ease-out"
          />

          {/* Glare effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/5 pointer-events-none" />

          {/* Interactive Hotspots */}
          {hotspots.map((h) => (
            <div
              key={h.id}
              style={{ top: h.top, left: h.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot === h.id ? null : h.id)}
                className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#c5a880] text-black shadow-lg hover:scale-110 transition-transform"
                title={h.title}
              >
                <Sparkles className="w-4 h-4" />
                <span className="absolute -inset-1 rounded-full border border-[#c5a880] animate-ping opacity-50 pointer-events-none" />
              </button>

              {/* Tooltip Card */}
              {activeHotspot === h.id && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 p-3.5 bg-[#121216]/95 backdrop-blur-xl border border-[#c5a880]/50 rounded-xl shadow-2xl text-left z-30 animate-fadeIn">
                  <h4 className="text-xs font-semibold text-white font-serif">{h.title}</h4>
                  <p className="text-[11px] text-zinc-300 mt-1 leading-relaxed">{h.description}</p>
                </div>
              )}
            </div>
          ))}

          {/* Perspective Angle Caption */}
          <div className="absolute bottom-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-xs">
            <span className="text-[#c5a880] font-mono font-medium">{angles[currentAngleIndex].angle}</span>
            <span className="text-zinc-400 block text-[11px] mt-0.5">{angles[currentAngleIndex].caption}</span>
          </div>
        </div>

        {/* Angle Selector Tabs */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {angles.map((ang, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentAngleIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center space-x-2 ${currentAngleIndex === idx
                  ? 'bg-[#c5a880] text-black font-bold shadow-lg shadow-[#c5a880]/20'
                  : 'bg-white/5 text-zinc-300 hover:bg-white/10 border border-white/5'
                  }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${currentAngleIndex === idx ? 'animate-spin' : ''}`} />
                <span>{ang.angle}</span>
              </button>
            ))}
          </div>

          <div className="text-right">
            <span className="text-xs text-zinc-400 font-mono">Tavsiye Edilen Perakende:</span>
            <span className="text-lg font-mono font-bold text-white ml-2">
              {formatPrice(16500, 430, 465)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
