import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  numA: number;
  denA: number;
  numB: number;
  denB: number;
}

export const Fractions3DLab: React.FC<Props> = ({ numA, denA, numB, denB }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const barsRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f8fafc');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 6.5, 10);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(6, 12, 8);
    scene.add(dl);

    const grid = new THREE.GridHelper(12, 12, 0xcbd5e1, 0xe2e8f0);
    scene.add(grid);

    const grp = new THREE.Group();
    scene.add(grp);
    barsRef.current = grp;

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      ctrl.update();
      ren.render(scene, cam);
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
      el.removeChild(ren.domElement);
      ren.dispose();
    };
  }, []);

  useEffect(() => {
    const g = barsRef.current;
    if (!g) return;
    while (g.children.length > 0) g.remove(g.children[0]);

    const totalWidth = 8.0;
    const drawBar = (num: number, den: number, zPos: number, activeColor: number) => {
      const partW = totalWidth / den;
      for (let i = 0; i < den; i++) {
        const isFilled = i < num;
        const m = new THREE.Mesh(
          new THREE.BoxGeometry(partW - 0.08, 0.65, 1.4),
          new THREE.MeshStandardMaterial({
            color: isFilled ? activeColor : 0xe2e8f0,
            roughness: 0.4,
          })
        );
        m.position.set(-totalWidth / 2 + partW * (i + 0.5), 0.35, zPos);
        g.add(m);
      }
    };

    drawBar(numA, denA, -1.2, 0x0284c7); // Top bar (Blue)
    drawBar(numB, denB, 1.2, 0xf59e0b);  // Bottom bar (Amber)
  }, [numA, denA, numB, denB]);

  return <div ref={mountRef} className="h-full w-full" />;
};