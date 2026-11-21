import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Props {
  isWatering: boolean;
  waterColor: 'blue' | 'red';
}

export const PlantTransportLab: React.FC<Props> = ({ isWatering, waterColor }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const petalsMatRef = useRef<THREE.MeshStandardMaterial | null>(null);
  const dropMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const stateRef = useRef({ isWatering, waterColor, tint: 0 });

  useEffect(() => {
    stateRef.current.isWatering = isWatering;
    stateRef.current.waterColor = waterColor;
    if (!isWatering) stateRef.current.tint = 0;
  }, [isWatering, waterColor]);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0fdf4');

    const cam = new THREE.PerspectiveCamera(42, el.clientWidth / el.clientHeight, 0.1, 200);
    cam.position.set(0, 5.5, 11);

    const ren = new THREE.WebGLRenderer({ antialias: true });
    ren.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(ren.domElement);

    const ctrl = new OrbitControls(cam, ren.domElement);
    ctrl.enableDamping = true;

    scene.add(new THREE.AmbientLight(0xffffff, 0.85));
    const dl = new THREE.DirectionalLight(0xffffff, 0.9);
    dl.position.set(6, 12, 8);
    scene.add(dl);

    // Transparent glass pot to see roots
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(1.5, 1.1, 2.2, 24),
      new THREE.MeshStandardMaterial({ color: 0xe0f2fe, transparent: true, opacity: 0.45 })
    );
    pot.position.y = -1.6;
    scene.add(pot);

    // Roots inside pot
    const rootMat = new THREE.MeshStandardMaterial({ color: 0x92400e });
    [-0.4, 0, 0.4].forEach((rx) => {
      const r = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.03, 1.6, 8), rootMat);
      r.position.set(rx, -1.5, rx * 0.4);
      r.rotation.z = rx * 0.5;
      scene.add(r);
    });

    // Translucent stem so water droplets are visible moving up
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.22, 4.2, 16),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, transparent: true, opacity: 0.55 })
    );
    stem.position.y = 1.1;
    scene.add(stem);

    // Two leaves
    const leafGeo = new THREE.SphereGeometry(0.7, 16, 12);
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x16a34a });
    [-1, 1].forEach((side) => {
      const leaf = new THREE.Mesh(leafGeo, leafMat);
      leaf.scale.set(1.3, 0.25, 0.6);
      leaf.position.set(side * 0.85, 0.8, 0);
      leaf.rotation.z = side * 0.35;
      scene.add(leaf);
    });

    // Flower head (white petals that absorb colored water)
    const center = new THREE.Mesh(
      new THREE.SphereGeometry(0.45, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0xfacc15 })
    );
    center.position.y = 3.2;
    scene.add(center);

    const petalsMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    petalsMatRef.current = petalsMat;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const p = new THREE.Mesh(new THREE.SphereGeometry(0.5, 14, 14), petalsMat);
      p.scale.set(1, 0.35, 0.65);
      p.position.set(Math.cos(a) * 0.85, 3.2, Math.sin(a) * 0.85);
      p.rotation.y = -a;
      scene.add(p);
    }

    // Animated water droplets climbing up the stem
    const dropMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
    dropMatRef.current = dropMat;
    const drops: THREE.Mesh[] = [];
    for (let i = 0; i < 8; i++) {
      const d = new THREE.Mesh(new THREE.SphereGeometry(0.11, 10, 10), dropMat);
      d.position.y = -2.2 + i * 0.65;
      scene.add(d);
      drops.push(d);
    }

    const whiteCol = new THREE.Color(0xffffff);
    const blueCol = new THREE.Color(0x38bdf8);
    const redCol = new THREE.Color(0xf43f5e);

    let id: number;
    const loop = () => {
      id = requestAnimationFrame(loop);
      const st = stateRef.current;
      const targetHex = st.waterColor === 'blue' ? 0x0284c7 : 0xe11d48;
      if (dropMatRef.current) dropMatRef.current.color.setHex(targetHex);

      drops.forEach((d) => {
        d.visible = st.isWatering;
        if (st.isWatering) {
          d.position.y += 0.04;
          if (d.position.y > 3.1) d.position.y = -2.2;
        }
      });

      if (st.isWatering && st.tint < 1) st.tint = Math.min(1, st.tint + 0.006);
      if (petalsMatRef.current) {
        petalsMatRef.current.color
          .copy(whiteCol)
          .lerp(st.waterColor === 'blue' ? blueCol : redCol, st.tint);
      }

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

  return <div ref={mountRef} className="h-full w-full" />;
};