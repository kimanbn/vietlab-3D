import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props { leftWeight: number; rightWeight: number; }

export const BalanceScaleLab: React.FC<Props> = ({ leftWeight, rightWeight }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<THREE.Group | null>(null);
  const lpRef = useRef<THREE.Group | null>(null);
  const rpRef = useRef<THREE.Group | null>(null);
  const angRef = useRef<number>(0);

  useEffect(() => {
    angRef.current = Math.max(-5, Math.min(5, leftWeight - rightWeight)) * 0.065;
  }, [leftWeight, rightWeight]);

  useEffect(() => {
    const el = mountRef.current; if (!el) return;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');
    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 6, 12);
    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);
    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.95);
    dl.position.set(6, 12, 8); scene.add(dl);

    const base = new THREE.Mesh(new THREE.BoxGeometry(5, 0.4, 3), new THREE.MeshStandardMaterial({ color: 0x334155 }));
    base.position.y = -2.5; scene.add(base);
    const pil = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.3, 4.5, 20), new THREE.MeshStandardMaterial({ color: 0x475569 }));
    pil.position.y = -0.2; scene.add(pil);

    const bg = new THREE.Group(); bg.position.y = 2.0;
    bg.add(new THREE.Mesh(new THREE.BoxGeometry(8.4, 0.22, 0.25), new THREE.MeshStandardMaterial({ color: 0x0284c7 })));
    scene.add(bg); beamRef.current = bg;

    const pGeo = new THREE.CylinderGeometry(1.5, 1.2, 0.2, 24);
    const pMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
    const lp = new THREE.Group(); lp.add(new THREE.Mesh(pGeo, pMat)); scene.add(lp); lpRef.current = lp;
    const rp = new THREE.Group(); rp.add(new THREE.Mesh(pGeo, pMat)); scene.add(rp); rpRef.current = rp;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      if (beamRef.current && lpRef.current && rpRef.current) {
        beamRef.current.rotation.z += (angRef.current - beamRef.current.rotation.z) * 0.1;
        const a = beamRef.current.rotation.z; const arm = 3.8;
        lpRef.current.position.set(-Math.cos(a) * arm, 2.0 - Math.sin(a) * arm - 0.6, 0);
        rpRef.current.position.set(Math.cos(a) * arm, 2.0 + Math.sin(a) * arm - 0.6, 0);
      }
      ctrl.update(); ren.render(scene, cam);
    };
    loop();

    const onR = () => {
      if (!el) return;
      cam.aspect = el.clientWidth / el.clientHeight;
      cam.updateProjectionMatrix();
      ren.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener('resize', onR);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onR);
      el.removeChild(ren.domElement); ren.dispose();
    };
  }, []);

  useEffect(() => {
    const lp = lpRef.current; const rp = rpRef.current;
    if (!lp || !rp) return;
    while (lp.children.length > 1) lp.remove(lp.children[1]);
    while (rp.children.length > 1) rp.remove(rp.children[1]);

    const h = 0.5 + leftWeight * 0.18;
    const bag = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.85, h, 20), new THREE.MeshStandardMaterial({ color: 0xf59e0b }));
    bag.position.y = h / 2 + 0.1; lp.add(bag);

    const wG = new THREE.CylinderGeometry(0.32, 0.36, 0.45, 16);
    const wM = new THREE.MeshStandardMaterial({ color: 0xe11d48 });
    for (let i = 0; i < rightWeight; i++) {
      const m = new THREE.Mesh(wG, wM);
      m.position.set(((i % 3) - 1) * 0.72, 0.32 + Math.floor(i / 3) * 0.48, 0);
      rp.add(m);
    }
  }, [leftWeight, rightWeight]);

  return <div ref={mountRef} className="h-full w-full" />;
};