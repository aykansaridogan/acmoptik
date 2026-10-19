import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  Menu, 
  X, 
  ChevronDown, 
  ShieldCheck, 
  PhoneCall,
  Glasses
} from 'lucide-react';

export default function Navbar() {
  const { 
    navigateTo, 
    currentPage, 
    totalCartCount, 
    cartTotalTRY,
    cartTotalEUR,
    cartTotalUSD,
    currency, 
    setCurrency, 
    formatPrice,
    setIsCartOpen, 
    setIsSearchOpen,
    wishlist 
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ana Sayfa', page: 'home' },
    { label: 'Koleksiyonlar', page: 'shop' },
    { label: 'Güneş Gözlüğü', page: 'shop', category: 'sunglasses' },
    { label: 'Optik Çerçeveler', page: 'shop', category: 'optical' },
    { label: 'Titanyum Serisi', page: 'shop', category: 'titanium' },
    { label: 'Sanal Deneme', page: 'try-on' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="bg-[#d8ef70] text-[#151a18]">
        <div className="mx-auto flex h-7 max-w-[1440px] items-center justify-between px-4 sm:px-8 lg:px-12">
          <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em]">
            ACM / ATELIER 2026
          </span>
          <span className="hidden sm:block font-mono text-[9px] uppercase tracking-[0.12em]">
            5.000 ₺ üzeri siparişlerde ücretsiz sigortalı gönderim
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em]">İstanbul · Nişantaşı</span>
        </div>
      </div>

      <nav className={`border-b px-4 sm:px-8 lg:px-12 transition-all duration-300 ${isScrolled
          ? 'border-white/10 bg-[#101310]/95 py-3 shadow-xl backdrop-blur-xl'
          : 'border-white/10 bg-[#09090b]/75 py-4 backdrop-blur-md'
        }`}>
        <div className="mx-auto grid max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex min-w-0 items-center">
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-10 w-10 items-center justify-center text-[#f4f2ec] transition-colors hover:text-[#d8ef70] xl:hidden"
              aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <div className="hidden items-center gap-5 xl:flex">
              {navLinks.filter((link) => link.page !== 'try-on').map((link) => {
                const isActive = currentPage === 'home'
                  ? link.page === 'home'
                  : currentPage === 'shop' && link.label === 'Koleksiyonlar';

                return (
                  <button
                    key={link.label}
                    onClick={() => navigateTo(link.page)}
                    className={`group relative whitespace-nowrap py-3 font-mono text-[9px] font-medium uppercase tracking-[0.13em] transition-colors ${isActive ? 'text-[#d8ef70]' : 'text-white/65 hover:text-white'}`}
                  >
                    {link.label}
                    <span className={`absolute bottom-1 left-0 h-px bg-[#d8ef70] transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="group flex items-center justify-center gap-2.5 justify-self-center text-left"
            aria-label="ACM Optik ana sayfa"
          >
            <span className="hidden h-9 w-9 items-center justify-center border border-[#c5a880]/70 font-serif text-xl text-[#d8ef70] transition-colors group-hover:bg-[#d8ef70] group-hover:text-[#151a18] sm:flex">
              A
            </span>
            <span className="flex flex-col items-center sm:items-start">
              <span className="font-serif text-lg font-medium tracking-[0.18em] text-[#f4f2ec] transition-colors group-hover:text-[#d8ef70] sm:text-xl">
                ACM OPTİK
              </span>
              <span className="mt-0.5 whitespace-nowrap font-mono text-[7px] uppercase tracking-[0.22em] text-white/45">
                Haute Lunetterie · İstanbul
              </span>
            </span>
          </button>

          <div className="flex items-center justify-self-end">
            <button
              onClick={() => navigateTo('try-on')}
              className={`mr-1 flex h-10 items-center justify-center gap-1.5 px-2 text-[9px] font-semibold uppercase tracking-[0.1em] transition-colors sm:mr-2 sm:px-2.5 ${currentPage === 'try-on' ? 'text-[#d8ef70]' : 'text-white/70 hover:text-[#d8ef70]'}`}
              aria-label="Sanal deneme"
              title="Gözlüğü üzerinde dene"
            >
              <Glasses className="h-[18px] w-[18px]" />
              <span className="hidden sm:inline">Dene</span>
            </button>

            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyDropdownOpen((open) => !open)}
                className="flex h-9 items-center gap-1.5 px-2.5 font-mono text-[10px] text-white/70 transition-colors hover:text-[#d8ef70]"
                aria-label={`Para birimi: ${currency}`}
                aria-expanded={currencyDropdownOpen}
              >
                {currency}<ChevronDown className="h-3 w-3" />
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-28 border border-white/10 bg-[#151a18] py-1 shadow-xl">
                  {['TRY', 'EUR', 'USD'].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setCurrency(item);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left font-mono text-[10px] transition-colors hover:bg-white/5 ${currency === item ? 'text-[#d8ef70]' : 'text-white/65'}`}
                    >
                      {item === 'TRY' ? '₺ TRY' : item === 'EUR' ? '€ EUR' : '$ USD'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="mx-1 hidden h-5 w-px bg-white/15 sm:block" />

            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-[#d8ef70]"
              aria-label="Arama"
              title="Koleksiyonda Ara"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="relative hidden h-10 w-10 items-center justify-center text-white/70 transition-colors hover:text-[#d8ef70] sm:flex"
              aria-label="Favoriler"
              title="Favoriler"
            >
              <Heart className="h-[18px] w-[18px]" />
              {wishlist.length > 0 && <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e45b44] px-1 font-mono text-[9px] text-white">{wishlist.length}</span>}
            </button>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 items-center gap-2 pl-2.5 pr-1 text-white/80 transition-colors hover:text-[#d8ef70]"
              aria-label="Alışveriş Sepeti"
              title="Alışveriş Sepeti"
            >
              <span className="relative flex h-8 w-8 items-center justify-center border border-white/15">
                <ShoppingBag className="h-[17px] w-[17px]" />
                {totalCartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d8ef70] px-1 font-mono text-[9px] font-bold text-[#151a18]">{totalCartCount}</span>}
              </span>
              <span className="hidden font-mono text-[10px] text-white/60 2xl:block">
                {formatPrice(cartTotalTRY, cartTotalEUR, cartTotalUSD)}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-x-0 bottom-0 top-[103px] z-30 flex flex-col overflow-y-auto border-t border-white/10 bg-[#101310] px-6 py-7 shadow-2xl animate-fadeIn xl:hidden">
          <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.24em] text-[#d8ef70]">ACM / ATELIER / MENÜ</p>
          <div className="flex flex-col">
            {navLinks.map((link, index) => (
              <button
                key={link.label}
                onClick={() => {
                  navigateTo(link.page);
                  setMobileMenuOpen(false);
                }}
                className="group flex items-center gap-4 border-b border-white/10 py-4 text-left"
              >
                <span className="font-mono text-[10px] text-[#e45b44]">0{index + 1}</span>
                <span className="flex-1 font-serif text-2xl text-white/85 transition-colors group-hover:text-[#d8ef70]">{link.label}</span>
                <span className="font-serif text-xl text-white/35 transition-colors group-hover:text-[#d8ef70]">↗</span>
              </button>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto] items-center gap-4 border-b border-white/10 pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/50">Para birimi</span>
            <div className="flex items-center border border-white/15 p-1">
              {['TRY', 'EUR', 'USD'].map((item) => (
                <button
                  key={item}
                  onClick={() => setCurrency(item)}
                  className={`px-3 py-1.5 font-mono text-[10px] transition-colors ${currency === item ? 'bg-[#d8ef70] text-[#151a18]' : 'text-white/60 hover:text-white'}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8 text-xs text-white/55">
            <a href="tel:+902128402026" className="flex items-center gap-3 transition-colors hover:text-[#d8ef70]">
              <PhoneCall className="h-4 w-4 text-[#d8ef70]" />
              <span>VIP Optisyen Hattı: +90 (212) 840 20 26</span>
            </a>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-[#d8ef70]" />
              <span>Tescilli Carl Zeiss & Mazzucchelli Orijinallik</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
