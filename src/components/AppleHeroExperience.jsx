import React, { useState, useEffect, useRef } from 'react';
import { RotateCw, Layers } from 'lucide-react';

const TINT_STYLES = {
  gold: { name: '24K Şampanya', hex: '#c5a880', glow: 'rgba(197, 168, 128, 0.2)' },
  obsidian: { name: 'Obsidian', hex: '#18181b', glow: 'rgba(100, 100, 120, 0.15)' },
  emerald: { name: 'Zümrüt', hex: '#10b981', glow: 'rgba(16, 185, 129, 0.2)' },
  sapphire: { name: 'Safir', hex: '#3b82f6', glow: 'rgba(59, 130, 246, 0.2)' }
};

function createLensShape(THREE) {
  const shape = new THREE.Shape();
  shape.moveTo(-0.58, 0.23);
  shape.bezierCurveTo(-0.52, 0.43, -0.23, 0.47, 0.08, 0.43);
  shape.bezierCurveTo(0.4, 0.41, 0.58, 0.29, 0.57, 0.08);
  shape.bezierCurveTo(0.56, -0.2, 0.39, -0.4, 0.12, -0.4);
  shape.bezierCurveTo(-0.2, -0.42, -0.49, -0.31, -0.56, -0.11);
  shape.bezierCurveTo(-0.62, 0.02, -0.6, 0.16, -0.58, 0.23);
  shape.closePath();
  return shape;
}

function addFrameOutline(THREE, parent, shape, material, radius, z) {
  const points = shape.getPoints(80).map((point) => new THREE.Vector3(point.x, point.y, z));
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
  const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 128, radius, 10, true), material);
  parent.add(mesh);
}

function buildGlasses(THREE, initialTint) {
  const model = new THREE.Group();
  const frameGroup = new THREE.Group();
  const lensGroup = new THREE.Group();
  const shape = createLensShape(THREE);
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: '#241c16',
    metalness: 0.72,
    roughness: 0.22,
    clearcoat: 1,
    clearcoatRoughness: 0.12,
  });
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: '#c5a880',
    metalness: 0.88,
    roughness: 0.2,
  });
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: initialTint,
    metalness: 0.12,
    roughness: 0.12,
    transparent: true,
    opacity: 0.68,
    transmission: 0.12,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  [-0.66, 0.66].forEach((x) => {
    const lens = new THREE.Mesh(new THREE.ShapeGeometry(shape, 32), lensMaterial);
    lens.position.set(x, 0, 0.045);
    lensGroup.add(lens);

    const rim = new THREE.Group();
    rim.position.x = x;
    addFrameOutline(THREE, rim, shape, frameMaterial, 0.048, 0.09);

    const innerPoints = shape.getPoints(80).map((point) => (
      new THREE.Vector3(point.x * 0.91, point.y * 0.89, 0.13)
    ));
    const innerCurve = new THREE.CatmullRomCurve3(innerPoints, true, 'centripetal');
    rim.add(new THREE.Mesh(new THREE.TubeGeometry(innerCurve, 128, 0.009, 6, true), goldMaterial));
    frameGroup.add(rim);

    const hinge = new THREE.Mesh(new THREE.SphereGeometry(0.065, 20, 16), goldMaterial);
    hinge.position.set(x * 1.86, 0.03, 0.08);
    frameGroup.add(hinge);

    const temple = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x * 1.78, 0.03, 0.05),
      new THREE.Vector3(x * 1.9, 0.02, -0.18),
      new THREE.Vector3(x * 1.93, -0.08, -0.75),
      new THREE.Vector3(x * 1.78, -0.2, -1.2),
    ]);
    frameGroup.add(new THREE.Mesh(new THREE.TubeGeometry(temple, 48, 0.055, 10, false), frameMaterial));

    const templeTip = new THREE.Mesh(new THREE.SphereGeometry(0.07, 16, 12), goldMaterial);
    templeTip.position.set(x * 1.78, -0.2, -1.2);
    frameGroup.add(templeTip);
  });

  const bridge = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.12, 0.18, 0.1),
    new THREE.Vector3(-0.09, 0.27, 0.17),
    new THREE.Vector3(0, 0.29, 0.18),
    new THREE.Vector3(0.09, 0.27, 0.17),
    new THREE.Vector3(0.12, 0.18, 0.1),
  ]);
  frameGroup.add(new THREE.Mesh(new THREE.TubeGeometry(bridge, 40, 0.045, 10, false), goldMaterial));

  [-0.14, 0.14].forEach((x) => {
    const nosePad = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 12),
      new THREE.MeshPhysicalMaterial({ color: '#d8c6a8', roughness: 0.3, transparent: true, opacity: 0.7 })
    );
    nosePad.scale.set(0.65, 0.5, 0.35);
    nosePad.position.set(x, -0.06, 0.15);
    frameGroup.add(nosePad);
  });

  model.add(lensGroup, frameGroup);
  model.rotation.x = -0.08;

  return { model, frameGroup, lensGroup, lensMaterial };
}

export default function AppleHeroExperience() {
  const containerRef = useRef(null);
  const canvasHostRef = useRef(null);
  const modelRef = useRef(null);
  const frameGroupRef = useRef(null);
  const lensGroupRef = useRef(null);
  const lensMaterialRef = useRef(null);
  const rotationRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const [viewMode, setViewMode] = useState('interactive3D');
  const [lensTint, setLensTint] = useState('gold');
  const viewModeRef = useRef(viewMode);
  const lensTintRef = useRef(lensTint);

  useEffect(() => {
    const host = canvasHostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let scene;
    let renderer;
    let resizeObserver;
    let animationFrame = 0;

    const updateScrollRotation = () => {
      if (isDraggingRef.current || !containerRef.current) return;
      const start = containerRef.current.getBoundingClientRect().top + window.scrollY;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start + 80) / (window.innerHeight * 1.25)));
      rotationRef.current = progress * Math.PI * 2;
      const canvas = host.querySelector('canvas');
      if (canvas) canvas.dataset.rotation = rotationRef.current.toFixed(3);
    };

    updateScrollRotation();
    window.addEventListener('scroll', updateScrollRotation, { passive: true });
    window.addEventListener('resize', updateScrollRotation);

    const initializeScene = async () => {
      const THREE = await import('three');
      if (disposed) return;

      scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 5.4);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.domElement.setAttribute('aria-label', '360 derece döndürülebilen 3D güneş gözlüğü modeli');
      renderer.domElement.dataset.rotation = rotationRef.current.toFixed(3);
      host.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xffead1, 0x1a1612, 2.1));

      const keyLight = new THREE.DirectionalLight(0xffd6a0, 3.8);
      keyLight.position.set(-3, 4, 5);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xb9d5ff, 2.2);
      fillLight.position.set(4, 1, 2);
      scene.add(fillLight);

      const rimLight = new THREE.PointLight(0xc5a880, 18, 12);
      rimLight.position.set(0, -2, -2);
      scene.add(rimLight);

      const glasses = buildGlasses(THREE, TINT_STYLES[lensTintRef.current].hex);
      scene.add(glasses.model);
      modelRef.current = glasses.model;
      frameGroupRef.current = glasses.frameGroup;
      lensGroupRef.current = glasses.lensGroup;
      lensMaterialRef.current = glasses.lensMaterial;

      const offset = viewModeRef.current === 'exploded' ? 0.32 : 0;
      glasses.frameGroup.position.set(0, -offset * 0.15, -offset);
      glasses.lensGroup.position.set(0, offset * 0.15, offset);

      resizeObserver = new ResizeObserver(() => {
        const width = Math.max(host.clientWidth, 1);
        const height = Math.max(host.clientHeight, 1);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        glasses.model.scale.setScalar(Math.min(1, width / 400));
      });
      resizeObserver.observe(host);

      const render = () => {
        animationFrame = requestAnimationFrame(render);
        glasses.model.rotation.y = rotationRef.current;
        renderer.render(scene, camera);
      };
      render();
      updateScrollRotation();
    };

    initializeScene().catch((error) => {
      console.warn('3D eyewear model could not be initialized:', error);
    });

    return () => {
      disposed = true;
      window.removeEventListener('scroll', updateScrollRotation);
      window.removeEventListener('resize', updateScrollRotation);
      resizeObserver?.disconnect();
      cancelAnimationFrame(animationFrame);
      scene?.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer?.dispose();
      renderer?.domElement.remove();
      modelRef.current = null;
      frameGroupRef.current = null;
      lensGroupRef.current = null;
      lensMaterialRef.current = null;
    };
  }, []);

  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  useEffect(() => {
    lensTintRef.current = lensTint;
  }, [lensTint]);

  useEffect(() => {
    if (!lensMaterialRef.current) return;
    lensMaterialRef.current.color.set(TINT_STYLES[lensTint].hex);
  }, [lensTint]);

  useEffect(() => {
    if (!frameGroupRef.current || !lensGroupRef.current) return;
    const offset = viewMode === 'exploded' ? 0.32 : 0;
    frameGroupRef.current.position.set(0, -offset * 0.15, -offset);
    lensGroupRef.current.position.set(0, offset * 0.15, offset);
  }, [viewMode]);

  const handlePointerDown = (event) => {
    if (event.button !== 0) return;
    isDraggingRef.current = true;
    dragStartXRef.current = event.clientX;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDraggingRef.current) return;
    rotationRef.current += (event.clientX - dragStartXRef.current) * 0.012;
    dragStartXRef.current = event.clientX;
    const canvas = event.currentTarget.querySelector('canvas');
    if (canvas) canvas.dataset.rotation = rotationRef.current.toFixed(3);
  };

  const handlePointerUp = (event) => {
    isDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const activeTint = TINT_STYLES[lensTint];

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-4xl mx-auto my-6 px-4 select-none"
    >
      {/* Kontrol Üst Barı */}
      <div className="flex items-center justify-between mb-2 z-20 relative">
        <span className="text-[10px] font-mono text-[#c5a880] tracking-widest">
          • 360° MODEL • BETA-TİTANYUM
        </span>
        <div className="flex items-center bg-black/80 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setViewMode('interactive3D')}
            aria-pressed={viewMode === 'interactive3D'}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${viewMode === 'interactive3D' ? 'bg-[#c5a880] text-black font-bold' : 'text-zinc-400'
              }`}
          >
            <RotateCw className="w-3 h-3 inline mr-1" /> 360°
          </button>
          <button
            onClick={() => setViewMode('exploded')}
            aria-pressed={viewMode === 'exploded'}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${viewMode === 'exploded' ? 'bg-[#c5a880] text-black font-bold' : 'text-zinc-400'
              }`}
          >
            <Layers className="w-3 h-3 inline mr-1" /> Katmanlar
          </button>
        </div>
      </div>

      {/* 3D eyewear model */}
      <div className="relative w-full h-[380px] sm:h-[440px] flex items-center justify-center overflow-hidden">

        {/* Arkadaki Şık Renkli Parlama (Glow) */}
        <div
          className="absolute w-[280px] h-[180px] rounded-full blur-[100px] pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: activeTint.glow }}
        />

        <div
          ref={canvasHostRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="relative z-10 w-[300px] sm:w-[450px] h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        />

        {/* Alt Cam Tonu Seçici */}
        <div className="absolute bottom-2 flex items-center space-x-2 bg-black/80 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/10 z-30">
          <span className="text-[9px] font-mono text-zinc-400">TON:</span>
          <div className="flex space-x-1.5">
            {Object.entries(TINT_STYLES).map(([key, item]) => (
              <button
                key={key}
                onClick={() => setLensTint(key)}
                className={`w-3.5 h-3.5 rounded-full border transition-transform ${lensTint === key ? 'scale-125 border-white ring-1 ring-[#c5a880]' : 'border-white/30'
                  }`}
                style={{ backgroundColor: item.hex }}
                title={item.name}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}