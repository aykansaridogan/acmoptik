import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Award, 
  Share2, 
  MapPin, 
  Clock
} from 'lucide-react';

export default function Footer() {
  const { navigateTo } = useStore();

  return (
    <footer className="bg-[#151a18] text-[#c8cec8] font-sans">
      <div className="border-y border-white/10 bg-[#1b211e]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12">
          {[
            { Icon: Truck, title: 'VIP kurye', detail: 'İstanbul / aynı gün' },
            { Icon: Award, title: 'Zeiss & Sabae', detail: 'Alman optiği / Japon işçiliği' },
            { Icon: ShieldCheck, title: 'Atölye garantisi', detail: '2 yıl koruma' },
            { Icon: RotateCcw, title: 'Kolay iade', detail: '14 gün içinde' },
          ].map(({ Icon, title, detail }, index) => (
            <div key={title} className={`flex min-h-[78px] items-center gap-3 px-4 py-4 sm:px-6 lg:px-5 ${index % 2 === 0 ? 'border-r border-white/10' : ''} ${index < 2 ? 'border-b border-white/10 lg:border-b-0' : ''} ${index === 1 ? 'lg:border-r' : ''} ${index === 2 ? 'lg:border-r' : ''}`}>
              <Icon className="h-4 w-4 shrink-0 text-[#d8ef70]" />
              <div className="min-w-0">
                <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-white">{title}</p>
                <p className="mt-1 truncate text-[10px] text-white/45">{detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-12 sm:px-8 md:grid-cols-4 lg:grid-cols-12 lg:gap-8 lg:px-12 lg:py-16">
        <div className="col-span-2 md:col-span-4 lg:col-span-4">
          <button onClick={() => navigateTo('home')} className="text-left" aria-label="ACM Optik ana sayfa">
            <span className="font-serif text-3xl tracking-[0.16em] text-white transition-colors hover:text-[#d8ef70]">ACM OPTİK</span>
          </button>
          <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-[#d8ef70]">Haute Lunetterie · İstanbul</p>
          <p className="mt-5 max-w-sm text-xs leading-relaxed text-white/50">
            Gözlük tasarımını heykelsi formlar, seçkin malzemeler ve optik ustalıkla buluşturan bağımsız atölye.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono text-[10px] font-semibold text-white/65 transition-colors hover:border-[#d8ef70] hover:text-[#d8ef70]">IG</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center border border-white/15 font-mono text-[10px] font-semibold text-white/65 transition-colors hover:border-[#d8ef70] hover:text-[#d8ef70]">in</a>
            <a href="#" aria-label="Paylaş" className="flex h-9 w-9 items-center justify-center border border-white/15 text-white/65 transition-colors hover:border-[#d8ef70] hover:text-[#d8ef70]"><Share2 className="h-4 w-4" /></a>
          </div>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Koleksiyon</h3>
          <ul className="space-y-3 text-xs text-white/70">
            {['Tüm tasarımlar', 'Güneş gözlükleri', 'Optik çerçeveler', 'Japon titanyumu', 'Sınırlı üretim'].map((item) => (
              <li key={item}><button onClick={() => navigateTo('shop')} className="text-left transition-colors hover:text-[#d8ef70]">{item}</button></li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Atelier</h3>
          <ul className="space-y-3 text-xs text-white/70">
            <li><a href="/#vip-appointment" className="transition-colors hover:text-[#d8ef70]">Özel optisyen randevusu</a></li>
            <li><span>Reçeteli cam & odak tespiti</span></li>
            <li><span>Zeiss DuraVision® kaplamalar</span></li>
            <li><span>Çerçeve restorasyonu</span></li>
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 lg:col-span-3">
          <h3 className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">Bizi bulun</h3>
          <div className="space-y-4 text-xs leading-relaxed text-white/70">
            <div className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d8ef70]" /><span>Nişantaşı<br />Abdi İpekçi Cad. No: 42, İstanbul</span></div>
            <div className="flex items-start gap-2.5"><Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#d8ef70]" /><span>Pzt–Cmt · 10:00–20:00</span></div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-[9px] text-white/35 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>© 2026 ACM OPTİK A.Ş. · Haute Lunetterie</p>
          <p className="font-mono uppercase tracking-[0.12em]">PayTR 3D Secure <span className="mx-2 text-[#d8ef70]">/</span> iyzico <span className="mx-2 text-[#d8ef70]">/</span> TROY & BKM</p>
        </div>
      </div>
    </footer>
  );
}
