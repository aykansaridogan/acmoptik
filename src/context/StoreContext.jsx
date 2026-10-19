import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Navigation
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [lastOrder, setLastOrder] = useState(null);

  // Cart
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('acm_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Currency
  const [currency, setCurrency] = useState('TRY'); // TRY, EUR, USD

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'ACM10', discountPercent: 10 }

  // Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('acm_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('acm_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Toast dispatch
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Price formatting helper
  const formatPrice = (priceTRY, priceEUR = null, priceUSD = null) => {
    if (currency === 'EUR') {
      const val = priceEUR ?? Math.round(priceTRY / 38);
      return `€ ${val.toLocaleString('de-DE')}`;
    }
    if (currency === 'USD') {
      const val = priceUSD ?? Math.round(priceTRY / 35);
      return `$ ${val.toLocaleString('en-US')}`;
    }
    return `₺ ${priceTRY.toLocaleString('tr-TR')}`;
  };

  const getPriceValue = (priceTRY, priceEUR = null, priceUSD = null) => {
    if (currency === 'EUR') return priceEUR ?? Math.round(priceTRY / 38);
    if (currency === 'USD') return priceUSD ?? Math.round(priceTRY / 35);
    return priceTRY;
  };

  // Cart operations
  const addToCart = (product, color, lens, coating, prescription, quantity = 1) => {
    const basePrice = product.priceTRY;
    const lensPrice = lens?.priceTRY || 0;
    const coatingPrice = coating?.priceTRY || 0;
    const itemTotalTRY = basePrice + lensPrice + coatingPrice;

    const basePriceEUR = product.priceEUR;
    const lensPriceEUR = lens?.priceEUR || 0;
    const coatingPriceEUR = coating?.priceEUR || 0;
    const itemTotalEUR = basePriceEUR + lensPriceEUR + coatingPriceEUR;

    const basePriceUSD = product.priceUSD;
    const lensPriceUSD = lens?.priceUSD || 0;
    const coatingPriceUSD = coating?.priceUSD || 0;
    const itemTotalUSD = basePriceUSD + lensPriceUSD + coatingPriceUSD;

    const cartItemId = `${product.id}_${color.name}_${lens?.id || 'std'}_${coating?.id || 'std'}_${prescription?.uploadLater ? 'later' : 'filled'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          product,
          color,
          lens,
          coating,
          prescription,
          quantity,
          priceTRY: itemTotalTRY,
          priceEUR: itemTotalEUR,
          priceUSD: itemTotalUSD
        }
      ];
    });

    setIsCartOpen(true);
    showToast(`"${product.name}" alışveriş sepetinize eklendi.`);
  };

  const updateCartQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Ürün sepetten kaldırıldı.', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist toggle
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Favorilerden kaldırıldı.', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Favorilerinize eklendi.');
        return [...prev, productId];
      }
    });
  };

  // Coupon apply
  const applyCoupon = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ACM10') {
      setAppliedCoupon({ code: 'ACM10', discountPercent: 10 });
      showToast('%10 Hoş Geldiniz indirimi uygulandı!');
      return true;
    }
    if (clean === 'VIP20') {
      setAppliedCoupon({ code: 'VIP20', discountPercent: 20 });
      showToast('VIP %20 Özel Müşteri indirimi uygulandı!');
      return true;
    }
    showToast('Geçersiz indirim kodu. (Deneyin: ACM10)', 'error');
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('İndirim kodu kaldırıldı.', 'info');
  };

  // Calculations
  const cartSubtotalTRY = cart.reduce((sum, item) => sum + item.priceTRY * item.quantity, 0);
  const cartSubtotalEUR = cart.reduce((sum, item) => sum + item.priceEUR * item.quantity, 0);
  const cartSubtotalUSD = cart.reduce((sum, item) => sum + item.priceUSD * item.quantity, 0);

  const discountRatio = appliedCoupon ? appliedCoupon.discountPercent / 100 : 0;
  const cartDiscountTRY = Math.round(cartSubtotalTRY * discountRatio);
  const cartDiscountEUR = Math.round(cartSubtotalEUR * discountRatio);
  const cartDiscountUSD = Math.round(cartSubtotalUSD * discountRatio);

  const FREE_SHIPPING_THRESHOLD_TRY = 5000;
  const isFreeShipping = cartSubtotalTRY >= FREE_SHIPPING_THRESHOLD_TRY || cart.length === 0;
  const shippingCostTRY = isFreeShipping ? 0 : 250;
  const shippingCostEUR = isFreeShipping ? 0 : 10;
  const shippingCostUSD = isFreeShipping ? 0 : 12;

  const cartTotalTRY = cartSubtotalTRY - cartDiscountTRY + (cart.length > 0 ? shippingCostTRY : 0);
  const cartTotalEUR = cartSubtotalEUR - cartDiscountEUR + (cart.length > 0 ? shippingCostEUR : 0);
  const cartTotalUSD = cartSubtotalUSD - cartDiscountUSD + (cart.length > 0 ? shippingCostUSD : 0);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Navigate helper
  const navigateTo = (page, productId = null) => {
    if (productId) setSelectedProductId(productId);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        navigateTo,
        lastOrder,
        setLastOrder,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        totalCartCount,
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
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        wishlist,
        toggleWishlist,
        currency,
        setCurrency,
        formatPrice,
        getPriceValue,
        isCartOpen,
        setIsCartOpen,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
}
