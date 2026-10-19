import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import AppleHeroExperience from '../components/AppleHeroExperience';
import NoktaSplitSlider from '../components/NoktaSplitSlider';
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  MapPin,
} from 'lucide-react';

export default function Home() {
  const { navigateTo, showToast, formatPrice } = useStore();
  const [appointmentForm, setAppointmentForm] = useState({ name: '', phone: '', boutique: 'Nişantaşı / İstanbul', date: '' });
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const featuredProducts = PRODUCTS.slice(0, 4);

  const collections = [
    {
      title: 'Güneş Gözlükleri',
      desc: 'Carl Zeiss Polarized UV400 & 24K Altın Detaylar',
      tag: 'Sun Collection',
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=85',
      category: 'sunglasses'
    },
    {
      title: 'Optik & Numaralı Çerçeveler',
      desc: 'Mazzucchelli 1849 Asetat & Zeis BlueProtect®',
      tag: 'Optical Atelier',
      image: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=1200&q=85',
      category: 'optical'
    },
    {
      title: 'Japon Titanyum Serisi',
      desc: 'Sabae Atölyelerinde Şekillenen 12 Gramlık Saf Beta-Titanyum',
      tag: 'Titanium Craft',
      image: 'https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=1200&q=85',
      category: 'titanium'
    },
    {
      title: 'Sınırlı Üretim (Limited 150)',
      desc: 'Numaralandırılmış Heykelsi Koleksiyon Parçaları',
      tag: 'Haute Horlogerie Standard',
      image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=1200&q=85',
      category: 'limited'
    }
  ];

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    if (!appointmentForm.name || !appointmentForm.phone) {
      showToast('Lütfen isim ve telefon bilgilerinizi giriniz.', 'error');
      return;
    }
    setAppointmentSuccess(true);
    showToast('VIP Optisyen randevu talebiniz alındı. Danışmanımız en kısa sürede arayacaktır.');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f2ec]">
      {/* Apple-Style Interactive 3D Hero Section */}
      <section className="relative min-h-[96vh] flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 pt-24 pb-16 overflow-hidden">
        {/* Subtle Ambient Vignette & Volumetric Lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#c5a880]/10 rounded-full blur-[160px]" />
          <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#dfc8a5]/5 rounded-full blur-[140px]" />
        </div>

        {/* Hero Typography & Brand Hook */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#c5a880]">
              Maison Fondée 2026 • Nouvelle Collection
            </span>
          </div>

          {/* Majestic Serif Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-white leading-[1.05] max-w-4xl">
            Gözlük Sanatının <br />
            <span className="italic font-light text-[#c5a880]">Çağdaş Zirvesi</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl font-light leading-relaxed">
            Sabae'nin saf Japon titanyumu ve Mazzucchelli'nin asırlık İtalyan asetatı, Carl Zeiss optik mükemmeliyeti ile tek bir heykelsi silüette buluşuyor.
          </p>

          {/* Interactive 3D Eyewear Model (Apple-Style Rotating Rig) */}
          <AppleHeroExperience />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigateTo('shop')}
              className="btn-luxury w-full sm:w-auto"
            >
              <span>2026 Koleksiyonunu Keşfet</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('vip-appointment');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-outline-luxury w-full sm:w-auto"
            >
              <span>VIP Optisyen Randevusu Al</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-16 pt-8 border-t border-white/10 w-full max-w-3xl">
            <div>
              <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">12.1 gr</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1 block">Ultra Hafif Titanyum</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl text-[#c5a880] font-medium">200+</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1 block">El İşçiliği Aşaması</span>
            </div>
            <div>
              <span className="block font-serif text-2xl sm:text-3xl text-white font-medium">100%</span>
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest mt-1 block">Carl Zeiss Precision</span>
            </div>
          </div>
        </div>
      </section>

      <NoktaSplitSlider />

      <section className="bg-[#e9eeec] text-[#151a18] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#e45b44] mb-4">
                ACM OPTİK / FRAME INDEX / 2026
              </p>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl leading-[0.98] max-w-3xl">
                Yüzünü değiştirme.<br />
                <span className="italic text-[#e45b44]">Bakışını seç.</span>
              </h2>
            </div>
            <div className="max-w-xs lg:pb-2">
              <p className="text-sm leading-relaxed text-[#525d58]">
                Dört farklı form dili. Sabae titanyumundan İtalyan asetatına, karakterine en yakın çerçeveyi bul.
              </p>
              <button
                onClick={() => navigateTo('shop')}
                className="mt-5 inline-flex items-center gap-3 border-b border-[#151a18] pb-2 text-[11px] font-semibold uppercase tracking-[0.16em] hover:text-[#e45b44] hover:border-[#e45b44] transition-colors"
              >
                Tüm koleksiyonu gör <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[300px_300px_300px] gap-3">
            {collections.map((collection, index) => (
              <button
                key={collection.category}
                onClick={() => navigateTo('shop')}
                className={`group relative min-h-[280px] overflow-hidden text-left bg-[#cbd2cf] ${index === 0
                    ? 'sm:col-span-2 lg:col-span-8 lg:row-span-2 lg:min-h-0'
                    : index < 3
                      ? 'lg:col-span-4 lg:min-h-0'
                      : 'lg:col-span-5 lg:min-h-0'
                  }`}
              >
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/15" />
                <span className="absolute top-5 left-5 text-[10px] font-mono tracking-[0.2em] text-white/80">
                  0{index + 1} / {collection.tag.toUpperCase()}
                </span>
                <ArrowUpRight className="absolute top-4 right-4 w-9 h-9 p-2 text-white border border-white/50 rounded-full transition-all duration-300 group-hover:bg-[#d8ef70] group-hover:text-[#151a18] group-hover:border-[#d8ef70]" />
                <span className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7">
                  <span className="block font-serif text-2xl sm:text-3xl text-white">{collection.title}</span>
                  <span className="mt-1 block max-w-lg text-xs text-white/75">{collection.desc}</span>
                </span>
              </button>
            ))}

            <div className="flex min-h-[220px] flex-col justify-between bg-[#d8ef70] p-6 sm:col-span-2 sm:flex-row sm:items-end sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-start-3">
              <div className="max-w-sm">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#3a4935]">Malzeme notu / 01</span>
                <p className="mt-3 font-serif text-2xl sm:text-3xl leading-tight text-[#151a18]">
                  Her çizginin arkasında başka bir ustalık var.
                </p>
              </div>
              <span className="mt-5 self-end font-serif text-6xl leading-none text-[#151a18]/20 sm:mt-0">04</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#151a18] text-[#f3f5ee] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#d8ef70] mb-3">02 / İMZA PARÇALAR</p>
              <h2 className="font-serif text-4xl sm:text-6xl leading-none">Bu sezonun<br /><span className="italic text-[#d8ef70]">karakterleri.</span></h2>
            </div>
            <button
              onClick={() => navigateTo('shop')}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/75 hover:text-[#d8ef70] transition-colors"
            >
              8 tasarımı keşfet <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <button
              onClick={() => navigateTo('pdp', featuredProducts[0].id)}
              className="group relative min-h-[380px] sm:min-h-[520px] overflow-hidden text-left bg-[#29302c] lg:col-span-5"
            >
              <img src={featuredProducts[0].images[0]} alt={featuredProducts[0].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <span className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80">01 — ÖNE ÇIKAN</span>
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d8ef70]">{featuredProducts[0].categoryName}</span>
                  <h3 className="mt-1 font-serif text-3xl text-white">{featuredProducts[0].name}</h3>
                </div>
                <ArrowUpRight className="mb-1 h-10 w-10 shrink-0 rounded-full border border-white/60 p-2 text-white group-hover:border-[#d8ef70] group-hover:bg-[#d8ef70] group-hover:text-[#151a18] transition-colors" />
              </div>
            </button>

            <div className="lg:col-span-7">
              {featuredProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => navigateTo('pdp', product.id)}
                  className="group grid w-full grid-cols-[36px_1fr_auto] items-center gap-3 border-t border-white/15 py-5 text-left sm:grid-cols-[48px_1fr_auto] sm:gap-5 sm:py-6"
                >
                  <span className="font-mono text-[10px] text-[#d8ef70]">0{index + 1}</span>
                  <span>
                    <span className="block font-serif text-lg sm:text-2xl text-white group-hover:text-[#d8ef70] transition-colors">{product.name}</span>
                    <span className="mt-1 block text-[11px] text-white/50">{product.categoryName} · {product.shapeName}</span>
                  </span>
                  <span className="flex items-center gap-2 text-right font-mono text-xs text-white/80">
                    {formatPrice(product.priceTRY, product.priceEUR, product.priceUSD)}
                    <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-[#d8ef70] transition-colors" />
                  </span>
                </button>
              ))}
              <p className="border-t border-white/15 pt-5 text-xs leading-relaxed text-white/50">
                Her modelin detayları, renk seçenekleri ve ölçüleri kendi ürün sayfasında.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="vip-appointment" className="bg-[#d8ef70] text-[#151a18] px-4 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#3a4935] mb-5">04 / ÖZEL DANIŞMANLIK</p>
            <h2 className="font-serif text-4xl sm:text-6xl leading-[0.98]">
              Sana göre<br />
              <span className="italic">bir çerçeve.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-[#3a4935]">
              Nişantaşı atölyemizde uzman optisyenle yüz yüze buluş veya görüntülü danışmanlık için talep bırak.
            </p>
            <div className="mt-8 flex items-center gap-3 border-t border-[#151a18]/20 pt-5 text-xs">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>Abdi İpekçi Cad. No: 42, Nişantaşı / İstanbul</span>
            </div>
          </div>

          <div className="lg:col-span-7">
            {appointmentSuccess ? (
              <div className="flex min-h-[320px] flex-col justify-center border-y border-[#151a18]/25 py-10">
                <CheckCircle2 className="h-9 w-9 text-[#e45b44]" />
                <h3 className="mt-5 font-serif text-3xl">Talebin alındı.</h3>
                <p className="mt-2 max-w-md text-sm text-[#3a4935]">Optisyenimiz randevu detaylarını netleştirmek için en kısa sürede seni arayacak.</p>
              </div>
            ) : (
              <form onSubmit={handleAppointmentSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                <label className="border-t border-[#151a18]/35 py-4 text-[10px] font-mono uppercase tracking-[0.15em]">
                  Ad soyad
                  <input type="text" required value={appointmentForm.name} onChange={(event) => setAppointmentForm({ ...appointmentForm, name: event.target.value })} placeholder="Adınız Soyadınız" className="mt-3 block w-full bg-transparent pb-2 text-sm font-sans normal-case tracking-normal placeholder:text-[#53604f]/65 focus:outline-none" />
                </label>
                <label className="border-t border-[#151a18]/35 py-4 text-[10px] font-mono uppercase tracking-[0.15em]">
                  Telefon
                  <input type="tel" required value={appointmentForm.phone} onChange={(event) => setAppointmentForm({ ...appointmentForm, phone: event.target.value })} placeholder="05__ ___ __ __" className="mt-3 block w-full bg-transparent pb-2 text-sm font-sans normal-case tracking-normal placeholder:text-[#53604f]/65 focus:outline-none" />
                </label>
                <label className="border-t border-[#151a18]/35 py-4 text-[10px] font-mono uppercase tracking-[0.15em]">
                  Buluşma biçimi
                  <select value={appointmentForm.boutique} onChange={(event) => setAppointmentForm({ ...appointmentForm, boutique: event.target.value })} className="mt-3 block w-full bg-transparent pb-2 text-sm font-sans normal-case tracking-normal focus:outline-none">
                    <option value="Nişantaşı / İstanbul">Nişantaşı Atelier Salonu</option>
                    <option value="Görüntülü VIP Danışmanlık">Görüntülü danışmanlık</option>
                    <option value="Telefonla danışmanlık">Telefonla danışmanlık</option>
                  </select>
                </label>
                <label className="border-t border-[#151a18]/35 py-4 text-[10px] font-mono uppercase tracking-[0.15em]">
                  Tercih edilen tarih
                  <input type="date" value={appointmentForm.date} onChange={(event) => setAppointmentForm({ ...appointmentForm, date: event.target.value })} className="mt-3 block w-full bg-transparent pb-2 text-sm font-sans normal-case tracking-normal focus:outline-none" />
                </label>
                <button type="submit" className="mt-5 inline-flex min-h-14 items-center justify-between bg-[#151a18] px-5 text-left text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#e45b44] sm:col-span-2">
                  Randevu talebi gönder <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
