import React, { useEffect, useRef } from 'react';

function makeLensShape(THREE, frameShape) {
  const shape = new THREE.Shape();

  if (frameShape === 'aviator') {
    shape.moveTo(-0.57, 0.3);
    shape.bezierCurveTo(-0.32, 0.43, 0.3, 0.4, 0.55, 0.3);
    shape.bezierCurveTo(0.59, 0.02, 0.48, -0.36, 0.12, -0.53);
    shape.bezierCurveTo(-0.18, -0.51, -0.48, -0.28, -0.57, 0.3);
    shape.closePath();
  } else if (frameShape === 'cat-eye') {
    shape.moveTo(-0.62, 0.33);
    shape.bezierCurveTo(-0.28, 0.44, 0.24, 0.37, 0.56, 0.53);
    shape.bezierCurveTo(0.5, 0.15, 0.46, -0.34, 0.08, -0.43);
    shape.bezierCurveTo(-0.25, -0.44, -0.52, -0.2, -0.62, 0.33);
    shape.closePath();
  } else if (frameShape === 'geometric') {
    shape.moveTo(-0.44, 0.4);
    shape.lineTo(0.32, 0.4);
    shape.lineTo(0.57, 0.13);
    shape.lineTo(0.49, -0.28);
    shape.lineTo(0.22, -0.43);
    shape.lineTo(-0.34, -0.4);
    shape.lineTo(-0.57, -0.11);
    shape.closePath();
  } else if (frameShape === 'square') {
    shape.moveTo(-0.52, 0.4);
    shape.quadraticCurveTo(-0.6, 0.4, -0.6, 0.28);
    shape.lineTo(-0.55, -0.24);
    shape.quadraticCurveTo(-0.53, -0.4, -0.37, -0.4);
    shape.lineTo(0.38, -0.35);
    shape.quadraticCurveTo(0.56, -0.34, 0.56, -0.17);
    shape.lineTo(0.53, 0.25);
    shape.quadraticCurveTo(0.52, 0.4, 0.35, 0.4);
    shape.closePath();
  } else {
    shape.absellipse(0, 0, 0.51, 0.43, 0, Math.PI * 2, false, 0);
  }

  return shape;
}

function addRim(THREE, parent, shape, material) {
  const points = shape.getPoints(80).map((point) => new THREE.Vector3(point.x, point.y, 0.08));
  const curve = new THREE.CatmullRomCurve3(points, true, 'centripetal');
  parent.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 100, 0.046, 8, true), material));
}

function createFrame(THREE, frameShape, frameColor, lensColor) {
  const model = new THREE.Group();
  const frame = new THREE.Group();
  const lensGroup = new THREE.Group();
  const lensShape = makeLensShape(THREE, frameShape);
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: frameColor,
    metalness: 0.68,
    roughness: 0.23,
    clearcoat: 0.9,
    clearcoatRoughness: 0.16,
  });
  const bridgeMaterial = new THREE.MeshStandardMaterial({ color: '#c5a880', metalness: 0.9, roughness: 0.2 });
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: lensColor,
    metalness: 0.12,
    roughness: 0.16,
    transparent: true,
    opacity: 0.68,
    transmission: 0.16,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  [-0.7, 0.7].forEach((offset) => {
    const lens = new THREE.Mesh(new THREE.ShapeGeometry(lensShape, 32), lensMaterial);
    lens.position.set(offset, 0, 0.025);
    lensGroup.add(lens);

    const rim = new THREE.Group();
    rim.position.x = offset;
    addRim(THREE, rim, lensShape, frameMaterial);
    frame.add(rim);

    const hinge = new THREE.Mesh(new THREE.SphereGeometry(0.062, 16, 12), bridgeMaterial);
    hinge.position.set(offset * 1.84, 0.02, 0.06);
    frame.add(hinge);

    const temple = new THREE.CatmullRomCurve3([
      new THREE.Vector3(offset * 1.65, 0.03, 0.04),
      new THREE.Vector3(offset * 1.85, 0.01, -0.25),
      new THREE.Vector3(offset * 1.86, -0.08, -0.8),
      new THREE.Vector3(offset * 1.7, -0.18, -1.15),
    ]);
    frame.add(new THREE.Mesh(new THREE.TubeGeometry(temple, 40, 0.052, 8, false), frameMaterial));
  });

  const bridge = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.15, 0.22, 0.1),
    new THREE.Vector3(-0.09, 0.31, 0.14),
    new THREE.Vector3(0, 0.32, 0.16),
    new THREE.Vector3(0.09, 0.31, 0.14),
    new THREE.Vector3(0.15, 0.22, 0.1),
  ]);
  frame.add(new THREE.Mesh(new THREE.TubeGeometry(bridge, 36, 0.045, 8, false), bridgeMaterial));

  model.add(lensGroup, frame);
  model.scale.setScalar(0.94);
  model.rotation.x = -0.06;

  return { model, lensMaterial };
}

export default function EyewearPreview({ product, frameColor, lensColor = '#4b594e', rotationY = 0, className = '' }) {
  const hostRef = useRef(null);
  const modelRef = useRef(null);
  const lensMaterialRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let renderer;
    let scene;
    let resizeObserver;
    let renderFrame = 0;
    let dragX = null;

    const clearScene = () => {
      if (renderFrame) cancelAnimationFrame(renderFrame);
      resizeObserver?.disconnect();
      scene?.traverse((object) => {
        object.geometry?.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material?.dispose();
      });
      renderer?.dispose();
      renderer?.domElement.remove();
      renderer = null;
      scene = null;
      modelRef.current = null;
      lensMaterialRef.current = null;
    };

    const createScene = async () => {
      const THREE = await import('three');
      if (disposed) return;

      scene = new THREE.Scene();
      const width = Math.max(host.clientWidth, 1);
      const height = Math.max(host.clientHeight, 1);
      const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
      camera.position.set(0, 0, 4.5);

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute('aria-label', `${product.name} 3D gözlük modeli, sürükleyerek döndür`);
      renderer.domElement.dataset.rotation = '0';
      host.appendChild(renderer.domElement);

      scene.add(new THREE.HemisphereLight(0xf6ead7, 0x28302d, 2.2));
      const keyLight = new THREE.DirectionalLight(0xffe2b3, 3.2);
      keyLight.position.set(-3, 4, 5);
      scene.add(keyLight);
      const fillLight = new THREE.DirectionalLight(0xb9d5ff, 1.8);
      fillLight.position.set(4, 1, 2);
      scene.add(fillLight);

      const frame = createFrame(THREE, product.shape, frameColor || product.colors?.[0]?.hex || '#c5a880', lensColor);
      scene.add(frame.model);
      modelRef.current = frame.model;
      lensMaterialRef.current = frame.lensMaterial;

      const resize = () => {
        const nextWidth = Math.max(host.clientWidth, 1);
        const nextHeight = Math.max(host.clientHeight, 1);
        camera.aspect = nextWidth / nextHeight;
        camera.updateProjectionMatrix();
        renderer?.setSize(nextWidth, nextHeight, false);
        frame.model.scale.setScalar(Math.min(0.94, nextWidth / 360));
      };

      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);
      resize();

      const render = () => {
        if (disposed || !renderer) return;
        renderFrame = requestAnimationFrame(render);
        renderer.render(scene, camera);
      };
      render();
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !renderer) createScene().catch((error) => console.warn('3D model preview failed:', error));
      if (!entry.isIntersecting && renderer) clearScene();
    }, { rootMargin: '120px' });
    visibilityObserver.observe(host);

    const handlePointerDown = (event) => {
      dragX = event.clientX;
      host.setPointerCapture(event.pointerId);
    };
    const handlePointerMove = (event) => {
      if (dragX === null || !modelRef.current) return;
      modelRef.current.rotation.y += (event.clientX - dragX) * 0.012;
      dragX = event.clientX;
      const canvas = host.querySelector('canvas');
      if (canvas) canvas.dataset.rotation = modelRef.current.rotation.y.toFixed(3);
    };
    const handlePointerUp = (event) => {
      dragX = null;
      if (host.hasPointerCapture(event.pointerId)) host.releasePointerCapture(event.pointerId);
    };

    host.addEventListener('pointerdown', handlePointerDown);
    host.addEventListener('pointermove', handlePointerMove);
    host.addEventListener('pointerup', handlePointerUp);
    host.addEventListener('pointercancel', handlePointerUp);

    return () => {
      disposed = true;
      visibilityObserver.disconnect();
      host.removeEventListener('pointerdown', handlePointerDown);
      host.removeEventListener('pointermove', handlePointerMove);
      host.removeEventListener('pointerup', handlePointerUp);
      host.removeEventListener('pointercancel', handlePointerUp);
      clearScene();
    };
  }, [product.id, product.name, product.shape, product.colors, frameColor, lensColor]);

  useEffect(() => {
    if (lensMaterialRef.current) lensMaterialRef.current.color.set(lensColor);
  }, [lensColor]);

  useEffect(() => {
    if (!modelRef.current) return;
    modelRef.current.rotation.y = rotationY;
    const canvas = hostRef.current?.querySelector('canvas');
    if (canvas) canvas.dataset.rotation = rotationY.toFixed(3);
  }, [rotationY]);

  return (
    <div
      ref={hostRef}
      className={`eyewear-preview ${className}`}
      role="img"
      aria-label={`${product.name} 3D modeli`}
      onClick={(event) => event.stopPropagation()}
      style={{ touchAction: 'pan-y' }}
    />
  );
}