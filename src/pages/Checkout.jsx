import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Building, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function Checkout() {
  const { 
    cart, 
    cartTotalTRY, 
    cartTotalEUR, 
    cartTotalUSD,
    cartSubtotalTRY, 
    cartSubtotalEUR, 
    cartSubtotalUSD, 
    cartDiscountTRY,
    cartDiscountEUR, 
    cartDiscountUSD, 
    shippingCostTRY, 
    shippingCostEUR, 
    shippingCostUSD, 
    isFreeShipping, 
    formatPrice, 
    appliedCoupon, 
    clearCart, 
    setLastOrder, 
    navigateTo, 
    showToast 
  } = useStore();

  // Form State
  const [formData, setFormData] = useState({
    firstName: 'Arda',
    lastName: 'Yılmaz',
    email: 'arda.yilmaz@acmoptik.com',
    phone: '0532 890 20 26',
    address: 'Teşvikiye Cad. No: 18 D: 4, Nişantaşı',
    city: 'İstanbul',
    district: 'Şişli',
    zipCode: '34365',
    invoiceType: 'individual', // individual or corporate
    taxId: '',
    companyName: '',
    shippingMethod: 'vip-courier', // vip-courier or ups-express
    notes: 'Kapı zili çalınmadan önce lütfen arayınız.'
  });

  // Credit Card Interactive State
  const [cardData, setCardData] = useState({
    number: '4543 •••• •••• 9842',
    name: 'ARDA YILMAZ',
    expiry: '08/28',
    cvv: '842',
    installment: '1'
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [is3DSecureModalOpen, setIs3DSecureModalOpen] = useState(false);
  const [smsCode, setSmsCode] = useState('');
  const [smsError, setSmsError] = useState(false);

  // Card Brand Detection
  const getCardBrand = (num) => {
    const clean = num.replace(/\s+/g, '');
    if (clean.startsWith('4')) return 'VISA';
    if (clean.startsWith('5')) return 'MASTERCARD';
    if (clean.startsWith('3')) return 'AMEX';
    if (clean.startsWith('9')) return 'TROY';
    return 'VISA';
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length >= 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setCardData({ ...cardData, expiry: val.substring(0, 5) });
  };

  // Submit and open 3D Secure modal
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.phone || !formData.address) {
      showToast('Lütfen teslimat ve iletişim bilgilerini eksiksiz doldurunuz.', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIs3DSecureModalOpen(true);
    }, 900);
  };

  // Verify 3D secure SMS
  const handleVerify3DSecure = (e) => {
    e.preventDefault();
    if (!smsCode || smsCode.length < 4) {
      setSmsError(true);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIs3DSecureModalOpen(false);

      const orderNumber = `ACM-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const order = {
        orderNumber,
        items: [...cart],
        shippingAddress: formData,
        payment: {
          brand: getCardBrand(cardData.number),
          last4: cardData.number.slice(-4) || '9842',
          installment: cardData.installment
        },
        totals: {
          subtotalTRY: cartSubtotalTRY,
          subtotalEUR: cartSubtotalEUR,
          subtotalUSD: cartSubtotalUSD,
          discountTRY: cartDiscountTRY,
          discountEUR: cartDiscountEUR,
          discountUSD: cartDiscountUSD,
          shippingTRY: shippingCostTRY,
          shippingEUR: shippingCostEUR,
          shippingUSD: shippingCostUSD,
          totalTRY: cartTotalTRY,
          totalEUR: cartTotalEUR,
          totalUSD: cartTotalUSD
        },
        date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
      };

      setLastOrder(order);
      clearCart();
      navigateTo('order-success');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#09090b] text-[#f4f2ec] pt-32 pb-24 px-4 flex items-center justify-center">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl max-w-md text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500 mx-auto">
            <CreditCard className="w-8 h-8 text-[#c5a880]" />
          </div>
          <h2 className="font-serif text-2xl text-white">Sepetiniz Boş</h2>
          <p className="text-xs text-zinc-400">
            Ödeme adımına geçebilmek için lütfen koleksiyonumuzdan bir gözlük seçiniz.
          </p>
          <button onClick={() => navigateTo('shop')} className="btn-luxury text-xs mt-2">
            Koleksiyonu İncele
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-[#f4f2ec] pt-28 pb-24">
      {/* Checkout Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-8">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-[#c5a880] block mb-1">
              Güvenli Ödeme Protokolü
            </span>
            <h1 className="font-serif text-2xl sm:text-4xl font-medium text-white">
              Sipariş & Ödeme İşlemleri
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono text-zinc-400 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
            <Lock className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>256-Bit SSL Şifreli</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <form onSubmit={handleProceedToPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Form: Delivery & Payment Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Step 1: Teslimat Bilgileri */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-5">
              <div className="flex items-center space-x-3 text-xs font-mono text-[#c5a880] uppercase tracking-wider font-semibold border-b border-white/5 pb-3">
                <User className="w-4 h-4" />
                <span>1. Teslimat ve İletişim Bilgileri</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Adınız</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Soyadınız</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">E-Posta Adresi</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Telefon Numarası</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Teslimat Adresi</label>
                  <textarea
                    rows={2}
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Şehir</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">İlçe / Posta Kodu</label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#c5a880]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Kargo Seçenekleri */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/10 space-y-4">
              <div className="flex items-center space-x-3 text-xs font-mono text-[#c5a880] uppercase tracking-wider font-semibold border-b border-white/5 pb-3">
                <Truck className="w-4 h-4" />
                <span>2. Teslimat Yöntemi</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setFormData({ ...formData, shippingMethod: 'vip-courier' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.shippingMethod === 'vip-courier'
                      ? 'bg-[#c5a880]/15 border-[#c5a880]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Aynı Gün Özel VIP Kurye</span>
                    <span className="text-[#c5a880] font-mono">
                      {isFreeShipping ? 'ÜCRETSİZ' : '250 ₺'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    İstanbul içi siparişlerde randevulu saatte özel kurye ile elden teslimat.
                  </p>
                </div>

                <div
                  onClick={() => setFormData({ ...formData, shippingMethod: 'ups-express' })}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    formData.shippingMethod === 'ups-express'
                      ? 'bg-[#c5a880]/15 border-[#c5a880]'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Sigortalı UPS Express</span>
                    <span className="text-[#c5a880] font-mono">
                      {isFreeShipping ? 'ÜCRETSİZ' : '200 ₺'}
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">
                    Tüm Türkiye'ye kırılmaya karşı tam sigortalı 24 saatte hızlı teslimat.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3: Canlı İnteraktif Kredi Kartı ve PayTR / iyzico Formu */}
            <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-[#c5a880]/30 space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center space-x-3 text-xs font-mono text-[#c5a880] uppercase tracking-wider font-semibold">
                  <CreditCard className="w-4 h-4" />
                  <span>3. Güvenli Ödeme & Canlı Kart Simülatörü</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">PayTR</span>
                  <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">iyzico</span>
                </div>
              </div>

              {/* 3D Animated Card Preview (Flips on CVV focus) */}
              <div className="perspective-1000 max-w-sm mx-auto my-2">
                <div
                  className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 shadow-2xl transition-transform duration-700 transform-style-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                  style={{
                    background: 'linear-gradient(135deg, #1c1c22 0%, #0d0d10 60%, #2a2520 100%)',
                    border: '1px solid rgba(197, 168, 128, 0.35)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(197, 168, 128, 0.15)'
                  }}
                >
                  {/* Front of Card */}
                  <div className={`absolute inset-0 p-6 flex flex-col justify-between backface-hidden ${isFlipped ? 'hidden' : 'flex'}`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-300 to-amber-500 border border-amber-200/50 flex items-center justify-center shadow-inner">
                          <div className="w-4 h-4 rounded-sm border border-black/30" />
                        </div>
                        <span className="text-[10px] font-mono tracking-widest text-[#c5a880] uppercase">
                          ACM OPTİK
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold tracking-widest text-white/90">
                        {getCardBrand(cardData.number)}
                      </span>
                    </div>

                    <div className="font-mono text-lg sm:text-xl tracking-[0.2em] text-white font-medium my-auto drop-shadow">
                      {cardData.number || '•••• •••• •••• ••••'}
                    </div>

                    <div className="flex justify-between items-end text-xs">
                      <div>
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">
                          Kart Sahibi
                        </span>
                        <span className="font-mono tracking-wider text-white uppercase font-medium">
                          {cardData.name || 'AD SOYAD'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase tracking-wider">
                          SKT
                        </span>
                        <span className="font-mono tracking-widest text-white font-medium">
                          {cardData.expiry || 'AA/YY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Back of Card */}
                  <div className={`absolute inset-0 py-6 flex flex-col justify-between backface-hidden rotate-y-180 ${!isFlipped ? 'hidden' : 'flex'}`}>
                    <div className="w-full h-10 bg-black mt-2" />
                    <div className="px-6 flex items-center justify-end">
                      <div className="text-right">
                        <span className="text-[9px] font-mono text-zinc-400 block uppercase mb-1">CVV / Güvenlik</span>
                        <div className="bg-white text-black font-mono text-sm px-4 py-1 rounded font-bold tracking-widest inline-block">
                          {cardData.cvv || '•••'}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 text-[8px] font-mono text-zinc-500 text-center">
                      ACM OPTİK GÜVENLİ ÖDEME AĞI • 256-BIT SSL ENCRYPTED
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Inputs */}
              <div className="space-y-4 text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Kart Numarası</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardData.number}
                    onChange={handleCardNumberChange}
                    onFocus={() => setIsFlipped(false)}
                    placeholder="4543 0000 0000 0000"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Kart Üzerindeki İsim</label>
                  <input
                    type="text"
                    required
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                    onFocus={() => setIsFlipped(false)}
                    placeholder="AD SOYAD"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white uppercase font-mono focus:outline-none focus:border-[#c5a880]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Son Kullanma (AA/YY)</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardData.expiry}
                      onChange={handleExpiryChange}
                      onFocus={() => setIsFlipped(false)}
                      placeholder="MM/YY"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 block mb-1 font-mono text-[11px]">Güvenlik Kodu (CVV)</label>
                    <input
                      type="password"
                      required
                      maxLength={4}
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') })}
                      onFocus={() => setIsFlipped(true)}
                      onBlur={() => setIsFlipped(false)}
                      placeholder="•••"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-white font-mono focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                {/* Installments Table */}
                <div className="pt-2">
                  <label className="text-zinc-400 block mb-1.5 font-mono text-[11px]">
                    Taksit Seçenekleri
                  </label>
                  <div className="grid grid-cols-4 gap-2 font-mono text-[11px]">
                    {[
                      { inst: '1', label: 'Tek Çekim', rate: 1 },
                      { inst: '3', label: '3 Taksit', rate: 1.02 },
                      { inst: '6', label: '6 Taksit', rate: 1.04 },
                      { inst: '9', label: '9 Taksit', rate: 1.07 }
                    ].map((opt) => {
                      const totalWithRate = Math.round(cartTotalTRY * opt.rate);
                      const monthly = Math.round(totalWithRate / Number(opt.inst));
                      return (
                        <button
                          key={opt.inst}
                          type="button"
                          onClick={() => setCardData({ ...cardData, installment: opt.inst })}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            cardData.installment === opt.inst
                              ? 'bg-[#c5a880]/20 border-[#c5a880] text-white font-bold'
                              : 'bg-white/[0.02] border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="block font-medium">{opt.label}</span>
                          <span className="block text-[10px] text-[#c5a880] mt-0.5">
                            {opt.inst === '1' ? 'Vade Farksız' : `${monthly.toLocaleString('tr-TR')} ₺/ay`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Checkout Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-luxury py-4 text-xs font-bold tracking-widest flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'İşlem Başlatılıyor...' : `Siparişi ve Ödemeyi Tamamla • ${formatPrice(cartTotalTRY, cartTotalEUR, cartTotalUSD)}`}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/10 space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-medium text-white border-b border-white/10 pb-4">
                Sipariş Özeti ({cart.length} Ürün)
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="flex space-x-3 text-xs border-b border-white/5 pb-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-black/40 border border-white/10 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-semibold text-white truncate">{item.product.name}</h4>
                      <p className="text-zinc-400 text-[11px]">{item.color.name}</p>
                      <p className="text-[10px] text-[#c5a880]">{item.lens?.title || 'Standart UV400'}</p>
                      {item.prescription && (
                        <span className="text-[10px] text-zinc-500 block">
                          Reçete: {item.prescription.uploadLater ? 'Sonradan Gönderilecek' : 'Özel Değerler Girildi'}
                        </span>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-zinc-500 font-mono text-[11px]">Adet: {item.quantity}</span>
                        <span className="font-mono text-white font-semibold">
                          {formatPrice(
                            item.priceTRY * item.quantity,
                            item.priceEUR * item.quantity,
                            item.priceUSD * item.quantity
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-zinc-400 font-mono border-t border-white/10 pt-4">
                <div className="flex justify-between">
                  <span>Ara Toplam</span>
                  <span className="text-white">
                    {formatPrice(cartSubtotalTRY, cartSubtotalEUR, cartSubtotalUSD)}
                  </span>
                </div>

                {appliedCoupon && (
                  <div className="flex justify-between text-[#c5a880]">
                    <span>İndirim Tutarı ({appliedCoupon.code})</span>
                    <span>
                      - {formatPrice(cartDiscountTRY, cartDiscountEUR, cartDiscountUSD)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>VIP Teslimat</span>
                  <span>
                    {isFreeShipping ? (
                      <span className="text-[#c5a880] font-semibold">ÜCRETSİZ</span>
                    ) : (
                      formatPrice(shippingCostTRY, shippingCostEUR, shippingCostUSD)
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif text-white pt-3 border-t border-white/10 font-bold">
                  <span>Toplam Ödeme</span>
                  <span className="text-[#c5a880] font-mono">
                    {formatPrice(cartTotalTRY, cartTotalEUR, cartTotalUSD)}
                  </span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-[11px] text-zinc-400">
                <div className="flex items-center space-x-2 text-white font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#c5a880]" />
                  <span>ACM OPTİK Güvenli Alışveriş Garantisi</span>
                </div>
                <p className="leading-relaxed text-zinc-500">
                  Kart bilgileriniz hiçbir zaman sunucularımızda saklanmaz. Tüm ödeme işlemleri PayTR ve iyzico 256-Bit SSL altyapısı ile bankanıza şifrelenerek iletilir.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* 3D Secure SMS Verification Simulation Modal */}
      {is3DSecureModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md bg-[#16161a] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[#c5a880]">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-serif text-lg text-white">3D Secure Doğrulama</span>
              </div>
              <span className="font-mono text-xs px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                Banka Onayı
              </span>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <p>
                <strong>{formData.phone}</strong> numaralı telefonunuza bankanız tarafından 6 haneli onay kodu gönderildi.
              </p>
              <div className="p-3 bg-white/5 rounded-xl border border-white/10 font-mono text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">İşyeri Adı:</span>
                  <span className="text-white">ACM OPTİK A.Ş.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tutar:</span>
                  <span className="text-[#c5a880] font-bold">
                    {formatPrice(cartTotalTRY, cartTotalEUR, cartTotalUSD)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">İşlem Tarihi:</span>
                  <span className="text-white">17 Ekim 2026</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleVerify3DSecure} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-zinc-400 block mb-1">
                  SMS Doğrulama Kodu:
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={smsCode}
                    onChange={(e) => {
                      setSmsCode(e.target.value);
                      setSmsError(false);
                    }}
                    placeholder="202626"
                    className="flex-1 bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-center text-lg tracking-[0.4em] font-mono text-white focus:outline-none focus:border-[#c5a880]"
                  />
                  <button
                    type="button"
                    onClick={() => setSmsCode('202626')}
                    className="px-3 py-2 bg-white/10 hover:bg-[#c5a880] hover:text-black rounded-xl text-xs font-mono transition-colors"
                  >
                    Kodu Doldur
                  </button>
                </div>
                {smsError && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center space-x-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Lütfen geçerli bir SMS kodu giriniz.</span>
                  </p>
                )}
              </div>

              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-luxury py-3.5 text-xs font-bold"
                >
                  {isProcessing ? 'Onaylanıyor...' : 'Doğrula ve Siparişi Onayla'}
                </button>
                <button
                  type="button"
                  onClick={() => setIs3DSecureModalOpen(false)}
                  className="w-full text-center text-xs text-zinc-500 hover:text-white py-1"
                >
                  İptal Et
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
