import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import EyewearPreview from '../components/EyewearPreview';
import { ArrowLeft, Camera, Check, ScanFace, Upload, X } from 'lucide-react';

const FRAME_PATHS = {
  aviator: 'M 28 44 C 78 20 173 20 224 43 C 218 106 190 153 130 158 C 72 156 40 111 28 44 Z',
  'cat-eye': 'M 28 52 C 83 27 167 26 222 47 C 211 99 191 151 132 154 C 74 152 42 112 28 52 Z',
  geometric: 'M 39 29 L 194 29 L 224 61 L 214 126 L 174 153 L 71 151 L 31 112 Z',
  square: 'M 39 29 Q 31 29 30 39 L 27 125 Q 27 150 51 151 L 189 148 Q 218 147 219 124 L 222 49 Q 222 29 202 29 Z',
  round: 'M 124 25 C 185 25 222 55 222 91 C 222 127 184 155 124 155 C 63 155 28 126 28 90 C 28 54 64 25 124 25 Z',
};
function GlassesOverlay({ product, frameColor }) {
  const framePath = FRAME_PATHS[product.shape] || FRAME_PATHS.round;

  return (
    <svg viewBox="0 0 500 180" className="pointer-events-none h-auto w-full overflow-visible" aria-hidden="true">
      <defs>
        <linearGradient id="tryon-lens" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#66786b" stopOpacity="0.58" />
          <stop offset="1" stopColor="#1b2420" stopOpacity="0.74" />
        </linearGradient>
        <filter id="tryon-shadow" x="-20%" y="-30%" width="140%" height="170%">
          <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.48" />
        </filter>
      </defs>
      <g filter="url(#tryon-shadow)" strokeLinejoin="round" strokeLinecap="round">
        <path d={framePath} fill="url(#tryon-lens)" stroke={frameColor} strokeWidth="10" />
        <path d={framePath} transform="translate(500 0) scale(-1 1)" fill="url(#tryon-lens)" stroke={frameColor} strokeWidth="10" />
        <path d="M 224 54 C 239 43 261 43 276 54 L 274 66 C 258 59 242 59 226 66 Z" fill={frameColor} />
        <path d="M 29 47 L 7 39 Q 1 38 0 45 L 2 52 L 29 61" fill="none" stroke={frameColor} strokeWidth="10" />
        <path d="M 471 47 L 493 39 Q 499 38 500 45 L 498 52 L 471 61" fill="none" stroke={frameColor} strokeWidth="10" />
        <path d="M 42 42 Q 88 27 136 31" fill="none" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="4" />
        <path d="M 458 42 Q 412 27 364 31" fill="none" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="4" />
      </g>
    </svg>
  );
}

export default function VirtualTryOn() {
  const { selectedProductId, setSelectedProductId, navigateTo } = useStore();
  const [photo, setPhoto] = useState(null);
  const [faceFit, setFaceFit] = useState(null);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [availableWidth, setAvailableWidth] = useState(() => typeof window === 'undefined' ? 820 : Math.min(820, window.innerWidth - 32));
  const [viewportHeight, setViewportHeight] = useState(() => typeof window === 'undefined' ? 900 : window.innerHeight);
  const fileInputRef = useRef(null);
  const previewSectionRef = useRef(null);
  const landmarkerRef = useRef(null);
  const objectUrlRef = useRef(null);

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedProductId) || PRODUCTS[0];
  const frameColor = selectedProduct.colors[0]?.hex || '#c5a880';
  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    landmarkerRef.current?.close();
  }, []);

  useEffect(() => {
    const container = previewSectionRef.current;
    if (!container) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => {
      setAvailableWidth(Math.min(820, entry.contentRect.width));
    });
    resizeObserver.observe(container);

    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getLandmarker = async () => {
    if (landmarkerRef.current) return landmarkerRef.current;

    const { FaceLandmarker, FilesetResolver } = await import('@mediapipe/tasks-vision');
    const vision = await FilesetResolver.forVisionTasks('https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.1/wasm');
    const options = {
      baseOptions: { modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task' },
      runningMode: 'IMAGE',
      numFaces: 1,
      minFaceDetectionConfidence: 0.45,
      minFacePresenceConfidence: 0.45,
    };

    try {
      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        ...options,
        baseOptions: { ...options.baseOptions, delegate: 'GPU' },
      });
    } catch (gpuError) {
      console.warn('GPU face detection unavailable, falling back to CPU:', gpuError);
      landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
        ...options,
        baseOptions: { ...options.baseOptions, delegate: 'CPU' },
      });
    }

    return landmarkerRef.current;
  };

  const handlePhoto = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setStatus('error');
      setMessage('JPG, PNG veya WEBP fotoğraf yükle. HEIC dosyalarını desteklemiyoruz.');
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setStatus('error');
      setMessage('Fotoğraf en fazla 15 MB olabilir.');
      return;
    }

    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const objectUrl = URL.createObjectURL(file);
    objectUrlRef.current = objectUrl;
    setPhoto(null);
    setFaceFit(null);
    setMessage('');
    setStatus('loading');

    const image = new Image();
    image.onload = async () => {
      setPhoto({ url: objectUrl, width: image.naturalWidth, height: image.naturalHeight });

      try {
        const landmarker = await getLandmarker();
        const result = landmarker.detect(image);
        const landmarks = result.faceLandmarks?.[0];
        if (!landmarks) {
          setFaceFit(null);
          setStatus('no-face');
          setMessage('Yüz bulunamadı. Yüzün net göründüğü, karşıdan çekilmiş bir selfie yükle.');
          return;
        }

        const midpoint = (first, second) => ({ x: (first.x + second.x) / 2, y: (first.y + second.y) / 2 });
        const leftEye = midpoint(landmarks[33], landmarks[133]);
        const rightEye = midpoint(landmarks[362], landmarks[263]);
        const distance = Math.hypot(rightEye.x - leftEye.x, rightEye.y - leftEye.y);
        setFaceFit({
          x: ((leftEye.x + rightEye.x) / 2) * 100,
          y: ((leftEye.y + rightEye.y) / 2) * 100,
          eyeDistance: distance,
          rotation: Math.atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x) * (180 / Math.PI),
        });
        setStatus('ready');
      } catch (error) {
        console.error('Face landmark detection failed:', error);
        setStatus('error');
        setMessage('Yüz hizalama modeli yüklenemedi. Bağlantını kontrol edip tekrar dene; fotoğrafın cihazında kalır.');
      }
    };
    image.onerror = () => {
      setStatus('error');
      setMessage('Fotoğraf çözümlenemedi. JPG, PNG veya WEBP dosyası dene.');
    };
    image.src = objectUrl;
    event.target.value = '';
  };

  const clearPhoto = () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setPhoto(null);
    setFaceFit(null);
    setStatus('idle');
    setMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const shapeScale = { aviator: 1.04, 'cat-eye': 1.02, geometric: 1, square: 1.06, round: 0.96 }[selectedProduct.shape] || 1;
  const fitStyle = faceFit ? {
    left: `${faceFit.x}%`,
    top: `${faceFit.y}%`,
    width: `${Math.min(70, Math.max(22, faceFit.eyeDistance * 2.2 * shapeScale * 100))}%`,
    transform: `translate(-50%, -50%) rotate(${faceFit.rotation}deg)`,
  } : undefined;
  const photoAspect = photo ? photo.width / photo.height : 1;
  const previewHeight = Math.min(viewportHeight * 0.68, 560);
  const previewWidth = photo
    ? Math.min(availableWidth, 820, previewHeight * photoAspect)
    : 0;

  return (
    <main className="min-h-screen bg-[#e9eeec] px-4 pb-20 pt-28 text-[#151a18] sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <section>
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#e45b44]">ACM / SANA GÖRE</p>
            <h1 className="mt-4 font-serif text-4xl leading-[0.98] sm:text-6xl">
              Gözlüğü<br /><span className="italic text-[#49685a]">üzerinde gör.</span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#58615d]">
              Denemek istediğin çerçeveyi seç, bir selfie yükle.
            </p>

            <div className="mt-9 border-t border-[#151a18]/20">
              <div className="flex items-center justify-between py-4">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.18em]">Çerçeve seç</h2>
                <span className="font-mono text-[9px] text-[#718078]">{PRODUCTS.length} MODEL</span>
              </div>
              <div className="max-h-[360px] overflow-y-auto border-t border-[#151a18]/15">
                {PRODUCTS.map((product, index) => (
                  <button
                    key={product.id}
                    onClick={() => setSelectedProductId(product.id)}
                    aria-pressed={selectedProduct.id === product.id}
                    className={`grid w-full grid-cols-[30px_1fr_auto] items-center gap-3 border-b border-[#151a18]/15 py-4 text-left transition-colors ${selectedProduct.id === product.id ? 'bg-[#d8ef70]/55' : 'hover:bg-white/50'}`}
                  >
                    <span className="font-mono text-[9px] text-[#e45b44]">0{index + 1}</span>
                    <span>
                      <span className="block font-serif text-lg leading-tight">{product.name}</span>
                      <span className="mt-1 block text-[10px] text-[#718078]">{product.shapeName} · {product.categoryName}</span>
                    </span>
                    {selectedProduct.id === product.id ? <Check className="h-4 w-4 text-[#49685a]" /> : <ArrowLeft className="h-4 w-4 rotate-180 text-[#a2aaa5]" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <label className="inline-flex min-h-12 cursor-pointer items-center gap-2 bg-[#151a18] px-5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#e45b44]">
                <Upload className="h-4 w-4" /> Önden selfie yükle
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" onChange={handlePhoto} className="sr-only" />
              </label>
              {photo && <button onClick={clearPhoto} className="inline-flex h-12 w-12 items-center justify-center border border-[#151a18]/25 transition-colors hover:bg-white" title="Fotoğrafı kaldır" aria-label="Fotoğrafı kaldır"><X className="h-4 w-4" /></button>}
            </div>

            {status === 'loading' && <p className="mt-3 flex items-center gap-2 text-xs text-[#53615a]"><ScanFace className="h-4 w-4 animate-pulse" /> Yüz hizası bulunuyor…</p>}
            {status === 'ready' && <p className="mt-3 flex items-center gap-2 text-xs text-[#49685a]"><Check className="h-4 w-4" /> Yapay zekâ çerçeveyi yüzüne hizaladı.</p>}
            {message && <p className="mt-3 max-w-md text-xs leading-relaxed text-[#a44836]">{message}</p>}

          </section>

          <section ref={previewSectionRef} className="min-w-0">
            <div className="mb-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#718078]">{selectedProduct.categoryName} / {selectedProduct.shapeName}</p>
                <h2 className="mt-1 font-serif text-2xl">{selectedProduct.name}</h2>
              </div>
              <button onClick={() => navigateTo('pdp', selectedProduct.id)} className="shrink-0 border-b border-[#151a18]/40 pb-1 font-mono text-[9px] uppercase tracking-[0.1em] transition-colors hover:border-[#e45b44] hover:text-[#e45b44]">Ürünü gör</button>
            </div>

            {photo ? (
              <div className="relative mx-auto overflow-hidden bg-[#151a18]" style={{ width: previewWidth, height: previewWidth / photoAspect, maxHeight: previewHeight }}>
                <img src={photo.url} alt="Yüklenen selfie" className="absolute inset-0 h-full w-full object-fill" />
                {faceFit && <div className="absolute z-10" style={fitStyle}><GlassesOverlay product={selectedProduct} frameColor={frameColor} /></div>}
                <span className="absolute bottom-3 left-3 z-20 bg-black/60 px-2.5 py-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white">{status === 'ready' ? 'AI FIT / TAMAM' : status === 'loading' ? 'YÜZ ANALİZİ' : 'YÜZ ALGILANAMADI'}</span>
              </div>
            ) : (
              <div className="relative flex min-h-[300px] flex-col items-center justify-center gap-4 overflow-hidden bg-[#151a18] px-5 text-center sm:min-h-[420px]">
                <div className="absolute inset-0 opacity-25" style={{ background: `radial-gradient(ellipse at 50% 45%, ${frameColor}, transparent 55%)` }} />
                <EyewearPreview product={selectedProduct} frameColor={frameColor} className="absolute inset-0 h-full w-full" />
                <div className="relative z-10 max-w-xs bg-[#151a18]/75 px-5 py-4 text-white backdrop-blur-sm">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#d8ef70]">ÖN / SELFIE GEREKLİ</span>
                  <p className="mt-2 font-serif text-xl">Önden bir selfie yükle.</p>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between border-t border-[#151a18]/15 pt-3 text-[10px] text-[#718078]">
              <span className="flex items-center gap-2"><Camera className="h-3.5 w-3.5" /> Fotoğraf cihazında işlenir</span>
              {photo && <span className="uppercase tracking-[0.1em]">{selectedProduct.shapeName} / Otomatik ölçü</span>}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}