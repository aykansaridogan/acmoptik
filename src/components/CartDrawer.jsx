import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
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
    FREE_SHIPPING_THRESHOLD_TRY,
    cartTotalTRY,
    cartTotalEUR,
    cartTotalUSD,
    formatPrice, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon, 
    navigateTo 
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  // Shipping progress calculation
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD_TRY - cartSubtotalTRY);
  const shippingProgressPercent = Math.min(100, Math.round((cartSubtotalTRY / FREE_SHIPPING_THRESHOLD_TRY) * 100));

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    navigateTo('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          {/* Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="w-screen max-w-md bg-[#111114] border-l border-white/10 shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingBag className="w-5 h-5 text-[#c5a880]" />
                  <h3 className="font-serif text-xl tracking-wider text-white">
                    Alışveriş Çantanız
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded-full">
                    ({cart.reduce((sum, i) => sum + i.quantity, 0)})
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Meter */}
              <div className="px-6 py-3.5 bg-[#17171c] border-b border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  {isFreeShipping ? (
                    <span className="text-[#c5a880] font-medium flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Tebrikler! Ücretsiz VIP Kurye Teslimatı Kazandınız</span>
                    </span>
                  ) : (
                    <span className="text-zinc-300">
                      Ücretsiz VIP Kurye için <strong className="text-[#c5a880]">{formatPrice(remainingForFreeShipping)}</strong> daha ekleyin
                    </span>
                  )}
                  <span className="font-mono text-[11px] text-zinc-400">%{shippingProgressPercent}</span>
                </div>
                <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#c5a880] to-[#dfc8a5] transition-all duration-500 rounded-full"
                    style={{ width: `${shippingProgressPercent}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-serif text-lg text-white">Çantanız henüz boş</h4>
                      <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                        Yeni sezon koleksiyonlarımızdan benzersiz bir model keşfedin.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        navigateTo('shop');
                      }}
                      className="btn-luxury mt-2 text-xs"
                    >
                      Koleksiyonu Keşfet
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex space-x-4 relative group hover:border-[#c5a880]/30 transition-colors"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-black/40 rounded-lg overflow-hidden shrink-0 border border-white/10 p-1 flex items-center justify-center">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover object-center rounded group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-semibold text-white truncate">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-zinc-500 hover:text-red-400 p-1 transition-colors"
                            title="Kaldır"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Color & Lens Specs */}
                        <div className="mt-1 space-y-0.5 text-[11px] text-zinc-400">
                          <div className="flex items-center space-x-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full border border-white/20"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            <span className="truncate">{item.color.name}</span>
                          </div>
                          <p className="text-zinc-400 truncate">
                            <span className="text-[#c5a880]">Cam:</span> {item.lens?.title || 'Standart UV400'}
                          </p>
                          {item.coating && item.coating.priceTRY > 0 && (
                            <p className="text-zinc-500 truncate">
                              + {item.coating.title}
                            </p>
                          )}
                          {item.prescription && (
                            <span className="inline-block mt-1 px-1.5 py-0.5 bg-[#c5a880]/15 text-[#c5a880] rounded text-[10px] font-mono">
                              {item.prescription.uploadLater ? 'Reçete: Sonradan Gönderilecek' : 'Reçeteli Cam Montajı'}
                            </span>
                          )}
                        </div>

                        {/* Quantity and Price */}
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2 border border-white/10 rounded px-2 py-0.5 bg-black/30">
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, -1)}
                              className="p-0.5 text-zinc-400 hover:text-white transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-medium px-1 text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.cartItemId, 1)}
                              className="p-0.5 text-zinc-400 hover:text-white transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-xs font-semibold text-white">
                            {formatPrice(
                              item.priceTRY * item.quantity,
                              item.priceEUR * item.quantity,
                              item.priceUSD * item.quantity
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {cart.length > 0 && (
                <div className="p-6 bg-[#0f0f12] border-t border-white/10 space-y-4">
                  {/* Coupon Code Input */}
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between bg-[#c5a880]/10 border border-[#c5a880]/30 px-3 py-2 rounded-lg text-xs">
                      <div className="flex items-center space-x-2 text-[#c5a880]">
                        <Tag className="w-4 h-4" />
                        <span>Kupon: <strong>{appliedCoupon.code}</strong> (%{appliedCoupon.discountPercent} İndirim)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-zinc-400 hover:text-white text-xs underline"
                      >
                        Kaldır
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="İndirim Kodu (Örn: ACM10)"
                        className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 uppercase focus:outline-none focus:border-[#c5a880]"
                      />
                      <button
                        type="submit"
                        className="px-4 bg-white/10 hover:bg-[#c5a880] hover:text-black text-white text-xs font-semibold rounded-lg transition-colors"
                      >
                        Uygula
                      </button>
                    </form>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-400 border-t border-white/5 pt-3">
                    <div className="flex justify-between">
                      <span>Ara Toplam</span>
                      <span className="font-mono text-white">
                        {formatPrice(cartSubtotalTRY, cartSubtotalEUR, cartSubtotalUSD)}
                      </span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-[#c5a880]">
                        <span>İndirim Tutarı</span>
                        <span className="font-mono">
                          - {formatPrice(cartDiscountTRY, cartDiscountEUR, cartDiscountUSD)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>VIP Sigortalı Kurye</span>
                      <span className="font-mono">
                        {isFreeShipping ? (
                          <span className="text-[#c5a880] font-semibold">ÜCRETSİZ</span>
                        ) : (
                          formatPrice(shippingCostTRY, shippingCostEUR, shippingCostUSD)
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-base font-serif text-white pt-2 border-t border-white/10 font-semibold">
                      <span>Genel Toplam</span>
                      <span className="font-mono text-[#c5a880]">
                        {formatPrice(cartTotalTRY, cartTotalEUR, cartTotalUSD)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout CTA */}
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full btn-luxury flex items-center justify-center space-x-2 py-3.5"
                  >
                    <span>Güvenli Ödemeye Geç</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-center space-x-2 text-[10px] text-zinc-500 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>PayTR & iyzico 256-Bit SSL Şifreli Güvenli Ödeme</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
