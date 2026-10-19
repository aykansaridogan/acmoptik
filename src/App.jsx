import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { StoreProvider, useStore } from './context/StoreContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import QuickViewModal from './components/QuickViewModal';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import VirtualTryOn from './pages/VirtualTryOn';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { currentPage, toasts } = useStore();
  const lenisRef = useRef(null);
  const [showBrandIntro, setShowBrandIntro] = useState(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    try {
      return window.sessionStorage.getItem('acm-brand-intro') !== 'seen';
    } catch {
      return false;
    }
  });

  const finishBrandIntro = (event) => {
    if (event.target !== event.currentTarget) return;
    try {
      window.sessionStorage.setItem('acm-brand-intro', 'seen');
    } catch {
      // The intro still closes when session storage is unavailable.
    }
    setShowBrandIntro(false);
  };

  useEffect(() => {
    const main = document.querySelector('main');
    if (!main) return undefined;

    const targets = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('is-visible', entry.isIntersecting);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

    const observeTargets = () => {
      document.querySelectorAll('main section, main article, main > div > div, main [class*="grid"] > *, footer').forEach((target) => {
        if (targets.has(target)) return;
        targets.add(target);
        target.classList.add('scroll-reveal');
        observer.observe(target);
      });
    };

    observeTargets();
    const mutations = new MutationObserver(observeTargets);
    mutations.observe(main, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, [currentPage]);

  // Smooth scroll with Lenis
  useEffect(() => {
    let lenis;
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.9,
      });
      lenisRef.current = lenis;

      function raf(time) {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis could not be initialized:', e);
    }

    return () => {
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    });

    return () => cancelAnimationFrame(frame);
  }, [currentPage]);

  // Render active page
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'try-on':
        return <VirtualTryOn />;
      case 'pdp':
        return <ProductDetail />;
      case 'checkout':
        return <Checkout />;
      case 'order-success':
        return <OrderSuccess />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f2ec] flex flex-col justify-between selection:bg-[#c5a880] selection:text-black">
      {showBrandIntro && (
        <div className="cinematic-intro" onAnimationEnd={finishBrandIntro} aria-hidden="true">
          <div className="cinematic-intro__mark">
            <span className="cinematic-intro__line" />
            <span className="cinematic-intro__word">ACM OPTİK</span>
          </div>
          <span className="cinematic-intro__caption">HAUTE LUNETTERIE · İSTANBUL</span>
        </div>
      )}

      {/* Magnetic Luxury Cursor */}
      <CustomCursor />

      {/* Persistent Glass Navigation */}
      <Navbar />

      {/* Main Dynamic Viewport */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Editorial Footer */}
      <Footer />

      {/* Slide-over Cart Drawer */}
      <CartDrawer />

      {/* Search Modal */}
      <SearchModal />

      {/* Quick View Modal */}
      <QuickViewModal />

      {/* Floating Toast Notification Center */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-xl bg-[#16161a]/95 backdrop-blur-xl border border-white/10 shadow-2xl text-xs text-white animate-fadeIn"
          >
            {toast.type === 'error' ? (
              <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-400 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-[#c5a880] shrink-0" />
            )}
            <span className="font-sans">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
