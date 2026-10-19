export const PRODUCTS = [
  {
    id: "acm-elysian-01",
    name: "Elysian Grand Aviator",
    subname: "24K Altın Kaplama & Zeiss Polarize",
    category: "sunglasses",
    categoryName: "Güneş Gözlüğü",
    gender: "unisex",
    genderName: "Unisex",
    shape: "aviator",
    shapeName: "Aviator",
    priceTRY: 16500,
    priceEUR: 430,
    priceUSD: 465,
    rating: 4.95,
    reviewsCount: 64,
    badge: "İkonik Seri",
    isLimited: false,
    tagline: "Havacılık mirasının çağdaş lüks ile kusursuz buluşması.",
    description: "Sabae (Japonya) zanaatkârları tarafından 200'den fazla el işçiliği adımıyla şekillendirilen Elysian Grand Aviator, ultra hafif Beta Titanyum iskeleti ve 24 ayar fırçalanmış altın kaplama detaylarıyla zamansız bir silüet sunar. Carl Zeiss Precision polarize camları parlamayı sıfırlarken üstün kontrast sağlar.",
    colors: [
      { name: "24K Fırçalanmış Altın & Zümrüt Yeşil", hex: "#c5a880", class: "bg-[#c5a880]" },
      { name: "Obsidian Siyah & Füme Polarize", hex: "#18181b", class: "bg-[#18181b]" },
      { name: "Platin Gümüş & Safir Mavi", hex: "#94a3b8", class: "bg-[#94a3b8]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1473496169904-658ba7574b0d?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "54 mm",
      bridge: "18 mm",
      temple: "145 mm",
      weight: "16.8 gr",
      material: "Japon Beta-Titanyumu & 24K Altın Kaplama",
      lensTech: "Carl Zeiss Precision Polarized UV400",
      origin: "Sabae, Fukui — Japonya",
      hinges: "Özel 5 Dişli Vidalanmış Titanyum Menteşe"
    }
  },
  {
    id: "acm-chronos-02",
    name: "Chronos Geometrique",
    subname: "Mazzucchelli 1849 Asetat & Titanyum Çekirdek",
    category: "optical",
    categoryName: "Optik / Numaralı",
    gender: "men",
    genderName: "Erkek",
    shape: "geometric",
    shapeName: "Geometrik",
    priceTRY: 14200,
    priceEUR: 370,
    priceUSD: 400,
    rating: 4.88,
    reviewsCount: 39,
    badge: "Yeni Sezon",
    isLimited: false,
    tagline: "Mimari hatlar ve keskin köşeli fütüristik minimalizm.",
    description: "İtalya'nın Varese kentinde Mazzucchelli atölyesinde geleneksel yöntemlerle 8 ay kürlenen organik selüloz asetattan yontulmuştur. İç kısımdaki tel çekirdek özel lazer motifleriyle işlenmiştir. Gün boyu burunda ağırlık hissi yaratmayan ergonomik burun pedleri ile donatılmıştır.",
    colors: [
      { name: "Koyu Amber Tortoise", hex: "#78350f", class: "bg-[#78350f]" },
      { name: "Piyano Lake Siyah", hex: "#0a0a0a", class: "bg-[#0a0a0a]" },
      { name: "Buzul Kristal Şeffaf", hex: "#cbd5e1", class: "bg-[#cbd5e1]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1556306535-38febf6cdbe0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1529465230221-a0d10e46fcbb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1486334316916-4fdc4581c6b9?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "50 mm",
      bridge: "20 mm",
      temple: "145 mm",
      weight: "22.4 gr",
      material: "Mazzucchelli 1849 Doğal Selüloz Asetat",
      lensTech: "Zeiss DuraVision® BlueProtect Demo Cam",
      origin: "Cadore Valley — İtalya",
      hinges: "Alman OBE Yaylı Çift Menteşe"
    }
  },
  {
    id: "acm-solaris-03",
    name: "Solaris Aurelia",
    subname: "Sınırlı Üretim (No. 47 / 150) Titanyum & PVD",
    category: "limited",
    categoryName: "Sınırlı Üretim",
    gender: "women",
    genderName: "Kadın",
    shape: "cat-eye",
    shapeName: "Cat-Eye",
    priceTRY: 24500,
    priceEUR: 640,
    priceUSD: 690,
    rating: 5.0,
    reviewsCount: 22,
    badge: "Limited Edition (150 Adet)",
    isLimited: true,
    edition: "Özel Seri No: 47 / 150",
    tagline: "Yüksek modanın ve kedi gözü feminenliğinin heykelimsi yorumu.",
    description: "Sadece 150 adet numaralandırılarak üretilen Solaris Aurelia, dramatik kedi gözü hatlarını fırçalanmış şampanya titanyumu ile buluşturur. Her bir gözlüğün iç sapına seri numarası elmas uçla kazınmıştır. Carl Zeiss degrade altın ayna kaplamalı mercekler ile donatılmıştır.",
    colors: [
      { name: "Şampanya Titanyum & Pembe Degrade", hex: "#dfc8a5", class: "bg-[#dfc8a5]" },
      { name: "Gece Mavisi & Altın Vurgu", hex: "#1e293b", class: "bg-[#1e293b]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1616091216791-a5360b5c91dd?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "53 mm",
      bridge: "17 mm",
      temple: "140 mm",
      weight: "15.2 gr",
      material: "Japon Havacılık Sınıfı Saf Titanyum (Grade 5)",
      lensTech: "Carl Zeiss Flash Gold Gradient Lens",
      origin: "Sabae — Japonya",
      hinges: "Entegre Monoblok Vida Sistemi"
    }
  },
  {
    id: "acm-nocturne-04",
    name: "Nocturne Minimal Round",
    subname: "Çerçevesiz Hafiflik & Saf Silindirik Titanyum",
    category: "titanium",
    categoryName: "Titanyum Koleksiyonu",
    gender: "unisex",
    genderName: "Unisex",
    shape: "round",
    shapeName: "Yuvarlak",
    priceTRY: 15800,
    priceEUR: 410,
    priceUSD: 445,
    rating: 4.92,
    reviewsCount: 51,
    badge: "Ultra Hafif (12 gr)",
    isLimited: false,
    tagline: "Yüzünüzde yokmuş hissi veren kusursuz yuvarlak hatlar.",
    description: "Sadece 12 gram ağırlığındaki Nocturne Minimal Round, entelektüel sadeliği temsil eder. Vidasız menteşe mekanizması mekanik aşınmayı önler. Reçeteli numaralı camlar için en çok tercih edilen tescilli silüetimizdir.",
    colors: [
      { name: "Antrasit Titanyum", hex: "#3f3f46", class: "bg-[#3f3f46]" },
      { name: "Mat Ham Titanyum Gri", hex: "#71717a", class: "bg-[#71717a]" },
      { name: "Rose Gold Parlak Titanyum", hex: "#fda4af", class: "bg-[#fda4af]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1616697494540-4f56cb4a83f0?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1532073150508-0c1df022bdd1?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "48 mm",
      bridge: "21 mm",
      temple: "145 mm",
      weight: "12.1 gr",
      material: "Sabae Saf Beta Titanyum",
      lensTech: "Zeiss LotuTec® Yansıma Engelleyici Kaplama",
      origin: "Fukui — Japonya",
      hinges: "Vidasız Esnek Yaylı Titanyum Blok"
    }
  },
  {
    id: "acm-vanguard-05",
    name: "Vanguard Bold Square",
    subname: "10mm Kalın Asetat Blok & El Parlatması",
    category: "sunglasses",
    categoryName: "Güneş Gözlüğü",
    gender: "men",
    genderName: "Erkek",
    shape: "square",
    shapeName: "Kare",
    priceTRY: 17200,
    priceEUR: 450,
    priceUSD: 485,
    rating: 4.96,
    reviewsCount: 73,
    badge: "Çok Satan",
    isLimited: false,
    tagline: "Güçlü çene ve karakter hatlarını vurgulayan maskülen silüet.",
    description: "10 milimetrelik yekpare Mazzucchelli asetat bloğundan oyulan Vanguard, 72 saat süren tambur cilası ve elle parlatma aşamalarıyla ayna pürüzsüzlüğüne kavuşur. Koyu zümrüt Zeiss camları UV ışınlarına karşı %100 tam koruma sunar.",
    colors: [
      { name: "Koyu Havanna & Zümrüt Cam", hex: "#451a03", class: "bg-[#451a03]" },
      { name: "Katran Siyahı & Siyah Füme", hex: "#09090b", class: "bg-[#09090b]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1577083552323-d3f332866e12?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "52 mm",
      bridge: "22 mm",
      temple: "150 mm",
      weight: "28.5 gr",
      material: "10mm Ham Mazzucchelli Selüloz Asetat",
      lensTech: "Carl Zeiss Mineral Crystal Green UV400",
      origin: "Belluno — İtalya",
      hinges: "7 Boğumlu Güçlendirilmiş Çelik Menteşe"
    }
  },
  {
    id: "acm-astrid-06",
    name: "Astrid Fine Silhouette",
    subname: "Minimalist Geometrik Optik & Gül Altın Vurgu",
    category: "optical",
    categoryName: "Optik / Numaralı",
    gender: "women",
    genderName: "Kadın",
    shape: "geometric",
    shapeName: "Geometrik",
    priceTRY: 13900,
    priceEUR: 360,
    priceUSD: 390,
    rating: 4.87,
    reviewsCount: 31,
    badge: "Zarif Çizgiler",
    isLimited: false,
    tagline: "Yüz hatlarını yumuşatan sekizgen geometrik zarafet.",
    description: "İnce işlenmiş titanyum tel profil ve seramik burun pedleri ile donatılmış Astrid, optik reçeteli gözlük kullananlar için hem estetik hem de ultra konforlu bir deneyim vadeder.",
    colors: [
      { name: "Saten Rose Altın", hex: "#f43f5e", class: "bg-[#f43f5e]" },
      { name: "Açık Şampanya", hex: "#fde68a", class: "bg-[#fde68a]" },
      { name: "Fırçalanmış Paladyum", hex: "#9ca3af", class: "bg-[#9ca3af]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1583759136431-fc0c29873aaa?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "49 mm",
      bridge: "19 mm",
      temple: "142 mm",
      weight: "13.6 gr",
      material: "Japon Titanyumu & Hipoalerjenik Seramik",
      lensTech: "Zeiss ClearView® Asferik Tasarım Hazırlığı",
      origin: "Sabae — Japonya",
      hinges: "Mikro Vida Kilitlemeli Titanyum Mafsal"
    }
  },
  {
    id: "acm-aerolith-07",
    name: "Aerolith Matte Black",
    subname: "Karbon Fiber & Havacılık Titanyumu Hibrit",
    category: "titanium",
    categoryName: "Titanyum Koleksiyonu",
    gender: "men",
    genderName: "Erkek",
    shape: "square",
    shapeName: "Kare",
    priceTRY: 19800,
    priceEUR: 515,
    priceUSD: 560,
    rating: 4.98,
    reviewsCount: 45,
    badge: "Yüksek Teknoloji",
    isLimited: false,
    tagline: "Karbon lifleri ve uzay teknolojisi titanyum alaşımı.",
    description: "Formula 1 teknolojisinden ilham alan karbon lifi saplar ve saf titanyum ön gövde. Yüksek mukavemet, sıfır esneme deformasyonu ve kusursuz mat siyah kaplama.",
    colors: [
      { name: "Mat Stealth Siyah", hex: "#18181b", class: "bg-[#18181b]" },
      { name: "Grafit Karbon & Gümüş", hex: "#52525b", class: "bg-[#52525b]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1575324870362-23c87a04ae8e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "55 mm",
      bridge: "17 mm",
      temple: "145 mm",
      weight: "14.9 gr",
      material: "3K Karbon Fiber & Ti-6Al-4V Grade 5 Titanyum",
      lensTech: "Zeiss Polarized Skylet® Road Kontrast Artırıcı",
      origin: "Japonya & İsviçre Hassas Mühendislik",
      hinges: "Entegre Vidalı Çift Kamalı Menteşe"
    }
  },
  {
    id: "acm-lumina-08",
    name: "Lumina Vintage Oval",
    subname: "1920s Art Deco Revival & Fildişi Asetat",
    category: "sunglasses",
    categoryName: "Güneş Gözlüğü",
    gender: "unisex",
    genderName: "Unisex",
    shape: "round",
    shapeName: "Yuvarlak",
    priceTRY: 15400,
    priceEUR: 400,
    priceUSD: 435,
    rating: 4.91,
    reviewsCount: 57,
    badge: "Retro Haute",
    isLimited: false,
    tagline: "Altın çağın entelektüel cazibesi, bugünün konforuyla.",
    description: "1920'lerin klasik optik salonlarından ilham alan Lumina Vintage Oval, fildişi ve sıcak bal tonlarında organik asetatı ince altın detaylarla bir araya getirir.",
    colors: [
      { name: "Sıcak Bal Asetat & Degrade Kahve", hex: "#b45309", class: "bg-[#b45309]" },
      { name: "Opak Fildişi Krem", hex: "#fef3c7", class: "bg-[#fef3c7]" }
    ],
    images: [
      "https://images.unsplash.com/photo-1492288991661-058aa541af89?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1605991839849-15b1ebdb4e54?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=90"
    ],
    specs: {
      lensWidth: "47 mm",
      bridge: "23 mm",
      temple: "145 mm",
      weight: "20.1 gr",
      material: "Mazzucchelli Bio-Asetat & Paslanmaz Çelik Çekirdek",
      lensTech: "Carl Zeiss Warm Bronze UV400",
      origin: "Cadore — İtalya",
      hinges: "Klasik 5 Boğumlu Gravürlü Menteşe"
    }
  }
];

export const LENS_OPTIONS = [
  {
    id: "standard",
    title: "Numarasız Standart UV400 / Güneş Camı",
    description: "Reçetesiz kullanım, %100 UV400 koruma ve Carl Zeiss çizilmez sert kaplama.",
    priceTRY: 0,
    priceEUR: 0,
    priceUSD: 0,
    requiresPrescription: false
  },
  {
    id: "single-vision",
    title: "Numaralı Tek Odaklı Cam (Miyop / Hipermetrop)",
    description: "Uzak veya yakın net görüş için kişiye özel üretim Carl Zeiss ClearView® asferik cam.",
    priceTRY: 2850,
    priceEUR: 75,
    priceUSD: 80,
    requiresPrescription: true
  },
  {
    id: "progressive",
    title: "Progresif Çok Odaklı (Uzak + Yakın Hibrit)",
    description: "Tek bir camda uzak, orta mesafe ve yakın okuma alanlarını birleştiren akıllı optik teknoloji.",
    priceTRY: 6200,
    priceEUR: 160,
    priceUSD: 175,
    requiresPrescription: true
  }
];

export const LENS_COATINGS = [
  {
    id: "standard-anti-glare",
    title: "Zeiss DuraVision® Antirefle & Hidrofobik",
    description: "Yansıma önleyici, su ve toz tutmayan, kolay temizlenen tescilli kaplama.",
    priceTRY: 0,
    priceEUR: 0,
    priceUSD: 0
  },
  {
    id: "blue-protect",
    title: "BlueProtect® Dijital Ekran & Mavi Işık Kalkanı",
    description: "Bilgisayar, telefon ve LED ışık kaynaklarının zararlı mavi-mor ışınlarını filtreler.",
    priceTRY: 1100,
    priceEUR: 30,
    priceUSD: 32
  },
  {
    id: "transitions",
    title: "Transitions® Signature GEN 8 (Fotokromik Güneşte Kararan)",
    description: "İç mekanda berrak, güneş ışığında saniyeler içinde koyulaşan akıllı akışkan moleküller.",
    priceTRY: 2950,
    priceEUR: 78,
    priceUSD: 85
  }
];

export const BRAND_STORY = {
  founded: 2026,
  cities: ["İstanbul", "Sabae", "Cadore"],
  craftsmanshipPoints: [
    {
      title: "Japon Titanyum İşçiliği",
      desc: "Japonya'nın Fukui eyaletindeki Sabae atölyelerinde nesillerdir aktarılan yöntemlerle şekillendirilen saf Beta Titanyum gövdeler."
    },
    {
      title: "Mazzucchelli 1849 Asetatı",
      desc: "İtalya'da pamuk lifleri ve organik selülozdan 8 ay dinlendirilerek üretilen sürdürülebilir biyo-asetat kalıpları."
    },
    {
      title: "Carl Zeiss Optik Mükemmellik",
      desc: "Optik cam dünyasının referans standardı Zeiss Precision lensler ile sıfır distorsiyon ve kusursuz renk berraklığı."
    },
    {
      title: "Kişiye Özel Optisyen Danışmanlığı",
      desc: "Uzman optometrist ve optisyenlerimiz siparişinizi inceleyerek cam montajını mikron hassasiyetiyle atölyemizde gerçekleştirir."
    }
  ]
};
