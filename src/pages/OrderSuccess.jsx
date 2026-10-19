import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Printer, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  CreditCard,
  FileText,
  Sparkles
} from 'lucide-react';

export default function OrderSuccess() {
  const { lastOrder, navigateTo, formatPrice, showToast } = useStore();

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a880', '#dfc8a5', '#ffffff', '#e2e8f0']
      });
    } catch (e) {
      console.error(e);
    }
  }, []);

  const order = lastOrder || {
    orderNumber: 'ACM-2026-9842',
    date: '17 Ekim 2026',
    shippingAddress: {
      firstName: 'Arda',
      lastName: 'Yılmaz',
      phone: '0532 890 20 26',
      email: 'arda.yilmaz@acmoptik.com',
      address: 'Teşvikiye Cad. No: 18 D: 4, Nişantaşı',
      city: 'İstanbul',
      district: 'Şişli'
    },
    payment: {
      brand: 'VISA',
      last4: '9842',
      installment: '1'
    },
    totals: {
      totalTRY: 16500,
      totalEUR: 430,
      totalUSD: 465
    },
    items: []
  };

  const handlePrint = () => {
    window.print();
    showToast('Fatura yazdırma ekranı açıldı.', 'info');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f2ec] pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Celebration Header Card */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-[#c5a880]/30 text-center relative overflow-hidden">
          <div className="w-20 h-20 rounded-full bg-[#c5a880]/20 border border-[#c5a880]/40 flex items-center justify-center text-[#c5a880] mx-auto mb-6 shadow-2xl">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#c5a880] uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Siparişiniz Başarıyla Onaylandı</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-white tracking-wide">
            Teşekkür Ederiz, {order.shippingAddress.firstName}
          </h1>

          <p className="text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto mt-3 leading-relaxed">
            Siparişiniz ACM OPTİK Atölyesi tarafından kayda alınmıştır. Optisyenlerimiz reçete ve montaj detaylarını incelemeye başlamıştır.
          </p>

          <div className="mt-6 inline-block bg-white/5 border border-white/10 rounded-2xl px-6 py-3 font-mono text-sm">
            <span className="text-zinc-400">Sipariş Takip No: </span>
            <strong className="text-[#c5a880] tracking-wider">{order.orderNumber}</strong>
          </div>
        </div>

        {/* Delivery Status & Timeline Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6">
          <h3 className="font-serif text-xl font-medium text-white flex items-center space-x-2">
            <Truck className="w-5 h-5 text-[#c5a880]" />
            <span>Teslimat ve Atölye Süreci</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 block">Tahmini Teslimat:</span>
              <span className="text-white font-semibold text-sm">Bugün (18:00 - 21:00)</span>
              <span className="text-[10px] text-[#c5a880] block">VIP Özel Kurye</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 block">Reçete & Montaj:</span>
              <span className="text-white font-semibold text-sm">Carl Zeiss İncelemede</span>
              <span className="text-[10px] text-emerald-400 block">Doğrulandı</span>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-zinc-500 block">Ödeme Yöntemi:</span>
              <span className="text-white font-semibold text-sm">
                {order.payment.brand} •••• {order.payment.last4}
              </span>
              <span className="text-[10px] text-zinc-400 block">
                {order.payment.installment === '1' ? 'Tek Çekim' : `${order.payment.installment} Taksit`}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-start space-x-3 text-xs">
            <MapPin className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white block">Teslimat Adresi:</span>
              <p className="text-zinc-400 mt-0.5">
                {order.shippingAddress.address}, {order.shippingAddress.district} / {order.shippingAddress.city}
              </p>
              <p className="text-zinc-500 text-[11px] mt-0.5">İletişim: {order.shippingAddress.phone}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto btn-outline-luxury flex items-center justify-center space-x-2 text-xs"
          >
            <Printer className="w-4 h-4" />
            <span>Faturayı Yazdır / PDF İndir</span>
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className="w-full sm:w-auto btn-luxury flex items-center justify-center space-x-2 text-xs"
          >
            <span>Alışverişe Devam Et</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
